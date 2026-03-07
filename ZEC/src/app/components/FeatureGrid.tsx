"use client";

type FeatureItem = {
  title: string;
  body: string;
  tag: string;
};

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-3xl border border-edge bg-panel p-6 card-hover">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{item.tag}</p>
          <h3 className="mt-3 font-display text-xl text-text">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
