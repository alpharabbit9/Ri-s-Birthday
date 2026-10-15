"use client";

import Image from "next/image";
import { Fragment, useRef, type CSSProperties } from "react";

import { gsap, motionMedia, useGSAP } from "@/lib/gsap";

import {
  ArrowLeft,
  BinderClip,
  Bloom,
  MartiniGlass,
  PartyHat,
  PlushBunny,
  PuffHeart,
  Record,
  StarBurst,
  Swirl,
} from "./decorations";
import styles from "./flower.module.css";
import { playEntrance, playEntranceReduced } from "./flower-timeline";
import { filmPhotos } from "./photos";
import { heroKitten } from "./sticker";

const HEADING = ["Some", "flowers", "for", "you"];

type FlowerSceneProps = {
  /** Return to Page 5 (Choose your gift). */
  onBack: () => void;
};

/**
 * Page 7: Gift 2 — Flower (after Reference Image 9, "Some flowers for you").
 * A dotted filmstrip of the user's three photos on the left and the kitten with
 * its bouquet (the sticker from Page 4, which the user chose to reuse here) as
 * the centrepiece, on a cream polka-dot page with gingham corners. The
 * reference's blue is maroon. "← Back" returns to Page 5.
 */
export function FlowerScene({ onBack }: FlowerSceneProps) {
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

  return (
    <section ref={scope} aria-label="Some flowers for you" className={`${styles.page} relative h-full w-full`}>
      <div aria-hidden className={styles.gingham} />
      <div aria-hidden className={styles.ginghamB} />

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
          {/* ---------- Heading + festive corner cluster ---------- */}
          <div className={styles.headingWrap}>
            <span data-anim="deco" aria-hidden className={styles.hatA}>
              <PartyHat />
            </span>
            <span data-anim="deco" aria-hidden className={styles.hatB}>
              <PartyHat />
            </span>
            <span data-anim="deco" aria-hidden className={styles.stars}>
              <StarBurst />
            </span>
            <span data-anim="deco" aria-hidden className={styles.bloom}>
              <Bloom />
            </span>

            <h1 className={styles.heading}>
              {HEADING.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && " "}
                  <span data-anim="word" className={styles.word}>
                    {word}
                  </span>
                </Fragment>
              ))}
            </h1>
          </div>

          {/* ---------- Stage: filmstrip + kitten ---------- */}
          <div className={styles.stage}>
            {/* Filmstrip of the three photos */}
            <div className={styles.filmWrap}>
              <span data-anim="deco" aria-hidden className={styles.clip}>
                <BinderClip />
              </span>
              <span data-anim="deco" aria-hidden className={styles.bunny}>
                <span className={styles.bunnyBob}>
                  <PlushBunny />
                </span>
              </span>

              <div data-anim="film" className={styles.film}>
                {filmPhotos.map((photo) => (
                  <figure key={photo.src} data-anim="cell" className={styles.cell}>
                    <div className={styles.shot}>
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
                  </figure>
                ))}
              </div>

              <span data-anim="deco" aria-hidden className={styles.record}>
                <Record />
              </span>
              <span data-anim="deco" aria-hidden className={styles.martini}>
                <MartiniGlass />
              </span>
            </div>

            {/* Kitten hero with the bouquet */}
            <div className={styles.heroWrap}>
              <span data-anim="deco" aria-hidden className={styles.heart}>
                <PuffHeart />
              </span>
              <p data-anim="bubble" className={styles.bubble}>
                I brought you flowers, but they’ll never compare to your beauty. 💐 After all, even flowers know when
                they’ve met their queen. 👑💕
              </p>
              <div className={styles.heroFloat}>
                <div data-anim="hero" className={styles.hero}>
                  <div data-anim="hero-squash" className={styles.heroSquash}>
                    <Image
                      src={heroKitten.src}
                      alt={heroKitten.alt}
                      width={heroKitten.width}
                      height={heroKitten.height}
                      sizes={heroKitten.sizes}
                      loading="eager"
                      className={styles.heroImg}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right-edge flourish */}
            <span data-anim="deco" aria-hidden className={styles.swirl}>
              <Swirl />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
