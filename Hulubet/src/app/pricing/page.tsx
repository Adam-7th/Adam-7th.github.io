"use client";

import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export default function PricingPage() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl border border-edge bg-panel/80 p-8">
        <h1 className="font-display text-3xl">{t.pricing.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.pricing.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {t.pricing.tiers.map((tier) => (
          <div
            key={tier.name}
            className="tilt-card rounded-2xl border border-edge bg-panel/80 p-6"
          >
            <h2 className="font-display text-xl">{tier.name}</h2>
            <p className="mt-3 text-2xl font-semibold text-text">{tier.price}</p>
            <p className="mt-2 text-sm text-muted">{tier.detail}</p>
            <button
              type="button"
              className="mt-6 w-full rounded-full bg-brand px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
            >
              {t.hero.ctaPrimary}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
