"use client";

import { LangProvider } from "@/lib/lang";
import type { Lang } from "@/lib/i18n";
import type { CurrencyCode } from "@/lib/siteContent";
import { ThemeProvider, type ThemeMode } from "@/lib/theme";

export function Providers({
  children,
  initialLang,
  initialCurrency,
  initialCountryCode,
  initialTheme,
}: {
  children: React.ReactNode;
  initialLang: Lang;
  initialCurrency?: CurrencyCode | null;
  initialCountryCode?: string | null;
  initialTheme: ThemeMode;
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LangProvider initialLang={initialLang} initialCurrency={initialCurrency} initialCountryCode={initialCountryCode}>
        {children}
      </LangProvider>
    </ThemeProvider>
  );
}
