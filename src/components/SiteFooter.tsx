import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-16 border-t border-line bg-surface-sunken">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-ink-soft sm:px-6">
        <p className="max-w-2xl">{dict.footer.disclaimer}</p>
        <p className="mt-3 text-ink-faint">
          {dict.siteName} · {dict.footer.builtFor} · {lang.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
