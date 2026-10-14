"use client";

import { useEffect, useRef, useState } from "react";

import { gsap, motionMedia, useGSAP } from "@/lib/gsap";

import {
  ArrowLeft,
  Bouquet,
  Camera,
  EnvelopeBack,
  EnvelopeFront,
  GinghamHeart,
  PinkBow,
  TinyHearts,
} from "./decorations";
import styles from "./surprise.module.css";
import { playEntrance, playEntranceReduced, playPress, playPressReduced } from "./surprise-timeline";

type Stage = "building" | "ready" | "pressing";

type SurpriseSceneProps = {
  /** Return to Page 5 (Choose your gift). */
  onBack: () => void;
  /**
   * Called once the card's press acknowledgement has played — the doorway into
   * Phase 12 (the diary). SceneFlow wires it to the diary spread.
   */
  onAdvance: () => void;
};

const prefersReducedMotion = () => window.matchMedia(motionMedia.reduceMotion).matches;

/**
 * Phase 11: Gift 4 — Birthday Surprise Intro (after Reference Image 11). A full
 * maroon page with a cream envelope whose "Happy Birthday Madam" card rises out
 * of it, a white compact camera overlapping the lower left, a rose bouquet
 * overlapping the right, and a handwritten "click me!" below. The reference's
 * red is the site's maroon; its camera wordmark is left out and every piece is
 * redrawn.
 *
 * The envelope is two overlaid SVGs — the back (body + open flap) sits behind
 * the card, the front pocket sits in front of the card's base — so the card
 * genuinely emerges. Tapping the card or "click me!" plays a small press and
 * calls `onAdvance` (into Phase 12). "← Back" returns to Page 5.
 */
export function SurpriseScene({ onBack, onAdvance }: SurpriseSceneProps) {
  const scope = useRef<HTMLElement>(null);
  const leftRef = useRef(false);
  const stageRef = useRef<Stage>("building");
  const advanceRef = useRef(onAdvance);
  useEffect(() => {
    advanceRef.current = onAdvance;
  }, [onAdvance]);
  const [stage, setStage] = useState<Stage>("building");

  const { contextSafe } = useGSAP(
    () => {
      const onReady = () => {
        if (stageRef.current === "building") {
          stageRef.current = "ready";
          setStage("ready");
        }
      };
      const mm = gsap.matchMedia();
      mm.add(motionMedia, (ctx) => {
        if (ctx.conditions?.reduceMotion) playEntranceReduced(scope.current!, onReady);
        else playEntrance(scope.current!, onReady);
      });
    },
    { scope },
  );

  const handleAdvance = () => {
    if (stageRef.current !== "ready") return;
    stageRef.current = "pressing";
    setStage("pressing");
    contextSafe(() => {
      const done = () => {
        advanceRef.current();
      };
      if (prefersReducedMotion()) playPressReduced(scope.current!, done);
      else playPress(scope.current!, done);
    })();
  };

  const handleBack = () => {
    if (leftRef.current) return;
    leftRef.current = true;
    onBack();
  };

  const ready = stage === "ready";

  return (
    <section ref={scope} aria-label="Your birthday surprise" className={`maroon-surface relative h-full w-full overflow-hidden ${styles.page}`}>
      <div data-anim="content" className={styles.content}>
        <button
          type="button"
          data-anim="back"
          onClick={handleBack}
          aria-label="Back to choosing your gift"
          className={styles.back}
        >
          <ArrowLeft className={styles.backArrow} />
          Back
        </button>

        <div className={styles.cluster}>
          {/* Envelope back (body + open flap) — behind the card. */}
          <span data-anim="envelope" aria-hidden className={`${styles.piece} ${styles.envelopeBack}`}>
            <EnvelopeBack />
          </span>

          {/* The card rising out of the envelope. A real button. */}
          <button
            type="button"
            data-anim="card"
            onClick={handleAdvance}
            aria-disabled={!ready}
            aria-label="Open your birthday surprise"
            className={`${styles.piece} ${styles.cardBtn}`}
          >
            <span className={styles.card}>
              <span data-anim="line" className={styles.cardLine}>
                Happy
              </span>
              <span data-anim="line" className={styles.cardLine}>
                Birthday
              </span>
              <span data-anim="line" className={`${styles.cardLine} ${styles.cardMadam}`}>
                Madam
              </span>
            </span>
          </button>

          {/* Envelope front pocket — over the card's base, so it looks tucked in. */}
          <span data-anim="envelope" aria-hidden className={`${styles.piece} ${styles.envelopeFront}`}>
            <EnvelopeFront />
          </span>

          {/* Camera overlapping the lower left, bouquet the right. */}
          <span data-anim="camera" aria-hidden className={`${styles.piece} ${styles.camera}`}>
            <Camera />
          </span>
          <span data-anim="bouquet" aria-hidden className={`${styles.piece} ${styles.bouquet}`}>
            <Bouquet />
          </span>

          {/* Little bits pinned to the envelope front. */}
          <span data-anim="mini" aria-hidden className={`${styles.piece} ${styles.bow}`}>
            <PinkBow />
          </span>
          <span data-anim="mini" aria-hidden className={`${styles.piece} ${styles.heart}`}>
            <GinghamHeart />
          </span>
          <span data-anim="mini" aria-hidden className={`${styles.piece} ${styles.tinies}`}>
            <TinyHearts />
          </span>
        </div>

        <button type="button" data-anim="clickme" onClick={handleAdvance} aria-disabled={!ready} className={styles.clickme}>
          click me!
        </button>
      </div>
    </section>
  );
}
