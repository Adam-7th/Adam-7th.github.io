"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-edge px-3 py-1 text-sm font-medium uppercase tracking-wide transition hover:border-brand"
      aria-label="Toggle theme"
    >
      {isDark ? "Day" : "Night"}
    </button>
  );
}
