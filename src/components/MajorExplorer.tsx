"use client";

import { useMemo, useState } from "react";
import type { DemandLevel, Locale, Major, MajorCategory } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { MajorCard } from "./MajorCard";
import { FilterSelect } from "./FilterSelect";
import { localizeNumber } from "@/lib/format";

const demandOrder: DemandLevel[] = ["very-high", "high", "medium", "low"];

/**
 * Search + filter over the whole major list. Kept client-side because the
 * dataset is small enough to ship (tens of KB) and instant filtering matters
 * more here than shaving the bundle.
 */
export function MajorExplorer({
  majors,
  lang,
  dict,
}: {
  majors: Major[];
  lang: Locale;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [demand, setDemand] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<MajorCategory>(majors.map((m) => m.category));
    return Array.from(set).sort((a, b) =>
      dict.category[a].localeCompare(dict.category[b]),
    );
  }, [majors, dict]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return majors.filter((major) => {
      if (category !== "all" && major.category !== category) return false;
      if (demand !== "all" && major.demand !== demand) return false;
      if (!q) return true;
      const haystack = [
        major.name.km,
        major.name.en,
        major.summary.km,
        major.summary.en,
        ...major.careers.flatMap((c) => [c.title.km, c.title.en]),
        ...major.keySkills.flatMap((s) => [s.km, s.en]),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [majors, query, category, demand]);

  const filtersActive = query !== "" || category !== "all" || demand !== "all";

  return (
    <div>
      <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1 text-sm">
          <span className="text-xs font-medium text-ink-faint">
            {dict.majors.searchPlaceholder}
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.majors.searchPlaceholder}
            className="rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm placeholder:text-ink-faint"
          />
        </label>

        <FilterSelect
          label={dict.majors.filterCategory}
          value={category}
          onChange={setCategory}
          options={[
            { value: "all", label: dict.majors.all },
            ...categories.map((c) => ({ value: c, label: dict.category[c] })),
          ]}
        />

        <FilterSelect
          label={dict.majors.filterDemand}
          value={demand}
          onChange={setDemand}
          options={[
            { value: "all", label: dict.majors.all },
            ...demandOrder.map((d) => ({ value: d, label: dict.demand[d] })),
          ]}
        />
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-ink-soft">
        <span>
          {localizeNumber(results.length, lang)} {dict.majors.resultsMany}
        </span>
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setDemand("all");
            }}
            className="rounded-lg px-2 py-1 text-brand underline underline-offset-2 hover:bg-brand-soft"
          >
            {dict.majors.clearFilters}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="card mt-4 p-8 text-center text-ink-soft">
          {dict.majors.noResults}
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((major) => (
            <MajorCard key={major.slug} major={major} lang={lang} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
