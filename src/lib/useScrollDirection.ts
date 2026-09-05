"use client";

import { useEffect, useState } from "react";

export interface ScrollState {
  scrollDirection: "up" | "down" | null;
  isVisible: boolean;
  isAtTop: boolean;
  isScrolled: boolean;
  scrollY: number;
}

/**
 * Hook to detect scroll direction and position for morphing navbar.
 * - `isScrolled`: true when user scrolls past 20px from the top.
 * - `isAtTop`: true when user is within the top 20px of the page.
 * - Uses requestAnimationFrame to prevent layout thrashing.
 */
export function useScrollDirection(threshold: number = 8): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollDirection: null,
    isVisible: true,
    isAtTop: true,
    isScrolled: false,
    scrollY: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      const isScrolled = currentScrollY > 20;

      // Handle edge cases like Mac/iOS rubber-band bounce
      if (currentScrollY <= 20) {
        setScrollState({
          scrollDirection: "up",
          isVisible: true,
          isAtTop: true,
          isScrolled: false,
          scrollY: currentScrollY,
        });
        lastScrollY = Math.max(0, currentScrollY);
        ticking = false;
        return;
      }

      // Ignore micro-scrolls smaller than threshold
      if (Math.abs(delta) < threshold) {
        ticking = false;
        return;
      }

      const direction: "up" | "down" = delta > 0 ? "down" : "up";

      setScrollState({
        scrollDirection: direction,
        isVisible: true, // Remains visible as floating pill
        isAtTop: false,
        isScrolled: true,
        scrollY: currentScrollY,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check on mount
    updateScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrollState;
}
