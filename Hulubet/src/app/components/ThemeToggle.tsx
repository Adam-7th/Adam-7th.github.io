"use client";

import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-edge px-3 py-1 text-sm font-medium uppercase tracking-wide transition hover:border-brand"
      aria-label="Toggle theme"
    >
      {isDark ? "Day" : "Night"}
    </button>
  );
}
