"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import type { SiteCopy, WorkflowItem } from "@/lib/siteContent";
import { WorkflowCanvas } from "./workflows/WorkflowCanvas";
import {
  DEFAULT_WORKFLOW_CATEGORY,
  WORKFLOW_CATEGORY_ORDER,
  getWorkflowVariants,
  resolveWorkflowCategoryFromParams,
  SLUG_TO_CONTENT_CATEGORY,
  type WorkflowCategorySlug,
} from "./workflows/workflowData";

const TOOL_LOGOS: Record<string, string> = {
  Airtable: "/logos/airtable.svg",
  Facebook: "/logos/facebook.svg",
  Gmail: "/logos/gmail.svg",
  HubSpot: "/logos/hubspot.svg",
  LinkedIn: "/logos/linkedin.svg",
  n8n: "/logos/n8n.svg",
  OpenAI: "/logos/openai.svg",
  Schedule: "/logos/schedule.svg",
  Slack: "/logos/slack.svg",
  Telegram: "/logos/telegram.svg",
  Webhooks: "/logos/webhooks.svg",
  "Google Sheets": "/logos/google-sheets.svg",
  "X/Twitter": "/logos/x.svg",
};

const sectionLabels = {
  en: {
    sectionTitle: "Automation workflows",
    sectionSubtitle: "Choose a category and preview the exact workflow blueprint.",
    workflow: "Workflow",
    trigger: "Trigger",
    steps: "Steps",
    outcome: "Outcome",
    request: "Request this workflow",
  },
  ru: {
    sectionTitle: "Automation workflows",
    sectionSubtitle: "Выберите категорию и просмотрите точный blueprint workflow.",
    workflow: "Workflow",
    trigger: "Триггер",
    steps: "Шаги",
    outcome: "Результат",
    request: "Запросить этот workflow",
  },
  ar: {
    sectionTitle: "مسارات الأتمتة",
    sectionSubtitle: "اختر الفئة وشاهد مخطط workflow الكامل.",
    workflow: "مسار",
    trigger: "المشغل",
    steps: "الخطوات",
    outcome: "النتيجة",
    request: "اطلب هذا المسار",
  },
} as const;

type WorkflowShowcaseProps = {
  lang: Lang;
  copy: SiteCopy;
  workflows: WorkflowItem[];
  compact?: boolean;
  syncUrl?: boolean;
  showCategoryTabs?: boolean;
};

