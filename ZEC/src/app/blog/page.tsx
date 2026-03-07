"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/lib/i18n";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

const ALL_CATEGORY_LABELS = {
  en: "All",
  ru: "Все",
  ar: "الكل",
} as const;

const DATE_LOCALE_BY_LANG: Record<Lang, string> = {
  en: "en-US",
  ru: "ru-RU",
  ar: "ar-AE",
};

const READING_UNIT_BY_LANG: Record<Lang, string> = {
  en: "min",
  ru: "мин",
  ar: "دقيقة",
};

const formatArticleDate = (date: string, lang: Lang) => {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return new Intl.DateTimeFormat(DATE_LOCALE_BY_LANG[lang], {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsed);
};

const formatReadingTime = (readingTime: string, lang: Lang) => {
  const minutes = Number.parseInt(readingTime, 10);
  if (Number.isNaN(minutes)) {
    return readingTime;
  }
  return `${minutes} ${READING_UNIT_BY_LANG[lang]}`;
};

export default function BlogPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const allCategoryLabel = ALL_CATEGORY_LABELS[lang];

  useLocalizedMeta(t.meta.pages.blog.title, t.meta.pages.blog.description);

  const categories = useMemo(() => [allCategoryLabel, ...new Set(t.articles.map((article) => article.category))], [allCategoryLabel, t.articles]);
  const [activeCategory, setActiveCategory] = useState<string>(allCategoryLabel);

  useEffect(() => {
    setActiveCategory(allCategoryLabel);
  }, [allCategoryLabel]);

  const filtered = useMemo(() => {
    if (activeCategory === allCategoryLabel) return t.articles;
    return t.articles.filter((article) => article.category === activeCategory);
  }, [activeCategory, allCategoryLabel, t.articles]);

  return (
    <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8 pb-16">
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h1 className="font-display text-4xl text-text">{t.blogPage.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">{t.blogPage.subtitle}</p>
      </section>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
              activeCategory === category ? "border-brand bg-brand/10 text-brand" : "border-edge text-muted"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((article) => (
          <article key={article.slug} className="rounded-3xl border border-edge bg-panel p-6 card-hover">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{article.category}</p>
            <h2 className="mt-3 font-display text-2xl text-text">{article.title}</h2>
            <p className="mt-3 text-sm text-muted">{article.summary}</p>
            <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
              <span>{formatArticleDate(article.date, lang)}</span>
              <span>•</span>
              <span>{formatReadingTime(article.readingTime, lang)}</span>
            </div>
            <Link
              href={`/blog/${article.slug}`}
              className="mt-5 inline-flex rounded-full border border-edge px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand"
            >
              {t.common.readArticle}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
