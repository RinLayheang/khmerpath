import { cookies } from "next/headers";
import { defaultLocale, isLocale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";
import type { Locale } from "@/lib/types";

export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const val = cookieStore.get("locale")?.value;
    if (val && isLocale(val)) return val;
  } catch {
    // In environments where cookies() cannot be called
  }
  return defaultLocale;
}

export async function getI18n(): Promise<{ lang: Locale; dict: Dictionary }> {
  const lang = await getLocale();
  const dict = getDictionary(lang);
  return { lang, dict };
}
