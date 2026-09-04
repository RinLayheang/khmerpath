import type { Locale, LocalizedText, Range } from "./types";

/** Pick the right language out of a localized field. */
export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

const KHMER_DIGITS = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

/** Render a number in Khmer numerals when the locale is Khmer. */
export function localizeNumber(value: number | string, locale: Locale): string {
  const s = String(value);
  if (locale !== "km") return s;
  return s.replace(/\d/g, (d) => KHMER_DIGITS[Number(d)]);
}

function withThousands(value: number): string {
  return value.toLocaleString("en-US");
}

/** "$400 – $700" (or Khmer numerals). Handles equal min/max and zero floors. */
export function formatRange(range: Range, locale: Locale): string {
  const lo = localizeNumber(withThousands(range.min), locale);
  const hi = localizeNumber(withThousands(range.max), locale);
  if (range.min === range.max) return `$${hi}`;
  if (range.min === 0) return `$0 – $${hi}`;
  return `$${lo} – $${hi}`;
}

/** Midpoint of a range, used to sort and to size the salary bars. */
export function midpoint(range: Range): number {
  return (range.min + range.max) / 2;
}

/** Highest salary anywhere in the dataset, so bars share one scale. */
export function scaleWidth(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.max(2, Math.min(100, (value / max) * 100));
}
