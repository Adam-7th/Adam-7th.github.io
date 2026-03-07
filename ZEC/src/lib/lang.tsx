"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "./i18n";
import { CURRENCY_OPTIONS_BY_LANG, DEFAULT_CURRENCY_BY_LANG, type CurrencyCode } from "./siteContent";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  countryCode: string | null;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);
const LANG_STORAGE_KEY = "zec-lang";
const CURRENCY_STORAGE_KEY = "zec-currency";
const COUNTRY_STORAGE_KEY = "zec-country";

const EURO_ZONE_COUNTRIES = new Set([
  "AT",
  "BE",
  "CY",
  "DE",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PT",
  "SI",
  "SK",
]);

const resolveCurrencyByCountry = (countryCode: string | null): CurrencyCode | null => {
  if (!countryCode) return null;
  if (countryCode === "RU") return "RUB";
  if (countryCode === "AE") return "AED";
  if (EURO_ZONE_COUNTRIES.has(countryCode)) return "EUR";
  return "USD";
};

const pickCurrencyForLang = ({
  lang,
  preferredCurrency,
  countryCode,
}: {
  lang: Lang;
  preferredCurrency?: CurrencyCode | null;
  countryCode: string | null;
}) => {
  const options = CURRENCY_OPTIONS_BY_LANG[lang];
  if (preferredCurrency && options.includes(preferredCurrency)) {
    return preferredCurrency;
  }

  const countryCurrency = resolveCurrencyByCountry(countryCode);
  if (countryCurrency && options.includes(countryCurrency)) {
    return countryCurrency;
  }

  return DEFAULT_CURRENCY_BY_LANG[lang];
};

const persistLanguage = (lang: Lang) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  document.cookie = `${LANG_STORAGE_KEY}=${lang}; path=/; max-age=31536000`;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
};

export function LangProvider({
  children,
  initialLang,
  initialCurrency,
  initialCountryCode,
}: {
  children: React.ReactNode;
  initialLang: Lang;
  initialCurrency?: CurrencyCode | null;
  initialCountryCode?: string | null;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [countryCode] = useState<string | null>(initialCountryCode ?? null);
  const [currency, setCurrencyState] = useState<CurrencyCode>(() =>
    pickCurrencyForLang({
      lang: initialLang,
      preferredCurrency: initialCurrency ?? null,
      countryCode: initialCountryCode ?? null,
    }),
  );

  useEffect(() => {
    persistLanguage(lang);
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    document.cookie = `${CURRENCY_STORAGE_KEY}=${currency}; path=/; max-age=31536000`;
    if (countryCode) {
      window.localStorage.setItem(COUNTRY_STORAGE_KEY, countryCode);
      document.cookie = `${COUNTRY_STORAGE_KEY}=${countryCode}; path=/; max-age=31536000`;
    }
  }, [lang, currency, countryCode]);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      persistLanguage(next);
      setCurrencyState((current) =>
        pickCurrencyForLang({
          lang: next,
          preferredCurrency: current,
          countryCode,
        }),
      );
    },
    [countryCode],
  );

  const setCurrency = useCallback(
    (next: CurrencyCode) => {
      if (CURRENCY_OPTIONS_BY_LANG[lang].includes(next)) {
        setCurrencyState(next);
        return;
      }
      setCurrencyState(
        pickCurrencyForLang({
          lang,
          preferredCurrency: next,
          countryCode,
        }),
      );
    },
    [lang, countryCode],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      currency,
      setCurrency,
      countryCode,
    }),
    [lang, setLang, currency, setCurrency, countryCode],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within LangProvider");
  }
  return context;
}
