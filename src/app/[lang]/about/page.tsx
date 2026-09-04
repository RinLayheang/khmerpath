import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{dict.about.title}</h1>
      <p className="mt-4 text-ink-soft">{dict.about.body}</p>

      <section className="card mt-8 p-5">
        <h2 className="font-semibold">{dict.about.dataTitle}</h2>
        <p className="mt-2 text-sm text-ink-soft">{dict.about.dataBody}</p>
      </section>

      <section className="card mt-4 p-5">
        <h2 className="font-semibold">{dict.about.contribTitle}</h2>
        <p className="mt-2 text-sm text-ink-soft">{dict.about.contribBody}</p>
      </section>
    </div>
  );
}
