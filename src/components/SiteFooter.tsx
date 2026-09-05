import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-16 bg-[#0F172A]">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/70 sm:px-6">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-sm font-bold text-[#0F172A]">
            ផ
          </span>
          <span className="font-semibold text-white tracking-tight">{dict.siteName}</span>
        </div>
        <p className="max-w-2xl">{dict.footer.disclaimer}</p>
        <p className="mt-3 text-white/50">
          {dict.siteName} · {dict.footer.builtFor} · {lang.toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
