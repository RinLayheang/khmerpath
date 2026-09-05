"use client";

import { useMemo } from "react";
import type { Locale } from "@/lib/types";

interface UnblurTextRevealProps {
  text: string;
  lang?: Locale;
  duration?: number; // total animation time in seconds (e.g. 3)
  delayStart?: number; // initial delay before starting
  className?: string;
  as?: "h1" | "p" | "span" | "div";
}

export function UnblurTextReveal({
  text,
  lang = "km",
  duration = 3.0,
  delayStart = 0.05,
  className = "",
  as: Tag = "span",
}: UnblurTextRevealProps) {
  // Segment into native linguistic words using Intl.Segmenter
  const words = useMemo(() => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter(lang === "en" ? "en" : "km", {
          granularity: "word",
        });
        return [...segmenter.segment(text)].map((s) => s.segment);
      } catch {
        // Fallback below
      }
    }
    // Fallback if Intl.Segmenter is unavailable
    return text.split(/(\s+)/);
  }, [text, lang]);

  // Calculate timing so the entire sequence completes within `duration`
  const nonSpaceWords = words.filter((w) => w.trim().length > 0);
  const count = nonSpaceWords.length || 1;

  const wordDuration = 0.65; // duration for an individual word to resolve
  const availableStagger = Math.max(0.1, duration - wordDuration);
  const stepDelay = count > 1 ? availableStagger / (count - 1) : 0;

  let wordIndex = 0;

  return (
    <Tag className={className}>
      {words.map((chunk, i) => {
        const isWhitespace = chunk.trim().length === 0;
        if (isWhitespace) {
          return <span key={i}>{chunk}</span>;
        }

        const delay = delayStart + wordIndex * stepDelay;
        wordIndex++;

        return (
          <span
            key={i}
            className="inline-block transition-all will-change-[transform,opacity,filter]"
            style={{
              animation: `unblurWord ${wordDuration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay.toFixed(3)}s both`,
            }}
          >
            {chunk}
          </span>
        );
      })}
    </Tag>
  );
}
