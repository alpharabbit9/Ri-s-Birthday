import { gsap } from "@/lib/gsap";

/**
 * Page 3 choreography. Targets are found by data-anim / data-part inside the
 * scene root; CakeScene runs these inside its useGSAP context.
 *
 * Entrance: garlands → heading → gingham and starbursts → cake set down →
 * presents → candles stood up → lit one by one → stars → hint.
 *
 * Blow out: the flames flutter → one breath leans them over (and blows the
 * heading away) → they shrink out → embers on the wicks → smoke curls up →
 * the new heading is written in, the starbursts bloom, paper confetti falls →
 * Turn Page (on to Page 4) is put down where the hint was.
 *
 * The loops (flame flicker, idle sway, lingering smoke) are CSS animations in
 * cake.module.css, so they run on the compositor; GSAP only drives the
 * one-off moments, on wrappers around the looping elements.
 */

type Query = (selector: string) => Element[];

/** When the first candle is lit, the gap between candles, and how long each takes. */
const LIGHT_AT = 2.25;
const LIGHT_GAP = 0.12;
const LIGHT_TIME = 0.45;

export function playEntrance(root: HTMLElement, onLit: () => void) {
  const q = gsap.utils.selector(root);
  const tilt = (range: number) => () => gsap.utils.random(-range, range);
  const candles = q('[data-anim="flame"]').length;
  const litAt = LIGHT_AT + (candles - 1) * LIGHT_GAP + LIGHT_TIME;

  gsap
    .timeline({ delay: 0.2 })
    .from(q('[data-anim="garland"]'), { autoAlpha: 0, yPercent: -35, rotation: (i) => (i ? 7 : -7), transformOrigin: "50% 0%", duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0)
    .from(q('[data-anim="word"]'), { autoAlpha: 0, y: 16, rotation: tilt(7), duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 0.3)
    .from(q('[data-anim="scrap"]'), { autoAlpha: 0, xPercent: (i) => (i ? 30 : -30), yPercent: 30, duration: 0.65, stagger: 0.1, ease: "power3.out" }, 0.6)
    .from(q('[data-anim="burst"]'), { autoAlpha: 0, scale: 0, rotation: -90, duration: 0.7, stagger: 0.15, ease: "back.out(1.6)" }, 0.8)
    // The cake is set down on the page with a soft landing.
    .from(q('[data-anim="cake"]'), { autoAlpha: 0, y: -46, rotation: -2.5, scale: 1.05, duration: 0.85, ease: "back.out(1.1)" }, 0.95)
    .from(q('[data-anim="gift"]'), { autoAlpha: 0, scale: 0.4, y: 24, rotation: tilt(20), duration: 0.5, stagger: 0.09, ease: "back.out(2)" }, 1.25)
    .from(q('[data-anim="candle"]'), { autoAlpha: 0, scaleY: 0, transformOrigin: "50% 100%", duration: 0.38, stagger: 0.07, ease: "back.out(2.2)" }, 1.55)
    // Then each candle is lit, back row first.
    .from(q('[data-anim="flame"]'), { autoAlpha: 0, scale: 0, duration: LIGHT_TIME, stagger: LIGHT_GAP, ease: "back.out(3)" }, LIGHT_AT)
    .from(q('[data-anim="glow"]'), { autoAlpha: 0, scale: 0.4, duration: 0.6, stagger: LIGHT_GAP, ease: "power2.out" }, LIGHT_AT)
    .from(q('[data-anim="halo"]'), { autoAlpha: 0, duration: 1.4, ease: "power1.out" }, LIGHT_AT + 0.2)
    .from(q('[data-anim="twinkle"]'), { autoAlpha: 0, scale: 0, duration: 0.4, stagger: 0.08, ease: "back.out(2.5)" }, 2.4)
    .from(q('[data-anim="hint"]'), { autoAlpha: 0, y: 10, duration: 0.5, ease: "power2.out" }, litAt)
    // Lit: the scene starts its resting motion and takes taps.
    .call(onLit, undefined, litAt);
}

/** Reduced motion: the page is simply there, candles lit and still. */
export function playEntranceReduced(onLit: () => void) {
  gsap.delayedCall(0.3, onLit);
}

export function playBlowOut(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const flames = q('[data-anim="flame"]');
  const glows = q('[data-anim="glow"]');
  const embers = q('[data-anim="ember"]');
  const r = gsap.utils.random;

  gsap
    .timeline()
    .to(q('[data-anim="hint"]'), { autoAlpha: 0, y: 8, duration: 0.3, ease: "power1.out" }, 0)
    // The breath arrives: every flame flutters...
    .to(flames, { scaleX: 0.72, scaleY: 1.22, rotation: 0, duration: 0.07, yoyo: true, repeat: 3, stagger: 0.025, ease: "sine.inOut" }, 0)
    // ...leans away as it sweeps across, and takes the old heading with it...
    .to(flames, { rotation: 32, scaleX: 0.85, scaleY: 0.8, duration: 0.3, stagger: 0.05, ease: "power2.out" }, 0.34)
    .to(
      q('[data-anim="word"]'),
      { x: () => r(40, 90), y: () => r(-34, -10), rotation: () => r(8, 26), autoAlpha: 0, duration: 0.75, stagger: 0.07, ease: "power2.in" },
      0.3,
    )
    // ...and the flames shrink to nothing.
    .to(flames, { scale: 0, autoAlpha: 0, duration: 0.32, stagger: 0.05, ease: "power2.in" }, 0.62)
    .to(glows, { autoAlpha: 0, scale: 0.4, duration: 0.4, stagger: 0.05, ease: "power1.in" }, 0.6)
    .to(q('[data-anim="halo"]'), { autoAlpha: 0, duration: 0.8, ease: "power1.out" }, 0.7)
    // The wicks glow for a moment, then cool.
    .fromTo(embers, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08, stagger: 0.05 }, 0.86)
    .to(embers, { autoAlpha: 0, duration: 1.1, stagger: 0.05, ease: "power1.in" }, 1.0)
    .add(smoke(q('[data-anim="smoke"]')), 0.95)
    .add(celebrate(root, q), 1.75);
}

/**
 * A wisp from each wick, drawn as it rises. Then the CSS loop takes over with
 * a faint wisp now and then: the smoke lingers over the cake in the final
 * picture (Reference Image 3).
 */
function smoke(wisps: Element[]) {
  const r = gsap.utils.random;
  const tl = gsap.timeline();

  wisps.forEach((wisp, i) => {
    const at = i * 0.07;
    const path = wisp.querySelector('[data-part="smokePath"]');
    tl.fromTo(wisp, { autoAlpha: 0, yPercent: 0, scaleX: 1 }, { autoAlpha: 0.7, duration: 1.1, ease: "power1.out" }, at)
      .fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power1.out" }, at)
      .to(wisp, { autoAlpha: 0, yPercent: -38, scaleX: 1.5, duration: 2.2, ease: "sine.in" }, at + 0.9)
      .call(
        () => {
          const el = wisp as HTMLElement;
          gsap.set(el, { clearProps: "opacity,transform", visibility: "visible" });
          el.style.animationDelay = `${r(0.4, 3).toFixed(2)}s`;
          el.style.animationDuration = `${r(4, 5.6).toFixed(2)}s`;
          el.dataset.linger = "";
        },
        undefined,
        at + 3.15,
      );
  });
  return tl;
}

/** The new heading is written in word by word, the bursts bloom, the cake hops, confetti falls, then Turn Page. */
function celebrate(root: HTMLElement, q: Query) {
  return gsap
    .timeline()
    .fromTo(
      q('[data-anim="yay"]'),
      { autoAlpha: 0, clipPath: "inset(-30% 100% -30% 0%)", y: 6 },
      { autoAlpha: 1, clipPath: "inset(-30% 0% -30% 0%)", y: 0, duration: 0.45, stagger: 0.3, ease: "power1.inOut", clearProps: "clipPath" },
      0,
    )
    .to(q('[data-anim="underline"]'), { strokeDashoffset: 0, duration: 0.45, ease: "power2.inOut" }, 1.35)
    .to(q('[data-anim="burst"]'), { scale: 1.25, duration: 0.35, stagger: 0.12, ease: "back.out(3)", yoyo: true, repeat: 1 }, 0.1)
    .to(q('[data-anim="cake"]'), { y: -12, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 }, 0.05)
    .call(confetti(root, q('[data-anim="confetti"]')), undefined, 0)
    .fromTo(q('[data-anim="turn"]'), { autoAlpha: 0, y: 18, rotation: 8 }, { autoAlpha: 1, y: 0, rotation: 0, duration: 0.55, ease: "back.out(2.2)" }, 2.1);
}

/**
 * One gentle fall of paper confetti across the page. Web Animations rather than
 * GSAP, so the fall runs on the compositor; each scrap hides again once it has
 * landed, which also drops its layer.
 */
function confetti(root: HTMLElement, pieces: Element[]) {
  const { width, height } = root.getBoundingClientRect();
  const r = gsap.utils.random;

  return () =>
    pieces.forEach((piece) => {
      const el = piece as HTMLElement;
      const x = r(0, width);
      const y0 = r(-0.3 * height, -24);
      const spin = r(-300, 300);
      const flip = r(360, 1080);
      const r0 = r(0, 360);
      const sway = r(20, 55);
      const phase = r(0, Math.PI * 2);

      // Falls at a steady pace, drifting side to side like paper.
      const frames = Array.from({ length: 9 }, (_, k) => {
        const p = k / 8;
        const dx = Math.sin(phase + p * Math.PI * 3) * sway;
        return {
          transform: `translate(${(x + dx).toFixed(1)}px, ${(y0 + (height + 30 - y0) * p).toFixed(1)}px) rotate(${(r0 + spin * p).toFixed(1)}deg) rotateX(${(flip * p).toFixed(1)}deg)`,
        };
      });

      el.style.visibility = "visible";
      el.animate(frames, { duration: r(3400, 5600), delay: r(0, 1100), fill: "backwards", easing: "linear" }).onfinish = () => {
        el.style.visibility = "";
      };
    });
}

/** Reduced motion: the flames fade out, still wisps of smoke fade in, then the new heading and Turn Page. */
export function playBlowOutReduced(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const smoke = q('[data-anim="smoke"]');

  gsap
    .timeline()
    .to(q('[data-anim="hint"], [data-anim="flame"], [data-anim="glow"], [data-anim="halo"], [data-anim="word"]'), { autoAlpha: 0, duration: 0.4 }, 0)
    .set(q('[data-part="smokePath"]'), { strokeDashoffset: 0 }, 0)
    .fromTo(smoke, { autoAlpha: 0 }, { autoAlpha: 0.4, duration: 0.6 }, 0.3)
    .set(q('[data-anim="underline"]'), { strokeDashoffset: 0 }, 0.5)
    .fromTo(q('[data-anim="yay"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.5)
    .fromTo(q('[data-anim="turn"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 1.2);
}
