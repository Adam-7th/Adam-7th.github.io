import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import path from "path";
import { checkRateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/request";

const {
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_ENDPOINT,
  DO_SPACES_BUCKET,
  DO_SPACES_REGION,
} = process.env;

const client =
  DO_SPACES_KEY && DO_SPACES_SECRET && DO_SPACES_ENDPOINT && DO_SPACES_BUCKET
    ? new S3Client({
        region: DO_SPACES_REGION || "us-east-1",
        endpoint: DO_SPACES_ENDPOINT,
        credentials: {
          accessKeyId: DO_SPACES_KEY,
          secretAccessKey: DO_SPACES_SECRET,
        },
      })
    : null;

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".pdf",
  ".txt",
  ".doc",
  ".docx",
]);

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`uploads:post:${ip}`, 20, 60_000);
  if (!rate.ok) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!client || !DO_SPACES_BUCKET) {
    return NextResponse.json(
      { error: "Storage not configured" },
      { status: 500 },
    );
  }

  const body = (await request.json()) as {
    filename?: string;
    contentType?: string;
  };

  const filename = body.filename?.trim();
  const contentType = body.contentType?.trim() || "application/octet-stream";

  if (!filename) {
    return NextResponse.json({ error: "Filename required" }, { status: 400 });
  }

  if (filename.length > 200 || path.basename(filename) !== filename) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const ext = path.extname(filename);
  if (!ALLOWED_EXTENSIONS.has(ext.toLowerCase()) || !ALLOWED_TYPES.has(contentType)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  const key = `uploads/${crypto.randomUUID()}${ext}`;

  const command = new PutObjectCommand({
    Bucket: DO_SPACES_BUCKET,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 600 });
  const publicUrl = `${DO_SPACES_ENDPOINT}/${DO_SPACES_BUCKET}/${key}`;

  return NextResponse.json({ uploadUrl, publicUrl, key });
}
