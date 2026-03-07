"use client";

import { useMemo, useState } from "react";
import { CaseStudyCard } from "@/app/components/CaseStudyCard";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

export default function CaseStudiesPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const workflowPreviewLabel = lang === "ar" ? "معاينة سير العمل" : lang === "ru" ? "Превью workflow" : "Workflow Preview";

  useLocalizedMeta(t.meta.pages.caseStudies.title, t.meta.pages.caseStudies.description);

  const [activeTag, setActiveTag] = useState<string>(t.caseStudiesPage.allFilter);

  const tags = useMemo(() => {
    const uniqueTags = Array.from(new Set(t.caseStudies.flatMap((item) => item.tags)));
    return [t.caseStudiesPage.allFilter, ...uniqueTags];
  }, [t.caseStudies, t.caseStudiesPage.allFilter]);
  const normalizedTag = tags.includes(activeTag) ? activeTag : t.caseStudiesPage.allFilter;

  const filtered = useMemo(() => {
    if (normalizedTag === t.caseStudiesPage.allFilter) return t.caseStudies;
    return t.caseStudies.filter((item) => item.tags.includes(normalizedTag));
  }, [normalizedTag, t.caseStudies, t.caseStudiesPage.allFilter]);

  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 pb-16">
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h1 className="font-display text-4xl text-text">{t.caseStudiesPage.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">{t.caseStudiesPage.subtitle}</p>
      </section>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${
              normalizedTag === tag ? "border-brand bg-brand/10 text-brand" : "border-edge text-muted"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <CaseStudyCard key={item.slug} item={item} viewLabel={t.common.viewDetails} workflowPreviewLabel={workflowPreviewLabel} />
        ))}
      </section>
    </div>
  );
}
