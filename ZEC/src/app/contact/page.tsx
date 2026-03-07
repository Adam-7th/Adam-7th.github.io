"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClientOnboardingForm } from "@/app/components/ClientOnboardingForm";
import { ContactRequestForm } from "@/app/components/ContactRequestForm";
import { PUBLIC_CALENDLY_URL, PUBLIC_CONTACT_MAILTO, PUBLIC_TELEGRAM_URL, PUBLIC_WHATSAPP_URL } from "@/lib/contactConfig";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

const CONTACT_UI_BY_LANG = {
  en: {
    selectedWorkflow: "Selected workflow",
    requested: "Request type",
    outline: "Workflow outline",
    implementation: "Implementation booking",
    unknown: "General request",
    heroTitle: "Contact ZEC AI Automation Agency",
    primaryCta: "Book free automation audit",
    secondaryCta: "See how it works",
    scheduleTitle: "Schedule a call",
    scheduleBody: "Prefer a quick conversation? Book a free 15-minute automation audit.",
    scheduleEvent: "Free automation audit (15 min)",
    quickTitle: "Quick contact",
    quickBody: "Reach us directly or scan the QR codes from mobile.",
    cardLabel: "Contact ZEC AI Automation Agency",
    openLink: "Open link",
    calendlyTitle: "Calendly scheduling widget",
  },
  ru: {
    selectedWorkflow: "Выбранный сценарий",
    requested: "Тип запроса",
    outline: "План сценария",
    implementation: "Бронирование внедрения",
    unknown: "Общий запрос",
    heroTitle: "Связаться с ZEC AI Automation Agency",
    primaryCta: "Записаться на бесплатный аудит",
    secondaryCta: "Посмотреть процесс",
    scheduleTitle: "Запланировать звонок",
    scheduleBody: "Предпочитаете короткий звонок? Забронируйте бесплатный 15-минутный аудит автоматизации.",
    scheduleEvent: "Бесплатный аудит автоматизации (15 мин)",
    quickTitle: "Быстрый контакт",
    quickBody: "Свяжитесь с нами напрямую или отсканируйте QR-коды с телефона.",
    cardLabel: "Контакты ZEC AI Automation Agency",
    openLink: "Открыть ссылку",
    calendlyTitle: "Виджет бронирования Calendly",
  },
  ar: {
    selectedWorkflow: "سير العمل المختار",
    requested: "نوع الطلب",
    outline: "مخطط سير العمل",
    implementation: "حجز التنفيذ",
    unknown: "طلب عام",
    heroTitle: "تواصل مع ZEC AI Automation Agency",
    primaryCta: "احجز تدقيق أتمتة مجاني",
    secondaryCta: "شاهد آلية العمل",
    scheduleTitle: "احجز مكالمة",
    scheduleBody: "تفضل مكالمة سريعة؟ احجز تدقيق أتمتة مجاني لمدة 15 دقيقة.",
    scheduleEvent: "تدقيق أتمتة مجاني (15 دقيقة)",
    quickTitle: "تواصل سريع",
    quickBody: "تواصل معنا مباشرة أو امسح رموز QR من الهاتف.",
    cardLabel: "التواصل مع ZEC AI Automation Agency",
    openLink: "افتح الرابط",
    calendlyTitle: "أداة حجز Calendly",
  },
} as const;

export default function ContactPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const ui = CONTACT_UI_BY_LANG[lang];
  const searchParams = useSearchParams();
  const workflow = searchParams.get("workflow")?.trim() ?? "";
  const request = searchParams.get("request")?.trim().toLowerCase() ?? "";

  useLocalizedMeta(t.meta.pages.contact.title, t.meta.pages.contact.description);

  const requestLabel =
    request === "outline"
      ? ui.outline
      : request === "booking"
        ? ui.implementation
        : ui.unknown;

  const calendlyPreviewUrl = `${PUBLIC_CALENDLY_URL}?hide_gdpr_banner=1&hide_event_type_details=1`;
  const socialItems = [
    { label: "WhatsApp", href: PUBLIC_WHATSAPP_URL, logoSrc: "/logos/whatsapp.svg" },
    { label: "Telegram", href: PUBLIC_TELEGRAM_URL, logoSrc: "/logos/telegram.svg" },
    { label: "Email", href: PUBLIC_CONTACT_MAILTO, logoSrc: "/logos/gmail.svg" },
  ];
  const getQrUrl = (href: string) => `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(href)}`;

  return (
    <div className={`mx-auto flex w-full max-w-[1100px] flex-col gap-8 pb-16 ${lang === "ar" ? "text-right" : "text-left"}`}>
      <section className="rounded-3xl border border-edge bg-panel p-8">
        <h1 className="font-display text-4xl text-text">{ui.heroTitle}</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">{t.contactPage.subtitle}</p>
        <p className="mt-1 text-xs text-muted">{t.contactPage.responseNote}</p>

        <div className={`mt-6 flex flex-wrap gap-3 ${lang === "ar" ? "justify-end" : "justify-start"}`}>
          <Link
            href={PUBLIC_CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            {ui.primaryCta}
          </Link>
          <Link href="/workflows" className="rounded-full border border-edge px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text hover:border-brand">
            {ui.secondaryCta}
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-edge bg-panel p-6">
        <h2 className="font-display text-2xl text-text">{ui.quickTitle}</h2>
        <p className="mt-2 text-sm text-muted">{ui.quickBody}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{ui.cardLabel}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {socialItems.map((item) => (
            <article key={item.label} className="rounded-2xl border border-edge bg-panel2 p-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-edge bg-panel">
                  <Image src={item.logoSrc} alt={item.label} width={16} height={16} />
                </span>
                <h3 className="text-sm font-semibold text-text">{item.label}</h3>
              </div>
              <a
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="inline-flex rounded-full border border-edge px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-text hover:border-brand"
              >
                {ui.openLink}
              </a>
              <div className="mt-3 overflow-hidden rounded-xl border border-edge bg-white p-2">
                <Image src={getQrUrl(item.href)} alt={`${item.label} QR code`} width={220} height={220} className="h-auto w-full" unoptimized />
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactRequestForm lang={lang} />

      <section id="booking" className="scroll-mt-24 rounded-3xl border border-edge bg-panel p-6">
        <h2 className="font-display text-2xl text-text">{ui.scheduleTitle}</h2>
        <p className="mt-2 text-sm text-muted">{ui.scheduleBody}</p>
        <p className="mt-1 text-xs text-muted">{ui.scheduleEvent}</p>

        {workflow ? (
          <div className="mt-4 rounded-2xl border border-edge bg-panel2 p-4 text-sm text-muted">
            <p>
              <span className="font-semibold text-text">{ui.selectedWorkflow}:</span> {workflow}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-text">{ui.requested}:</span> {requestLabel}
            </p>
          </div>
        ) : null}

        <div className="mt-4 overflow-hidden rounded-2xl border border-edge bg-panel2">
          <iframe
            title={ui.calendlyTitle}
            src={calendlyPreviewUrl}
            className="h-[620px] w-full bg-white sm:h-[700px] lg:h-[760px]"
            loading="lazy"
          />
        </div>
        <a
          href={PUBLIC_CALENDLY_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex rounded-full border border-edge px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text hover:border-brand sm:hidden"
        >
          {ui.openLink}
        </a>
      </section>

      <ClientOnboardingForm lang={lang} />
    </div>
  );
}
