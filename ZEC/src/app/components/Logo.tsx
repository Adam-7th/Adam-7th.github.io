"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang";
import { SITE_CONTENT } from "@/lib/siteContent";

type LogoProps = {
  variant?: "default" | "wordmark";
};

export function Logo({ variant = "default" }: LogoProps) {
  const { lang } = useLang();
  const t = SITE_CONTENT[lang];
  const taglineLines =
    lang === "en" ? ["Automation-native", "agency for modern teams"] : [t.brand.tagline];

  if (variant === "wordmark") {
    return (
      <span className="block leading-tight">
        <span className="block font-display text-[22px] font-semibold tracking-[0.18em] text-text">ZEC</span>
        <span className="mt-1 block h-[2px] w-5 rounded-full bg-brand" aria-hidden="true" />
        <span className="mt-1 block text-[10px] tracking-[0.1em] text-muted">
          {taglineLines.map((line) => (
            <span key={line} className="block leading-[1.22]">
              {line}
            </span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-edge bg-panel shadow-glow sm:h-11 sm:w-11">
        <Image src="/logos/zec-logo.svg" alt="ZEC monogram" width={44} height={44} className="h-full w-full object-cover" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-semibold tracking-[0.14em] text-text sm:text-base">ZEC</span>
        <span className="hidden text-[9px] tracking-[0.12em] text-muted min-[380px]:block">
          {taglineLines.map((line) => (
            <span key={line} className="block leading-[1.2]">
              {line}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}
