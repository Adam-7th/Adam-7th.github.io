"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { PUBLIC_CONTACT_MAILTO, PUBLIC_LINKEDIN_URL, PUBLIC_TELEGRAM_URL, PUBLIC_WHATSAPP_URL } from "@/lib/contactConfig";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";

type SocialItem = {
  href: string;
  label: string;
  logoSrc: string;
  external?: boolean;
};

type StickyPrefs = {
  x: number | null;
  y: number | null;
  hidden: boolean;
};

const STORAGE_KEY = "zec-sticky-social-v2";
const SAFE_GAP = 8;
const DRAG_CLICK_TOLERANCE = 4;

export function StickyVerticalNav() {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const ui = {
    showWidget: lang === "ru" ? "Показать виджет соцсетей" : lang === "ar" ? "إظهار ويدجت الشبكات" : "Show social sticky widget",
    dragTitle: lang === "ru" ? "Перетащить" : lang === "ar" ? "سحب" : "Drag",
    dragLabel: lang === "ru" ? "Перетащить" : lang === "ar" ? "سحب" : "Drag",
    resetTitle: lang === "ru" ? "Сбросить позицию" : lang === "ar" ? "إعادة تعيين الموضع" : "Reset position",
    resetLabel: lang === "ru" ? "Сбросить позицию" : lang === "ar" ? "إعادة تعيين الموضع" : "Reset position",
    hideTitle: lang === "ru" ? "Скрыть виджет" : lang === "ar" ? "إخفاء الودجت" : "Hide widget",
    hideLabel: lang === "ru" ? "Скрыть виджет" : lang === "ar" ? "إخفاء الودجت" : "Hide widget",
    homeLabel: lang === "ru" ? "Главная ZEC" : lang === "ar" ? "الرئيسية ZEC" : "ZEC home",
    connect: lang === "ru" ? "Связь" : lang === "ar" ? "تواصل" : "Connect",
    subtitle: t.brand.tagline,
  };
  const railRef = useRef<HTMLDivElement>(null);
  const hiddenDockRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const dragStartPointRef = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);

  const [loaded, setLoaded] = useState(false);
  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);

  const socials: SocialItem[] = [
    { href: PUBLIC_LINKEDIN_URL, label: "LinkedIn", logoSrc: "/logos/linkedin.svg", external: true },
    { href: PUBLIC_TELEGRAM_URL, label: "Telegram", logoSrc: "/logos/telegram.svg", external: true },
    { href: PUBLIC_WHATSAPP_URL, label: "WhatsApp", logoSrc: "/logos/whatsapp.svg", external: true },
    { href: PUBLIC_CONTACT_MAILTO, label: "Email", logoSrc: "/logos/gmail.svg" },
  ];

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<StickyPrefs>;
        if (typeof parsed.x === "number" && Number.isFinite(parsed.x)) setX(parsed.x);
        if (typeof parsed.y === "number" && Number.isFinite(parsed.y)) setY(parsed.y);
        if (typeof parsed.hidden === "boolean") setHidden(parsed.hidden);
      }
    } catch {
      // Ignore malformed local storage.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const prefs: StickyPrefs = { x, y, hidden };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [loaded, x, y, hidden]);

  const hasCustomPosition = x !== null && y !== null;
  const railInlineStyle = hasCustomPosition ? { left: `${x}px`, top: `${y}px` } : undefined;
  const railClass = hasCustomPosition
    ? "left-0 top-0 -translate-y-0"
    : "right-3 top-1/2 -translate-y-1/2";

  const clampPosition = useCallback((nextLeft: number, nextTop: number) => {
    const activeDock = hidden ? hiddenDockRef.current : railRef.current;
    const width = activeDock?.offsetWidth ?? 74;
    const height = activeDock?.offsetHeight ?? 300;
    const clampedLeft = Math.max(SAFE_GAP, Math.min(window.innerWidth - width - SAFE_GAP, nextLeft));
    const clampedTop = Math.max(SAFE_GAP, Math.min(window.innerHeight - height - SAFE_GAP, nextTop));
    return { left: clampedLeft, top: clampedTop };
  }, [hidden]);

  const startDrag = useCallback(
    (pointerX: number, pointerY: number, left: number, top: number) => {
      if (!hasCustomPosition) {
        setX(left);
        setY(top);
      }

      dragStartPointRef.current = { x: pointerX, y: pointerY };
      dragMovedRef.current = false;
      dragOffsetRef.current = {
        x: pointerX - left,
        y: pointerY - top,
      };

      const onMove = (moveEvent: PointerEvent) => {
        if (!dragMovedRef.current) {
          const dx = Math.abs(moveEvent.clientX - dragStartPointRef.current.x);
          const dy = Math.abs(moveEvent.clientY - dragStartPointRef.current.y);
          if (dx <= DRAG_CLICK_TOLERANCE && dy <= DRAG_CLICK_TOLERANCE) {
            return;
          }
          dragMovedRef.current = true;
        }

        const { left: nextLeft, top: nextTop } = clampPosition(
          moveEvent.clientX - dragOffsetRef.current.x,
          moveEvent.clientY - dragOffsetRef.current.y,
        );
        setX(nextLeft);
        setY(nextTop);
      };

      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerup", onUp, { once: true });
    },
    [clampPosition, hasCustomPosition],
  );

  const handleDragStart = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      startDrag(event.clientX, event.clientY, rect.left, rect.top);
    },
    [startDrag],
  );

  const handleHiddenDragStart = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const dock = hiddenDockRef.current;
      if (!dock) return;
      const rect = dock.getBoundingClientRect();
      startDrag(event.clientX, event.clientY, rect.left, rect.top);
    },
    [startDrag],
  );

  const handleHiddenDockClick = useCallback(() => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    setHidden(false);
  }, []);

  useEffect(() => {
    if (!hasCustomPosition) return;
    const onResize = () => {
      if (x === null || y === null) return;
      const { left, top } = clampPosition(x, y);
      if (left !== x) setX(left);
      if (top !== y) setY(top);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampPosition, hasCustomPosition, x, y]);

  if (hidden) {
    return (
      <div
        ref={hiddenDockRef}
        className={`fixed ${railClass} z-40 hidden min-[1400px]:block`}
        style={railInlineStyle}
      >
        <button
          type="button"
          onPointerDown={handleHiddenDragStart}
          onClick={handleHiddenDockClick}
          className="touch-none cursor-grab rounded-full border border-edge bg-panel/88 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text shadow-[0_14px_30px_-24px_hsl(var(--accent)/0.7)] backdrop-blur transition hover:border-brand active:cursor-grabbing"
          aria-label={ui.showWidget}
          title={ui.dragTitle}
        >
          ZEC
        </button>
      </div>
    );
  }

  return (
    <aside className={`pointer-events-none fixed ${railClass} z-40 hidden min-[1400px]:block`} style={railInlineStyle}>
      <div
        ref={railRef}
        className="group/sticky pointer-events-auto w-[74px] overflow-hidden rounded-3xl border border-edge bg-panel/86 p-2 shadow-[0_20px_45px_-34px_hsl(var(--accent)/0.45)] backdrop-blur transition-all duration-300 hover:w-[236px]"
      >
        <div className="mb-2 flex items-center justify-between gap-1 rounded-xl border border-edge bg-panel2/75 px-2 py-1.5">
          <button
            type="button"
            onPointerDown={handleDragStart}
            className="inline-flex h-7 w-7 touch-none cursor-grab items-center justify-center rounded-lg border border-edge bg-panel text-[9px] font-semibold text-muted hover:text-text active:cursor-grabbing"
            title={ui.dragTitle}
            aria-label={ui.dragLabel}
          >
            DR
          </button>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => {
                setX(null);
                setY(null);
              }}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-edge bg-panel text-[9px] font-semibold text-muted hover:text-text"
              title={ui.resetTitle}
              aria-label={ui.resetLabel}
            >
              RS
            </button>
            <button
              type="button"
              onClick={() => setHidden(true)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-edge bg-panel text-[10px] font-semibold text-muted hover:text-text"
              title={ui.hideTitle}
              aria-label={ui.hideLabel}
            >
              X
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-edge bg-panel2/80 px-2 py-2">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 18% 20%, hsl(var(--accent)/0.24), transparent 42%), radial-gradient(circle at 82% 80%, hsl(var(--accent)/0.18), transparent 44%)",
            }}
          />
          <Link href="/" className="relative flex items-center gap-3" aria-label={ui.homeLabel}>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-edge bg-panel">
              <Image src="/logos/zec-logo.svg" alt="ZEC logo" width={34} height={34} className="h-full w-full object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-text opacity-0 transition-all duration-300 group-hover/sticky:max-w-[150px] group-hover/sticky:opacity-100">
                {t.brand.name}
              </span>
              <span className="block max-w-0 overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-muted opacity-0 transition-all duration-300 group-hover/sticky:max-w-[170px] group-hover/sticky:opacity-100">
                {ui.subtitle}
              </span>
            </span>
          </Link>
        </div>

        <div className="my-2 h-px bg-edge" />

        <p className="mb-1 max-h-0 overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-muted opacity-0 transition-all duration-300 group-hover/sticky:max-h-6 group-hover/sticky:opacity-100">
          {ui.connect}
        </p>

        <div className="space-y-1.5">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border border-edge bg-panel2/65 px-2 py-2 text-muted transition hover:border-brand/40 hover:text-text hover:shadow-[0_10px_20px_-18px_hsl(var(--accent)/0.65)]"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-edge bg-panel">
                <Image src={item.logoSrc} alt={item.label} width={15} height={15} className="object-contain" />
              </span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover/sticky:max-w-[150px] group-hover/sticky:opacity-100">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
