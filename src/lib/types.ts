/**
 * Core domain types for KhmerPath.
 *
 * Everything user-facing is a `LocalizedText` so the whole site can be
 * rendered in Khmer or English from the same data. Money is always USD per
 * month for salaries and USD per year for tuition, because that is how the
 * Cambodian market quotes them.
 */

export type Locale = "km" | "en";

export type LocalizedText = {
  km: string;
  en: string;
};

/** An inclusive money range. Salaries: USD/month. Tuition: USD/year. */
export type Range = {
  min: number;
  max: number;
};

export type DemandLevel = "very-high" | "high" | "medium" | "low";

export type MajorCategory =
  | "technology"
  | "engineering"
  | "business"
  | "health"
  | "science"
  | "social"
  | "arts"
  | "agriculture"
  | "education"
  | "hospitality";

export type SchoolType = "public" | "private";

/** A job a graduate of a major realistically lands in Cambodia. */
export interface Career {
  id: string;
  title: LocalizedText;
  /** Typical pay in the first 1-2 years, USD/month. */
  entry: Range;
  /** Typical pay after roughly 5 years, USD/month. */
  experienced: Range;
  demand: DemandLevel;
}

export interface Major {
  slug: string;
  name: LocalizedText;
  category: MajorCategory;
  /** One line shown on cards. */
  summary: LocalizedText;
  /** A few sentences shown on the detail page. */
  description: LocalizedText;
  /** Typical length of a bachelor's degree in Cambodia. */
  studyYears: number;
  /** Aggregate entry-level pay across the careers below, USD/month. */
  entrySalary: Range;
  /** Aggregate mid-career pay, USD/month. */
  midSalary: Range;
  demand: DemandLevel;
  /** "This might fit you if..." bullets, written for a 17-year-old. */
  goodFitIf: LocalizedText[];
  keySkills: LocalizedText[];
  /** Bac II subjects worth being strong in before applying. */
  subjectsToStrengthen: LocalizedText[];
  careers: Career[];
  /** Slugs of schools in `data/schools.ts` that teach this major. */
  schoolSlugs: string[];
  /** Slugs of other majors worth a look. */
  relatedMajors: string[];
}

export interface School {
  slug: string;
  name: LocalizedText;
  /** Common abbreviation, e.g. "RUPP". Used in compact UI. */
  shortName: string;
  province: LocalizedText;
  type: SchoolType;
  founded?: number;
  website: string;
  summary: LocalizedText;
  /** Undergraduate tuition, USD per academic year. */
  tuitionPerYear: Range;
  /** Scholarship routes students actually use. */
  scholarships: LocalizedText[];
  /** Slugs of majors in `data/majors.ts` offered here. */
  majorSlugs: string[];
  admissionNotes: LocalizedText;
}
