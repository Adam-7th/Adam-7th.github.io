import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import ProjectModel from "@/lib/models/Project";
import { isAdminRequest } from "@/lib/adminAuth";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/request";
import { sendClientEmail, sendOwnerEmail, sendTelegramAdminAlert } from "@/lib/notifications";

const MAX = {
  name: 100,
  company: 120,
  email: 200,
  phone: 40,
  budget: 60,
  timeline: 60,
  details: 8000,
  needs: 40,
  fileUrls: 10,
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isPhone = (value: string) => {
  const normalized = value.replace(/[^\d+]/g, "").trim();
  if (!normalized) {
    return true;
  }
  if (normalized.startsWith("+")) {
    return /^\+\d{7,15}$/.test(normalized);
  }
  return /^\d{7,15}$/.test(normalized);
};

const normalizeSingleLine = (value: unknown, max: number) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/\s+/g, " ").trim().slice(0, max);
};

const normalizeMultiline = (value: unknown, max: number) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/\r/g, "").replace(/\u0000/g, "").trim().slice(0, max);
};

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(`projects:get:${ip}`, 30, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  await connectDb();
  const projects = await ProjectModel.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`projects:post:${ip}`, 8, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json()) as {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    budget?: string;
    timeline?: string;
    needs?: string[];
    details?: string;
    fileUrls?: string[];
    honeypot?: string;
    companyWebsite?: string;
    sendClientCopy?: boolean;
  };

  if (normalizeSingleLine(body.honeypot, 200) || normalizeSingleLine(body.companyWebsite, 200)) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const name = normalizeSingleLine(body.name, MAX.name);
  const company = normalizeSingleLine(body.company, MAX.company);
  const email = normalizeSingleLine(body.email, MAX.email).toLowerCase();
  const phone = normalizeSingleLine(body.phone, MAX.phone);
  const budget = normalizeSingleLine(body.budget, MAX.budget);
  const timeline = normalizeSingleLine(body.timeline, MAX.timeline);
  const details = normalizeMultiline(body.details, MAX.details);

  if (!name || !company || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (phone && !isPhone(phone)) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  const needs = Array.isArray(body.needs)
    ? body.needs
        .map((need) => normalizeSingleLine(need, 100))
        .filter(Boolean)
        .slice(0, MAX.needs)
    : [];

  const fileUrls = Array.isArray(body.fileUrls)
    ? body.fileUrls
        .map((url) => normalizeSingleLine(url, 500))
        .filter(Boolean)
        .slice(0, MAX.fileUrls)
    : [];

  await connectDb();
  const created = await ProjectModel.create({
    name,
    company,
    email,
    phone,
    budget,
    timeline,
    needs,
    details,
    fileUrls,
  });

  const ownerText = [
    "New onboarding brief submitted.",
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    budget ? `Budget: ${budget}` : "",
    timeline ? `Timeline: ${timeline}` : "",
    needs.length > 0 ? `Needs: ${needs.join(", ")}` : "",
    "",
    details || "No additional details provided.",
  ]
    .filter(Boolean)
    .join("\n");

  const telegramText = [
    "New Client Onboarding Brief",
    `Name: ${name}`,
    `Company: ${company}`,
    budget ? `Budget: ${budget}` : "",
    timeline ? `Timeline: ${timeline}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const notificationTasks: Array<Promise<unknown>> = [
    sendOwnerEmail(`New onboarding brief: ${company}`, ownerText, email),
    sendTelegramAdminAlert(telegramText),
  ];

  if (body.sendClientCopy) {
    const clientText = [
      `Hi ${name},`,
      "",
      "Thanks for submitting your onboarding brief to ZEC AI Automation Agency.",
      "Our team will review your inputs and send the next implementation steps.",
      "",
      "Summary:",
      `Company: ${company}`,
      budget ? `Budget: ${budget}` : "",
      timeline ? `Timeline: ${timeline}` : "",
      needs.length > 0 ? `Automation goals: ${needs.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    notificationTasks.push(sendClientEmail(email, "We received your onboarding brief", clientText));
  }

  await Promise.allSettled(notificationTasks);

  return NextResponse.json({ project: created }, { status: 201 });
}
