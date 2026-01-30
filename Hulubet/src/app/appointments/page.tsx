"use client";

import { useState } from "react";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export default function AppointmentsPage() {
  const { lang } = useLang();
  const t = copy[lang];
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      service: String(formData.get("service") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      duration: String(formData.get("duration") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    };

    try {
      const response = await fetch("/api/appointments", {
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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h1 className="font-display text-3xl">{t.forms.appointmentTitle}</h1>
        <p className="mt-3 text-sm text-muted">{t.sections.stackText}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-edge bg-panel/80 p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.name}</span>
            <input
              name="name"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.email}</span>
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.service}</span>
            <input
              name="service"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.date}</span>
            <input
              name="date"
              type="date"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span>{t.forms.time}</span>
            <input
              name="time"
              type="time"
              required
              className="rounded-xl border border-edge bg-transparent px-4 py-2"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t.forms.duration}</span>
          <select
            name="duration"
            className="rounded-xl border border-edge bg-transparent px-4 py-2"
          >
            <option value="30">30 min</option>
            <option value="60">60 min</option>
            <option value="90">90 min</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span>{t.forms.notes}</span>
          <textarea
            name="notes"
            rows={3}
            className="rounded-2xl border border-edge bg-transparent px-4 py-3"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-70"
        >
          {loading ? "..." : t.forms.submit}
        </button>
        {status === "success" && (
          <p className="text-sm text-emerald-500">{t.forms.success}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-brand">{t.forms.error}</p>
        )}
      </form>
    </div>
  );
}
