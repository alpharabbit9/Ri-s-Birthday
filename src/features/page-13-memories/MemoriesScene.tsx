"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

import { ease, stagger } from "@/lib/motion";

import { CornerStar, OpenEnvelope, TinyHearts } from "./decorations";
import { memoriesContent } from "./memories-content";
import styles from "./memories.module.css";
import { memoriesBottomPhoto, memoriesTopPhoto } from "./photos";

/**
 * Phase 13: Scrolling Memory Scrapbook (after Reference Image 13). The diary
 * spread (Phase 12) scrolls straight into this maroon page — no page-turn — via
 * the shared MemoryScroll surface. Two distinct scrapbook compositions stacked
 * vertically:
 *
 *   Top    — the user's photo (`us2`) as a Polaroid over an opened cream
 *            envelope on the left, and a handwritten note area on the right.
 *   Bottom — a handwritten note area on the left, and the user's photo (`us3`)
 *            as a Polaroid on the right, taped at the top-right and bottom-left
 *            corners with a little star.
 *
 * The note areas are deliberately empty of real content: the phase spec says to
 * leave them for the user and not invent personal messages, so they hold
 * clearly-marked placeholder lines (memories-content.ts) and an outlined
 * "fill in later" frame until the user sends their words.
 *
 * Entrance is Motion `whileInView` (staggered, placed-by-hand); MotionConfig
 * reducedMotion="user" fades them in without movement when asked.
 */

/** Container: reveal children in a hand-placed sequence as it scrolls in. */
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
};

/** A placed object: rises and settles. (Reduced motion keeps only the fade.) */
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.paper } },
};

/** A pressed-down sticker/photo: a small scale settle. */
const stick: Variants = {
  hidden: { opacity: 0, y: -14, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: ease.settle } },
};

const inView = { once: true, amount: 0.25 } as const;

/** One handwritten note area (placeholder until the user supplies the words). */
function Note({ lines, className }: { lines: readonly string[]; className?: string }) {
  const noteClass = `${styles.note} ${memoriesContent.placeholder ? styles.notePlaceholder : ""} ${className ?? ""}`;
  return (
    <motion.div variants={item} className={noteClass} data-placeholder={memoriesContent.placeholder}>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </motion.div>
  );
}

export function MemoriesScene() {
  return (
    <section aria-label="Our memories" className={`maroon-surface ${styles.section}`}>
      {/* ---------- Top composition: photo + envelope (left), note (right) ---------- */}
      <motion.div
        className={`${styles.comp} ${styles.compTop}`}
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        <div className={styles.photoCol}>
          <motion.span variants={item} aria-hidden className={styles.envelope}>
            <OpenEnvelope />
          </motion.span>

          <motion.figure variants={stick} className={`${styles.polaroid} ${styles.polaroidTop}`}>
            <span aria-hidden className={`${styles.tape} ${styles.tapeCandy} ${styles.tapeTopA}`} />
            <span aria-hidden className={`${styles.tape} ${styles.tapeCandy} ${styles.tapeTopB}`} />
            <div className={styles.photo}>
              <Image
                src={memoriesTopPhoto.src}
                alt={memoriesTopPhoto.alt}
                fill
                sizes={memoriesTopPhoto.sizes}
                className={styles.photoImg}
              />
            </div>
          </motion.figure>

          <motion.span variants={stick} aria-hidden className={styles.tinyHearts + " " + styles.tinyHeartsTop}>
            <TinyHearts />
          </motion.span>
        </div>

        <div className={styles.noteCol}>
          <Note lines={memoriesContent.topNote.lines} />
        </div>
      </motion.div>

      {/* ---------- Bottom composition: note (left), photo (right) ---------- */}
      <motion.div
        className={`${styles.comp} ${styles.compBottom}`}
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        <div className={styles.noteCol}>
          <Note lines={memoriesContent.bottomNote.lines} />
        </div>

        <div className={styles.photoCol}>
          <motion.figure variants={stick} className={`${styles.polaroid} ${styles.polaroidBottom}`}>
            <span aria-hidden className={`${styles.tape} ${styles.tapeKraft} ${styles.tapeTR}`} />
            <span aria-hidden className={`${styles.tape} ${styles.tapeKraft} ${styles.tapeBL}`} />
            <motion.span variants={stick} aria-hidden className={styles.cornerStar}>
              <CornerStar />
            </motion.span>
            <div className={styles.photo}>
              <Image
                src={memoriesBottomPhoto.src}
                alt={memoriesBottomPhoto.alt}
                fill
                sizes={memoriesBottomPhoto.sizes}
                className={styles.photoImg}
              />
            </div>
          </motion.figure>
        </div>
      </motion.div>
    </section>
  );
}
