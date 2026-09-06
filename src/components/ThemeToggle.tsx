"use client";

import { useEffect, useState } from "react";

interface ThemeToggleProps {
  isCompact?: boolean;
}

export function ThemeToggle({ isCompact = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const hasDark = document.documentElement.classList.contains("dark");
    setIsDark(hasDark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.cookie = "theme=dark; path=/; max-age=31536000; SameSite=Lax";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.cookie = "theme=light; path=/; max-age=31536000; SameSite=Lax";
    }

    window.dispatchEvent(new Event("theme-change"));
  };

  if (!mounted) {
    return (
      <div
        className={`rounded-full border border-amber-500/20 bg-amber-500/10 ${
          isCompact ? "h-7 w-7" : "h-8 w-8 sm:h-8.5 sm:w-8.5"
        }`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer shadow-xs active:scale-95 ${
        isCompact ? "h-7 w-7" : "h-8 w-8 sm:h-8.5 sm:w-8.5"
      } ${
        isDark
          ? "bg-amber-400/15 text-amber-300 border border-amber-400/30 hover:bg-amber-400/25 hover:border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
          : "bg-amber-500/10 text-amber-600 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50"
      }`}
    >
      {isDark ? (
        /* Google Material Symbols: light_mode */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="h-4 w-4 fill-current transition-transform duration-300 group-hover:rotate-45"
          aria-hidden="true"
        >
          <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0-72q-53 0-90.5-37.5T352-480q0-53 37.5-90.5T480-608q53 0 90.5 37.5T608-480q0 53-37.5 90.5T480-352ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l102-100 55 53-97 102-60-55Z" />
        </svg>
      ) : (
        /* Google Material Symbols: dark_mode */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="h-4 w-4 fill-current transition-transform duration-300 group-hover:-rotate-12"
          aria-hidden="true"
        >
          <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
        </svg>
      )}
    </button>
  );
}
