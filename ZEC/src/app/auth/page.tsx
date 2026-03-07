"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { useLocalizedMeta } from "@/lib/useLocalizedMeta";

export default function AuthPage() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];

  useLocalizedMeta(t.meta.pages.auth.title, t.meta.pages.auth.description);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <div className="rounded-3xl border border-edge bg-panel p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{t.brand.name}</p>
        <h1 className="mt-3 font-display text-3xl text-text">{t.meta.pages.auth.title}</h1>
        <p className="mt-3 text-sm text-muted">{t.meta.pages.auth.description}</p>
        <Link
          href="/contact#schedule"
          className="mt-6 inline-flex rounded-full bg-brand px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
        >
          {t.nav.bookCall}
        </Link>
      </div>
    </div>
  );
}
