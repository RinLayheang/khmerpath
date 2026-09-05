import { getI18n } from "@/i18n/server";
import { fetchMajors } from "@/lib/api";
import { MajorExplorer } from "@/components/MajorExplorer";

export default async function MajorsPage() {
  const { lang, dict } = await getI18n();
  const majors = await fetchMajors();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl text-ink">{dict.majors.title}</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{dict.majors.subtitle}</p>

      <div className="mt-6">
        <MajorExplorer majors={majors} lang={lang} dict={dict} />
      </div>
    </div>
  );
}
