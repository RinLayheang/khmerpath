/**
 * Data integrity check. Run with: npm run check:data
 *
 * Catches the mistakes that are easy to make when adding a major or a school
 * by hand: a typo'd slug, a duplicate, a salary range with min > max, or a
 * missing translation.
 */
import { majors } from "../src/data/majors.ts";
import { schools } from "../src/data/schools.ts";

const errors: string[] = [];
const warnings: string[] = [];

const majorSlugs = new Set(majors.map((m) => m.slug));
const schoolSlugs = new Set(schools.map((s) => s.slug));

if (majorSlugs.size !== majors.length) errors.push("Duplicate major slug found.");
if (schoolSlugs.size !== schools.length) errors.push("Duplicate school slug found.");

function checkRange(where: string, range: { min: number; max: number }) {
  if (range.min > range.max) errors.push(`${where}: min (${range.min}) > max (${range.max}).`);
  if (range.max <= 0) errors.push(`${where}: max must be positive.`);
}

function checkText(where: string, text: { km: string; en: string }) {
  if (!text.km.trim()) errors.push(`${where}: missing Khmer text.`);
  if (!text.en.trim()) errors.push(`${where}: missing English text.`);
}

for (const major of majors) {
  checkText(`major ${major.slug} name`, major.name);
  checkText(`major ${major.slug} summary`, major.summary);
  checkText(`major ${major.slug} description`, major.description);
  checkRange(`major ${major.slug} entrySalary`, major.entrySalary);
  checkRange(`major ${major.slug} midSalary`, major.midSalary);

  if (major.careers.length === 0) warnings.push(`major ${major.slug} has no careers.`);

  for (const career of major.careers) {
    checkText(`career ${major.slug}/${career.id}`, career.title);
    checkRange(`career ${major.slug}/${career.id} entry`, career.entry);
    checkRange(`career ${major.slug}/${career.id} experienced`, career.experienced);
  }

  for (const slug of major.schoolSlugs) {
    if (!schoolSlugs.has(slug)) errors.push(`major ${major.slug} points at unknown school "${slug}".`);
  }
  for (const slug of major.relatedMajors) {
    if (!majorSlugs.has(slug)) errors.push(`major ${major.slug} points at unknown major "${slug}".`);
    if (slug === major.slug) errors.push(`major ${major.slug} lists itself as related.`);
  }
}

for (const school of schools) {
  checkText(`school ${school.slug} name`, school.name);
  checkText(`school ${school.slug} summary`, school.summary);
  checkText(`school ${school.slug} admissionNotes`, school.admissionNotes);
  checkRange(`school ${school.slug} tuitionPerYear`, school.tuitionPerYear);

  if (!/^https?:\/\//.test(school.website)) {
    errors.push(`school ${school.slug} website is not an absolute URL.`);
  }
  for (const slug of school.majorSlugs) {
    if (!majorSlugs.has(slug)) errors.push(`school ${school.slug} offers unknown major "${slug}".`);
  }
}

// Every major should be teachable somewhere, and every school should teach something.
for (const major of majors) {
  const taught =
    major.schoolSlugs.length > 0 ||
    schools.some((s) => s.majorSlugs.includes(major.slug));
  if (!taught) warnings.push(`major ${major.slug} has no school offering it.`);
}
for (const school of schools) {
  const teaches =
    school.majorSlugs.length > 0 ||
    majors.some((m) => m.schoolSlugs.includes(school.slug));
  if (!teaches) warnings.push(`school ${school.slug} offers no majors.`);
}

for (const warning of warnings) console.warn(`warn  ${warning}`);
for (const error of errors) console.error(`error ${error}`);

console.log(
  `\n${majors.length} majors, ${schools.length} schools, ` +
    `${majors.reduce((n, m) => n + m.careers.length, 0)} careers checked.`,
);

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log("Data OK.");
