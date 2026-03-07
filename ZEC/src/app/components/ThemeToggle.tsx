"use client";

import { useLang } from "@/lib/lang";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { lang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const label =
    lang === "ru"
      ? "Сменить тему"
      : lang === "ar"
        ? "تبديل المظهر"
        : "Toggle theme";

  const modeText =
    lang === "ru"
      ? isDark
        ? "Свет"
        : "Тьма"
      : lang === "ar"
        ? isDark
          ? "فاتح"
          : "داكن"
        : isDark
          ? "Light"
          : "Dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-edge bg-panel px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-text hover:border-brand"
      aria-label={label}
    >
      <span aria-hidden="true" className="text-sm">
        {isDark ? "☀" : "☾"}
      </span>
      <span>{modeText}</span>
    </button>
  );
}
