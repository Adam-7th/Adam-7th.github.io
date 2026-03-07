"use client";

import Link from "next/link";

export function StickyCTA({ text, button, href = "/contact#schedule" }: { text: string; button: string; href?: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 mx-auto w-full max-w-6xl px-4">
      <div className="pointer-events-auto flex flex-col items-stretch gap-2 rounded-2xl border border-edge bg-panel/90 p-3 shadow-glow backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted sm:text-sm sm:tracking-[0.2em]">
          {text}
        </p>
        <Link
          href={href}
          className="rounded-full bg-brand px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-110 sm:shrink-0 sm:tracking-[0.25em]"
        >
          {button}
        </Link>
      </div>
    </div>
  );
}
