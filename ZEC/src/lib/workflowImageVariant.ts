import type { ThemeMode } from "@/lib/theme";

export function getThemedWorkflowImage(src: string, theme: ThemeMode): string {
  if (theme !== "light") {
    return src;
  }

  if (!src.startsWith("/images/case-workflows/") || !src.endsWith(".svg")) {
    return src;
  }

  return src.replace(/\.svg$/, "-light.svg");
}
