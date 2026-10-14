"use client";

import Lenis from "lenis";
import { useEffect, useRef, type RefObject } from "react";

/**
 * Smooth scrolling for the Gift 4 memory flow (Phases 12–15) — the only
 * vertically scrolling surface in the scrapbook. Lenis smooths the given
 * wrapper/content pair rather than the window, because those sections scroll
 * inside their own container (MemoryScroll), not the page.
 *
 * Reduced motion: Lenis honours `prefers-reduced-motion: reduce` itself
 * (`respectReducedMotion`, on by default) — smoothing is dropped so scrolling
 * tracks the input device 1:1 and programmatic jumps become instant. That is
 * this animation's reduced-motion path, alongside the CSS/Motion/GSAP handling
 * described in AGENTS.md.
 *
 * No GSAP ScrollTrigger is in play (the sections reveal via Motion
 * `whileInView`, i.e. IntersectionObserver, which reads real layout position),
 * so Lenis needs no scroll-sync; `autoRaf` lets it drive its own rAF loop.
 * Returns a ref to the instance so callers can drive it (e.g. the dev
 * jump-to-section shortcuts).
 */
export function useLenis<W extends HTMLElement, C extends HTMLElement>(
  wrapperRef: RefObject<W | null>,
  contentRef: RefObject<C | null>,
): RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({ wrapper, content, autoRaf: true });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [wrapperRef, contentRef]);

  return lenisRef;
}
