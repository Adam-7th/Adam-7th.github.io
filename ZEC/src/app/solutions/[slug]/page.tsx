"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FAQAccordion } from "@/app/components/FAQAccordion";
import { WorkflowShowcase } from "@/app/components/WorkflowShowcase";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

const workflowByService: Record<string, string> = {
  "automation-workflows": "lead-capture-crm-telegram",
  "ai-integrations": "support-ai-human-approval",
  "website-conversion": "lead-capture-crm-telegram",
  "crm-lead-systems": "lead-capture-crm-telegram",
  "analytics-reporting": "analytics-alert-loop",
  "ongoing-support": "support-ai-human-approval",
};

export default function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const isRtl = lang === "ar";

  useLocalizedMeta(t.meta.pages.solutionDetail.title, t.meta.pages.solutionDetail.description);

  const service = t.services.find((item) => item.slug === slug) ?? t.services[0];
  const preferredWorkflowId = workflowByService[service.slug] ?? t.workflows[0]?.id;
  const selectedWorkflow = t.workflows.find((workflow) => workflow.id === preferredWorkflowId);

  return (
    <div className={`mx-auto flex w-full max-w-[1100px] flex-col gap-8 pb-16 ${isRtl ? "text-right" : "text-left"}`}>
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h1 className="font-display text-4xl text-text">{service.title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">{service.summary}</p>
        <Link href="/contact#schedule" className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          {t.nav.bookCall}
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-edge bg-panel p-6">
          <h2 className="font-display text-2xl text-text">{t.solutionDetailPage.problemsTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {service.problems.map((problem) => (
              <li key={problem}>- {problem}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-edge bg-panel p-6">
          <h2 className="font-display text-2xl text-text">{t.solutionDetailPage.deliverablesTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable}>- {deliverable}</li>
            ))}
          </ul>
        </article>
      </section>

      <section>
        <h2 className="mb-4 font-display text-3xl text-text">{t.solutionDetailPage.exampleWorkflowTitle}</h2>
        {selectedWorkflow ? <WorkflowShowcase lang={lang} copy={t} workflows={[selectedWorkflow]} compact={true} /> : null}
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <h2 className="font-display text-2xl text-text">{t.solutionDetailPage.toolsTitle}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {service.tools.map((tool) => (
            <span key={tool} className="rounded-full border border-edge bg-panel2 px-3 py-1.5 text-xs text-text">
              {tool}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <h2 className="mb-4 font-display text-2xl text-text">{t.solutionDetailPage.faqTitle}</h2>
        <FAQAccordion items={service.faq} />
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <h2 className="font-display text-2xl text-text">{t.solutionDetailPage.ctaTitle}</h2>
        <Link href="/contact#schedule" className="mt-4 inline-flex rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          {t.nav.getStarted}
        </Link>
      </section>
    </div>
  );
}
