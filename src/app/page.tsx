import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { fetchStats } from "@/lib/api";
import { localizeNumber } from "@/lib/format";
import { MajorCard } from "@/components/MajorCard";
import { FluidBackground } from "@/components/FluidBackground";
import { HeroSearch } from "@/components/HeroSearch";
import { FindMyMajorCard } from "@/components/FindMyMajorCard";
import { StudentJourney } from "@/components/StudentJourney";
import { UnblurTextReveal } from "@/components/UnblurTextReveal";

export default async function HomePage() {
  const { lang, dict } = await getI18n();

  const statsData = await fetchStats();
  const featured = statsData.topDemandMajors || [];

  const stats = [
    { value: statsData.totalMajors, label: dict.home.statMajors },
    { value: statsData.totalSchools, label: dict.home.statSchools },
    { value: statsData.totalCareers, label: dict.home.statCareers },
  ];

  return (
    <>
      {/* ── HERO SECTION WITH FLUID BACKGROUND & SMART SEARCH ───────── */}
      <section className="relative -mt-16 border-b border-line bg-gradient-to-b from-slate-100/80 via-white to-surface overflow-hidden pt-16">
        <FluidBackground />
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_form]:pointer-events-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-[#0F172A]">
            <span className="h-2 w-2 rounded-full bg-gold" />
            {dict.tagline}
          </div>

          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-ink leading-snug sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-[1.2] [html[lang='km']_&]:leading-[1.55]! sm:[html[lang='km']_&]:leading-[1.5]! lg:[html[lang='km']_&]:leading-[1.45]! [html[lang='km']_&]:tracking-normal! [html[lang='en']_&]:tracking-tight">
            <UnblurTextReveal
              text={dict.home.heroTitle}
              lang={lang}
              duration={1.4}
              delayStart={0.05}
            />
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg leading-relaxed">
            <UnblurTextReveal
              text={dict.home.heroBody}
              lang={lang}
              duration={2.0}
              delayStart={0.7}
            />
          </p>

          {/* Smart Search Bar */}
          <div className="animate-search-reveal mt-8">
            <HeroSearch
              lang={lang}
              dict={dict}
              suggestions={statsData.searchSuggestions}
            />
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/majors"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-bold text-slate-950 shadow transition-all hover:bg-amber-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-slate-900"
            >
              {dict.home.ctaMajors}
            </Link>
            <Link
              href="/schools"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-line bg-surface-raised/90 backdrop-blur-xs px-6 py-3 text-sm font-medium text-ink transition-all hover:border-ink hover:bg-surface-raised hover:shadow-xs focus-visible:outline-2 focus-visible:outline-gold"
            >
              {dict.home.ctaSchools}
            </Link>
          </div>

          {/* Stat counters */}
          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-line/60 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-3xl font-extrabold tabular-nums text-ink">
                  {localizeNumber(stat.value, lang)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── BENTO GRID SECTION: FIND MY MAJOR & HOW IT WORKS ───────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {/* Bento Featured Card: Find My Major Survey */}
        <FindMyMajorCard lang={lang} dict={dict} />

        {/* 3-Step Process Bento Cards */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
              {dict.home.howTitle}
            </h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {dict.home.howSteps.map((step, index) => (
              <div
                key={step.title}
                className="card flex flex-col justify-between p-6 transition-all hover:border-gold/60 hover:shadow-md"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-sm font-bold text-slate-900">
                    {localizeNumber(index + 1, lang)}
                  </div>
                  <h3 className="mt-4 font-bold text-ink text-base">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7-STAGE STUDENT JOURNEY WAYFINDER ───────────────────────── */}
      <div className="border-y border-line bg-surface-sunken/40">
        <StudentJourney lang={lang} dict={dict} />
      </div>

      {/* ── TRENDING MAJORS SECTION ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gold">
              {lang === "km" ? "ទីផ្សារការងារកម្ពុជា" : "Cambodia Job Market"}
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {dict.home.trendingTitle}
            </h2>
            <p className="mt-1 text-sm text-ink-soft">{dict.home.trendingBody}</p>
          </div>
          <Link
            href="/majors"
            className="inline-flex min-h-[44px] items-center text-sm font-semibold text-ink underline underline-offset-4 transition-colors hover:text-gold"
          >
            {dict.home.viewAll} →
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((major) => (
            <MajorCard key={major.slug} major={major} lang={lang} dict={dict} />
          ))}
        </div>
      </section>
    </>
  );
}
