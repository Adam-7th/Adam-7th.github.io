"use client";

import { useEffect, useMemo, useState } from "react";

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialCarousel({ items }: { items: TestimonialItem[] }) {
  const [active, setActive] = useState(0);
  const safeItems = useMemo(() => items.filter((item) => item.quote), [items]);

  useEffect(() => {
    if (safeItems.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % safeItems.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [safeItems.length]);

  if (safeItems.length === 0) return null;

  const current = safeItems[active];

  return (
    <section className="rounded-3xl border border-edge bg-panel/80 p-6 md:p-8">
      <blockquote className="text-lg leading-relaxed text-text md:text-xl">
        &ldquo;{current.quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-text">{current.author}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{current.role}</p>
        </div>
        <div className="flex items-center gap-2">
          {safeItems.map((item, index) => (
            <button
              key={`${item.author}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition duration-200 ${
                index === active ? "w-8 bg-brand" : "w-2.5 bg-edge hover:bg-muted"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
