import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { ok: false, message: "Telegram endpoint is not configured." },
    { status: 501 },
  );
}
