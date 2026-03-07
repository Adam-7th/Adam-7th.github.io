import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, message: "Telegram webhook is not configured." },
    { status: 501 },
  );
}
