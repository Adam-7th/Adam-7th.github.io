export type Lang = "ru" | "en" | "ar";

export const LANGUAGES: Lang[] = ["ru", "en", "ar"];

export const isLang = (value: string): value is Lang => {
  return value === "ru" || value === "en" || value === "ar";
};
