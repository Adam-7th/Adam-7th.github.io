"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

export default function SolutionsPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const isRtl = lang === "ar";

  useLocalizedMeta(t.meta.pages.solutions.title, t.meta.pages.solutions.description);

  return (
    <div className={`mx-auto flex w-full max-w-[1100px] flex-col gap-8 pb-16 ${isRtl ? "text-right" : "text-left"}`}>
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h1 className="font-display text-4xl text-text">{t.solutionsPage.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">{t.solutionsPage.subtitle}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {t.services.map((service) => (
          <article key={service.slug} className="rounded-3xl border border-edge bg-panel p-6 card-hover">
            <h2 className="font-display text-2xl text-text">{service.title}</h2>
            <p className="mt-3 text-sm text-muted">{service.summary}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-edge px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{t.solutionsPage.timelineLabel}</p>
            <p className="mt-1 text-sm text-text">{service.timeline}</p>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{t.solutionsPage.workflowsIncludedLabel}</p>
            <p className="mt-1 text-sm text-text">{service.tools.join(" • ")}</p>

            <Link
              href={`/solutions/${service.slug}`}
              className="mt-5 inline-flex rounded-full border border-edge px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand"
            >
              {t.common.viewDetails}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
