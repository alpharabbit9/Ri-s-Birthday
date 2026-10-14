import { gsap } from "@/lib/gsap";

/**
 * Page 6 choreography. Targets are found by data-anim inside the scene root;
 * LetterScene runs these inside its useGSAP context.
 *
 * Entrance (after Reference Image 8's build order): the torn letter settles in →
 * its lines are written on one after another → the first photo drops in, then
 * the second → the decorations are pressed on last → the Back tab appears.
 *
 * Resting tilts live in CSS as the `rotate` property; GSAP animates `rotation`
 * (the transform), so the two compose and the handmade angle is kept.
 */

export function playEntrance(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ delay: 0.15 })
    // Paper settles.
    .from(q('[data-anim="letter"]'), { autoAlpha: 0, y: 26, scale: 0.96, duration: 0.6, ease: "power2.out" }, 0)
    // Letter content appears, line by line.
    .from(q('[data-anim="line"]'), { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.055, ease: "power1.out" }, 0.4)
    // Photo 1 enters, then photo 2 — dropped in like stuck-on prints.
    .from(q('[data-anim="photo"]'), { autoAlpha: 0, y: 34, scale: 0.9, rotation: (i) => (i ? 8 : -9), duration: 0.6, stagger: 0.2, ease: "back.out(1.6)" }, 0.55)
    // Decorations settle in, scattered.
    .from(q('[data-anim="deco"]'), { autoAlpha: 0, scale: 0.55, rotation: () => gsap.utils.random(-14, 14), duration: 0.5, stagger: 0.07, ease: "back.out(2)" }, 0.95)
    // Back tab.
    .from(q('[data-anim="back"]'), { autoAlpha: 0, x: -10, duration: 0.4, ease: "power1.out" }, 1.15)
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
