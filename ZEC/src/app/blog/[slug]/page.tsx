"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { WorkflowInteractiveImage } from "@/app/components/WorkflowInteractiveImage";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/lib/i18n";
import { decodeMojibakeDeep } from "@/lib/text";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useTheme } from "@/lib/theme";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";
import { getThemedWorkflowImage } from "@/lib/workflowImageVariant";

const DATE_LOCALE_BY_LANG: Record<Lang, string> = {
  en: "en-US",
  ru: "ru-RU",
  ar: "ar-AE",
};

const READING_UNIT_BY_LANG: Record<Lang, string> = decodeMojibakeDeep({
  en: "min",
  ru: "мин",
  ar: "دقيقة",
} as const);

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

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const { theme } = useTheme();
  const t = SITE_CONTENT[lang];

  useLocalizedMeta(t.meta.pages.article.title, t.meta.pages.article.description);

  const article = t.articles.find((item) => item.slug === slug) ?? t.articles[0];
  const related = t.articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-col gap-8 pb-16">
      <article className="rounded-3xl border border-edge bg-panel p-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{article.category}</p>
        <h1 className="mt-3 font-display text-4xl text-text">{article.title}</h1>
        <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
          <span>{formatArticleDate(article.date, lang)}</span>
          <span aria-hidden="true">&bull;</span>
          <span>{formatReadingTime(article.readingTime, lang)}</span>
        </div>
      </article>

      <section className="grid gap-6 md:grid-cols-[0.28fr_0.72fr]">
        <aside className="rounded-3xl border border-edge bg-panel p-5 md:sticky md:top-24 md:self-start">
          <h2 className="font-display text-xl text-text">{t.blogPage.tocTitle}</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted">
            {article.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${section.heading.replace(/\s+/g, "-").toLowerCase()}`} className="hover:text-brand">
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="space-y-5 rounded-3xl border border-edge bg-panel p-6">
          {article.sections.map((section) => {
            const sectionId = section.heading.replace(/\s+/g, "-").toLowerCase();
            const sectionImage = section.image ? getThemedWorkflowImage(section.image, theme) : undefined;
            return (
              <section key={section.heading} id={sectionId} className="scroll-mt-28">
                <h2 className="font-display text-2xl text-text">{section.heading}</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted">{section.body}</p>
                {sectionImage && (
                  <figure className="mt-4 overflow-hidden rounded-2xl border border-edge bg-panel2">
                    <WorkflowInteractiveImage
                      src={sectionImage}
                      alt={section.imageAlt ?? `${section.heading} workflow diagram`}
                      width={1400}
                      height={760}
                    />
                    {section.imageCaption && <figcaption className="border-t border-edge px-4 py-2 text-xs text-muted">{section.imageCaption}</figcaption>}
                  </figure>
                )}
              </section>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <h2 className="font-display text-2xl text-text">{t.blogPage.relatedTitle}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <article key={item.slug} className="rounded-2xl border border-edge bg-panel2 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{item.category}</p>
              <h3 className="mt-2 text-sm font-semibold text-text">{item.title}</h3>
              <Link href={`/blog/${item.slug}`} className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {t.common.readArticle}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}



