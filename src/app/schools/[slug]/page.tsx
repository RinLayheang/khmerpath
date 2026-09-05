import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getI18n } from "@/i18n/server";
import {
  fetchSchools,
  fetchSchoolBySlug,
  fetchMajorsForSchool,
} from "@/lib/api";
import { nearbySchools } from "@/lib/queries";
import { formatRange, localizeNumber } from "@/lib/format";
import { MajorCard } from "@/components/MajorCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export async function generateStaticParams() {
  const schools = await fetchSchools();
  return schools.map((school) => ({ slug: school.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = await fetchSchoolBySlug(slug);
  const { lang } = await getI18n();
  if (!school) return {};
  return {
    title: `${school.name[lang]} — KhmerPath`,
    description: school.summary[lang],
  };
}

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await fetchSchoolBySlug(slug);
  if (!school) notFound();

  const { lang, dict } = await getI18n();
  const [offered, allSchools] = await Promise.all([
    fetchMajorsForSchool(school.slug),
    fetchSchools(),
  ]);
  const nearby = nearbySchools(school, allSchools);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: dict.breadcrumb.home, href: "/" },
          { label: dict.schools.title, href: "/schools" },
          { label: school.name[lang] },
        ]}
      />

      <header className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-gold">
          {school.province[lang]} ·{" "}
          {school.type === "public" ? dict.schools.public : dict.schools.private}
          {school.founded
            ? ` · ${dict.schools.foundedIn} ${localizeNumber(school.founded, lang)}`
            : ""}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl text-ink">{school.name[lang]}</h1>
        <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">{school.summary[lang]}</p>
        {school.website && (
          <a
            href={school.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gold px-5 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition-all hover:bg-amber-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-slate-900"
          >
            {dict.schools.visitWebsite} ↗
          </a>
        )}
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <section className="card p-5">
          <h2 className="font-semibold">{dict.schools.tuition}</h2>
          <p className="mt-2 text-2xl font-bold tabular-nums text-ink">
            {formatRange(school.tuitionPerYear, lang)}
          </p>
          <p className="text-sm text-ink-faint">{dict.schools.perYear}</p>
        </section>

        <section className="card p-5">
          <h2 className="font-semibold">{dict.schools.scholarships}</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {(school.scholarships || []).map((item) => (
              <li key={item.en} className="flex gap-2">
                <span aria-hidden className="text-gold font-bold">
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
            {school.admissionNotes ? school.admissionNotes[lang] : ""}
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
                href={`/schools/${item.slug}`}
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
