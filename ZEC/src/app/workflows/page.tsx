"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LeadCaptureMini } from "@/app/components/LeadCaptureMini";
import { WorkflowProblemPrimer } from "@/app/components/WorkflowProblemPrimer";
import { WorkflowScenarioFeature } from "@/app/components/WorkflowScenarioFeature";
import { WorkflowShowcase } from "@/app/components/WorkflowShowcase";
import { getWorkflowVariants, resolveWorkflowCategoryFromParams, SLUG_TO_CONTENT_CATEGORY, WORKFLOW_CATEGORY_ORDER } from "@/app/components/workflows/workflowData";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

const flowCategoryTitle = {
  en: "Flow Categories",
  ru: "Категории сценариев",
  ar: "فئات المسارات",
} as const;

export default function WorkflowsPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const isRtl = lang === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variants = getWorkflowVariants(lang);
  const activeCategory = resolveWorkflowCategoryFromParams(searchParams.get("cat"), searchParams.get("wf"));
  const activeVariant = variants[activeCategory];
  const activeCategoryLabel = t.workflowsPage.categories[SLUG_TO_CONTENT_CATEGORY[activeCategory]];
  const flowCategoryLabel = lang === "ru" ? "Категории сценариев" : lang === "ar" ? "فئات المسارات" : flowCategoryTitle.en;
  const defaultWorkflowHref = `/contact?workflow=${encodeURIComponent(t.workflowsPage.categories.leadSales)}#booking`;

  useLocalizedMeta(t.meta.pages.workflows.title, t.meta.pages.workflows.description);

  return (
    <div className={`mx-auto flex w-full max-w-[1100px] flex-col gap-8 pb-16 ${isRtl ? "text-right" : "text-left"}`}>
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h1 className="font-display text-4xl text-text">{t.workflowsPage.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">{t.workflowsPage.subtitle}</p>
        <div className={`mt-6 flex flex-wrap gap-3 ${isRtl ? "justify-end" : "justify-start"}`}>
          <Link href={defaultWorkflowHref} className="rounded-full border border-edge px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand">
            {t.common.requestWorkflow}
          </Link>
          <Link href="/contact#schedule" className="rounded-full bg-brand px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t.nav.bookCall}
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-4 md:p-5">
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted">{flowCategoryLabel}</p>
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_CATEGORY_ORDER.map((category) => {
            const isActive = category === activeCategory;
            const label = t.workflowsPage.categories[SLUG_TO_CONTENT_CATEGORY[category]];
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  const next = new URLSearchParams(searchParams.toString());
                  next.set("cat", category);
                  next.set("wf", variants[category].workflowId);
                  router.replace(`${pathname}?${next.toString()}`, { scroll: false });
                }}
                className={`rounded-2xl border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  isActive
                    ? "border-brand bg-brand/10 text-brand shadow-[0_8px_22px_-18px_hsl(var(--accent)/0.7)]"
                    : "border-edge bg-panel2 text-muted hover:border-brand/45 hover:text-text"
                }`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <WorkflowProblemPrimer lang={lang} category={activeCategory} />
      <WorkflowShowcase lang={lang} copy={t} workflows={t.workflows} syncUrl={true} showCategoryTabs={false} />
      <WorkflowScenarioFeature lang={lang} category={activeCategory} />
      <LeadCaptureMini copy={t} lang={lang} activeCategory={activeCategory} />

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <h2 className="font-display text-2xl text-text">{activeVariant.title}</h2>
        <p className="mt-2 text-sm text-muted">{activeVariant.outcome}</p>
        <Link
          href={`/contact?workflow=${encodeURIComponent(activeCategoryLabel)}#booking`}
          className="mt-4 inline-flex rounded-full bg-brand px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          {t.common.requestWorkflow}
        </Link>
      </section>
    </div>
  );
}
