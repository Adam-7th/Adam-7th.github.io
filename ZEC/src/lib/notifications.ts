type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

type NotificationResult = {
  sent: boolean;
  reason?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TELEGRAM_ENDPOINT = "https://api.telegram.org";
const DEFAULT_OWNER_EMAIL = "contact.zac.ai@gmail.com";
const DEFAULT_FROM_EMAIL = "ZEC <onboarding@resend.dev>";

const trimForTelegram = (value: string) => {
  if (value.length <= 3800) {
    return value;
  }
  return `${value.slice(0, 3797)}...`;
};

async function sendResendEmail(payload: EmailPayload): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY || process.env.RESEND_API_TOKEN;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
  if (!apiKey) {
    return { sent: false, reason: "missing-resend-api-key" };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [payload.to],
        subject: payload.subject,
        text: payload.text,
        reply_to: payload.replyTo,
      }),
    });

    if (!response.ok) {
      return { sent: false, reason: "email-request-failed" };
    }

    return { sent: true };
  } catch {
    return { sent: false, reason: "email-request-error" };
  }
}

export async function sendOwnerEmail(subject: string, text: string, replyTo?: string): Promise<NotificationResult> {
  const ownerEmail =
    process.env.CONTACT_OWNER_EMAIL ||
    process.env.COMPANY_CONTACT_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    process.env.RESEND_TO_EMAIL ||
    DEFAULT_OWNER_EMAIL;
  if (!ownerEmail) {
    return { sent: false, reason: "missing-owner-email" };
  }
  return sendResendEmail({
    to: ownerEmail,
    subject,
    text,
    replyTo,
  });
}

export async function sendClientEmail(to: string, subject: string, text: string): Promise<NotificationResult> {
  if (!to) {
    return { sent: false, reason: "missing-client-email" };
  }
  return sendResendEmail({
    to,
    subject,
    text,
  });
}

export async function sendTelegramAdminAlert(text: string): Promise<NotificationResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !chatId) {
    return { sent: false, reason: "missing-telegram-env" };
  }

  try {
    const response = await fetch(`${TELEGRAM_ENDPOINT}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: trimForTelegram(text),
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      return { sent: false, reason: "telegram-request-failed" };
    }

    return { sent: true };
  } catch {
    return { sent: false, reason: "telegram-request-error" };
  }
}
