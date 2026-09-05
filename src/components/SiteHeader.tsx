"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { useScrollDirection } from "@/lib/useScrollDirection";
import { LanguageToggle } from "./LanguageToggle";
import { NavLinks } from "./NavLinks";

interface SiteHeaderProps {
  lang: Locale;
  dict: Dictionary;
}

export function SiteHeader({ lang, dict }: SiteHeaderProps) {
  const { isScrolled } = useScrollDirection(8);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* ── MORPHING NAVBAR CONTAINER ─────────────────────────── */}
      <div
        className={`flex justify-center transition-[padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled
            ? "px-3 pt-3 sm:px-4 sm:pt-4"
            : "px-5 pt-0 sm:px-6 lg:px-10"
        }`}
      >
        <div
          className={`pointer-events-auto flex items-center overflow-hidden backdrop-blur-md transition-[max-width,border-radius,padding,gap,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full ${
            isScrolled
              ? "max-w-[44rem] gap-1 rounded-full border border-slate-200/90 bg-white/90 px-2.5 py-1.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] sm:gap-2 sm:px-3 sm:py-2"
              : "max-w-[80rem] gap-2 rounded-none border-x-0 border-t-0 border-b border-slate-200/80 bg-white/85 px-5 py-3.5 shadow-none md:gap-6 md:px-6 md:py-4 lg:px-10"
          }`}
        >
          {/* ── LEFT: LOGO ────────────────────────────────────────── */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex shrink-0 items-center text-slate-900"
            aria-label={dict.siteName}
          >
            <span
              aria-hidden="true"
              className={`inline-flex shrink-0 items-center gap-[0.4em] transition-[height,padding,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-px ${
                isScrolled ? "h-6 sm:h-7 px-1" : "h-7 sm:h-8"
              }`}
            >
              <span
                className={`grid place-items-center rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 font-bold text-slate-950 shadow-xs ring-1 ring-amber-400/40 transition-all duration-500 ${
                  isScrolled
                    ? "h-6 w-6 text-[10px]"
                    : "h-7 w-7 sm:h-8 sm:w-8 text-xs"
                }`}
              >
                ផ
              </span>
              <span
                className={`font-bold tracking-tight transition-all duration-500 ${
                  isScrolled ? "text-xs sm:text-sm" : "text-[15px] sm:text-base"
                }`}
              >
                {dict.siteName}
              </span>
            </span>
          </Link>

          {/* ── DIVIDER (SCROLLED STATE ONLY) ────────────────────── */}
          <span
            aria-hidden="true"
            className={`hidden h-5 w-px shrink-0 bg-slate-200 transition-[opacity,width] duration-300 ease-out md:block ${
              isScrolled ? "opacity-100" : "w-0 opacity-0"
            }`}
          />

          <div className="flex-1" />

          {/* ── CENTER: NAVIGATION LINKS ─────────────────────────── */}
          <NavLinks
            lang={lang}
            dict={dict}
            isCompact={isScrolled}
          />

          <div className="flex-1" />

          {/* ── RIGHT: LANGUAGE SWITCHER & MOBILE BUTTON ─────────── */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageToggle current={lang} isCompact={isScrolled} />

            {/* Mobile Hamburger / Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className={`md:hidden flex items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-all cursor-pointer ${
                isScrolled ? "h-7 w-7" : "h-8 w-8 sm:h-9 sm:w-9"
              }`}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU DROPDOWN (FLOATING GLASS CARD) ──────────── */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto px-4 pt-2 flex justify-center">
          <div className="md:hidden w-full max-w-[44rem] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl px-4 py-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <NavLinks
              lang={lang}
              dict={dict}
              isMobile={true}
              onNavigate={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Full-screen backdrop overlay on mobile when drawer is open */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="pointer-events-auto md:hidden fixed inset-0 -z-10 h-screen w-screen bg-slate-900/30 backdrop-blur-xs"
          aria-hidden="true"
        />
      )}
    </header>
  );
}
