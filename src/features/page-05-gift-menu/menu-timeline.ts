import { gsap } from "@/lib/gsap";
import { turnPage, turnPageReduced } from "@/lib/page-turn";

/**
 * Page 5 choreography. Targets are found by data-anim inside the scene root;
 * GiftMenuScene runs these inside its useGSAP context.
 *
 * Entrance: the martini and kiss pop in → the heading is written word by word →
 * the four gifts are pressed on one after another (gift 1 → 2 → 3 → 4).
 *
 * Select (gift 1/2/3): the chosen gift lifts and the others fall away, the
 * heading and decorations fade, then the page turns over to its destination.
 *
 * Surprise (gift 4): a small shake — it has no destination yet, so nothing is
 * revealed; the interaction is just acknowledged.
 */

export function playEntrance(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);

  gsap
    .timeline({ delay: 0.2 })
    .from(q('[data-anim="deco"]'), { autoAlpha: 0, scale: 0.5, rotation: (i) => (i ? 16 : -14), duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 0)
    .from(q('[data-anim="word"]'), { autoAlpha: 0, y: 16, rotation: () => gsap.utils.random(-7, 7), duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, 0.12)
    // Each gift is pressed on like a sticker: in big and tilted, then settles.
    .from(q('[data-anim="gift"]'), { autoAlpha: 0, y: 26, scale: 0.68, rotation: (i) => (i % 2 ? 9 : -9), duration: 0.55, stagger: 0.17, ease: "back.out(1.9)" }, 0.55)
    .call(onReady, undefined, "+=0.1");
}

/** Reduced motion: the page is simply there. */
export function playEntranceReduced(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline()
    .fromTo(q('[data-anim="content"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
    .call(onReady);
}

/** The chosen gift lifts, the rest fall away, the page turns to its destination. */
export function playSelect(root: HTMLElement, chosen: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  const others = q('[data-anim="gift"]').filter((el) => el !== chosen);

  gsap
    .timeline()
    .to(chosen, { scale: 1.12, y: -14, duration: 0.3, ease: "back.out(2)" }, 0)
    .to(others, { autoAlpha: 0, scale: 0.8, y: 10, duration: 0.35, stagger: 0.04, ease: "power2.in" }, 0)
    .to(q('[data-anim="deco"], [data-anim="word"]'), { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 0)
    .add(turnPage(root, done), 0.5);
}

export function playSelectReduced(root: HTMLElement, done: () => void) {
  turnPageReduced(root, done);
}

/** Gift 4: a quick shake to acknowledge the tap. No destination yet. */
export function playShake(target: HTMLElement) {
  gsap
    .timeline()
    .to(target, { x: -6, rotation: -3, duration: 0.07, ease: "power1.inOut" })
    .to(target, { x: 6, rotation: 3, duration: 0.07, ease: "power1.inOut" })
    .to(target, { x: -4, rotation: -2, duration: 0.07, ease: "power1.inOut" })
    .to(target, { x: 0, rotation: 0, duration: 0.12, ease: "power1.out" });
}
