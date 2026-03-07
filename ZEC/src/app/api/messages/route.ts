import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import MessageModel from "@/lib/models/Message";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/request";
import { sendClientEmail, sendOwnerEmail, sendTelegramAdminAlert } from "@/lib/notifications";

const MAX = {
  name: 100,
  company: 120,
  email: 200,
  phone: 40,
  industry: 120,
  monthlyLeads: 40,
  serviceInterest: 120,
  budget: 60,
  currentTools: 400,
  mainProblem: 1200,
  language: 10,
  subject: 200,
  message: 6000,
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

const buildClientAutoReply = () => {
  const bookingUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/contact-zac-ai";
  return [
    "Hello,",
    "",
    "Thank you for contacting ZEC AI Automation Agency.",
    "",
    "We received your request and will review your automation needs carefully.",
    "",
    "Our team typically responds within 1-2 business days. If your request looks like a good fit, we will suggest next steps and possible automation solutions.",
    "",
    "If your request is urgent, you can also schedule a call using our booking link.",
    bookingUrl,
    "",
    "Best regards,",
    "ZEC AI Automation Agency",
  ].join("\n");
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`messages:post:${ip}`, 12, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json()) as {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    industry?: string;
    monthlyLeads?: string;
    serviceInterest?: string;
    budget?: string;
    currentTools?: string | string[];
    mainProblem?: string;
    language?: string;
    honeypot?: string;
    companyWebsite?: string;
    consent?: boolean;
    subject?: string;
    message?: string;
  };

  if (normalizeSingleLine(body.honeypot, 200) || normalizeSingleLine(body.companyWebsite, 200)) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  if (body.consent === false) {
    return NextResponse.json({ error: "Consent is required" }, { status: 400 });
  }

  const name = normalizeSingleLine(body.name, MAX.name);
  const company = normalizeSingleLine(body.company, MAX.company);
  const email = normalizeSingleLine(body.email, MAX.email).toLowerCase();
  const phone = normalizeSingleLine(body.phone, MAX.phone);
  const industry = normalizeSingleLine(body.industry, MAX.industry);
  const monthlyLeads = normalizeSingleLine(body.monthlyLeads, MAX.monthlyLeads);
  const serviceInterest = normalizeSingleLine(body.serviceInterest, MAX.serviceInterest);
  const budget = normalizeSingleLine(body.budget, MAX.budget);
  const mainProblem = normalizeMultiline(body.mainProblem, MAX.mainProblem);
  const language = normalizeSingleLine(body.language, MAX.language) || "EN";
  const subject = normalizeSingleLine(body.subject, MAX.subject);
  const message = normalizeMultiline(body.message, MAX.message);
  const currentTools = Array.isArray(body.currentTools)
    ? body.currentTools.map((tool) => normalizeSingleLine(tool, 64)).filter(Boolean).join(", ")
    : normalizeSingleLine(body.currentTools, MAX.currentTools);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (phone && !isPhone(phone)) {
    return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  }

  const metadata: string[] = [];
  if (company) metadata.push(`Company: ${company}`);
  if (phone) metadata.push(`Phone: ${phone}`);
  if (industry) metadata.push(`Industry: ${industry}`);
  if (monthlyLeads) metadata.push(`Estimated monthly leads: ${monthlyLeads}`);
  if (serviceInterest) metadata.push(`Service interest: ${serviceInterest}`);
  if (budget) metadata.push(`Budget range: ${budget}`);
  if (currentTools) metadata.push(`Current tools: ${currentTools}`);
  if (mainProblem) metadata.push(`Main automation problem: ${mainProblem}`);
  metadata.push(`Language: ${language.toUpperCase()}`);

  const composedMessage = metadata.length > 0 ? `${metadata.join("\n")}\n\nMessage:\n${message}` : message;
  if (composedMessage.length > MAX.message) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  let created: unknown = null;
  let dbStored = false;
  try {
    await connectDb();
    created = await MessageModel.create({
      name,
      email,
      subject: subject || `ZEC contact request (${language.toUpperCase()})`,
      message: composedMessage,
    });
    dbStored = true;
  } catch (error) {
    console.error("Failed to store contact message in database.", error);
  }

  const ownerSubject = subject || `New contact request from ${name}`;
  const ownerText = [
    "New contact request from ZEC website.",
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    phone ? `Phone: ${phone}` : "",
    serviceInterest ? `Service interest: ${serviceInterest}` : "",
    budget ? `Budget: ${budget}` : "",
    "",
    composedMessage,
  ]
    .filter(Boolean)
    .join("\n");

  const telegramText = [
    "New Contact Request",
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "",
    serviceInterest ? `Service: ${serviceInterest}` : "",
    budget ? `Budget: ${budget}` : "",
    `Lang: ${language.toUpperCase()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const clientSubject = "Thanks for contacting ZEC AI Automation Agency";
  const clientText = buildClientAutoReply();

  const [ownerDelivery, clientDelivery, telegramDelivery] = await Promise.all([
    sendOwnerEmail(ownerSubject, ownerText, email),
    sendClientEmail(email, clientSubject, clientText),
    sendTelegramAdminAlert(telegramText),
  ]);

  const anyDelivery = ownerDelivery.sent || clientDelivery.sent || telegramDelivery.sent;
  const deliveryReasons = [ownerDelivery.reason, clientDelivery.reason, telegramDelivery.reason].filter(Boolean) as string[];

  if (!anyDelivery && !dbStored) {
    return NextResponse.json(
      {
        error: "Unable to store or deliver your request.",
        reason: deliveryReasons[0] || "delivery-and-storage-failed",
        dbStored,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: created,
    dbStored,
    delivered: {
      ownerEmail: ownerDelivery.sent,
      clientEmail: clientDelivery.sent,
      telegram: telegramDelivery.sent,
    },
    warning: deliveryReasons.length > 0 ? deliveryReasons.join(",") : undefined,
  }, { status: dbStored ? 201 : 202 });
}
