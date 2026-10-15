import { gsap } from "@/lib/gsap";

/**
 * Page 7 choreography. Targets are found by data-anim inside the scene root;
 * FlowerScene runs these inside its useGSAP context.
 *
 * Entrance (after Reference Image 9's build order): the heading is written in →
 * the filmstrip settles and its photos drop into their cells one after another →
 * the kitten with the bouquet is pressed on like a big sticker and settles →
 * the kitten's speech bubble pops up from its tail → the decorations are
 * scattered on last → the Back tab appears.
 *
 * Resting tilts live in CSS as the `rotate` property; GSAP animates `rotation`
 * (the transform), so the two compose and the handmade angle is kept. The idle
 * loops (kitten sway, bunny bob) are CSS in flower.module.css.
 */

export function playEntrance(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ delay: 0.15 })
    // Heading, word by word.
    .from(q('[data-anim="word"]'), { autoAlpha: 0, y: 14, rotation: () => gsap.utils.random(-6, 6), duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, 0)
    // The filmstrip settles in.
    .from(q('[data-anim="film"]'), { autoAlpha: 0, y: 30, scale: 0.94, duration: 0.6, ease: "power2.out" }, 0.25)
    // Each photo drops into its cell.
    .from(q('[data-anim="cell"]'), { autoAlpha: 0, y: 24, scale: 0.86, duration: 0.5, stagger: 0.14, ease: "back.out(1.5)" }, 0.5)
    // The kitten is pressed on: big and tilted, then down to its resting angle.
    .from(q('[data-anim="hero"]'), { autoAlpha: 0, scale: 1.3, rotation: 8, y: -16, duration: 0.5, ease: "power3.in" }, 0.95)
    .from(q('[data-anim="hero-squash"]'), { scaleY: 0.94, scaleX: 1.05, transformOrigin: "50% 100%", duration: 0.55, ease: "elastic.out(1, 0.4)" }, 1.42)
    // The speech bubble pops up from its tail, just after the kitten lands.
    .from(q('[data-anim="bubble"]'), { autoAlpha: 0, scale: 0.6, rotation: 6, transformOrigin: "30% 100%", duration: 0.55, ease: "back.out(2.2)" }, 1.75)
    // Decorations settle in, scattered.
    .from(q('[data-anim="deco"]'), { autoAlpha: 0, scale: 0.55, rotation: () => gsap.utils.random(-16, 16), duration: 0.5, stagger: 0.07, ease: "back.out(2)" }, 1.3)
    // Back tab.
    .from(q('[data-anim="back"]'), { autoAlpha: 0, x: -10, duration: 0.4, ease: "power1.out" }, 1.6)
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
