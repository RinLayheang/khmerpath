import type { DemandLevel, Locale } from "@/lib/types";
import type { Dictionary } from "@/i18n/dictionaries";

const styles: Record<DemandLevel, string> = {
  "very-high": "bg-[#0f766e]/12 text-[#0b5a54] ring-[#0f766e]/25",
  high: "bg-[#4d7c0f]/12 text-[#3f6609] ring-[#4d7c0f]/25",
  medium: "bg-[#b45309]/12 text-[#8f4207] ring-[#b45309]/25",
  low: "bg-[#7c6f64]/12 text-[#5f544b] ring-[#7c6f64]/25",
};

/** Number of filled pips, so demand reads at a glance without colour alone. */
const pips: Record<DemandLevel, number> = {
  "very-high": 4,
  high: 3,
  medium: 2,
  low: 1,
};

export function DemandBadge({
  level,
  dict,
  size = "sm",
}: {
  level: DemandLevel;
  dict: Dictionary;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ring-1 ring-inset ${styles[level]} ${
        size === "md" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-xs"
      }`}
    >
      <span aria-hidden className="flex gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`block h-1.5 w-1.5 rounded-full ${
              i < pips[level] ? "bg-current" : "bg-current opacity-25"
            }`}
          />
        ))}
      </span>
      <span className="font-medium">{dict.demand[level]}</span>
    </span>
  );
}

export type { DemandLevel, Locale };
