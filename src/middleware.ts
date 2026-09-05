import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Cookie-based language routing:
 * 1. Clean URLs: No /en or /km in the address bar.
 * 2. If a legacy request arrives with /km, /en, or /kh, redirect to the clean path
 *    and set the 'locale' cookie.
 * 3. Otherwise, if the cookie is missing, set the cookie (default 'km' or browser preference)
 *    and proceed.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle legacy /km, /en, /kh prefix redirects
  const match = pathname.match(/^\/(km|en|kh)(\/.*)?$/);
  if (match) {
    const rawLocale = match[1];
    const targetLocale = rawLocale === "kh" ? "km" : rawLocale;
    const cleanPath = match[2] || "/";

    const url = request.nextUrl.clone();
    url.pathname = cleanPath;

    const response = NextResponse.redirect(url);
    response.cookies.set("locale", targetLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
    return response;
  }

  // Ensure cookie exists for first-time visitors
  const cookieLocale = request.cookies.get("locale")?.value;
  if (!cookieLocale || !isLocale(cookieLocale)) {
    const accept = request.headers.get("accept-language") ?? "";
    const prefersEnglish = /\ben\b/i.test(accept) && !/\bkm\b/i.test(accept);
    const locale = prefersEnglish ? "en" : defaultLocale;

    const response = NextResponse.next();
    response.cookies.set("locale", locale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
