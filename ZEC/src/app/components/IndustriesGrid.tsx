import type { Lang } from "@/lib/i18n";

const copy = {
  en: {
    title: "Industries we help",
    subtitle: "Automation systems tailored to each operating model.",
    items: [
      "Agencies and service businesses",
      "Ecommerce and retail operations",
      "SaaS and product teams",
      "Education and coaching companies",
      "Healthcare and appointment-driven teams",
      "Real estate and high-volume lead funnels",
    ],
  },
  ru: {
    title: "Отрасли, с которыми работаем",
    subtitle: "Automation-системы под разные модели бизнеса.",
    items: [
      "Агентства и сервисные компании",
      "Ecommerce и ритейл",
      "SaaS и продуктовые команды",
      "Образование и консалтинг",
      "Клиники и запись на услуги",
      "Недвижимость и лидогенерация",
    ],
  },
  ar: {
    title: "القطاعات التي نعمل معها",
    subtitle: "أنظمة أتمتة مصممة حسب نموذج التشغيل لكل قطاع.",
    items: [
      "الوكالات وشركات الخدمات",
      "التجارة الإلكترونية والتجزئة",
      "شركات SaaS والمنتجات الرقمية",
      "التعليم والتدريب والاستشارات",
      "القطاع الصحي والمواعيد",
      "العقار وقنوات العملاء المحتملين",
    ],
  },
} as const;

export function IndustriesGrid({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8">
      <h2 className="font-display text-3xl text-text">{t.title}</h2>
      <p className="mt-2 text-sm text-muted">{t.subtitle}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((item) => (
          <article key={item} className="rounded-2xl border border-edge bg-panel2 p-4 text-sm text-text">
            {item}
          </article>
        ))}
      </div>
    </section>
  );
}
