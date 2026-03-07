"use client";

import { FAQAccordion } from "@/app/components/FAQAccordion";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

export default function FAQPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];

  useLocalizedMeta(t.meta.pages.faq.title, t.meta.pages.faq.description);

  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-col gap-8 pb-16">
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h1 className="font-display text-4xl text-text">{t.faqPage.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.faqPage.subtitle}</p>
      </section>

      <section className="space-y-6">
        {t.faqPage.categories.map((category) => (
          <article key={category.title} className="rounded-3xl border border-edge bg-panel p-5">
            <h2 className="mb-4 font-display text-2xl text-text">{category.title}</h2>
            <FAQAccordion items={category.items} />
          </article>
        ))}
      </section>
    </div>
  );
}
