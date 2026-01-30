"use client";

import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/lib/lang";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
