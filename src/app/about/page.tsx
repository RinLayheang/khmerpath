import { getI18n } from "@/i18n/server";

export default async function AboutPage() {
  const { dict } = await getI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{dict.about.title}</h1>
      <p className="mt-4 text-ink-soft leading-relaxed">{dict.about.body}</p>

      <section className="card mt-8 p-6">
        <h2 className="font-semibold text-ink text-lg">{dict.about.dataTitle}</h2>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">{dict.about.dataBody}</p>
      </section>

      <section className="card mt-4 p-6">
        <h2 className="font-semibold text-ink text-lg">{dict.about.contribTitle}</h2>
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">{dict.about.contribBody}</p>
      </section>
    </div>
  );
}
