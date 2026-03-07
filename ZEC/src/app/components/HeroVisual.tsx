import type { Lang } from "@/lib/i18n";

const labels = {
  en: {
    dashboard: "Automation Dashboard",
    live: "Live",
    leads: "Leads",
    leadsFlow: "Form to CRM to Telegram",
    support: "Support",
    supportFlow: "Gmail to AI draft to approval",
    active: "Active flow",
    review: "Human review",
    running: "Node connections running",
    triggered: "Webhook triggered",
    updated: "CRM contact updated",
    notified: "Telegram notification sent",
  },
  ru: {
    dashboard: "Automation Dashboard",
    live: "Live",
    leads: "Лиды",
    leadsFlow: "Форма -> CRM -> Telegram",
    support: "Поддержка",
    supportFlow: "Gmail -> AI черновик -> Проверка",
    active: "Активный workflow",
    review: "Ручная проверка",
    running: "Соединения нод активны",
    triggered: "Webhook сработал",
    updated: "Контакт в CRM обновлен",
    notified: "Telegram уведомление отправлено",
  },
  ar: {
    dashboard: "لوحة الأتمتة",
    live: "مباشر",
    leads: "العملاء",
    leadsFlow: "نموذج -> CRM -> Telegram",
    support: "الدعم",
    supportFlow: "Gmail -> مسودة AI -> موافقة",
    active: "مسار نشط",
    review: "مراجعة بشرية",
    running: "اتصال العقد يعمل",
    triggered: "تم تشغيل Webhook",
    updated: "تم تحديث جهة الاتصال في CRM",
    notified: "تم إرسال إشعار Telegram",
  },
} as const;

export function HeroVisual({ lang }: { lang: Lang }) {
  const t = labels[lang];

  return (
    <div className="hero-dashboard-panel relative overflow-hidden rounded-3xl border border-edge bg-panel p-5 soft-glow">
      <div className="section-grid absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative space-y-3">
        <div className="hero-dashboard-card flex items-center justify-between rounded-2xl border border-edge bg-panel2 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{t.dashboard}</p>
          <p className="hero-live-soft rounded-full border border-brand/30 bg-brand/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-brand">{t.live}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <article className="hero-dashboard-card hero-float-a rounded-2xl border border-edge bg-panel2 p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{t.leads}</p>
            <p className="mt-2 text-sm text-text">{t.leadsFlow}</p>
            <span className="mt-2 inline-flex rounded-full bg-brand/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-brand">
              {t.active}
            </span>
          </article>
          <article className="hero-dashboard-card hero-float-b rounded-2xl border border-edge bg-panel2 p-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">{t.support}</p>
            <p className="mt-2 text-sm text-text">{t.supportFlow}</p>
            <span className="mt-2 inline-flex rounded-full bg-brand/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-brand">
              {t.review}
            </span>
          </article>
        </div>

        <div className="hero-dashboard-card rounded-2xl border border-edge bg-panel2 p-4">
          <div className="flex items-center gap-2">
            <span className="demo-dot" />
            <span className="text-sm text-text">{t.running}</span>
          </div>
          <div className="mt-3 space-y-2 text-xs text-muted">
            <p>{t.triggered}</p>
            <p>{t.updated}</p>
            <p>{t.notified}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