export function WorkflowShowcase({ lang, copy, workflows, compact = false, syncUrl = false, showCategoryTabs = true }: WorkflowShowcaseProps) {
  const isRtl = lang === "ar";
  const labels = sectionLabels[lang];
  const variants = useMemo(() => getWorkflowVariants(lang), [lang]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availableCategories = useMemo(() => {
    if (!workflows.length) return WORKFLOW_CATEGORY_ORDER;
    return WORKFLOW_CATEGORY_ORDER;
  }, [workflows.length]);

  const resolvedFromParams = useMemo(() => {
    if (!syncUrl) return DEFAULT_WORKFLOW_CATEGORY;
    return resolveWorkflowCategoryFromParams(searchParams.get("cat"), searchParams.get("wf"));
  }, [searchParams, syncUrl]);

  const [localCategory, setLocalCategory] = useState<WorkflowCategorySlug>(DEFAULT_WORKFLOW_CATEGORY);
  const activeCategory = syncUrl ? resolvedFromParams : localCategory;

  const active = variants[activeCategory] ?? variants[DEFAULT_WORKFLOW_CATEGORY];
  const showTabs = showCategoryTabs && !compact && availableCategories.length > 1;

  useEffect(() => {
    if (!syncUrl) return;
    const cat = searchParams.get("cat");
    const wf = searchParams.get("wf");
    if (cat === active.category && wf === active.workflowId) return;

    const next = new URLSearchParams(searchParams.toString());
    next.set("cat", active.category);
    next.set("wf", active.workflowId);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [active.category, active.workflowId, pathname, router, searchParams, syncUrl]);

  const onCategoryChange = useCallback(
    (category: WorkflowCategorySlug) => {
      const focusPrimer = () => {
        const primer = document.getElementById("workflow-problem-primer");
        if (primer) {
          primer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      if (!syncUrl) {
        setLocalCategory(category);
        requestAnimationFrame(focusPrimer);
        return;
      }

      const next = new URLSearchParams(searchParams.toString());
      next.set("cat", category);
      next.set("wf", variants[category].workflowId);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      requestAnimationFrame(focusPrimer);
    },
    [pathname, router, searchParams, syncUrl, variants],
  );

  const outcomeSplit = active.outcome.indexOf(".");
  const outcomeLead = outcomeSplit >= 0 ? active.outcome.slice(0, outcomeSplit + 1) : active.outcome;
  const outcomeTail = outcomeSplit >= 0 ? active.outcome.slice(outcomeSplit + 1).trim() : "";

  return (
    <section id="workflow-diagram" className={`rounded-[2rem] border border-edge bg-panel p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}>
      {!compact && (
        <div key={`title-${active.workflowId}`} className="animate-[workflow-swap_220ms_ease]">
          <h2 className="title-chroma font-display text-3xl text-text md:text-4xl">{labels.sectionTitle}</h2>
          <p className="copy-color-flow mt-2 max-w-3xl text-sm text-muted">{labels.sectionSubtitle}</p>
        </div>
      )}

      <div className="mt-6">
        {showTabs && (
          <div className="mb-4 overflow-x-auto">
            <div className={`flex min-w-max gap-2 ${isRtl ? "ms-auto" : ""}`}>
              {availableCategories.map((category) => {
                const isActive = category === active.category;
                const contentCategory = SLUG_TO_CONTENT_CATEGORY[category];
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onCategoryChange(category)}
                    className={`rounded-2xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                      isActive
                        ? "border-brand bg-brand/10 text-brand shadow-[0_8px_22px_-18px_hsl(var(--accent)/0.7)]"
                        : "border-edge bg-panel2 text-muted hover:border-brand/45 hover:text-text"
                    }`}
                  >
                    {copy.workflowsPage.categories[contentCategory]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div key={`diagram-${active.workflowId}`} className="animate-[workflow-swap_220ms_ease]">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-brand/35 bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
              {labels.workflow} {active.workflowId}
            </span>
            <h3 className="title-chroma font-display text-2xl text-text md:text-3xl">{active.title}</h3>
          </div>
          <p className="copy-color-flow mb-5 text-sm text-muted">{active.subtitle}</p>

          <WorkflowCanvas lang={lang} variant={active} />
        </div>
      </div>

      <div key={`details-${active.workflowId}`} className="mt-6 animate-[workflow-swap_220ms_ease]">
        <div className="grid gap-4 md:auto-rows-fr md:grid-cols-3">
          <article className="h-full rounded-2xl border border-edge bg-panel2 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">{labels.trigger}</p>
            <p className="mt-3 text-[15px] leading-7 text-text">{active.trigger}</p>
          </article>
          <article className="h-full rounded-2xl border border-edge bg-panel2 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">{labels.steps}</p>
            <ul className="mt-3 list-disc space-y-1.5 ps-4 text-sm leading-6 text-muted marker:text-brand">
              {active.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
          <article className="h-full rounded-2xl border border-edge bg-panel2 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-[10px] uppercase tracking-[0.24em] text-muted">{labels.outcome}</p>
            <p className="mt-3 text-[15px] leading-7 text-text">
              <span className="font-semibold text-text">{outcomeLead}</span>
              {outcomeTail ? <span className="text-muted"> {outcomeTail}</span> : null}
            </p>
          </article>
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap gap-2">
            {active.tools.map((tool) => {
              const logo = TOOL_LOGOS[tool];
              return (
                <span
                  key={tool}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-edge bg-panel2 px-3 text-xs text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-brand/55 hover:shadow-[0_0_0_1px_hsl(var(--accent)/0.25),0_8px_20px_-16px_hsl(var(--accent)/0.45)]"
                >
                  {logo ? (
                    <span className="media-zoom-shell inline-flex h-4 w-4 items-center justify-center overflow-hidden rounded"><Image src={logo} alt={tool} width={14} height={14} className="media-zoom h-3.5 w-3.5 object-contain" /></span>
                  ) : (
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-[9px] font-semibold text-brand">•</span>
                  )}
                  {tool}
                </span>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/contact?workflow=${encodeURIComponent(copy.workflowsPage.categories[active.contentCategory])}#booking`}
              className="inline-flex rounded-full bg-brand px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
            >
              {labels.request}
            </Link>
            {!compact ? (
              <Link
                href={`/contact?workflow=${encodeURIComponent(copy.workflowsPage.categories[active.contentCategory])}&request=outline#booking`}
                className="inline-flex rounded-full border border-edge px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-text hover:border-brand"
              >
                {copy.common.downloadWorkflowOutline}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
