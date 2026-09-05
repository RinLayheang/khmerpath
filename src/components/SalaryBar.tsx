import type { Locale, Range } from "@/lib/types";
import { formatRange, midpoint, scaleWidth } from "@/lib/format";

/**
 * A single salary row: label, range, and a bar sized against the highest
 * salary anywhere on the site so bars are comparable across pages.
 */
export function SalaryBar({
  label,
  range,
  max,
  locale,
  tone = "brand",
}: {
  label: string;
  range: Range;
  max: number;
  locale: Locale;
  tone?: "brand" | "accent";
}) {
  const width = scaleWidth(midpoint(range), max);
  const color = tone === "accent" ? "var(--color-gold)" : "var(--color-brand)";

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-ink-soft">{label}</span>
        <span className="text-sm font-semibold tabular-nums">
          {formatRange(range, locale)}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
        <div
          className="h-full rounded-full"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
