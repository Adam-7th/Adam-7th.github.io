import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, message: "Relay endpoint is not configured." },
    { status: 501 },
  );
}
