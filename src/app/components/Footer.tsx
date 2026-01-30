"use client";

import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export function Footer() {
  const { lang } = useLang();
  const t = copy[lang];
  return (
    <footer className="border-t border-edge bg-panel/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-muted">
        <span className="font-display text-xs uppercase tracking-[0.3em] text-text">
          RuFlix
        </span>
        <span>{t.about.text}</span>
      </div>
    </footer>
  );
}
