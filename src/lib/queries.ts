import { majors, majorBySlug } from "@/data/majors";
import { schools, schoolBySlug } from "@/data/schools";
import type { Major, School } from "./types";
import { midpoint } from "./format";

/**
 * Majors and schools each point at the other. Rather than trusting both lists
 * to stay in sync by hand, the links are merged: a pairing counts if either
 * side declares it. That way adding a major to a school is enough.
 */
const majorToSchools = new Map<string, Set<string>>();
const schoolToMajors = new Map<string, Set<string>>();

function link(majorSlug: string, schoolSlug: string) {
  if (!majorBySlug.has(majorSlug) || !schoolBySlug.has(schoolSlug)) return;
  if (!majorToSchools.has(majorSlug)) majorToSchools.set(majorSlug, new Set());
  if (!schoolToMajors.has(schoolSlug)) schoolToMajors.set(schoolSlug, new Set());
  majorToSchools.get(majorSlug)!.add(schoolSlug);
  schoolToMajors.get(schoolSlug)!.add(majorSlug);
}

for (const major of majors) {
  for (const schoolSlug of major.schoolSlugs) link(major.slug, schoolSlug);
}
for (const school of schools) {
  for (const majorSlug of school.majorSlugs) link(majorSlug, school.slug);
}

export function schoolsForMajor(majorSlug: string): School[] {
  const slugs = majorToSchools.get(majorSlug) ?? new Set<string>();
  return schools.filter((s) => slugs.has(s.slug));
}

export function majorsForSchool(schoolSlug: string): Major[] {
  const slugs = schoolToMajors.get(schoolSlug) ?? new Set<string>();
  return majors.filter((m) => slugs.has(m.slug));
}

export function relatedMajors(major: Major): Major[] {
  return major.relatedMajors
    .map((slug) => majorBySlug.get(slug))
    .filter((m): m is Major => Boolean(m));
}

/** Other schools in the same province, for the "where else" block. */
export function nearbySchools(school: School, limit = 4): School[] {
  return schools
    .filter((s) => s.slug !== school.slug && s.province.en === school.province.en)
    .slice(0, limit);
}

/** Highest experienced-salary midpoint in the dataset — the bar chart scale. */
export const maxSalaryMidpoint = Math.max(
  ...majors.flatMap((m) => m.careers.map((c) => midpoint(c.experienced))),
);

export const totalCareers = majors.reduce((n, m) => n + m.careers.length, 0);

const demandRank = { "very-high": 0, high: 1, medium: 2, low: 3 } as const;

/** Majors the market wants most, highest paying first within each demand tier. */
export function topDemandMajors(limit = 6): Major[] {
  return [...majors]
    .sort((a, b) => {
      const byDemand = demandRank[a.demand] - demandRank[b.demand];
      if (byDemand !== 0) return byDemand;
      return midpoint(b.midSalary) - midpoint(a.midSalary);
    })
    .slice(0, limit);
}

export const provinces = Array.from(
  new Map(schools.map((s) => [s.province.en, s.province])).values(),
).sort((a, b) => a.en.localeCompare(b.en));
