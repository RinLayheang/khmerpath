"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames } from "@/i18n/config";
import type { Locale } from "@/lib/types";

/**
 * Swaps the locale segment of the current URL, so the reader stays on the
 * page they were reading instead of being sent home.
 */
export function LanguageToggle({ current }: { current: Locale }) {
  const pathname = usePathname();

  function hrefFor(locale: Locale) {
    const rest = pathname.replace(/^\/(km|en)/, "");
    return `/${locale}${rest}`;
  }

  return (
    <div
      className="flex items-center rounded-lg border border-line bg-surface-raised p-0.5 text-sm"
      role="group"
      aria-label="Language"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={
              "rounded-[6px] px-2.5 py-1 transition-colors " +
              (active
                ? "bg-brand font-medium text-white"
                : "text-ink-soft hover:text-ink")
            }
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </div>
  );
}
