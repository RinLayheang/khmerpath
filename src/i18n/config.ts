import type { Locale } from "@/lib/types";

export const locales: Locale[] = ["km", "en"];

/** Khmer first: the site is for Cambodian students, English is the fallback. */
export const defaultLocale: Locale = "km";

export const localeNames: Record<Locale, string> = {
  km: "ខ្មែរ",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
