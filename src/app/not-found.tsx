import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-extrabold text-ink">404</h1>
      <p className="mt-3 text-ink-soft">
        រកមិនឃើញទំព័រនេះទេ · This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gold px-6 py-3 text-sm font-bold text-slate-950 shadow transition-all hover:bg-amber-400"
      >
        ត្រឡប់ទៅទំព័រដើម · Back home
      </Link>
    </div>
  );
}
