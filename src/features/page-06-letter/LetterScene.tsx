"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import { gsap, motionMedia, useGSAP } from "@/lib/gsap";

import {
  ArrowLeft,
  BalloonDog,
  BinderClip,
  Camera,
  Couple,
  Daisy,
  LipKiss,
  MiniCake,
  MirrorBall,
  PartyHat,
  StarTape,
  Teddy,
} from "./decorations";
import { letter } from "./letter-content";
import styles from "./letter.module.css";
import { playEntrance, playEntranceReduced } from "./letter-timeline";
import { letterPhotos } from "./photos";

type LetterSceneProps = {
  /** Return to Page 5 (Choose your gift). */
  onBack: () => void;
};

/**
 * Page 6: Gift 1 — the letter (after Reference Image 8). A torn-paper letter
 * held by a binder clip on the left, with the user's two photographs framed on
 * the right, on a cream polka-dot page. The reference's blue is maroon.
 *
 * The letter text is a clearly-marked placeholder: the real words must come
 * from the user (INSTRUCTIONS.md Rule 2). "← Back" returns to Page 5.
 */
export function LetterScene({ onBack }: LetterSceneProps) {
  const scope = useRef<HTMLElement>(null);
  const leftRef = useRef(false);

  useGSAP(
    () => {
      const onReady = () => {}; // nothing is gated on the entrance here
      const mm = gsap.matchMedia();
      mm.add(motionMedia, (ctx) => {
        if (ctx.conditions?.reduceMotion) playEntranceReduced(scope.current!, onReady);
        else playEntrance(scope.current!, onReady);
      });
    },
    { scope },
  );

  const handleBack = () => {
    if (leftRef.current) return;
    leftRef.current = true;
    onBack();
  };

  const photoClass = [styles.photoA, styles.photoB];

  return (
    <section ref={scope} aria-label="A letter for you" className={`${styles.page} relative h-full w-full`}>
      <div aria-hidden className={styles.gingham} />

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

        <div className={styles.layout}>
          {/* ---------- Left: the letter ---------- */}
          <div className={styles.letterWrap}>
            <div data-anim="letter" className={styles.letterShadow}>
              <div className={styles.letterPaper}>
                <div className={`${styles.letterInner} ${letter.placeholder ? styles.placeholder : ""}`}>
                  <p data-anim="line" className={styles.salutation}>
                    {letter.salutation}
                  </p>
                  <div className={styles.body}>
                    {letter.body.map((line, i) => (
                      <span key={i} data-anim="line" className={styles.line}>
                        {line}
                      </span>
                    ))}
                  </div>
                  <p data-anim="line" className={styles.closing}>
                    {letter.closing}
                  </p>
                </div>
              </div>
            </div>

            {/* Letter decorations (siblings of the clipped paper, so they can hang off its edges) */}
            <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.clip}`}>
              <BinderClip />
            </span>
            <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.kiss}`}>
              <LipKiss />
            </span>
            <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.tape}`}>
              <StarTape />
            </span>
            <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.couple}`}>
              <Couple />
            </span>
            <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.cake}`}>
              <MiniCake />
            </span>
            <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.teddy}`}>
              <Teddy />
            </span>
          </div>

          {/* ---------- Right: the two photographs ---------- */}
          <div className={styles.photos}>
            {letterPhotos.map((photo, i) => (
              <figure key={photo.src} data-anim="photo" className={`${styles.photo} ${photoClass[i]}`}>
                <div className={styles.tilt}>
                  <div className={styles.frame}>
                    <div className={styles.shot} style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={photo.sizes}
                        loading="eager"
                        className="object-cover"
                        style={{ objectPosition: photo.object } as CSSProperties}
                      />
                    </div>
                  </div>
                </div>

                {i === 0 && (
                  <>
                    <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.cameraDeco}`}>
                      <Camera />
                    </span>
                    <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.daisyB}`}>
                      <Daisy />
                    </span>
                  </>
                )}
                {i === 1 && (
                  <span data-anim="deco" aria-hidden className={`${styles.deco} ${styles.daisyA}`}>
                    <Daisy />
                  </span>
                )}
              </figure>
            ))}

            {/* Decorations over the photo area */}
            <span data-anim="deco" aria-hidden className={styles.balls}>
              <span className={`${styles.ball} ${styles.ballA}`}>
                <MirrorBall />
              </span>
              <span className={styles.ball}>
                <MirrorBall />
              </span>
            </span>
            <span data-anim="deco" aria-hidden className={styles.balloonDog}>
              <BalloonDog />
            </span>
            <span data-anim="deco" aria-hidden className={styles.partyHat}>
              <PartyHat />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
