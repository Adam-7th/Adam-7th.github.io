import type { Lang } from "@/lib/i18n";

const labels = {
  en: {
    title: "Problems we solve",
    subtitle: "Operational bottlenecks we remove with automation-first systems.",
    items: [
      {
        title: "Slow lead response",
        body: "Leads submit forms but follow-up is delayed. We automate routing, qualification, and instant team alerts.",
      },
      {
        title: "Manual process overload",
        body: "Teams spend hours on repetitive handoffs across tools. We connect apps and automate high-friction operations.",
      },
      {
        title: "Disconnected business stack",
        body: "Website, CRM, messaging, and reporting are fragmented. We build one connected workflow architecture.",
      },
      {
        title: "Unreliable AI adoption",
        body: "AI outputs are inconsistent without controls. We deploy human-in-the-loop AI flows with clear guardrails.",
      },
    ],
  },
  ru: {
    title: "Какие проблемы решаем",
    subtitle: "Операционные узкие места, которые снимаем через automation-first подход.",
    items: [
      {
        title: "Медленный ответ на лиды",
        body: "Лиды приходят, но команда отвечает поздно. Автоматизируем маршрутизацию, квалификацию и мгновенные уведомления.",
      },
      {
        title: "Ручная перегрузка процессов",
        body: "Команда тратит часы на повторяющиеся действия. Связываем инструменты и автоматизируем ключевые этапы.",
      },
      {
        title: "Разрозненный стек",
        body: "Сайт, CRM, мессенджеры и отчеты не связаны. Строим единую архитектуру workflow.",
      },
      {
        title: "Ненадежное внедрение AI",
        body: "AI без контроля дает нестабильный результат. Добавляем human-in-the-loop и правила безопасности.",
      },
    ],
  },
  ar: {
    title: "المشكلات التي نعالجها",
    subtitle: "نزيل الاختناقات التشغيلية عبر أنظمة أتمتة مترابطة.",
    items: [
      {
        title: "بطء الاستجابة للعملاء المحتملين",
        body: "تصل الطلبات لكن المتابعة تتأخر. نؤتمت التوجيه والتأهيل والتنبيهات الفورية للفريق.",
      },
      {
        title: "حمل يدوي متكرر",
        body: "الفرق تهدر وقتا في عمليات متكررة بين أدوات متعددة. نربط الأدوات ونؤتمت مراحل العمل الأساسية.",
      },
      {
        title: "منظومة أدوات غير متصلة",
        body: "الموقع وCRM والمراسلة والتقارير تعمل بشكل منفصل. نبني بنية عمل موحدة.",
      },
      {
        title: "استخدام AI بدون ضوابط",
        body: "مخرجات AI تصبح غير مستقرة دون تحكم. ننفذ تدفقات AI مع مراجعة بشرية وحواجز أمان.",
      },
    ],
  },
} as const;

export function ProblemsWeSolve({ lang }: { lang: Lang }) {
  const copy = labels[lang];

  return (
    <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8">
      <h2 className="font-display text-3xl text-text">{copy.title}</h2>
      <p className="mt-2 text-sm text-muted">{copy.subtitle}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {copy.items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-edge bg-panel2 p-5 card-hover">
            <h3 className="font-display text-xl text-text">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
