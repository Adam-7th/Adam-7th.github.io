import Link from "next/link";
import type { Lang } from "@/lib/i18n";

const copy = {
  en: {
    title: "Get your free automation audit",
    body: "We review your current workflows, tool stack, and lead flow, then provide a practical automation roadmap.",
    points: ["Workflow bottleneck map", "Integration opportunity list", "Quick-win implementation plan"],
    cta: "Book Free Automation Audit",
    secondary: "See How It Works",
  },
  ru: {
    title: "Получите бесплатный automation-аудит",
    body: "Разберем текущие процессы, стек инструментов и лид-поток, затем дадим практичный roadmap внедрения.",
    points: ["Карта узких мест workflow", "Список интеграционных возможностей", "План быстрых улучшений"],
    cta: "Забронировать бесплатный аудит",
    secondary: "Как это работает",
  },
  ar: {
    title: "احصل على تدقيق أتمتة مجاني",
    body: "نراجع سير عملك الحالي ومنظومة الأدوات وتدفق العملاء المحتملين، ثم نقدم خارطة تنفيذ عملية.",
    points: ["خريطة الاختناقات التشغيلية", "فرص التكامل والأتمتة", "خطة تنفيذ سريعة ذات أثر مباشر"],
    cta: "احجز تدقيق أتمتة مجاني",
    secondary: "كيف يعمل النظام",
  },
} as const;

export function AutomationAuditCTA({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-edge bg-panel p-6 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,hsl(var(--accent)/0.14),transparent_48%),radial-gradient(circle_at_88%_12%,hsl(var(--accent)/0.1),transparent_44%)]" />
      <div className="relative">
        <h2 className="font-display text-3xl text-text md:text-4xl">{t.title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">{t.body}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {t.points.map((point) => (
            <p key={point} className="rounded-2xl border border-edge bg-panel2 px-4 py-3 text-sm text-text">
              {point}
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact#schedule" className="rounded-full bg-brand px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white">
            {t.cta}
          </Link>
          <Link href="/workflows" className="rounded-full border border-edge px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-text hover:border-brand">
            {t.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
