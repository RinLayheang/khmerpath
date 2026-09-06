import Link from "next/link";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

interface StudentJourneyProps {
  lang: Locale;
  dict: Dictionary;
}

interface StageItem {
  number: number;
  title: string;
  body: string;
  href?: string;
  active: boolean;
}

export function StudentJourney({ lang, dict }: StudentJourneyProps) {
  const stagesData = dict.home.journeyStages || [];

  const stages: StageItem[] = [
    {
      number: 1,
      title: stagesData[0]?.title || (lang === "km" ? "រកឃើញ" : "Discover"),
      body: stagesData[0]?.body || (lang === "km" ? "ស្វែងរកជំនាញ និងសាកលវិទ្យាល័យ" : "Explore majors & universities"),
      href: "/majors",
      active: true,
    },
    {
      number: 2,
      title: stagesData[1]?.title || (lang === "km" ? "ប្រៀបធៀប" : "Compare"),
      body: stagesData[1]?.body || (lang === "km" ? "ប្រៀបធៀបជំនាញ ប្រាក់ខែ និងអនាគត" : "Compare salaries & career paths"),
      href: "/majors",
      active: true,
    },
    {
      number: 3,
      title: stagesData[2]?.title || (lang === "km" ? "សម្រេចចិត្ត" : "Decide"),
      body: stagesData[2]?.body || (lang === "km" ? "ជ្រើសរើសជំនាញ និងសាលា" : "Review tuition & scholarships"),
      href: "/schools",
      active: true,
    },
    {
      number: 4,
      title: stagesData[3]?.title || (lang === "km" ? "ចុះឈ្មោះ" : "Enroll"),
      body: stagesData[3]?.body || (lang === "km" ? "ដាក់ពាក្យ និងរៀបចំមុនចូលរៀន" : "Application & orientation hub"),
      active: false,
    },
    {
      number: 5,
      title: stagesData[4]?.title || (lang === "km" ? "សិក្សា" : "Study"),
      body: stagesData[4]?.body || (lang === "km" ? "រៀន ស្រាវជ្រាវ និងកសាងជំនាញ" : "Faculty & course engagement"),
      active: false,
    },
    {
      number: 6,
      title: stagesData[5]?.title || (lang === "km" ? "បញ្ចប់ការសិក្សា" : "Graduate"),
      body: stagesData[5]?.body || (lang === "km" ? "ទទួលសញ្ញាបត្រ និងចាប់ផ្ដើមអាជីព" : "Internships & job board"),
      active: false,
    },
    {
      number: 7,
      title: stagesData[6]?.title || (lang === "km" ? "អតីតនិស្សិត" : "Connect"),
      body: stagesData[6]?.body || (lang === "km" ? "ភ្ជាប់ និងជួយសិស្សថ្មី" : "Alumni network & mentorship"),
      active: false,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold">
            {lang === "km" ? "ផែនទីបង្ហាញផ្លូវ ៧ ដំណាក់កាល" : "7-Stage Student Journey Wayfinder"}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {dict.home.journeyTitle}
          </h2>
        </div>
        <p className="text-xs text-ink-faint">
          {lang === "km" ? "ចាប់ពីការជ្រើសរើស រហូតដល់ជោគជ័យក្នុងអាជីព" : "From high school graduation to career success"}
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
        {stages.map((stage) => {
          const content = (
            <div
              className={`flex h-full flex-col justify-between rounded-xl border p-4 transition-all ${
                stage.active
                  ? "border-line bg-surface-raised shadow-xs hover:border-gold hover:shadow-md"
                  : "border-dashed border-line/70 bg-surface-sunken/40 opacity-70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      stage.active
                        ? "bg-slate-900 text-gold dark:bg-amber-400/20 dark:text-amber-300"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {stage.number}
                  </span>
                  {!stage.active && (
                    <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {dict.home.comingSoon}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-semibold text-ink text-sm">
                  {stage.title}
                </h3>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  {stage.body}
                </p>
              </div>

              {stage.active && (
                <div className="mt-3 text-xs font-medium text-gold hover:underline">
                  {lang === "km" ? "ស្វែងយល់ →" : "Explore →"}
                </div>
              )}
            </div>
          );

          return stage.href ? (
            <Link
              key={stage.number}
              href={stage.href}
              className="block group"
            >
              {content}
            </Link>
          ) : (
            <div key={stage.number} className="block">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
