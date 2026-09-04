# KhmerPath · ផ្លូវខ្ញុំ

A bilingual (Khmer / English) website that helps Cambodian high school graduates
decide what to study: **which major**, **which university**, and **what the job
actually pays**.

- **Major explorer** — 33 majors with the careers they lead to, entry and
  mid-career salary ranges in USD/month, market demand, subjects to strengthen
  before applying, and which schools teach them.
- **University directory** — 22 Cambodian institutions with tuition per year,
  province, public/private, scholarships, admission notes, and majors offered.
- **Khmer ⇄ English toggle** on every page, keeping the reader on the same page.

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000 → redirects to /km
```

Other scripts:

```bash
npm run build       # production build (fully static: 121 pages)
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit
npm run check:data  # validate the dataset (slugs, ranges, translations)
```

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No database
and no API — every page is prerendered at build time, so it deploys to Vercel,
Netlify, Cloudflare Pages or any static-capable host with zero config.

## How it's organised

```
src/
  app/[lang]/            every route lives under /km or /en
    page.tsx             home
    majors/              explorer + detail pages
    schools/             directory + detail pages
    about/
  components/            UI: cards, filters, salary bars, language toggle
  data/
    majors.ts            ← the majors + careers + salary dataset
    schools.ts           ← the universities dataset
  i18n/
    config.ts            locales
    dictionaries.ts      ← all UI strings (km + en)
  lib/
    types.ts             domain types
    format.ts            money, Khmer numerals, bar scaling
    queries.ts           relationships between majors and schools
  middleware.ts          sends "/" to the visitor's language
scripts/
  check-data.ts          data integrity check
```

### The two languages

Every user-facing string is a `LocalizedText` — `{ km, en }`. Data strings live
in `src/data`; chrome (nav, labels, buttons) lives in
`src/i18n/dictionaries.ts`. Adding a third language means adding one key to
`locales`, one entry in `dictionaries`, and one field to every `LocalizedText`
(TypeScript will list every place you missed).

Khmer needs more vertical room than Latin, so `globals.css` raises line-height
on `[lang="km"]` and loads Noto Sans Khmer. Numbers are rendered in Khmer
numerals in Khmer mode via `localizeNumber()`.

## Adding or editing data

**A new major** — add one object to the `majors` array in `src/data/majors.ts`.
The type will tell you what's required. `schoolSlugs` and the schools'
`majorSlugs` are merged in `lib/queries.ts`, so declaring the link on either
side is enough.

**A new university** — add one object to `schools` in `src/data/schools.ts`.

Then run `npm run check:data`. It catches typo'd slugs, duplicates, inverted
salary ranges, missing translations, and majors nobody teaches.

## About the numbers

Salary figures are **indicative ranges, not quotes**: USD per month, gross,
full-time, for a Khmer national working in Phnom Penh. Provincial roles
typically run 20–40% lower; INGOs and foreign-invested employers run higher.
"Entry" means the first 1–2 years; "experienced" means roughly five years in.

They were compiled from Cambodian labour-market reporting and public job
postings (see sources below) and then spread across roles using the structure
of the local market. Tuition is undergraduate, per academic year, for the
standard non-international track — schools price per credit and per faculty, so
the ranges are wide by design.

**Before this goes live to students, replace the estimates with figures you can
stand behind.** The best sources to pull from:

- National Employment Agency (NEA) labour-market and skills-shortage reports
- Ministry of Education (MoEYS) and each university's own fee schedule
- Live postings on Bongthom, CamHR and LinkedIn Cambodia
- Recruiter salary guides (MyWorld, HRINC) for mid-career bands

Every figure sits in one of two files, so a data refresh never touches the UI.

## Ideas for the next version

- An interest quiz that suggests majors (data model already supports it:
  `goodFitIf`, `keySkills`, `category`).
- Side-by-side compare for two or three majors or schools.
- Real graduate-outcome data per school, if MoEYS or the universities publish it.
- Move `src/data` behind a small CMS so non-developers can update salaries.

## Sources

- [Cambodia Average Salaries by Industry — Expat Life Cambodia](https://www.expatlifecambodia.com/cambodia-average-salaries-by-industry/)
- [Best Jobs for Fresh Graduates in Cambodia](https://thetalent4u.com/insights/best-jobs-for-fresh-graduates)
- [Hiring Trends in Cambodia 2026 — MyWorld Careers](https://www.myworld-careers.com/blog/hiring-trends-in-cambodia-2026-what-employers-need-to-know)
- [Top Universities in Cambodia — uniRank](https://www.unirank.org/kh/ranking/)
- [List of universities in Cambodia — Wikipedia](https://en.wikipedia.org/wiki/List_of_universities_in_Cambodia)
