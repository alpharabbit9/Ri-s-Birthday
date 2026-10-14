"use client";

import { useRef, useState } from "react";

import { useMusic } from "@/components/audio/music";
import { gsap, motionMedia, useGSAP } from "@/lib/gsap";

import { GreetingPage } from "./GreetingPage";
import { PhotoPage } from "./PhotoPage";
import { playEntrance, playEntranceReduced, playTurn, playTurnReduced } from "./spread-timeline";
import styles from "./spread.module.css";

const prefersReducedMotion = () => window.matchMedia(motionMedia.reduceMotion).matches;

type BirthdaySpreadProps = {
  /** Called once the page has been turned and the next scene can take over. */
  onTurn: () => void;
};

/**
 * Page 2: the scrapbook that came out of the envelope, open on its birthday
 * spread (after Reference Image 1). Pages sit side by side in landscape and
 * stack top/bottom in portrait. The right (bottom) page is a two-sided leaf so
 * Turn Page can swing it over the spine.
 */
export function BirthdaySpread({ onTurn }: BirthdaySpreadProps) {
  const scope = useRef<HTMLElement>(null);
  const turnedRef = useRef(false);
  const [turning, setTurning] = useState(false);
  const { playEffect } = useMusic();

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionMedia, (ctx) => {
        if (ctx.conditions?.reduceMotion) playEntranceReduced(scope.current!);
        else playEntrance(scope.current!);
      });
    },
    { scope },
  );

  const handleTurn = () => {
    if (turnedRef.current) return;
    turnedRef.current = true;
    setTurning(true);

    // Sound the paper turn as the flip starts (the scene switches when it ends).
    playEffect("pageTurn");

    contextSafe(() => {
      if (prefersReducedMotion()) playTurnReduced(scope.current!, onTurn);
      else playTurn(scope.current!, onTurn);
    })();
  };

  return (
    <section
      ref={scope}
      aria-label="Happy birthday, Madam"
      className="flex h-full w-full items-center justify-center p-3"
    >
      <div data-anim="book" className={styles.book}>
        <PhotoPage />

        <div data-part="slot" className={styles.slot}>
          {/* The sheet underneath, revealed as the page turns */}
          <div aria-hidden className={`${styles.face} ${styles.page} ${styles.blank}`} />
          <div data-part="leaf" className={styles.leaf}>
            <GreetingPage onTurn={handleTurn} turning={turning} />
            <div aria-hidden className={`${styles.face} ${styles.page} ${styles.blank} ${styles.backFace}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
