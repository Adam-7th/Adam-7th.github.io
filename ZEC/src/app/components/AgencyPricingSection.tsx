"use client";

import Link from "next/link";
import { useMemo, type ReactElement } from "react";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/lib/i18n";
import { formatPrice, getPlanAmount, type PlanId } from "@/lib/pricing";
import {
  CURRENCY_LABELS,
  CURRENCY_OPTIONS_BY_LANG,
  SITE_CONTENT,
  type CurrencyCode,
} from "@/lib/siteContent";
import { decodeMojibakeDeep } from "@/lib/text";

type MainPlanId = Exclude<PlanId, "entry">;

type PlanCard = {
  id: MainPlanId;
  name: string;
  description: string;
  bullets: string[];
  setupPrice: string;
  monthlySupport: string;
  isPopular: boolean;
};

type PaymentProvider = {
  id: string;
  name: string;
  Logo: () => ReactElement;
};

const PLAN_IDS: MainPlanId[] = ["launch", "growth", "scale"];

const MONTHLY_SUPPORT_MULTIPLIERS: Record<MainPlanId, [number, number]> = {
  launch: [0.14, 0.22],
  growth: [0.12, 0.2],
  scale: [0.1, 0.16],
};

function StripeLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="10" fill="#635BFF" />
      <path d="M23.3 13.8H16a2.8 2.8 0 0 0 0 5.6h4.1a1.2 1.2 0 1 1 0 2.4H12.7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ChapaLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="10" fill="#17A34A" />
      <circle cx="18" cy="18" r="7.5" fill="none" stroke="#fff" strokeWidth="2.5" />
      <path d="M20.8 13.5a6 6 0 0 0-8 8" fill="none" stroke="#17A34A" strokeWidth="2.6" />
    </svg>
  );
}

function MpesaLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="10" fill="#0B9F4A" />
      <path d="M10.2 24.3v-12h2.2l5.6 6.8 5.6-6.8h2.2v12h-2.6v-7.7l-4.8 5.7h-.8l-4.8-5.7v7.7z" fill="#fff" />
    </svg>
  );
}

function PaypalLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="10" fill="#003087" />
      <path d="M13 25V11.7h5.3c3 0 5.1 1.6 5.1 4.3 0 2.9-2.2 4.7-5.4 4.7h-2.5V25z" fill="#fff" />
      <path d="M16.5 25V14.5h4.3c2.5 0 4 1.3 4 3.3 0 2.2-1.7 3.7-4.2 3.7h-2v3.5z" fill="#25A0FF" />
    </svg>
  );
}

function VisaLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="10" fill="#1A1F71" />
      <path d="M9.8 23.9 13 12.1h3l-3.2 11.8zm5.7-11.8h3l2.3 7.7 1.4-7.7h2.8l-2.4 11.8h-3l-2.2-7.4-1.5 7.4h-2.8z" fill="#fff" />
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <rect x="2" y="2" width="32" height="32" rx="10" fill="#111827" />
      <circle cx="15.4" cy="18" r="6.8" fill="#EB001B" />
      <circle cx="20.6" cy="18" r="6.8" fill="#F79E1B" />
      <rect x="15.4" y="11.2" width="5.2" height="13.6" fill="#FF5F00" />
    </svg>
  );
}

function SberbankLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <circle cx="18" cy="18" r="16" fill="#13A538" />
      <path d="M26 13a12 12 0 0 0-16-3" fill="none" stroke="#1F8CFA" strokeWidth="2.2" strokeLinecap="round" />
      <path d="m10.5 18.3 4.6 4.7 10.4-10.2" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TBankLogo() {
  return (
    <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
      <path d="M18 2.5 30.5 8v10.8c0 7.5-6.4 13.3-12.5 14.8C11.9 32 5.5 26.3 5.5 18.8V8z" fill="#F6C933" />
      <path d="M13 11h10v3h-3.4v11h-3.2V14H13z" fill="#111827" />
    </svg>
  );
}

const PAYMENT_PROVIDERS: PaymentProvider[] = [
  { id: "sberbank", name: "Sberbank", Logo: SberbankLogo },
  { id: "t-bank", name: "T-Bank", Logo: TBankLogo },
  { id: "stripe", name: "Stripe", Logo: StripeLogo },
  { id: "chapa", name: "Chapa", Logo: ChapaLogo },
  { id: "mpesa", name: "M-Pesa", Logo: MpesaLogo },
  { id: "paypal", name: "PayPal", Logo: PaypalLogo },
  { id: "visa", name: "Visa", Logo: VisaLogo },
  { id: "mastercard", name: "Mastercard", Logo: MastercardLogo },
];

