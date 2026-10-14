import { gsap } from "@/lib/gsap";

/**
 * Phase 11 choreography. Targets are found by data-anim inside the scene root;
 * SurpriseScene runs these inside its useGSAP context.
 *
 * Entrance (after Reference Image 11's build order): the envelope settles →
 * the card rises out of it → the camera drops in on the left → the bouquet is
 * pressed on on the right → the bow, heart and tiny hearts pop on → "click
 * me!" appears → the Back tab appears. The bouquet's idle sway is CSS.
 *
 * Press (on card / "click me!" tap): the card lifts and settles back — an
 * acknowledgement that stays on the page. Phase 12 will hook its `done` into
 * the diary; until then the scene simply stays put.
 *
 * Resting tilts live in CSS as the `rotate` property; GSAP animates
 * `rotation` (the transform), so the two compose and the handmade angle is
 * kept. "click me!" breathes via a CSS `scale` animation, so its entrance
 * only fades it (a GSAP transform would fight the loop).
 */

export function playEntrance(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ delay: 0.15 })
    // The envelope is placed first — everything else overlaps it.
    .from(q('[data-anim="envelope"]'), { autoAlpha: 0, y: 30, scale: 0.94, duration: 0.55, ease: "back.out(1.6)" }, 0)
    // The card rises out of the envelope.
    .from(q('[data-anim="card"]'), { autoAlpha: 0, y: 48, duration: 0.6, ease: "power3.out" }, 0.3)
    // Camera drops in on the left, bouquet is pressed on on the right.
    .from(q('[data-anim="camera"]'), { autoAlpha: 0, x: -38, rotation: -10, duration: 0.55, ease: "back.out(1.7)" }, 0.55)
    .from(q('[data-anim="bouquet"]'), { autoAlpha: 0, scale: 0.6, rotation: 12, duration: 0.6, ease: "back.out(1.7)" }, 0.7)
    // Bow, heart and tiny hearts pop on, scattered.
    .from(q('[data-anim="mini"]'), { autoAlpha: 0, scale: 0.4, rotation: () => gsap.utils.random(-14, 14), duration: 0.45, stagger: 0.09, ease: "back.out(2)" }, 0.95)
    // "click me!" fades in (no transform — it breathes in CSS), then Back.
    .from(q('[data-anim="clickme"]'), { autoAlpha: 0, duration: 0.45, ease: "power1.out" }, 1.1)
    .from(q('[data-anim="back"]'), { autoAlpha: 0, x: -10, duration: 0.4, ease: "power1.out" }, 1.2)
    .call(onReady, undefined, "+=0.05");
}

/** Reduced motion: the page is simply there. */
export function playEntranceReduced(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline()
    .fromTo(q('[data-anim="content"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
    .call(onReady);
}

/** The card lifts and settles back; the scene stays put for Phase 12. */
export function playPress(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ onComplete: done })
    .to(q('[data-anim="card"]'), { y: -12, scale: 1.04, duration: 0.26, ease: "back.out(2.2)" }, 0)
    .to(q('[data-anim="card"]'), { y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.55)" }, 0.26);
}

/** Reduced motion: a quick dip before handing over. */
export function playPressReduced(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline({ onComplete: done })
    .to(q('[data-anim="card"]'), { autoAlpha: 0.35, duration: 0.15, ease: "power1.out" }, 0)
    .to(q('[data-anim="card"]'), { autoAlpha: 1, duration: 0.2, ease: "power1.in" }, 0.15);
}
