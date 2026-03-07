type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="group overflow-hidden rounded-2xl border border-edge bg-panel">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-medium text-text md:text-base">{item.question}</span>
            <span aria-hidden="true" className="text-lg text-muted transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="px-5 pb-4">
            <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
