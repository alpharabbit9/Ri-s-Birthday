import { gsap } from "@/lib/gsap";
import { turnPage, turnPageReduced } from "@/lib/page-turn";

/**
 * Page 4 choreography. Targets are found by data-anim inside the scene root;
 * GiftChoiceScene runs these inside its useGSAP context.
 *
 * Entrance: gingham scraps → mirror balls drop in on their strings → star
 * ribbon unrolls → heading word by word → sticker-2 (the kitten) is pressed on →
 * YES, then NO, puff up.
 *
 * NO: the button squashes → a sheet of maroon card slides up over the page →
 * the heading is written in → sticker-1 is slapped down and settles → OKAY.
 * OKAY takes the sheet away again.
 *
 * YES: the button bounces, NO puffs away, the kitten hops → the page turns.
 *
 * The loops (ball swing, glints, the kitten's rock) are CSS in gift.module.css.
 */

export function playEntrance(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);
  const tilt = (range: number) => () => gsap.utils.random(-range, range);

  gsap
    .timeline({ delay: 0.25 })
    .from(q('[data-anim="scrap"]'), { autoAlpha: 0, xPercent: (i) => (i ? 25 : -25), yPercent: (i) => (i ? 25 : -25), duration: 0.7, stagger: 0.12, ease: "power3.out" }, 0)
    // Each ball drops on its string and swings a little before it hangs still.
    .from(q('[data-anim="ball"]'), { autoAlpha: 0, yPercent: -110, duration: 0.7, stagger: 0.14, ease: "back.out(1.4)" }, 0.25)
    .from(q('[data-anim="ball"]'), { rotation: (i) => (i % 2 ? -9 : 9), transformOrigin: "50% 0%", duration: 1.6, stagger: 0.14, ease: "elastic.out(1, 0.35)" }, 0.45)
    .fromTo(
      q('[data-anim="ribbon"]'),
      { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" },
      { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power2.inOut", clearProps: "clipPath" },
      0.5,
    )
    .from(q('[data-anim="word"]'), { autoAlpha: 0, y: 16, rotation: tilt(7), duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 0.65)
    // The kitten is pressed on like a sticker: big and tilted, then down flat.
    .from(q('[data-anim="cat"]'), { autoAlpha: 0, scale: 1.35, rotation: 9, y: -14, duration: 0.42, ease: "power3.in" }, 1.25)
    .from(q('[data-anim="cat-squash"]'), { scaleY: 0.94, scaleX: 1.04, transformOrigin: "50% 100%", duration: 0.5, ease: "elastic.out(1, 0.4)" }, 1.67)
    .from(q('[data-anim="choice"]'), { autoAlpha: 0, scale: 0.55, y: 18, rotation: (i) => (i ? 6 : -6), duration: 0.55, stagger: 0.16, ease: "back.out(2.2)" }, 1.85)
    .call(onReady, undefined, 2.4);
}

/** Reduced motion: the page is simply there. */
export function playEntranceReduced(root: HTMLElement, onReady: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline()
    .fromTo(q('[data-anim="content"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
    .call(onReady);
}

/** YES: a happy bounce, NO puffs away, the kitten hops, then the page turns over. */
export function playAccept(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  const [yes, no] = q('[data-anim="choice"]');

  gsap
    .timeline()
    .to(yes, { scale: 1.14, rotation: -4, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }, 0)
    .to(no, { autoAlpha: 0, scale: 0.6, y: 10, duration: 0.35, ease: "power2.in" }, 0.08)
    .to(q('[data-anim="cat"]'), { y: -20, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, 0.12)
    .add(turnPage(root, done), 0.62);
}

export function playAcceptReduced(root: HTMLElement, done: () => void) {
  turnPageReduced(root, done);
}

/** NO: the maroon sheet slides up over the page, then sticker-1 is slapped down on it. */
export function playDecline(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  const [, no] = q('[data-anim="choice"]');

  gsap
    .timeline({ onComplete: done })
    .to(no, { scale: 0.88, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1 }, 0)
    .fromTo(q('[data-anim="sheet"]'), { autoAlpha: 1, yPercent: 104, rotation: -3 }, { yPercent: 0, rotation: 0, duration: 0.7, ease: "power3.out" }, 0.15)
    .fromTo(q('[data-anim="sorry"]'), { autoAlpha: 0, y: 14, rotation: () => gsap.utils.random(-6, 6) }, { autoAlpha: 1, y: 0, rotation: 0, duration: 0.45, stagger: 0.1, ease: "back.out(2)" }, 0.7)
    // The sticker comes down big and tilted, lands, and settles.
    .fromTo(q('[data-anim="sticker-one"]'), { autoAlpha: 0, scale: 1.5, rotation: -14, y: -24 }, { autoAlpha: 1, scale: 1, rotation: 3, y: 0, duration: 0.42, ease: "power3.in" }, 0.95)
    .to(q('[data-anim="sticker-one"]'), { rotation: -2, duration: 0.9, ease: "elastic.out(1, 0.4)" }, 1.37)
    .fromTo(q('[data-anim="sticker-squash"]'), { scaleY: 0.92, scaleX: 1.05 }, { scaleY: 1, scaleX: 1, transformOrigin: "50% 100%", duration: 0.6, ease: "elastic.out(1, 0.4)" }, 1.37)
    .fromTo(q('[data-anim="okay"]'), { autoAlpha: 0, scale: 0.55, y: 16 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2.2)" }, 1.6);
}

export function playDeclineReduced(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline({ onComplete: done })
    .set(q('[data-anim="sheet"]'), { yPercent: 0, rotation: 0 })
    .set(q('[data-anim="sorry"], [data-anim="sticker-one"], [data-anim="okay"]'), { autoAlpha: 1 })
    .fromTo(q('[data-anim="sheet"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
}

/** OKAY: the sheet slides away and the question is back. */
export function playReturn(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  gsap
    .timeline({ onComplete: done })
    .to(q('[data-anim="okay"]'), { scale: 0.88, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1 }, 0)
    .to(q('[data-anim="sheet"]'), { yPercent: 104, rotation: 3, duration: 0.6, ease: "power2.in" }, 0.18)
    .set(q('[data-anim="sheet"]'), { autoAlpha: 0 });
}

export function playReturnReduced(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  gsap.timeline({ onComplete: done }).to(q('[data-anim="sheet"]'), { autoAlpha: 0, duration: 0.35 });
}
