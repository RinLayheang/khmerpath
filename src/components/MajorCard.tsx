import Link from "next/link";
import type { Locale, Major } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatRange, localizeNumber } from "@/lib/format";
import { DemandBadge } from "./DemandBadge";

export function MajorCard({
  major,
  lang,
  dict,
}: {
  major: Major;
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={`/${lang}/majors/${major.slug}`}
      className="card card-link flex flex-col gap-3 p-5 hover:border-[#0F172A]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gold">
            {dict.category[major.category]}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{major.name[lang]}</h3>
        </div>
      </div>

      <p className="text-sm text-ink-soft">{major.summary[lang]}</p>

      <div className="mt-auto grid grid-cols-2 gap-3 border-t border-line pt-3 text-sm">
        <div>
          <p className="text-xs text-ink-faint">{dict.major.entrySalary}</p>
          <p className="font-semibold tabular-nums">
            {formatRange(major.entrySalary, lang)}
          </p>
        </div>
        <div>
          <p className="text-xs text-ink-faint">{dict.major.studyLength}</p>
          <p className="font-semibold">
            {localizeNumber(major.studyYears, lang)} {dict.major.years}
          </p>
        </div>
      </div>

      <DemandBadge level={major.demand} dict={dict} />
    </Link>
  );
}
