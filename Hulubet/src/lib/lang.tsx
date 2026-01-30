"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "./i18n";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);
const LANG_STORAGE_KEY = "hulubet-lang";

const parseLang = (value?: string): Lang | undefined => {
  if (!value) return undefined;
  if (value.startsWith("ru")) return "ru";
  if (value.startsWith("ar")) return "ar";
  if (value.startsWith("en")) return "en";
  return undefined;
};

const normalizeLang = (value?: string): Lang => parseLang(value) ?? "en";

const readCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
};

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const cookieLang = parseLang(readCookie(LANG_STORAGE_KEY));
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    const storedLang = parseLang(stored ?? undefined);
    const initial = cookieLang ?? storedLang ?? normalizeLang(navigator.language);
    setLangState(initial);
    window.localStorage.setItem(LANG_STORAGE_KEY, initial);
    document.cookie = `${LANG_STORAGE_KEY}=${initial}; path=/; max-age=31536000`;
    document.documentElement.lang = initial;
    document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
    document.cookie = `${LANG_STORAGE_KEY}=${next}; path=/; max-age=31536000`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  };

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within LangProvider");
  }
  return context;
}
