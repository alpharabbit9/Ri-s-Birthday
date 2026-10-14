"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";

import { ease, stagger } from "@/lib/motion";

import { Cassette, GoldStar, MusicNotes, RibbonBow, TeddyBears } from "./decorations";
import { finalLetter } from "./letter-content";
import styles from "./final-letter.module.css";
import { finalPhoto } from "./photo";

/**
 * Phase 15: Final Memory Letter (after Reference Image 15). The last panel in
 * the shared vertical scroll surface (MemoryScroll), reached by scrolling down
 * from the photo reel — no page-turn. A cream letter page with large
 * postage-stamp scalloped edges carries the handwritten letter; the user's photo
 * (`us9`) overlaps its right, with a cassette + music notes, two hugging teddy
 * bears, a ribbon bow and a few gold stars placed around it.
 *
 * The letter text and the "Saranghaeyo nae sarang" closing are the exact words
 * from PHASES.md, shown verbatim (letter-content.ts). The cassette is decorative
 * only — this phase defines no interaction (music is Phase 16).
 *
 * Entrance is Motion `whileInView`: the letter block, the photo and the cassette
 * cluster are placed in a hand-stagger as the section scrolls into view.
 * MotionConfig reducedMotion="user" fades them in without movement when asked,
 * and globals.css collapses the CSS note sway.
 */

/** Container: reveal children in a hand-placed sequence as it scrolls in. */
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
};

/** A placed object (paper, cassette): rises and settles. */
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.paper } },
};

/** A pressed-down sticker/photo: a small scale settle. */
const stick: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: ease.settle } },
};

const inView = { once: true, amount: 0.3 } as const;

export function FinalLetterScene() {
  return (
    <motion.section
      aria-label="A last letter for you"
      className={`maroon-surface ${styles.section}`}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      <div className={styles.stage}>
        {/* ---------- The letter page ---------- */}
        <motion.div variants={item} className={styles.paperWrap}>
          <div className={styles.sheet}>
            <div className={`paper-surface ${styles.paper}`}>
              <div className={styles.letter}>
                <p className={styles.body}>{finalLetter.body}</p>
                <p className={styles.closing}>{finalLetter.closing}</p>
              </div>
            </div>
          </div>

          <span aria-hidden className={styles.bow}>
            <RibbonBow />
          </span>
          <span aria-hidden className={`${styles.star} ${styles.starA}`}>
            <GoldStar />
          </span>
          <span aria-hidden className={`${styles.star} ${styles.starB}`}>
            <GoldStar />
          </span>
          <span aria-hidden className={styles.teddy}>
            <TeddyBears />
          </span>
        </motion.div>

        {/* ---------- Photo (us9), overlapping the letter's right ---------- */}
        <motion.figure variants={stick} className={styles.photoWrap}>
          <div className={styles.photo}>
            <Image
              src={finalPhoto.src}
              alt={finalPhoto.alt}
              fill
              sizes={finalPhoto.sizes}
              className={styles.photoImg}
            />
          </div>
        </motion.figure>

        {/* ---------- Cassette + music notes ---------- */}
        <motion.div variants={item} className={styles.cassetteWrap}>
          <span aria-hidden className={styles.cassette}>
            <Cassette />
          </span>
          <span aria-hidden className={styles.notes}>
            <MusicNotes />
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
