"use client";

import { useLang } from "@/lib/lang";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex overflow-hidden rounded-full border border-edge text-sm font-semibold uppercase">
      <button
        type="button"
        onClick={() => setLang("ru")}
        className={`px-3 py-1 transition ${
          lang === "ru" ? "bg-brand text-white" : "text-muted hover:text-text"
        }`}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-3 py-1 transition ${
          lang === "en" ? "bg-brand text-white" : "text-muted hover:text-text"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
