"use client";

import { LangProvider } from "@/lib/lang";
import { ThemeProvider } from "@/lib/theme";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
