import { gsap } from "@/lib/gsap";

/**
 * Page 2 choreography. Targets are found by data-anim / data-part inside the
 * scene root; BirthdaySpread runs these inside its useGSAP context.
 *
 * Entrance: album → pages settle → frame → photo → tape → MY MADAM → stars →
 * HAPPY (drops in) → BIRTHDAY (slapped on) → gold stars → streamers and
 * gingham → Turn Page. Each group moves differently, like things placed by hand.
 */
export function playEntrance(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tilt = (range: number) => () => gsap.utils.random(-range, range);

  gsap
    .timeline({ delay: 0.25 })
    .from(q('[data-anim="book"]'), { autoAlpha: 0, y: 70, rotation: -3, scale: 0.94, duration: 0.9, ease: "power3.out" }, 0)
    .from(q('[data-anim="page"]'), { autoAlpha: 0, y: -8, rotation: (i) => (i ? 0.8 : -0.8), duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.35)
    .from(q('[data-anim="frame"]'), { autoAlpha: 0, y: -50, rotation: -12, scale: 1.1, duration: 0.75, ease: "back.out(1.5)" }, 0.7)
    .from(q('[data-anim="photo"]'), { autoAlpha: 0, scale: 1.15, duration: 0.8, ease: "power2.out" }, 0.95)
    .from(q('[data-anim="tape"]'), { autoAlpha: 0, scale: 1.5, duration: 0.28, stagger: 0.14, ease: "power3.out" }, 1.25)
    .from(q('[data-anim="my"]'), { autoAlpha: 0, scale: 0.3, y: -14, rotation: tilt(40), duration: 0.38, stagger: 0.07, ease: "back.out(2.4)" }, 1.45)
    .from(q('[data-anim="star"]'), { autoAlpha: 0, scale: 0, rotation: -140, duration: 0.65, stagger: 0.14, ease: "back.out(1.7)" }, 1.9)
    // The word backings unroll, then their letters arrive.
    .from(q('[data-anim="backing"]'), { autoAlpha: 0, scaleX: 0.15, duration: 0.45, stagger: 0.55, ease: "power3.out" }, 2.1)
    .from(q('[data-anim="happy"]'), { autoAlpha: 0, yPercent: -170, rotation: tilt(30), duration: 0.45, stagger: 0.08, ease: "back.out(1.7)" }, 2.2)
    .from(q('[data-anim="birthday"]'), { autoAlpha: 0, scale: 1.9, rotation: tilt(18), duration: 0.3, stagger: 0.065, ease: "power3.in" }, 2.75)
    .from(q('[data-anim="gold-star"]'), { autoAlpha: 0, scale: 0, rotation: 220, duration: 0.6, stagger: 0.12, ease: "back.out(2)" }, 3.3)
    .from(q('[data-anim="streamer"]'), { autoAlpha: 0, scaleY: 0, transformOrigin: "50% 0%", duration: 0.75, stagger: 0.12, ease: "power2.out" }, 3.35)
    .from(q('[data-anim="patch"]'), { autoAlpha: 0, xPercent: 25, yPercent: 25, duration: 0.6, ease: "power3.out" }, 3.4)
    .from(q('[data-anim="turn"]'), { autoAlpha: 0, y: 18, rotation: 8, duration: 0.55, ease: "back.out(2.2)" }, 3.8);
  // Once everything has landed the streamers sway a little: a CSS loop (.sway), so it runs on the compositor.
}

/** Reduced motion: the album fades in whole, nothing moves. */
export function playEntranceReduced(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  // Both ends spelled out: a from() reads its end state off the page when it is created, and could fade in to nothing.
  gsap.fromTo(q('[data-anim="book"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, delay: 0.2 });
}

/**
 * Turn Page: the right page swings over the spine (the bottom page flips up
 * when the pages are stacked), its shadow passing over the left page. As it
 * lands, we move in close on the fresh page underneath until it fills the
 * screen, and the next scene fades in over it (like the card on Page 1).
 * The handover waits for the move to finish: mounting the next scene takes a
 * moment, best spent on a still frame.
 */
export function playTurn(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  const stacked = window.matchMedia("(orientation: portrait)").matches;
  const book = q('[data-anim="book"]')[0].getBoundingClientRect();
  const page = q('[data-part="slot"]')[0].getBoundingClientRect();

  // Scale about the fresh page's centre until it covers the screen, and bring it to the middle.
  const cx = page.left + page.width / 2;
  const cy = page.top + page.height / 2;
  const cover = Math.max(window.innerWidth / page.width, window.innerHeight / page.height) * 1.04;

  gsap
    .timeline({ onComplete: done })
    // Its own layer for the move: the compositor scales it instead of repainting the whole album.
    .set(q('[data-anim="book"]'), { willChange: "transform" }, 0)
    .to(q('[data-anim="turn"]'), { autoAlpha: 0, duration: 0.2, ease: "power1.out" }, 0)
    .to(
      q('[data-part="leaf"]'),
      { ...(stacked ? { rotationX: 180 } : { rotationY: -180 }), duration: 1.15, ease: "power2.inOut" },
      0.1,
    )
    .to(q('[data-part="turnShade"]'), { opacity: 0.22, duration: 0.6, ease: "power1.in" }, 0.15)
    .to(q('[data-part="turnShade"]'), { opacity: 0, duration: 0.45, ease: "power1.out" }, 0.75)
    .to(
      q('[data-anim="book"]'),
      {
        transformOrigin: `${cx - book.left}px ${cy - book.top}px`,
        x: window.innerWidth / 2 - cx,
        y: window.innerHeight / 2 - cy,
        scale: cover,
        duration: 0.95,
        ease: "power2.inOut",
      },
      0.95,
    );
}

/** Reduced motion: no page swing; the next scene simply crossfades in. */
export function playTurnReduced(root: HTMLElement, done: () => void) {
  const q = gsap.utils.selector(root);
  gsap.timeline({ onComplete: done }).to(q('[data-anim="turn"]'), { autoAlpha: 0, duration: 0.2 });
}
