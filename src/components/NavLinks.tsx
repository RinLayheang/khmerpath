"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

export function NavLinks({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();

  const items = [
    { href: `/${lang}/majors`, label: dict.nav.majors },
    { href: `/${lang}/schools`, label: dict.nav.schools },
    { href: `/${lang}/about`, label: dict.nav.about },
  ];

  return (
    <nav className="flex items-center gap-1 overflow-x-auto text-sm sm:gap-2">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              "whitespace-nowrap rounded-lg px-2.5 py-1.5 transition-colors sm:px-3 " +
              (active
                ? "bg-brand-soft font-medium text-brand-deep"
                : "text-ink-soft hover:bg-surface-sunken hover:text-ink")
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
