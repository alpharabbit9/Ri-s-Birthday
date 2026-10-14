"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

import { ease, stagger } from "@/lib/motion";

import { GoldStar, StringBow } from "./decorations";
import { reelPhotos, REEL_SIZES } from "./photos";
import styles from "./reel.module.css";

/**
 * Phase 14: Photo Reel (after Reference Image 14). A single 35mm film strip laid
 * across the maroon page — black stock with sprocket perforations along both
 * edges — carrying five of the user's photos (`us4`–`us8`), with a white string
 * bow tied at its top-left and a small gold star past its right end.
 *
 * It is one more panel in the shared vertical scroll surface (MemoryScroll), so
 * it is reached by scrolling down from the memory scrapbook — no page-turn. On
 * tablet/desktop all five frames sit in a row and the strip drifts very gently
 * (CSS, so it stays off the main thread) to feel like running film; on phones the
 * strip is a horizontal swipe (scroll-snap) with larger frames and no drift.
 *
 * Entrance is Motion `whileInView`: the bow, each frame, and the star are placed
 * in a hand-stagger as the reel scrolls into view. MotionConfig
 * reducedMotion="user" fades them in without movement when asked, and globals.css
 * collapses the CSS drift.
 */

/** Container: reveal children in a hand-placed sequence as it scrolls in. */
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
};

/** A pressed-down photo/sticker: rises with a small scale settle. */
const stick: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: ease.settle } },
};

const inView = { once: true, amount: 0.3 } as const;

export function ReelScene() {
  return (
    <motion.section
      aria-label="A reel of our photos"
      className={`maroon-surface ${styles.section}`}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      <div className={styles.stage}>
        <motion.span variants={stick} aria-hidden className={styles.bow}>
          <StringBow />
        </motion.span>

        {/* data-lenis-prevent: the horizontal film swipe stays native — Lenis
            (which smooths the vertical page) must not consume it. */}
        <div className={styles.window} data-lenis-prevent>
          <div className={styles.strip}>
            <span aria-hidden className={`${styles.perf} ${styles.perfTop}`} />
            <span aria-hidden className={`${styles.perf} ${styles.perfBottom}`} />

            {reelPhotos.map((photo) => (
              <motion.figure key={photo.src} variants={stick} className={styles.frame}>
                <div className={styles.cell}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={REEL_SIZES}
                    className={styles.cellImg}
                  />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>

        <motion.span variants={stick} aria-hidden className={styles.star}>
          <GoldStar />
        </motion.span>
      </div>
    </motion.section>
  );
}