const UI_LABELS: Record<
  Lang,
  {
    setup: string;
    monthlySupport: string;
    from: string;
    viewFullPricing: string;
    fullBreakdownTitle: string;
    fullBreakdownBody: string;
    bookAudit: string;
    comparisonNote: string;
    detectedCountry: string;
    paymentMethods: string;
    paymentMethodsSubtitle: string;
    paymentRegion: string;
    paymentRegionRussia: string;
    paymentRegionInternational: string;
    paymentProvidersList: string;
    detectionUnavailable: string;
    chooseRegion: string;
    paymentSupportRussia: string;
    paymentSupportInternational: string;
  }
> = {
  en: {
    setup: "Setup",
    monthlySupport: "Monthly support",
    from: "From",
    viewFullPricing: "View full pricing",
    fullBreakdownTitle: "Need the full pricing breakdown?",
    fullBreakdownBody: "See plan comparison, pricing FAQ, and complete scope notes on the full pricing page.",
    bookAudit: "Book free audit",
    comparisonNote: "All prices are localized instantly when you switch language or currency.",
    detectedCountry: "Detected country",
    paymentMethods: "Payment Methods",
    paymentMethodsSubtitle: "Available providers are localized by country for safer routing.",
    paymentRegion: "Payment region",
    paymentRegionRussia: "Russia",
    paymentRegionInternational: "International",
    paymentProvidersList: "Available payment providers",
    detectionUnavailable: "Region detection is unavailable. Showing international methods by default.",
    chooseRegion: "Choose payment region",
    paymentSupportRussia: "For Russia users: Sberbank and T-Bank only.",
    paymentSupportInternational: "For international users: Stripe, Chapa, M-Pesa, PayPal, Visa, and Mastercard.",
  },
  ru: {
    setup: "Запуск",
    monthlySupport: "Ежемесячная поддержка",
    from: "От",
    viewFullPricing: "Полные цены",
    fullBreakdownTitle: "Нужна полная структура цен?",
    fullBreakdownBody: "Смотрите сравнение планов, FAQ по ценам и полные примечания по объему на странице цен.",
    bookAudit: "Записаться на аудит",
    comparisonNote: "Цены локализуются сразу при смене языка или валюты.",
    detectedCountry: "Определенная страна",
    paymentMethods: "Способы оплаты",
    paymentMethodsSubtitle: "Доступные провайдеры автоматически выбираются по стране.",
    paymentRegion: "Платежный регион",
    paymentRegionRussia: "Россия",
    paymentRegionInternational: "Международный",
    paymentProvidersList: "Доступные платежные провайдеры",
    detectionUnavailable: "Регион не определен. По умолчанию показываем международные способы.",
    chooseRegion: "Выберите платежный регион",
    paymentSupportRussia: "Для пользователей из России: только Sberbank и T-Bank.",
    paymentSupportInternational: "Для международных пользователей: Stripe, Chapa, M-Pesa, PayPal, Visa и Mastercard.",
  },
  ar: {
    setup: "إعداد",
    monthlySupport: "دعم شهري",
    from: "ابتداء من",
    viewFullPricing: "عرض الأسعار الكاملة",
    fullBreakdownTitle: "تحتاج تفاصيل الأسعار الكاملة؟",
    fullBreakdownBody: "اعرض مقارنة الخطط وأسئلة الأسعار الشائعة وملاحظات النطاق الكاملة في صفحة الأسعار.",
    bookAudit: "احجز تدقيقا مجانيا",
    comparisonNote: "يتم تحديث الأسعار مباشرة عند تغيير اللغة أو العملة.",
    detectedCountry: "الدولة المكتشفة",
    paymentMethods: "طرق الدفع",
    paymentMethodsSubtitle: "يتم اختيار مزودي الدفع تلقائيا حسب الدولة.",
    paymentRegion: "منطقة الدفع",
    paymentRegionRussia: "روسيا",
    paymentRegionInternational: "دولي",
    paymentProvidersList: "مزودو الدفع المتاحون",
    detectionUnavailable: "تعذر تحديد المنطقة. يتم عرض طرق الدفع الدولية افتراضيا.",
    chooseRegion: "اختر منطقة الدفع",
    paymentSupportRussia: "لمستخدمي روسيا: Sberbank وT-Bank فقط.",
    paymentSupportInternational: "للمستخدمين الدوليين: Stripe وChapa وM-Pesa وPayPal وVisa وMastercard.",
  },
};
const formatRange = ({
  minAmount,
  maxAmount,
  currency,
  lang,
}: {
  minAmount: number;
  maxAmount: number;
  currency: CurrencyCode;
  lang: Lang;
}) => {
  const min = formatPrice(minAmount, currency, lang);
  const max = formatPrice(maxAmount, currency, lang);
  return min === max ? min : `${min} - ${max}`;
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4.5 10.5 3.2 3.1 7.8-7.6" />
    </svg>
  );
}

