"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/lang";

export function LangToggle() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const options: Array<{ id: "ru" | "en" | "ar"; label: string }> = [
    { id: "ru", label: "RU" },
    { id: "en", label: "EN" },
    { id: "ar", label: "AR" },
  ];

  const handleLangChange = useCallback(
    (nextLang: "ru" | "en" | "ar") => {
      if (nextLang === lang) return;

      setLang(nextLang);

      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", nextLang);
      const query = params.toString();
      const nextUrl = query ? `${pathname}?${query}` : pathname;

      router.replace(nextUrl, { scroll: false });
      router.refresh();
    },
    [lang, pathname, router, searchParams, setLang],
  );

  return (
    <div className="flex items-center rounded-full border border-edge bg-panel p-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => handleLangChange(option.id)}
          className={`rounded-full px-3 py-1 ${lang === option.id ? "bg-brand text-white" : "text-muted hover:text-text"}`}
          aria-pressed={lang === option.id}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
