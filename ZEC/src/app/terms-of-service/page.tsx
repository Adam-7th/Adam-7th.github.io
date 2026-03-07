"use client";

import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

export default function TermsPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];

  useLocalizedMeta(t.meta.pages.terms.title, t.meta.pages.terms.description);

  return (
    <div className="mx-auto w-full max-w-[900px] pb-16">
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {t.legal.updatedLabel}: {t.legal.updatedDate}
        </p>
        <h1 className="mt-3 font-display text-4xl text-text">{t.legal.termsTitle}</h1>

        <div className="mt-6 space-y-6">
          {t.legal.termsSections.map((section) => (
            <article key={section.title}>
              <h2 className="font-display text-2xl text-text">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
