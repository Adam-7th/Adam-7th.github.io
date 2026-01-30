"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/i18n";
import { useLang } from "@/lib/lang";
import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { lang } = useLang();
  const pathname = usePathname();
  const t = copy[lang];

  const items = [
    { href: "/", label: t.nav.home },
    { href: "/movies", label: t.nav.movies },
    { href: "/movies/new", label: t.nav.add },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="border-b border-edge bg-panel/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display">
          <Logo />
        </Link>
        <nav className="hidden gap-6 text-sm font-semibold uppercase tracking-wide md:flex">
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
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
