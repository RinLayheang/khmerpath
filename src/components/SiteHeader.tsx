import Link from "next/link";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageToggle } from "./LanguageToggle";
import { NavLinks } from "./NavLinks";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href={`/${lang}`}
          className="flex min-h-[44px] shrink-0 items-center gap-2 font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-sm font-bold text-[#0F172A]"
          >
            ផ
          </span>
          <span className="text-[15px] sm:text-base">{dict.siteName}</span>
        </Link>

        <NavLinks lang={lang} dict={dict} />

        <div className="ml-auto">
          <LanguageToggle current={lang} />
        </div>
      </div>
    </header>
  );
}
