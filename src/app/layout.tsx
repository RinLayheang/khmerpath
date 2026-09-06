import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { googleSans } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "KhmerPath — ផ្លូវខ្ញុំ",
  description:
    "Majors, universities and real salary ranges for Cambodian high school graduates.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang, dict } = await getI18n();
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  const isDark = theme === "dark";

  return (
    <html lang={lang} className={`${googleSans.variable} ${isDark ? "dark" : ""}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme') || (document.cookie.match(/(?:^|;\\s*)theme=([^;]+)/)||[])[1];
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else if (t === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-surface text-ink font-sans">
        <SiteHeader lang={lang} dict={dict} />
        <main className="flex-1 pt-16">{children}</main>
        <SiteFooter lang={lang} dict={dict} />
      </body>
    </html>
  );
}
