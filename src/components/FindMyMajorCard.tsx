import Link from "next/link";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

interface FindMyMajorCardProps {
  lang: Locale;
  dict: Dictionary;
}

export function FindMyMajorCard({ lang, dict }: FindMyMajorCardProps) {
  const sampleCareers = [
    {
      title: lang === "km" ? "វិស្វករកម្មវិធី (Software)" : "Software Engineer",
      salary: "$500 – $2,000",
      demand: lang === "km" ? "ខ្ពស់ណាស់" : "Very high",
      color: "bg-emerald-500",
    },
    {
      title: lang === "km" ? "អ្នកជំនាញទីផ្សារឌីជីថល" : "Digital Marketer",
      salary: "$400 – $1,200",
      demand: lang === "km" ? "ខ្ពស់" : "High",
      color: "bg-amber-500",
    },
    {
      title: lang === "km" ? "អ្នកវិភាគទិន្នន័យ (Data)" : "Data Analyst",
      salary: "$450 – $1,800",
      demand: lang === "km" ? "ខ្ពស់ណាស់" : "Very high",
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-800 p-6 text-white shadow-xl sm:p-8">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left column: Information & survey concept */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            {lang === "km" ? "ឧបករណ៍ផ្គូផ្គងឆ្លាតវៃ" : "Smart Matching Tool"}
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {dict.home.findMyMajorTitle}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            {dict.home.findMyMajorBody}
          </p>

          {/* Quick survey simulation progress bar */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-medium">
                {lang === "km" ? "ការស្ទង់ចំណាប់អារម្មណ៍ និងជំនាញ" : "Skills & Interest Assessment"}
              </span>
              <span className="font-semibold text-gold">
                {lang === "km" ? "រហ័ស ៥ នាទី" : "Quick 5 mins"}
              </span>
            </div>
            {/* Progress bar visual */}
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-gold to-amber-400" />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              {lang === "km"
                ? "វិភាគចំណុចខ្លាំង មុខវិជ្ជាចូលចិត្ត និងប្រាក់ខែដែលអ្នកចង់បាន"
                : "Analyzes your strengths, favorite subjects, and target salary"}
            </p>
          </div>

          {/* Action button */}
          <div className="mt-6">
            <Link
              href={`/${lang}/majors`}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-amber-400 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>{dict.home.findMyMajorCta}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right column: Dynamic Preview of matching careers */}
        <div className="space-y-3 lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {lang === "km" ? "គន្លងអាជីពគំរូ និងតម្រូវការ" : "Sample Career Paths & Market Pay"}
          </p>

          {sampleCareers.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs transition-colors hover:bg-white/10"
            >
              <div>
                <p className="font-semibold text-white text-sm">{c.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{c.salary} / {lang === "km" ? "ខែ" : "mo"}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-slate-800/80 px-2.5 py-1 text-xs text-slate-200">
                <span className={`h-1.5 w-1.5 rounded-full ${c.color}`} />
                <span>{c.demand}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
