import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  fetchMajors,
  fetchMajorBySlug,
  fetchSchoolsForMajor,
} from "@/lib/api";
import {
  relatedMajors,
  maxSalaryMidpoint,
} from "@/lib/queries";
import { formatRange, localizeNumber } from "@/lib/format";
import { DemandBadge } from "@/components/DemandBadge";
import { SalaryBar } from "@/components/SalaryBar";
import { SchoolCard } from "@/components/SchoolCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export async function generateStaticParams() {
  const majors = await fetchMajors();
  return locales.flatMap((lang) =>
    majors.map((major) => ({ lang, slug: major.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const major = await fetchMajorBySlug(slug);
  if (!major || !isLocale(lang)) return {};
  return {
    title: `${major.name[lang]} — KhmerPath`,
    description: major.summary[lang],
  };
}

export default async function MajorDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const major = await fetchMajorBySlug(slug);
  if (!major) notFound();

  const dict = getDictionary(lang);
  const whereToStudy = await fetchSchoolsForMajor(major.slug);
  const allMajors = await fetchMajors();
  const related = relatedMajors(major, allMajors);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: dict.breadcrumb.home, href: `/${lang}` },
          { label: dict.majors.title, href: `/${lang}/majors` },
          { label: major.name[lang] },
        ]}
      />

      <header className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-gold">
          {dict.category[major.category as keyof typeof dict.category] || major.category}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl text-ink">{major.name[lang]}</h1>
        <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">{major.description[lang]}</p>
      </header>

      {/* Key numbers */}
      <div className="mt-7 grid gap-4 sm:grid-cols-4">
        <div className="card p-4">
          <p className="text-xs text-ink-faint">{dict.major.entrySalary}</p>
          <p className="mt-1 text-lg font-bold tabular-nums">
            {formatRange(major.entrySalary, lang)}
          </p>
          <p className="text-xs text-ink-faint">{dict.major.perMonth}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-ink-faint">{dict.major.midSalary}</p>
          <p className="mt-1 text-lg font-bold tabular-nums text-brand-deep">
            {formatRange(major.midSalary, lang)}
          </p>
          <p className="text-xs text-ink-faint">{dict.major.perMonth}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-ink-faint">{dict.major.studyLength}</p>
          <p className="mt-1 text-lg font-bold">
            {localizeNumber(major.studyYears, lang)} {dict.major.years}
          </p>
        </div>
        <div className="card flex flex-col justify-between p-4">
          <p className="text-xs text-ink-faint">{dict.major.demand}</p>
          <div className="mt-2">
            <DemandBadge level={major.demand} dict={dict} size="md" />
          </div>
        </div>
      </div>

      {/* Fit, skills, subjects */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <section className="card p-5">
          <h2 className="font-semibold">{dict.major.goodFitIf}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {(major.goodFitIf || []).map((item) => (
              <li key={item.en} className="flex gap-2">
                <span aria-hidden className="text-gold font-bold">
                  ✓
                </span>
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">{dict.major.keySkills}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {(major.keySkills || []).map((skill) => (
              <li
                key={skill.en}
                className="rounded-lg bg-surface-sunken px-2.5 py-1 text-sm text-ink-soft"
              >
                {skill[lang]}
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">{dict.major.subjects}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {(major.subjectsToStrengthen || []).map((subject) => (
              <li
                key={subject.en}
                className="rounded-lg bg-gold/15 px-2.5 py-1 text-sm font-medium text-slate-900"
              >
                {subject[lang]}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Careers */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold sm:text-2xl">{dict.major.careers}</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-soft">
          {dict.major.careersNote}
        </p>

        <div className="mt-5 space-y-4">
          {(major.careers || []).map((career) => (
            <article key={career.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">{career.title[lang]}</h3>
                <DemandBadge level={career.demand} dict={dict} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SalaryBar
                  label={dict.major.tableEntry}
                  range={career.entry}
                  max={maxSalaryMidpoint}
                  locale={lang}
                  tone="accent"
                />
                <SalaryBar
                  label={dict.major.tableExperienced}
                  range={career.experienced}
                  max={maxSalaryMidpoint}
                  locale={lang}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Where to study */}
      {whereToStudy.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {dict.major.whereToStudy}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whereToStudy.map((school) => (
              <SchoolCard
                key={school.slug}
                school={school}
                lang={lang}
                dict={dict}
                majorCount={school.majorSlugs?.length || 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold sm:text-2xl">{dict.major.related}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/majors/${item.slug}`}
                className="card card-link px-4 py-2 text-sm font-medium"
              >
                {item.name[lang]}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
