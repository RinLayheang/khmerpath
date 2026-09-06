"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Locale, LocalizedText } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { fetchSearch, type SearchResults } from "@/lib/api";

interface HeroSearchProps {
  lang: Locale;
  dict: Dictionary;
  suggestions?: LocalizedText[];
}

export function HeroSearch({ lang, dict, suggestions = [] }: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced live search
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await fetchSearch(trimmed, lang, 4);
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (!query.trim()) {
      router.push("/majors");
    } else {
      router.push(`/majors?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
    router.push(`/majors?q=${encodeURIComponent(text)}`);
  };

  const hasResults =
    results &&
    (results.majors.length > 0 ||
      results.universities.length > 0 ||
      results.careers.length > 0);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="pointer-events-none absolute left-4 text-ink-soft">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (hasResults) setIsOpen(true);
            }}
            placeholder={dict.home.searchPlaceholder}
            className="w-full min-h-[52px] rounded-xl border border-line bg-surface-raised/95 pl-12 pr-32 text-base text-ink shadow-sm backdrop-blur-sm transition-all placeholder:text-ink-faint focus:border-gold focus:bg-surface-raised focus:outline-none focus:ring-2 focus:ring-gold/30 sm:text-base"
          />

          {/* Submit button inside input */}
          <button
            type="submit"
            aria-label={dict.home.searchButton || (lang === "km" ? "ស្វែងរក" : "Search")}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[38px] px-3.5 sm:px-4 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-semibold shadow-xs transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-gold flex items-center justify-center gap-1.5 active:scale-95"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>
                  {dict.home.searchButton || (lang === "km" ? "ស្វែងរក" : "Search")}
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-line bg-surface-raised p-2 shadow-xl backdrop-blur-md">
          {hasResults ? (
            <div className="divide-y divide-line text-sm">
              {/* Majors */}
              {results.majors.length > 0 && (
                <div className="py-2">
                  <p className="px-3 pb-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                    {dict.home.searchMajors}
                  </p>
                  {results.majors.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/majors/${m.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-ink transition-colors hover:bg-surface-sunken"
                    >
                      <span className="font-medium">{m.name[lang]}</span>
                      {m.category && (
                        <span className="text-xs text-ink-faint">
                          {dict.category[m.category as keyof typeof dict.category] ||
                            m.category}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}

              {/* Universities */}
              {results.universities.length > 0 && (
                <div className="py-2">
                  <p className="px-3 pb-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                    {dict.home.searchUniversities}
                  </p>
                  {results.universities.map((u) => (
                    <Link
                      key={u.slug}
                      href={`/schools/${u.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-ink transition-colors hover:bg-surface-sunken"
                    >
                      <span className="font-medium">{u.name[lang]}</span>
                      {u.province && (
                        <span className="text-xs text-ink-faint">
                          {u.province[lang]}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}

              {/* Careers */}
              {results.careers.length > 0 && (
                <div className="py-2">
                  <p className="px-3 pb-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                    {dict.home.searchCareers}
                  </p>
                  {results.careers.map((c, i) => (
                    <Link
                      key={i}
                      href={`/majors/${c.majorSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-ink transition-colors hover:bg-surface-sunken"
                    >
                      <span className="font-medium">{c.title[lang]}</span>
                      <span className="text-xs text-ink-faint">
                        {c.majorName[lang]}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : query.trim().length >= 2 && !loading ? (
            <div className="py-4 text-center text-sm text-ink-soft">
              {dict.home.searchNoResults}
            </div>
          ) : null}
        </div>
      )}

      {/* Quick Category / Suggestions Chips */}
      {suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-ink-soft">{lang === "km" ? "ពេញនិយម៖" : "Trending:"}</span>
          {suggestions.slice(0, 4).map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(item[lang])}
              className="rounded-full border border-line bg-surface-raised/80 px-2.5 py-1 font-medium text-ink-soft transition-colors hover:border-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-gold"
            >
              {item[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
