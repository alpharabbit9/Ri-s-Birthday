import { gsap } from "@/lib/gsap";

/**
 * Page 1 choreography. Plain functions over DOM nodes so the component stays
 * declarative; EnvelopeScene runs them inside the useGSAP context so every
 * tween is cleaned up on unmount.
 */

const PART_NAMES = [
  "idle",
  "hint",
  "body",
  "back",
  "card",
  "cardArt",
  "pocket",
  "flap",
  "seal",
  "sealWhole",
  "sealL",
  "sealR",
  "lock",
  "shackle",
] as const;
type PartName = (typeof PART_NAMES)[number];
export type EnvelopeParts = Record<PartName, HTMLElement>;

/** Wraps a deferred callback so tweens it creates join the useGSAP context. */
type Safe = (fn: () => void) => () => void;

export function getParts(root: HTMLElement): EnvelopeParts {
  return Object.fromEntries(
    PART_NAMES.map((name) => [name, root.querySelector<HTMLElement>(`[data-part="${name}"]`)!]),
  ) as EnvelopeParts;
}

/** Gentle resting sway while the envelope waits to be opened. */
export function startIdle(idle: HTMLElement, delay: number) {
  return gsap.fromTo(
    idle,
    { rotation: -1.4, y: 0 },
    { rotation: 0.8, y: -5, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay },
  );
}

/** Desktop hover: the flap lifts a little, as if about to open. */
export function peekFlap(flap: HTMLElement, lift: boolean) {
  gsap.to(flap, {
    rotationX: lift ? 26 : 0,
    duration: lift ? 0.45 : 0.35,
    ease: lift ? "power2.out" : "power2.inOut",
    overwrite: "auto",
  });
}

/**
 * Transform that shrinks the padlock (at rest, untransformed) onto the seal.
 * Measured live, so it follows the envelope wherever it currently is.
 */
function lockOnSeal(p: EnvelopeParts) {
  const seal = p.seal.getBoundingClientRect();
  const lock = p.lock.getBoundingClientRect();
  return {
    x: seal.left + seal.width / 2 - (lock.left + lock.width / 2),
    y: seal.top + seal.height / 2 - (lock.top + lock.height / 2),
    scale: (seal.width / lock.width) * 0.9,
  };
}

/**
 * Click: the envelope stays shut. The seal wobbles and a padlock pops out of
 * it, growing in front of the envelope while the envelope sinks back a little.
 */
