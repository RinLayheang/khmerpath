"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

interface NavLinksProps {
  lang: Locale;
  dict: Dictionary;
  onNavigate?: () => void;
  isMobile?: boolean;
  isCompact?: boolean;
}

export function NavLinks({
  lang,
  dict,
  onNavigate,
  isMobile = false,
  isCompact = false,
}: NavLinksProps) {
  const pathname = usePathname();

  const items = [
    { href: "/", label: dict.nav.home },
    { href: "/majors", label: dict.nav.majors },
    { href: "/schools", label: dict.nav.schools },
    { href: "/about", label: dict.nav.about },
  ];

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-1.5 w-full" aria-label="Mobile Navigation">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[48px] items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-slate-100 text-slate-900 font-semibold border border-slate-200/80 shadow-xs dark:bg-white/15 dark:text-white dark:border-white/15"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/5"
              }`}
            >
              <span className="leading-normal">{item.label}</span>
              {active && (
                <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="hidden items-center md:flex gap-1" aria-label="Main Navigation">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group/link relative whitespace-nowrap rounded-full font-medium leading-normal transition-[padding,font-size,color,background-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              isCompact
                ? "px-2.5 py-1 text-xs lg:text-[13px]"
                : "px-3.5 py-1.5 text-xs lg:text-sm"
            } ${
              active
                ? "bg-slate-900 text-white font-semibold shadow-xs dark:bg-white/20 dark:text-white dark:border dark:border-white/15"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/5"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
