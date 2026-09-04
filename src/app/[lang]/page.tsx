import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { majors } from "@/data/majors";
import { schools } from "@/data/schools";
import { topDemandMajors, totalCareers } from "@/lib/queries";
import { localizeNumber } from "@/lib/format";
import { MajorCard } from "@/components/MajorCard";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const featured = topDemandMajors(6);

  const stats = [
    { value: majors.length, label: dict.home.statMajors },
    { value: schools.length, label: dict.home.statSchools },
    { value: totalCareers, label: dict.home.statCareers },
  ];

  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-brand-soft/60 to-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-medium text-brand-deep">{dict.tagline}</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-5xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mt-4 max-w-xl text-base text-ink-soft sm:text-lg">
            {dict.home.heroBody}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/${lang}/majors`}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
            >
              {dict.home.ctaMajors}
            </Link>
            <Link
              href={`/${lang}/schools`}
              className="rounded-xl border border-line bg-surface-raised px-5 py-3 text-sm font-medium transition-colors hover:border-brand"
            >
              {dict.home.ctaSchools}
            </Link>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-ink-soft">{stat.label}</dt>
                <dd className="text-2xl font-bold tabular-nums">
                  {localizeNumber(stat.value, lang)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-semibold sm:text-2xl">{dict.home.howTitle}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {dict.home.howSteps.map((step) => (
            <div key={step.title} className="card p-5">
              <h3 className="font-semibold text-brand-deep">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">
              {dict.home.trendingTitle}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{dict.home.trendingBody}</p>
          </div>
          <Link
            href={`/${lang}/majors`}
            className="text-sm font-medium text-brand underline underline-offset-4"
          >
            {dict.home.viewAll} →
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((major) => (
            <MajorCard key={major.slug} major={major} lang={lang} dict={dict} />
          ))}
        </div>
      </section>
    </>
  );
}
