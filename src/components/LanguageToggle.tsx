"use client";

import { useRouter } from "next/navigation";
import { locales } from "@/i18n/config";
import type { Locale } from "@/lib/types";

interface LanguageToggleProps {
  current: Locale;
  isCompact?: boolean;
}

export function LanguageToggle({ current, isCompact = false }: LanguageToggleProps) {
  const router = useRouter();

  const handleSelectLocale = (locale: Locale) => {
    if (locale === current) return;
    document.cookie = `locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-200/80 bg-slate-100/90 p-0.5 backdrop-blur-xl shadow-xs transition-[padding,gap] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-white/15 dark:bg-[#111318]/90"
      role="group"
      aria-label="Language selection"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleSelectLocale(locale)}
            aria-pressed={active}
            className={`flex items-center justify-center rounded-full font-semibold leading-normal transition-[padding,font-size,background-color,color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
              isCompact ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs"
            } ${
              active
                ? "bg-white text-slate-900 shadow-xs border border-slate-200/70 font-bold dark:bg-white/20 dark:text-white dark:border-white/15"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/5"
            }`}
          >
            {locale === "km" ? "ខ្មែរ" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
