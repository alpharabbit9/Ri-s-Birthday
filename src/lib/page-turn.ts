import { gsap } from "@/lib/gsap";

/**
 * Turns a full-screen scrapbook page over: it lifts at the right edge and
 * swings over the left one, darkening as it turns away from the light, until
 * it's edge-on and gone. The plain paper stage shows underneath, and `done`
 * hands over to the next scene, which comes in on that blank sheet.
 *
 * The page needs a `data-part="pageShade"` overlay (an ink layer at opacity 0)
 * for the darkening.
 */
export function turnPage(page: HTMLElement, done: () => void) {
  const shade = page.querySelector('[data-part="pageShade"]');
  // Deep enough that the lifted edge grows a little as it comes towards you, not a lot.
  const depth = Math.max(window.innerWidth, window.innerHeight) * 2.6;

  const tl = gsap
    .timeline({ onComplete: done })
    .set(page, { transformPerspective: depth, transformOrigin: "0% 50%", willChange: "transform" }, 0)
    // The corner lifts first, then the page falls over.
    .to(page, { rotationY: -8, y: -6, duration: 0.25, ease: "power1.out" }, 0)
    .to(page, { rotationY: -90, y: 0, duration: 0.8, ease: "power2.in" }, 0.25);

  if (shade) tl.to(shade, { opacity: 0.4, duration: 1.05, ease: "power1.in" }, 0);
  return tl;
}

/** Reduced motion: the page simply fades away. */
export function turnPageReduced(page: HTMLElement, done: () => void) {
  return gsap.timeline({ onComplete: done }).to(page, { autoAlpha: 0, duration: 0.35, ease: "power1.out" });
}
