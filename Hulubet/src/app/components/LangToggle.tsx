"use client";

import { useLang } from "@/lib/lang";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1 rounded-full border border-edge bg-panel/80 p-1 text-xs font-semibold uppercase shadow-sm">
      <button
        type="button"
        onClick={() => setLang("ru")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "ru" ? "bg-brand text-white" : "text-muted hover:text-text"
        }`}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "en" ? "bg-brand text-white" : "text-muted hover:text-text"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("ar")}
        className={`rounded-full px-3 py-1 transition ${
          lang === "ar" ? "bg-brand text-white" : "text-muted hover:text-text"
        }`}
        aria-pressed={lang === "ar"}
      >
        AR
      </button>
    </div>
  );
}
