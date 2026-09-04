import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { schools, getSchool } from "@/data/schools";
import { majorsForSchool, nearbySchools } from "@/lib/queries";
import { formatRange, localizeNumber } from "@/lib/format";
import { MajorCard } from "@/components/MajorCard";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    schools.map((school) => ({ lang, slug: school.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const school = getSchool(slug);
  if (!school || !isLocale(lang)) return {};
  return {
    title: `${school.name[lang]} — KhmerPath`,
    description: school.summary[lang],
  };
}

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const school = getSchool(slug);
  if (!school) notFound();

  const dict = getDictionary(lang);
  const offered = majorsForSchool(school.slug);
  const nearby = nearbySchools(school);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href={`/${lang}/schools`}
        className="text-sm text-ink-soft underline underline-offset-4 hover:text-brand"
      >
        ← {dict.schools.title}
      </Link>

      <header className="mt-4">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {school.province[lang]} ·{" "}
          {school.type === "public" ? dict.schools.public : dict.schools.private}
          {school.founded
            ? ` · ${dict.schools.foundedIn} ${localizeNumber(school.founded, lang)}`
            : ""}
        </p>
        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">{school.name[lang]}</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">{school.summary[lang]}</p>
        <a
          href={school.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
        >
          {dict.schools.visitWebsite} ↗
        </a>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <section className="card p-5">
          <h2 className="font-semibold">{dict.schools.tuition}</h2>
          <p className="mt-2 text-2xl font-bold tabular-nums">
            {formatRange(school.tuitionPerYear, lang)}
          </p>
          <p className="text-sm text-ink-faint">{dict.schools.perYear}</p>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">{dict.schools.scholarships}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {school.scholarships.map((item) => (
              <li key={item.en} className="flex gap-2">
                <span aria-hidden className="text-brand">
                  ★
                </span>
                <span>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">{dict.schools.admission}</h2>
          <p className="mt-3 text-sm text-ink-soft">
            {school.admissionNotes[lang]}
          </p>
        </section>
      </div>

      {offered.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {dict.schools.majorsOffered}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offered.map((major) => (
              <MajorCard key={major.slug} major={major} lang={lang} dict={dict} />
            ))}
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {dict.schools.relatedSchools}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {nearby.map((item) => (
              <Link
                key={item.slug}
                href={`/${lang}/schools/${item.slug}`}
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
