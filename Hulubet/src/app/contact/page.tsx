"use client";

import { useState } from "react";
import Image from "next/image";

const TELEGRAM_LINK = "https://t.me/hulubet_support";
const TELEGRAM_HANDLE = "@hulubet_support";
const EMAIL = "hulubetautomationagency@gmail.com";
const PHONE = "+7 925 785 0702";
const PHONE_TEL = "tel:+79257850702";
const EMAIL_MAILTO = `mailto:${EMAIL}`;
const TELEGRAM_QR_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https%3A%2F%2Ft.me%2Fhulubet_support";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(TELEGRAM_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: "Contact request",
      message: [
        `Company: ${String(formData.get("company") ?? "") || "N/A"}`,
        `Country: ${String(formData.get("country") ?? "") || "N/A"}`,
        "",
        String(formData.get("message") ?? ""),
      ].join("\n"),
    };

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed");
      }
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <section className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h1 className="font-display text-3xl">Contact us</h1>
        <p className="mt-3 text-sm text-muted">
          Tell us what you want to automate — we’ll reply fast.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <div className="flex items-start justify-between gap-4">
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-edge bg-white/90">
                <Image
                  src="/logos/telegram.svg"
                  alt="Telegram logo"
                  width={22}
                  height={22}
                />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.3em] text-muted">
                  Telegram
                </span>
                <span className="mt-1 block text-sm text-text">{TELEGRAM_HANDLE}</span>
              </span>
            </a>
          </div>
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-brand px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
          >
            Message on Telegram
          </a>
        </div>

        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <div className="flex items-start justify-between gap-4">
            <a href={EMAIL_MAILTO} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-edge bg-white/90">
                <Image
                  src="/logos/gmail.svg"
                  alt="Email logo"
                  width={22}
                  height={22}
                />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.3em] text-muted">
                  Email
                </span>
                <span className="mt-1 block text-sm text-text">{EMAIL}</span>
              </span>
            </a>
          </div>
          <a
            href={EMAIL_MAILTO}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            Send email
          </a>
        </div>

        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6">
          <div className="flex items-start justify-between gap-4">
            <a href={PHONE_TEL} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-edge bg-white/90">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-brand"
                >
                  <path
                    fill="currentColor"
                    d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.36 2.28.55 3.58.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.19 2.48.55 3.58a1 1 0 0 1-.24 1.01l-2.19 2.2z"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.3em] text-muted">
                  Phone
                </span>
                <span className="mt-1 block text-sm text-text">{PHONE}</span>
              </span>
            </a>
          </div>
          <a
            href={PHONE_TEL}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-edge px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            Call
          </a>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[0.45fr_0.55fr]">
        <div className="card-surface rounded-3xl border border-edge bg-panel/80 p-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            Scan to chat on Telegram
          </p>
          <div className="mt-4 flex items-center justify-center">
            <div className="rounded-3xl border border-edge bg-white p-3">
              <img
                src={TELEGRAM_QR_SRC}
                alt="Telegram QR code"
                className="h-44 w-44"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-text">{TELEGRAM_HANDLE}</p>
          <p className="mt-1 text-xs text-muted">QR opens: {TELEGRAM_LINK}</p>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-edge px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-edge bg-panel/80 p-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-muted">Quick request</p>
            <p className="mt-2 text-sm text-muted">
              Share your goals and we will recommend the fastest automation path.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span>Name</span>
              <input
                name="name"
                required
                className="rounded-xl border border-edge bg-transparent px-4 py-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Email</span>
              <input
                name="email"
                type="email"
                required
                className="rounded-xl border border-edge bg-transparent px-4 py-2"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span>Company (optional)</span>
              <input
                name="company"
                className="rounded-xl border border-edge bg-transparent px-4 py-2"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span>Country</span>
              <select
                name="country"
                required
                className="rounded-xl border border-edge bg-transparent px-4 py-2"
              >
                <option value="">Select country</option>
                <option value="Russia">Russia</option>
                <option value="UAE">UAE</option>
                <option value="UK">UK</option>
                <option value="USA">USA</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm">
            <span>What do you want to automate?</span>
            <textarea
              name="message"
              rows={4}
              required
              className="rounded-2xl border border-edge bg-transparent px-4 py-3"
            />
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white disabled:opacity-70"
            >
              {loading ? "..." : "Request a free audit"}
            </button>
            <a
              href="/appointments"
              className="flex-1 rounded-full border border-edge px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-text"
            >
              Book a strategy call
            </a>
          </div>
          {status === "success" && (
            <p className="text-sm text-emerald-500">Thanks. We will reply soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-brand">Something went wrong.</p>
          )}
        </form>
      </section>

      <section className="rounded-3xl border border-edge bg-panel/80 p-6 text-sm text-muted">
        <p>We usually reply within 24 hours.</p>
        <p>For urgent requests, Telegram is fastest.</p>
      </section>
    </div>
  );
}
