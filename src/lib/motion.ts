import type { Transition } from "motion/react";

/**
 * Shared motion tokens. Scrapbook objects should feel like paper and card
 * being placed by hand: quick to arrive, a soft settle, never a hard bounce.
 */

export const ease = {
  /** Default for paper sliding/settling into place. */
  paper: [0.22, 1, 0.36, 1],
  /** Small overshoot, for things that get pressed or stuck down. */
  settle: [0.34, 1.32, 0.64, 1],
} as const;

export const spring = {
  /** A sheet of paper landing on a surface. */
  paper: { type: "spring", stiffness: 220, damping: 24, mass: 0.9 },
  /** A sticker/tape being pressed down: a bit snappier. */
  sticker: { type: "spring", stiffness: 380, damping: 22 },
  /** Gentle response to tap/hover. */
  press: { type: "spring", stiffness: 500, damping: 30 },
} satisfies Record<string, Transition>;

export const duration = {
  quick: 0.2,
  base: 0.45,
  slow: 0.8,
  scene: 1.2,
} as const;

/** Default gap between staggered scrapbook elements (seconds). */
export const stagger = 0.12;

/**
 * Tiny deterministic "handmade" offset so repeated elements don't share an
 * identical rotation. Stable across renders (no Math.random in render).
 */
export function handTilt(index: number, maxDeg = 3): number {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  return ((x - Math.floor(x)) * 2 - 1) * maxDeg;
}
