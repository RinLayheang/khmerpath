import Link from "next/link";
import type { Locale, School } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatRange, localizeNumber } from "@/lib/format";

export function SchoolCard({
  school,
  lang,
  dict,
  majorCount,
}: {
  school: School;
  lang: Locale;
  dict: Dictionary;
  majorCount: number;
}) {
  return (
    <Link
      href={`/${lang}/schools/${school.slug}`}
      className="card card-link flex flex-col gap-3 p-5 hover:border-[#0F172A]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gold">
            {school.province[lang]} ·{" "}
            {school.type === "public" ? dict.schools.public : dict.schools.private}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{school.name[lang]}</h3>
        </div>
        <span className="shrink-0 rounded-md bg-surface-sunken px-2 py-1 text-xs font-medium text-ink-soft">
          {school.shortName}
        </span>
      </div>

      <p className="text-sm text-ink-soft">{school.summary[lang]}</p>

      <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
        <div>
          <p className="text-xs text-ink-faint">
            {dict.schools.tuition} · {dict.schools.perYear}
          </p>
          <p className="font-semibold tabular-nums">
            {formatRange(school.tuitionPerYear, lang)}
          </p>
        </div>
        <div>
          <p className="text-xs text-ink-faint">{dict.schools.majorsOffered}</p>
          <p className="font-semibold tabular-nums">
            {localizeNumber(majorCount, lang)}
          </p>
        </div>
      </div>
    </Link>
  );
}
