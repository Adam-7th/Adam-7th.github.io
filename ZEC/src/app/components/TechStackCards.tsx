import Image from "next/image";
import type { Lang } from "@/lib/i18n";

type TechCard = {
  name: string;
  body: Record<Lang, string>;
  logo?: string;
};

const cards: TechCard[] = [
  {
    name: "n8n",
    body: {
      en: "Workflow orchestration and advanced branching logic.",
      ru: "Оркестрация workflow и сложная ветвящаяся логика.",
      ar: "تنسيق سير العمل وبناء منطق تفريعي متقدم.",
    },
    logo: "/logos/n8n.svg",
  },
  {
    name: "OpenAI",
    body: {
      en: "AI classification, summarization, drafting, and decision support.",
      ru: "AI-классификация, суммаризация, черновики и поддержка решений.",
      ar: "تصنيف AI والتلخيص وإنشاء المسودات ودعم القرار.",
    },
    logo: "/logos/openai.svg",
  },
  {
    name: "APIs + Webhooks",
    body: {
      en: "Real-time data movement between your business tools.",
      ru: "Передача данных в реальном времени между системами.",
      ar: "نقل البيانات لحظيا بين أدوات عملك.",
    },
    logo: "/logos/webhooks.svg",
  },
  {
    name: "CRM Integrations",
    body: {
      en: "HubSpot and custom CRM sync for clean lead routing.",
      ru: "Синхронизация с CRM для чистой маршрутизации лидов.",
      ar: "تكامل CRM لضمان توجيه واضح ودقيق للعملاء المحتملين.",
    },
    logo: "/logos/hubspot.svg",
  },
  {
    name: "Messaging Automation",
    body: {
      en: "Telegram, Slack, and WhatsApp alerts and conversation flows.",
      ru: "Уведомления и коммуникации через Telegram, Slack и WhatsApp.",
      ar: "تنبيهات وتدفقات محادثة عبر Telegram وSlack وWhatsApp.",
    },
    logo: "/logos/telegram.svg",
  },
  {
    name: "Data + Reporting",
    body: {
      en: "Google Sheets and analytics loops for KPI visibility.",
      ru: "Google Sheets и аналитические циклы для KPI-контроля.",
      ar: "Google Sheets وحلقات تحليلية لمتابعة مؤشرات الأداء.",
    },
    logo: "/logos/google-sheets.svg",
  },
];

const labels = {
  en: {
    title: "Technology stack",
    subtitle: "Tools we use to build secure, scalable automation systems.",
  },
  ru: {
    title: "Технологический стек",
    subtitle: "Инструменты, на которых строим надежные и масштабируемые automation-системы.",
  },
  ar: {
    title: "المنظومة التقنية",
    subtitle: "الأدوات التي نعتمد عليها لبناء أنظمة أتمتة موثوقة وقابلة للتوسع.",
  },
} as const;

export function TechStackCards({ lang }: { lang: Lang }) {
  const t = labels[lang];

  return (
    <section className="rounded-3xl border border-edge bg-panel p-6 md:p-8">
      <h2 className="font-display text-3xl text-text">{t.title}</h2>
      <p className="mt-2 text-sm text-muted">{t.subtitle}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.name} className="group rounded-2xl border border-edge bg-panel2 p-5 card-hover">
            <div className="flex items-center gap-2">
              {card.logo ? (
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-white/80">
                  <Image src={card.logo} alt={card.name} width={18} height={18} className="h-4.5 w-4.5 object-contain" />
                </span>
              ) : null}
              <h3 className="font-display text-lg text-text">{card.name}</h3>
            </div>
            <p className="mt-3 text-sm text-muted">{card.body[lang]}</p>
            <div className="mt-4 h-1.5 rounded-full bg-edge">
              <div className="h-full w-2/3 rounded-full bg-brand/70 transition-all duration-300 group-hover:w-full" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
