import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { majors } from "@/data/majors";
import { MajorExplorer } from "@/components/MajorExplorer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function MajorsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{dict.majors.title}</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">{dict.majors.subtitle}</p>

      <div className="mt-6">
        <MajorExplorer majors={majors} lang={lang} dict={dict} />
      </div>
    </div>
  );
}
