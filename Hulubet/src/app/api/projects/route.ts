import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import ProjectModel from "@/lib/models/Project";
import { isAdminRequest } from "@/lib/adminAuth";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/request";

const MAX = {
  name: 100,
  company: 120,
  email: 200,
  phone: 40,
  budget: 60,
  timeline: 60,
  details: 2000,
  needs: 20,
  fileUrls: 10,
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
  };

  if (!body.name || !body.company || !body.email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (
    body.name.length > MAX.name ||
    body.company.length > MAX.company ||
    body.email.length > MAX.email ||
    (body.phone?.length ?? 0) > MAX.phone ||
    (body.budget?.length ?? 0) > MAX.budget ||
    (body.timeline?.length ?? 0) > MAX.timeline ||
    (body.details?.length ?? 0) > MAX.details ||
    (body.needs?.length ?? 0) > MAX.needs ||
    (body.fileUrls?.length ?? 0) > MAX.fileUrls
  ) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  await connectDb();
  const created = await ProjectModel.create({
    name: body.name,
    company: body.company,
    email: body.email,
    phone: body.phone ?? "",
    budget: body.budget ?? "",
    timeline: body.timeline ?? "",
    needs: body.needs ?? [],
    details: body.details ?? "",
    fileUrls: body.fileUrls ?? [],
  });

  return NextResponse.json({ project: created }, { status: 201 });
}