export function playLockOut(p: EnvelopeParts) {
  const fromSeal = lockOnSeal(p);

  gsap.killTweensOf(p.idle);
  gsap
    .timeline()
    .to(p.hint, { autoAlpha: 0, y: 10, duration: 0.3, ease: "power1.out" }, 0)
    // If a hover lifted the flap, press it shut: it's sealed.
    .to(p.flap, { rotationX: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" }, 0)
    .to(p.idle, { rotation: 0, y: 0, duration: 0.35, ease: "power2.out" }, 0)
    .to(p.body, { scale: 0.96, duration: 0.12, ease: "power2.out" }, 0)
    .to(p.body, { scale: 1, duration: 0.45, ease: "back.out(3)" }, 0.12)
    // Something is stirring inside the seal…
    .to(p.seal, { scale: 1.22, rotation: -9, duration: 0.15, ease: "power2.out" }, 0.18)
    .to(p.seal, { rotation: 8, duration: 0.12, ease: "sine.inOut" }, 0.33)
    .to(p.seal, { scale: 1, rotation: 0, duration: 0.22, ease: "power2.in" }, 0.45)
    // …and the padlock pops out of it.
    .fromTo(
      p.lock,
      { ...fromSeal, rotation: -16 },
      { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.85, ease: "back.out(1.3)" },
      0.52,
    )
    .to(p.lock, { opacity: 1, duration: 0.12, ease: "none" }, 0.52)
    .to(p.idle, { scale: 0.93, duration: 0.8, ease: "power2.inOut" }, 0.52);
}

/**
 * Right code: the shackle springs open, the padlock shrinks back into the
 * seal, the seal cracks in two and falls away, and the envelope opens.
 */
export function playUnlock(p: EnvelopeParts, safe: Safe, done: () => void) {
  const backIntoSeal = safe(() => {
    const toSeal = lockOnSeal(p);
    gsap
      .timeline()
      .to(p.lock, { ...toSeal, rotation: 14, duration: 0.6, ease: "power3.in" }, 0)
      .to(p.lock, { opacity: 0, duration: 0.12, ease: "none" }, 0.5)
      // The seal swallows it…
      .to(p.seal, { scale: 1.32, duration: 0.14, ease: "power2.out" }, 0.58)
      .to(p.seal, { scale: 1, duration: 0.2, ease: "power2.in" }, 0.72)
      // …and cracks in two.
      .set(p.sealWhole, { autoAlpha: 0 }, 1)
      .set([p.sealL, p.sealR], { autoAlpha: 1 }, 1)
      .to(p.sealL, { xPercent: -9, rotation: -10, duration: 0.14, ease: "power2.out" }, 1)
      .to(p.sealR, { xPercent: 9, rotation: 10, duration: 0.14, ease: "power2.out" }, 1)
      .to(p.sealL, { xPercent: -70, yPercent: 240, rotation: -55, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 1.3)
      .to(p.sealR, { xPercent: 70, yPercent: 220, rotation: 50, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 1.3)
      .call(safe(() => openEnvelope(p, safe, done)), [], 1.68);
  });

  gsap
    .timeline({ onComplete: backIntoSeal })
    .set(p.shackle, { transformOrigin: "24% 100%" })
    .to(p.shackle, { yPercent: -16, duration: 0.16, ease: "power2.out" }, 0)
    .to(p.shackle, { rotation: -14, duration: 0.5, ease: "back.out(2.4)" }, 0.14)
    // The envelope comes forward again to take the lock back.
    .to(p.idle, { scale: 1, duration: 0.6, ease: "power2.inOut" }, 0.2)
    .set({}, {}, "+=0.2");
}

/**
 * Flap swings open → card rises and peeks out (beat) → card slides out →
 * card comes toward the viewer and fills the screen → done.
 */
function openEnvelope(p: EnvelopeParts, safe: Safe, done: () => void) {
  const H = p.body.offsetHeight;

  const bringForward = safe(() => {
    const rect = p.card.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cover = Math.max(vw / p.card.offsetWidth, vh / p.card.offsetHeight) * 1.12;

    gsap
      .timeline({ onComplete: done })
      .to(
        p.card,
        {
          x: `+=${vw / 2 - (rect.left + rect.width / 2)}`,
          y: `+=${vh / 2 - (rect.top + rect.height / 2)}`,
          scale: cover,
          rotation: 0,
          borderRadius: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0,
      )
      .to(p.cardArt, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, 0.15)
      // The envelope drops away as one solid piece (same offset on every layer).
      .to([p.back, p.pocket, p.flap], { y: `+=${vh * 0.8}`, duration: 0.8, ease: "power2.in" }, 0.05)
      .to(p.card, { boxShadow: "0 0 0 rgb(0 0 0 / 0)", duration: 0.4 }, 0.6);
  });

  const pullOut = safe(() => {
    gsap
      .timeline({ onComplete: bringForward })
      .to(p.card, { y: `-=${H * 0.5}`, rotation: 1.5, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(p.body, { y: `+=${H * 0.12}`, duration: 0.55, ease: "power2.inOut" }, 0)
      // Fully out of the pocket: bring it in front of everything.
      .set(p.card, { zIndex: 10 });
  });

  gsap
    .timeline({ onComplete: pullOut })
    .to(p.flap, { rotationX: 180, duration: 0.75, ease: "power2.inOut", overwrite: "auto" }, 0)
    // Past 90° the flap is behind the envelope: drop it under the card.
    .set(p.flap, { zIndex: 1 }, 0.375)
    // The envelope settles lower to make room for the card above it.
    .to(p.body, { y: H * 0.22, duration: 1, ease: "power2.inOut" }, 0)
    .to(p.card, { y: -H * 0.46, rotation: -2, duration: 0.85, ease: "power3.out" }, 0.65)
    // A beat of anticipation with the card peeking out.
    .set({}, {}, "+=0.6");
}

/** Reduced motion: the padlock fades in over the seal, no movement. */
export function playLockOutReduced(p: EnvelopeParts) {
  gsap.killTweensOf(p.idle);
  gsap
    .timeline()
    .to(p.hint, { autoAlpha: 0, duration: 0.2 }, 0)
    .to(p.lock, { opacity: 1, duration: 0.3 }, 0.1);
}

/** Reduced motion: crossfades only (lock → broken seal → open envelope). */
export function playUnlockReduced(p: EnvelopeParts, done: () => void) {
  const H = p.body.offsetHeight;

  gsap
    .timeline({ onComplete: done })
    .to(p.lock, { opacity: 0, duration: 0.25 }, 0.2)
    .set(p.sealWhole, { autoAlpha: 0 }, 0.45)
    .set(p.sealL, { autoAlpha: 1, xPercent: -9, rotation: -10 }, 0.45)
    .set(p.sealR, { autoAlpha: 1, xPercent: 9, rotation: 10 }, 0.45)
    .to(p.body, { autoAlpha: 0, duration: 0.25 }, 1.1)
    .set([p.sealL, p.sealR], { autoAlpha: 0 })
    .set(p.flap, { rotationX: 180, zIndex: 1 })
    .set(p.card, { y: -H * 0.46 })
    .to(p.body, { autoAlpha: 1, duration: 0.3 })
    .set({}, {}, "+=1.4");
}
