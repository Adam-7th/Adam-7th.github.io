"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import type { SiteCopy } from "@/lib/siteContent";
import { decodeMojibakeDeep } from "@/lib/text";

const labels = decodeMojibakeDeep({
  en: {
    title: "Insights for automation-first teams",
    subtitle: "Guides, implementation patterns, and practical AI workflow strategies.",
  },
  ru: {
    title: "Инсайты для automation-first команд",
    subtitle: "Гайды, практики внедрения и AI-workflow стратегии.",
  },
  ar: {
    title: "محتوى معرفي لفرق الأتمتة",
    subtitle: "أدلة تنفيذ واستراتيجيات عملية لبناء تدفقات AI.",
  },
} as const);

export function BlogInsightsPreview({ lang, copy }: { lang: Lang; copy: SiteCopy }) {
  const t = labels[lang];
  const items = copy.articles.slice(0, 3);

  return (
    <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl text-text">{t.title}</h2>
          <p className="mt-2 text-sm text-muted">{t.subtitle}</p>
        </div>
        <Link href="/blog" className="rounded-full border border-edge px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand">
          {copy.nav.blog}
        </Link>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((article) => (
          <article key={article.slug} className="rounded-2xl border border-edge bg-panel2 p-5 card-hover">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{article.category}</p>
            <h3 className="mt-2 font-display text-lg text-text">{article.title}</h3>
            <p className="mt-2 text-sm text-muted">{article.summary}</p>
            <Link href={`/blog/${article.slug}`} className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {copy.common.readArticle}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
