"use client";

import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export default function CasesPage() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h1 className="font-display text-3xl">{t.cases.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.sections.stackText}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {t.cases.items.map((item) => (
          <div
            key={item.title}
            className="day-night-shift rounded-2xl border border-edge bg-panel/80 p-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              {item.metric}
            </p>
            <h2 className="mt-3 font-display text-xl">{item.title}</h2>
            <p className="mt-3 text-sm text-muted">
              Integration stack: VK · Telegram · Yandex · CRM · Analytics
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
