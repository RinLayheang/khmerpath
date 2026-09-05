import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fetchSchools, fetchMajors } from "@/lib/api";
import { majorsForSchool, getProvinces } from "@/lib/queries";
import { SchoolDirectory } from "@/components/SchoolDirectory";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function SchoolsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const [schools, majors] = await Promise.all([fetchSchools(), fetchMajors()]);
  const provinces = getProvinces(schools);

  // Resolve the school-major links on the server.
  const entries = schools.map((school) => ({
    school,
    majorSlugs: majorsForSchool(school, majors).map((m) => m.slug),
  }));

  const majorOptions = majors
    .map((m) => ({ slug: m.slug, name: m.name }))
    .sort((a, b) => a.name[lang].localeCompare(b.name[lang]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{dict.schools.title}</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{dict.schools.subtitle}</p>

      <div className="mt-6">
        <SchoolDirectory
          entries={entries}
          provinces={provinces}
          majorOptions={majorOptions}
          lang={lang}
          dict={dict}
        />
      </div>
    </div>
  );
}
