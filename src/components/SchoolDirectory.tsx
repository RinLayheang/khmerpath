"use client";

import { useMemo, useState } from "react";
import type { Locale, LocalizedText, School } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { SchoolCard } from "./SchoolCard";
import { FilterSelect } from "./FilterSelect";
import { localizeNumber } from "@/lib/format";

export type SchoolListEntry = {
  school: School;
  /** Major slugs resolved on the server, so filtering doesn't re-derive links. */
  majorSlugs: string[];
};

export function SchoolDirectory({
  entries,
  provinces,
  majorOptions,
  lang,
  dict,
}: {
  entries: SchoolListEntry[];
  provinces: LocalizedText[];
  majorOptions: { slug: string; name: LocalizedText }[];
  lang: Locale;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("all");
  const [type, setType] = useState("all");
  const [major, setMajor] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(({ school, majorSlugs }) => {
      if (province !== "all" && school.province.en !== province) return false;
      if (type !== "all" && school.type !== type) return false;
      if (major !== "all" && !majorSlugs.includes(major)) return false;
      if (!q) return true;
      const haystack = [
        school.name.km,
        school.name.en,
        school.shortName,
        school.summary.km,
        school.summary.en,
        school.province.km,
        school.province.en,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, query, province, type, major]);

  const filtersActive =
    query !== "" || province !== "all" || type !== "all" || major !== "all";

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-medium text-ink-faint">
            {dict.schools.searchPlaceholder}
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.schools.searchPlaceholder}
            className="rounded-lg border border-line bg-surface-raised px-3 py-2 text-sm placeholder:text-ink-faint"
          />
        </label>

        <FilterSelect
          label={dict.schools.filterProvince}
          value={province}
          onChange={setProvince}
          options={[
            { value: "all", label: dict.majors.all },
            ...provinces.map((p) => ({ value: p.en, label: p[lang] })),
          ]}
        />

        <FilterSelect
          label={dict.schools.filterType}
          value={type}
          onChange={setType}
          options={[
            { value: "all", label: dict.majors.all },
            { value: "public", label: dict.schools.public },
            { value: "private", label: dict.schools.private },
          ]}
        />

        <FilterSelect
          label={dict.schools.filterMajor}
          value={major}
          onChange={setMajor}
          options={[
            { value: "all", label: dict.majors.all },
            ...majorOptions.map((m) => ({ value: m.slug, label: m.name[lang] })),
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
              setProvince("all");
              setType("all");
              setMajor("all");
            }}
            className="rounded-lg px-2 py-1 text-brand underline underline-offset-2 hover:bg-brand-soft"
          >
            {dict.majors.clearFilters}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="card mt-4 p-8 text-center text-ink-soft">
          {dict.schools.noResults}
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ school, majorSlugs }) => (
            <SchoolCard
              key={school.slug}
              school={school}
              lang={lang}
              dict={dict}
              majorCount={majorSlugs.length}
            />
          ))}
        </div>
      )}
    </div>
  );
}
