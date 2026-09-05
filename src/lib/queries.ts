import type { Major, School, LocalizedText } from "./types";
import { midpoint } from "./format";

/**
 * Filter schools teaching a major from a list of schools.
 */
export function schoolsForMajor(major: Major, allSchools: School[]): School[] {
  const schoolSlugs = new Set(major.schoolSlugs || []);
  return allSchools.filter(
    (s) => schoolSlugs.has(s.slug) || (s.majorSlugs && s.majorSlugs.includes(major.slug))
  );
}

/**
 * Filter majors offered by a school from a list of majors.
 */
export function majorsForSchool(school: School, allMajors: Major[]): Major[] {
  const majorSlugs = new Set(school.majorSlugs || []);
  return allMajors.filter(
    (m) => majorSlugs.has(m.slug) || (m.schoolSlugs && m.schoolSlugs.includes(school.slug))
  );
}

export function relatedMajors(major: Major, allMajors: Major[]): Major[] {
  const majorBySlug = new Map(allMajors.map((m) => [m.slug, m]));
  return (major.relatedMajors || [])
    .map((slug) => majorBySlug.get(slug))
    .filter((m): m is Major => Boolean(m));
}

/** Other schools in the same province, for the "where else" block. */
export function nearbySchools(school: School, allSchools: School[], limit = 4): School[] {
  return allSchools
    .filter((s) => s.slug !== school.slug && s.province?.en === school.province?.en)
    .slice(0, limit);
}

/** Highest experienced-salary midpoint in the dataset — the bar chart scale. */
export const maxSalaryMidpoint = 2500;

export function getMaxSalaryMidpoint(majors: Major[]): number {
  if (majors.length === 0) return maxSalaryMidpoint;
  const midpoints = majors.flatMap((m) => (m.careers || []).map((c) => midpoint(c.experienced)));
  return midpoints.length > 0 ? Math.max(...midpoints) : maxSalaryMidpoint;
}

export function getTotalCareers(majors: Major[]): number {
  return majors.reduce((n, m) => n + (m.careers ? m.careers.length : 0), 0);
}

const demandRank = { "very-high": 0, high: 1, medium: 2, low: 3 } as const;

/** Majors the market wants most, highest paying first within each demand tier. */
export function topDemandMajors(majors: Major[], limit = 6): Major[] {
  return [...majors]
    .sort((a, b) => {
      const rankA = a.demand in demandRank ? demandRank[a.demand] : 99;
      const rankB = b.demand in demandRank ? demandRank[b.demand] : 99;
      const byDemand = rankA - rankB;
      if (byDemand !== 0) return byDemand;
      return midpoint(b.midSalary) - midpoint(a.midSalary);
    })
    .slice(0, limit);
}

export function getProvinces(schools: School[]): LocalizedText[] {
  return Array.from(
    new Map(
      schools
        .filter((s) => s.province && s.province.en)
        .map((s) => [s.province.en, s.province])
    ).values()
  ).sort((a, b) => a.en.localeCompare(b.en));
}
