"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";
import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/solutions", label: t.nav.solutions },
    { href: "/workflows", label: t.nav.workflows },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/case-studies", label: t.nav.caseStudies },
    { href: "/blog", label: t.nav.blog },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const menuToggleLabel = lang === "ru" ? "\u041c\u0435\u043d\u044e" : lang === "ar" ? "\u0627\u0644\u0642\u0627\u0626\u0645\u0629" : "Menu";

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    if (isMobileMenuOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[150] border-b border-edge bg-panel/95 backdrop-blur lg:sticky lg:top-0 lg:z-50">
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-8">
          <Link href="/" className="shrink-0 lg:justify-self-start" aria-label="ZEC home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex lg:justify-self-center" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] ${isActive(item.href) ? "text-brand" : "text-muted hover:text-text"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 lg:flex lg:justify-self-end">
            <LangToggle />
            <ThemeToggle />
            <Link
              href="/workflows"
              className="hidden whitespace-nowrap rounded-full border border-edge px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-text hover:border-brand xl:inline-flex"
            >
              {t.nav.seeWorkflows}
            </Link>
            <Link
              href="/contact#schedule"
              className="hidden whitespace-nowrap rounded-full bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white lg:inline-flex"
            >
              {t.nav.bookCall}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={menuToggleLabel}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-panel2 text-text lg:hidden"
          >
            <span className="sr-only">{menuToggleLabel}</span>
            <span className="relative block h-[14px] w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[12px] h-[2px] w-5 rounded-full bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-menu-panel"
          aria-hidden={!isMobileMenuOpen}
          className={`lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <div
            className={`fixed inset-0 z-[140] overflow-y-auto bg-bg pb-6 pt-[72px] shadow-[0_20px_45px_-30px_hsl(var(--accent)/0.55)] transition-[opacity,transform] duration-200 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <div className="mx-auto w-full max-w-[1320px] px-4 py-4 sm:px-6">
              <nav className="grid gap-3" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] ${
                      isActive(item.href)
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-edge bg-panel text-text hover:border-brand"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <LangToggle />
                <ThemeToggle />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/workflows"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-edge bg-panel px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text hover:border-brand"
                >
                  {t.nav.seeWorkflows}
                </Link>
                <Link
                  href="/contact#schedule"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
                >
                  {t.nav.bookCall}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-[72px] lg:hidden" aria-hidden="true" />
    </>
  );
}
