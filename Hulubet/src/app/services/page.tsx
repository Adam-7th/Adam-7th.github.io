"use client";

import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export default function ServicesPage() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h1 className="font-display text-3xl">{t.services.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.sections.valueText}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {t.services.items.map((item) => (
          <div
            key={item.title}
            className="day-night-shift rounded-2xl border border-edge bg-panel/80 p-6"
          >
            <h2 className="font-display text-xl">{item.title}</h2>
            <p className="mt-3 text-sm text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
