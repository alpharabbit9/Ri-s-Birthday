import { gsap } from "@/lib/gsap";

/**
 * Phase 12 choreography. Targets are found by data-anim inside the scene root;
 * DiaryScene runs these inside its useGSAP context.
 *
 * Entrance (objects placed by hand): the open diary settles → its binder rings
 * thread down the gutter → the big "22" pops on the left → the message writes
 * in → the Polaroid drops onto the right page → the "favourite person" label
 * and the little stickers settle → "I love you" appears. Resting tilts live in
 * CSS as `rotate`; GSAP animates `rotation`, so the two compose.
 */
export function playEntrance(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ delay: 0.15, onComplete: onReady })
    .from(q('[data-anim="book"]'), { autoAlpha: 0, y: 36, scale: 0.95, duration: 0.6, ease: "power3.out" }, 0)
    .from(q('[data-anim="ring"]'), { autoAlpha: 0, scale: 0.4, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, 0.4)
    .from(q('[data-anim="num"]'), { autoAlpha: 0, y: 18, scale: 0.8, duration: 0.5, ease: "back.out(1.7)" }, 0.6)
    .from(q('[data-anim="msg"]'), { autoAlpha: 0, y: 14, duration: 0.5, ease: "power2.out" }, 0.78)
    .from(q('[data-anim="polaroid"]'), { autoAlpha: 0, y: -24, rotation: -6, duration: 0.6, ease: "back.out(1.5)" }, 0.7)
    .from(q('[data-anim="fav"]'), { autoAlpha: 0, scale: 0.5, rotation: 10, duration: 0.4, ease: "back.out(2)" }, 1.0)
    .from(q('[data-anim="deco"]'), { autoAlpha: 0, scale: 0.5, duration: 0.4, stagger: 0.08, ease: "back.out(2)" }, 1.05)
    .from(q('[data-anim="love"]'), { autoAlpha: 0, y: 10, duration: 0.45, ease: "power1.out" }, 1.25);
}

/** Reduced motion: the spread is simply there. */
export function playEntranceReduced(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline({ onComplete: onReady })
    .fromTo(q('[data-anim="content"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
}
