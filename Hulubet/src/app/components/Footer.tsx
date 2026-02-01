"use client";

import Link from "next/link";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";
import { Logo } from "./Logo";

export function Footer() {
  const { lang } = useLang();
  const t = copy[lang];
  return (
    <footer className="border-t border-edge bg-panel/60">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10 text-sm text-muted md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted">
            Automate across teams with visual workflows, AI agents, and secure
            infrastructure.
          </p>
        </div>
        <div className="space-y-2 text-xs uppercase tracking-[0.3em] text-muted">
          <p className="text-text">{t.footer.product}</p>
          <p>{t.nav.features}</p>
          <p>{t.nav.templates}</p>
          <p>{t.footerLinks.security}</p>
        </div>
        <div className="space-y-2 text-xs uppercase tracking-[0.3em] text-muted">
          <p className="text-text">{t.footer.company}</p>
          <Link href="/careers" className="hover:text-text">
            {t.footerLinks.careers}
          </Link>
          <p>{t.footerLinks.blog}</p>
          <p>{t.footerLinks.contact}</p>
        </div>
        <div className="space-y-2 text-xs uppercase tracking-[0.3em] text-muted">
          <p className="text-text">{t.footer.contact}</p>
          <p className="flex items-center gap-2 normal-case tracking-normal text-[11px] text-muted">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-muted">
              <path
                fill="currentColor"
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            hulubetautomationagency@gmail.com
          </p>
          <p className="flex items-center gap-2 normal-case tracking-normal text-[11px] text-muted">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-muted">
              <path
                fill="currentColor"
                d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.1.36 2.28.55 3.58.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.19 2.48.55 3.58a1 1 0 0 1-.24 1.01l-2.19 2.2z"
              />
            </svg>
            +7 925 785 0702
          </p>
          <p className="normal-case tracking-normal text-[11px] text-muted">
            2026 Hulubet
          </p>
        </div>
      </div>
    </footer>
  );
}

