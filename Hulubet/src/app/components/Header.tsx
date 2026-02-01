"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { lang } = useLang();
  const t = copy[lang];
  const pathname = usePathname();

  const items = [
    { href: "/#product", label: t.nav.product },
    { href: "/#features", label: t.nav.features },
    { href: "/#builder", label: t.nav.builder },
    { href: "/#templates", label: t.nav.templates },
    { href: "/#pricing", label: t.nav.pricing },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="border-b border-edge bg-panel/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display">
          <Logo />
        </Link>
        <nav className="hidden items-center justify-center gap-6 pr-4 text-xs font-semibold uppercase tracking-[0.25em] md:flex md:flex-nowrap">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                pathname === item.href
                  ? "text-brand"
                  : "text-muted hover:text-text"
              }`}
            >
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-brand px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white md:inline-flex"
          >
            {t.nav.startFree}
          </Link>
        </div>
      </div>
    </header>
  );
}
