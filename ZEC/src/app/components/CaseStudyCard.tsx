import Link from "next/link";
import type { CaseStudyItem } from "@/lib/siteContent";

export function CaseStudyCard({
  item,
  viewLabel,
  workflowPreviewLabel = "Workflow Preview",
}: {
  item: CaseStudyItem;
  viewLabel: string;
  workflowPreviewLabel?: string;
}) {
  return (
    <article className="rounded-3xl border border-edge bg-panel p-6 card-hover" id={item.slug}>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-edge px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-4 font-display text-xl text-text">{item.title}</h3>
      <p className="mt-2 text-sm text-text">{item.outcomes[0]}</p>
      <p className="mt-2 text-sm text-muted">{item.problem}</p>
      <p className="mt-2 text-sm text-muted">{item.approach}</p>

      <div className="mt-3 grid gap-2">
        {item.metrics.slice(0, 2).map((metric) => (
          <div key={`${item.slug}-${metric.label}`} className="rounded-xl border border-edge bg-panel2 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{metric.label}</p>
            <p className="mt-1 text-xs text-text">
              {metric.before} {"->"} {metric.after} <span className="text-brand">({metric.impact})</span>
            </p>
          </div>
        ))}
      </div>

      <details className="group mt-4 overflow-hidden rounded-2xl border border-edge bg-panel2">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left [&::-webkit-details-marker]:hidden">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text">{workflowPreviewLabel}</span>
          <span aria-hidden="true" className="text-lg text-muted transition-transform duration-200 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="px-4 pb-4">
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {item.deliverables.slice(0, 4).map((deliverable) => (
              <span key={`${item.slug}-${deliverable}`} className="rounded-lg border border-edge bg-panel px-2 py-1 text-[11px] text-muted">
                {deliverable}
              </span>
            ))}
          </div>
        </div>
      </details>

      <Link
        href={`/case-studies/${item.slug}`}
        className="mt-5 inline-flex rounded-full border border-edge px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand"
      >
        {viewLabel}
      </Link>
    </article>
  );
}
