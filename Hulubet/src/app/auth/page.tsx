"use client";

import Link from "next/link";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";

export default function AuthPage() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <div className="rounded-3xl border border-edge bg-panel/80 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-muted">Hulubet</p>
        <h1 className="mt-3 font-display text-3xl">{t.auth.title}</h1>
        <p className="mt-3 text-sm text-muted">
          Authentication is currently disabled.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white"
        >
          {t.nav.contact}
        </Link>
      </div>
    </div>
  );
}
