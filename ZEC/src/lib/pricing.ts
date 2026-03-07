import type { Lang } from "./i18n";
import type { CurrencyCode } from "./siteContent";
import { CURRENCY_LOCALES } from "./siteContent";

export type PlanId = "launch" | "growth" | "scale" | "entry";

const BASE_EUR_PRICES: Record<PlanId, number> = {
  launch: 350,
  growth: 950,
  scale: 2200,
  entry: 50,
};

const FX_FROM_EUR: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.08,
  RUB: 102,
  AED: 3.97,
};

const roundCurrency = (value: number, currency: CurrencyCode) => {
  if (currency === "RUB") return Math.round(value / 50) * 50;
  if (currency === "USD" || currency === "EUR") return Math.round(value);
  if (currency === "AED") return Math.round(value);
  return value;
};

export const getPlanAmount = (plan: PlanId, currency: CurrencyCode) => {
  const eur = BASE_EUR_PRICES[plan];
  return roundCurrency(eur * FX_FROM_EUR[currency], currency);
};

const languageToLocale: Record<Lang, string> = {
  en: "en-US",
  ru: "ru-RU",
  ar: "ar-AE",
};

export const formatPrice = (
  amount: number,
  currency: CurrencyCode,
  lang: Lang,
) => {
  const locale = lang === "ar" ? "ar-AE" : CURRENCY_LOCALES[currency] ?? languageToLocale[lang];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

