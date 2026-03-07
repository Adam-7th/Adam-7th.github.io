"use client";

import { AgencyPricingSection } from "@/app/components/AgencyPricingSection";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

export default function PricingPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];

  useLocalizedMeta(t.meta.pages.pricing.title, t.meta.pages.pricing.description);

  return (
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 pb-16">
      <AgencyPricingSection showPaymentMethods={true} />
    </div>
  );
}
