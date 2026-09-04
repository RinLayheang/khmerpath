import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-3 text-ink-soft">
        រកមិនឃើញទំព័រនេះទេ · This page doesn&apos;t exist.
      </p>
      <Link
        href="/km"
        className="mt-6 inline-block rounded-xl bg-brand px-5 py-3 text-sm font-medium text-white"
      >
        ត្រឡប់ទៅទំព័រដើម · Back home
      </Link>
    </div>
  );
}
