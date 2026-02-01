import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import AppointmentModel from "@/lib/models/Appointment";
import { isAdminRequest } from "@/lib/adminAuth";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/request";

const MAX = {
  name: 100,
  email: 200,
  service: 120,
  date: 20,
  time: 20,
  duration: 10,
  notes: 1000,
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(`appointments:get:${ip}`, 30, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  await connectDb();
  const appointments = await AppointmentModel.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();
  return NextResponse.json({ appointments });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`appointments:post:${ip}`, 10, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json()) as {
    name?: string;
    email?: string;
    service?: string;
    date?: string;
    time?: string;
    duration?: string;
    notes?: string;
  };

  if (!body.name || !body.email || !body.service || !body.date || !body.time) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (
    body.name.length > MAX.name ||
    body.email.length > MAX.email ||
    body.service.length > MAX.service ||
    body.date.length > MAX.date ||
    body.time.length > MAX.time ||
    (body.duration?.length ?? 0) > MAX.duration ||
    (body.notes?.length ?? 0) > MAX.notes
  ) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  await connectDb();
  const created = await AppointmentModel.create({
    name: body.name,
    email: body.email,
    service: body.service,
    date: body.date,
    time: body.time,
    duration: body.duration ?? "60",
    notes: body.notes ?? "",
  });

  return NextResponse.json({ appointment: created }, { status: 201 });
}
