"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

/**
 * Media conditions for gsap.matchMedia(). Build the full timeline under
 * `motionOk` and an instant/fade-only version under `reduceMotion`:
 *
 *   useGSAP(() => {
 *     const mm = gsap.matchMedia();
 *     mm.add(motionMedia, (ctx) => {
 *       const { reduceMotion } = ctx.conditions!;
 *       ...
 *     });
 *   }, { scope });
 */
export const motionMedia = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, useGSAP };
