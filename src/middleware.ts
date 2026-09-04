import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

/**
 * Every page lives under /km or /en. Anything else is redirected to the
 * visitor's preferred language, falling back to Khmer.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const accept = request.headers.get("accept-language") ?? "";
  const prefersEnglish = /\ben\b/i.test(accept) && !/\bkm\b/i.test(accept);
  const locale = prefersEnglish ? "en" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API surface and anything that looks like a file.
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
