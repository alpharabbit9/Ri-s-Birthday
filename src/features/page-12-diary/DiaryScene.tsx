"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, motionMedia, useGSAP } from "@/lib/gsap";

import { BinderRing, Cupcake, GinghamHeart, StarCharm } from "./decorations";
import { diaryContent } from "./diary-content";
import styles from "./diary.module.css";
import { playEntrance, playEntranceReduced } from "./diary-timeline";
import { diaryPhoto } from "./photo";

/** The spiral binding is a run of identical rings down the gutter. */
const RINGS = Array.from({ length: 8 });

/** Left arrow for the Back tab. */
function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 20" className={className} aria-hidden>
      <path d="M11 2 2 10l9 8M3 10h27" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type DiarySceneProps = {
  /** Return to Page 5 (Choose your gift). */
  onBack: () => void;
};

/**
 * Phase 12: Birthday Diary Opening Spread (after Reference Image 12). An open
 * spiral-bound diary on maroon. Left page: a big "22", a cupcake and the
 * birthday message (verbatim from the phase spec). Right page: the user's photo
 * (`us1`) as a Polaroid with a "favourite person" label, candy-stripe tape, a
 * gingham heart, a star charm, and "I love you". The reference's red is maroon.
 *
 * This spread is the start of the memory sections (Phases 13–15, not yet built),
 * so there is no page-turn onward. "← Back" returns to Page 5.
 */
export function DiaryScene({ onBack }: DiarySceneProps) {
  const scope = useRef<HTMLElement>(null);
  const leftRef = useRef(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionMedia, (ctx) => {
        if (ctx.conditions?.reduceMotion) playEntranceReduced(scope.current!, () => {});
        else playEntrance(scope.current!, () => {});
      });
    },
    { scope },
  );

  const handleBack = () => {
    if (leftRef.current) return;
    leftRef.current = true;
    onBack();
  };

  return (
    <section ref={scope} aria-label="Birthday diary" className={`maroon-surface relative h-full w-full overflow-hidden ${styles.page ?? ""}`}>
      <div data-anim="content" className={styles.content}>
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to choosing your gift"
          className={styles.back}
        >
          <ArrowLeft className={styles.backArrow} />
          Back
        </button>

        <div data-anim="book" className={styles.diary}>
          <div aria-hidden className={styles.cover} />

          <div className={styles.pages}>
            {/* Left page */}
            <div className={`${styles.pageHalf} ${styles.pageL}`}>
              <div className={styles.leftInner}>
                <span className={styles.numRow}>
                  <span data-anim="num" className={styles.bigNum}>
                    {diaryContent.age}
                  </span>
                  <span data-anim="num" aria-hidden className={styles.cupcake}>
                    <Cupcake />
                  </span>
                </span>
                <p data-anim="msg" className={styles.message}>
                  {diaryContent.message}
                </p>
              </div>
            </div>

            {/* Spiral binding */}
            <div aria-hidden className={styles.spiral}>
              {RINGS.map((_, i) => (
                <span key={i} data-anim="ring" className={styles.ring}>
                  <BinderRing />
                </span>
              ))}
            </div>

            {/* Right page */}
            <div className={`${styles.pageHalf} ${styles.pageR}`}>
              <div className={styles.rightInner}>
                <div className={styles.photoWrap}>
                  <span aria-hidden className={styles.tape} />
                  <figure data-anim="polaroid" className={styles.polaroid}>
                    <div className={styles.photo}>
                      <Image
                        src={diaryPhoto.src}
                        alt={diaryPhoto.alt}
                        fill
                        sizes={diaryPhoto.sizes}
                        loading="eager"
                        className={styles.photoImg}
                      />
                    </div>
                    <span data-anim="fav" className={styles.favLabel}>
                      {diaryContent.favouriteLabel}
                    </span>
                    <span data-anim="deco" aria-hidden className={styles.ginghamHeart}>
                      <GinghamHeart />
                    </span>
                    <span data-anim="deco" aria-hidden className={styles.starCharm}>
                      <StarCharm />
                    </span>
                  </figure>
                </div>
                <span data-anim="love" className={styles.subtitle}>
                  {diaryContent.subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