export function AgencyPricingSection({
  compact = false,
  bookingHref = "/contact#schedule",
  showPaymentMethods = false,
}: {
  compact?: boolean;
  bookingHref?: string;
  showPaymentMethods?: boolean;
} = {}) {
  const { lang, currency, setCurrency } = useLang();
  const t = SITE_CONTENT[lang];
  const ui = decodeMojibakeDeep(UI_LABELS[lang]);
  const currencies = CURRENCY_OPTIONS_BY_LANG[lang];

  const marqueeProviders = useMemo(
    () => [
      ...PAYMENT_PROVIDERS.map((provider) => ({ provider, duplicate: false })),
      ...PAYMENT_PROVIDERS.map((provider) => ({ provider, duplicate: true })),
    ],
    [],
  );

  const plans = useMemo<PlanCard[]>(() => {
    return PLAN_IDS.map((planId, index) => {
      const setupAmount = getPlanAmount(planId, currency);
      const [minFactor, maxFactor] = MONTHLY_SUPPORT_MULTIPLIERS[planId];
      const monthlyMin = Math.max(1, Math.round(setupAmount * minFactor));
      const monthlyMax = Math.max(monthlyMin, Math.round(setupAmount * maxFactor));

      return {
        id: planId,
        name: t.pricing.tierNames[index],
        description: t.pricing.tierDescriptions[index],
        bullets: t.pricing.tierBullets[index],
        setupPrice: formatPrice(setupAmount, currency, lang),
        monthlySupport: formatRange({
          minAmount: monthlyMin,
          maxAmount: monthlyMax,
          currency,
          lang,
        }),
        isPopular: planId === "growth",
      };
    });
  }, [currency, lang, t.pricing.tierBullets, t.pricing.tierDescriptions, t.pricing.tierNames]);

  const starterAmount = getPlanAmount("entry", currency);
  const starterLabel = `${ui.from} ${formatPrice(starterAmount, currency, lang)}`;
  const allPaymentMethodsLabel = "Sberbank, T-Bank, Stripe, Chapa, M-Pesa, PayPal, Visa, Mastercard";

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-edge bg-panel px-5 py-8 md:px-8 md:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[-3rem] h-64 w-64 rounded-full bg-brand/18 blur-3xl [animation:hero-float_7s_ease-in-out_infinite]" />
        <div className="absolute right-[-3rem] top-1/3 h-72 w-72 rounded-full bg-brand/14 blur-3xl [animation:hero-float_8.8s_ease-in-out_infinite] [animation-delay:320ms]" />
        <div className="section-grid absolute inset-0 opacity-25 [animation:particle-drift_20s_linear_infinite]" />
      </div>

      <div className="relative space-y-8">
        <header className="max-w-4xl">
          <p className="inline-flex rounded-full border border-edge bg-panel2 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
            {t.nav.pricing}
          </p>
          <h2 className="mt-3 font-display text-3xl text-text md:text-4xl">{t.pricing.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{t.pricing.subtitle}</p>

          <div className="mt-5 flex flex-wrap items-end gap-4">
            <label className="flex min-w-[180px] flex-col gap-2 text-xs uppercase tracking-[0.18em] text-muted">
              <span>{t.pricing.currencyLabel}</span>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
                className="rounded-xl border border-edge bg-panel2 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-text"
              >
                {currencies.map((item) => (
                  <option key={item} value={item}>
                    {CURRENCY_LABELS[item]}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-xs text-muted">{ui.comparisonNote}</p>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="group relative overflow-hidden rounded-3xl border border-edge bg-panel2/60 p-5 card-hover">
            <div className="relative flex h-full flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">{t.pricing.starterOfferTitle}</span>
              <h3 className="mt-3 font-display text-xl text-text">{t.pricing.starterOfferName}</h3>
              <p className="mt-2 text-sm text-muted">{starterLabel}</p>

              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                {t.pricing.starterOfferBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 rounded-2xl border border-edge bg-panel p-3 text-xs text-muted">{t.pricing.starterOfferDisclaimer}</p>
              <Link
                href={bookingHref}
                className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-edge px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-text hover:border-brand"
              >
                {ui.bookAudit}
              </Link>
            </div>
          </article>

          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`group relative overflow-hidden rounded-3xl border p-5 [animation:hero-in-up_340ms_ease_both] ${
                plan.isPopular ? "border-brand bg-panel soft-glow" : "border-edge bg-panel2/60 card-hover"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_15%_0%,hsl(var(--accent)/0.18),transparent_55%)]" />
              <div className="relative flex h-full flex-col">
                {plan.isPopular ? (
                  <span className="w-fit rounded-full border border-brand/50 bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                    {t.common.mostPopular}
                  </span>
                ) : null}

                <h3 className="mt-3 font-display text-xl text-text">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>

                <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                  {plan.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-2xl border border-edge bg-panel/90 p-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-1 text-xs uppercase tracking-[0.16em] text-muted">
                    <span className="min-w-0 leading-snug">{ui.setup}</span>
                    <span className="text-right font-semibold tracking-[0.08em] text-text">{plan.setupPrice}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.11em] text-muted">
                    <span className="min-w-0 leading-snug">{ui.monthlySupport}</span>
                    <span className="text-right font-semibold tracking-[0.06em] text-text">{plan.monthlySupport}</span>
                  </div>
                </div>

                <Link
                  href={bookingHref}
                  className={`mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-full px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    plan.isPopular ? "bg-brand text-white" : "border border-edge text-text hover:border-brand"
                  }`}
                >
                  {t.nav.bookCall}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {showPaymentMethods ? (
          <article className="rounded-3xl border border-edge bg-panel2/70 p-5 md:p-6" role="region" aria-labelledby="pricing-payment-methods-title">
            <div className="max-w-3xl">
              <h3 id="pricing-payment-methods-title" className="font-display text-2xl text-text">
                {ui.paymentMethods}
              </h3>
              <p className="mt-2 text-sm text-muted">{allPaymentMethodsLabel}</p>
            </div>

            <div className="integrations-marquee-shell relative mt-5 rounded-2xl border border-edge bg-panel/90 py-3">
              <div className="integrations-marquee-track" role="list" aria-label={ui.paymentProvidersList}>
                {marqueeProviders.map(({ provider, duplicate }, index) => (
                  <article
                    key={`${provider.id}-${duplicate ? "dup" : "base"}-${index}`}
                    className="flex min-h-[56px] min-w-[170px] flex-shrink-0 items-center gap-3 rounded-xl border border-edge bg-panel2/85 px-3 py-2"
                    aria-hidden={duplicate}
                    role={duplicate ? undefined : "listitem"}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-panel">
                      <provider.Logo />
                    </span>
                    <span className="text-sm font-semibold text-text">{provider.name}</span>
                  </article>
                ))}
              </div>
            </div>
          </article>
        ) : null}

        {compact ? (
          <article className="rounded-3xl border border-edge bg-panel2/70 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl text-text">{ui.fullBreakdownTitle}</h3>
                <p className="mt-2 text-sm text-muted">{ui.fullBreakdownBody}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/pricing" className="rounded-full border border-edge px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text hover:border-brand">
                  {ui.viewFullPricing}
                </Link>
                <Link href={bookingHref} className="rounded-full bg-brand px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  {ui.bookAudit}
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <>
            <article className="rounded-3xl border border-edge bg-panel2/70 p-5 md:p-6">
              <h3 className="font-display text-2xl text-text">{t.pricing.comparisonTitle}</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-collapse text-sm text-muted">
                  <thead>
                    <tr className="border-b border-edge text-left text-[11px] uppercase tracking-[0.18em]">
                      <th className="px-3 py-2">{t.pricing.comparisonColumns.feature}</th>
                      <th className="px-3 py-2">{t.pricing.comparisonColumns.launch}</th>
                      <th className="px-3 py-2">{t.pricing.comparisonColumns.growth}</th>
                      <th className="px-3 py-2">{t.pricing.comparisonColumns.scale}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.pricing.comparisonRows.map((row) => (
                      <tr key={row.feature} className="border-b border-edge/60 last:border-b-0">
                        <td className="px-3 py-2 text-text">{row.feature}</td>
                        <td className="px-3 py-2">{row.launch}</td>
                        <td className="px-3 py-2">{row.growth}</td>
                        <td className="px-3 py-2">{row.scale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="rounded-3xl border border-edge bg-panel2/70 p-5 md:p-6">
              <h3 className="font-display text-2xl text-text">{t.pricing.faqTitle}</h3>
              <div className="mt-4 space-y-3">
                {t.pricing.faqItems.map((item) => (
                  <details key={item.question} className="group overflow-hidden rounded-2xl border border-edge bg-panel">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                      <span className="text-sm font-semibold text-text">{item.question}</span>
                      <span className="text-lg text-muted transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-4 pb-4 text-sm text-muted">{item.answer}</p>
                  </details>
                ))}
              </div>
            </article>
          </>
        )}
      </div>
    </section>
  );
}

