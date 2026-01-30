import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import MessageModel from "@/lib/models/Message";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/request";

const MAX = {
  name: 100,
  email: 200,
  subject: 200,
  message: 2000,
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`messages:post:${ip}`, 12, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = (await request.json()) as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!isEmail(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (
    body.name.length > MAX.name ||
    body.email.length > MAX.email ||
    (body.subject?.length ?? 0) > MAX.subject ||
    body.message.length > MAX.message
  ) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  await connectDb();
  const created = await MessageModel.create({
    name: body.name,
    email: body.email,
    subject: body.subject ?? "",
    message: body.message,
  });

  return NextResponse.json({ message: created }, { status: 201 });
}
