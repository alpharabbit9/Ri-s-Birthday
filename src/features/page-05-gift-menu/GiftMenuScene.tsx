"use client";

import { Fragment, useRef, useState, type ComponentType, type CSSProperties } from "react";

import { gsap, motionMedia, useGSAP } from "@/lib/gsap";

import { Bouquet, Envelope, LipKiss, MartiniGlass, Surprise } from "./gifts";
import styles from "./menu.module.css";
import { playEntrance, playEntranceReduced, playSelect, playSelectReduced } from "./menu-timeline";

const HEADING = ["Yay!", "Choose", "your", "gift"];

const prefersReducedMotion = () => window.matchMedia(motionMedia.reduceMotion).matches;

/** The gift pages that exist as destinations (Pages 6, 7 and the surprise intro). */
export type GiftDestination = "letter" | "flower" | "surprise";

type ArtProps = { className?: string; style?: CSSProperties };

type Gift = {
  label: string;
  /** What the gift is, for the button's accessible name. */
  about: string;
  Art: ComponentType<ArtProps>;
  /** Where it opens. */
  to: GiftDestination;
  tilt: string;
  bannerTilt: string;
};

const GIFTS: Gift[] = [
  { label: "Gift 1", about: "a letter", Art: Envelope, to: "letter", tilt: "-4deg", bannerTilt: "2deg" },
  { label: "Gift 2", about: "a bouquet of flowers", Art: Bouquet, to: "flower", tilt: "3deg", bannerTilt: "-3deg" },
  { label: "Gift 3", about: "a surprise", Art: Surprise, to: "surprise", tilt: "4deg", bannerTilt: "-2deg" },
];

type Stage = "building" | "ready" | "leaving";

type GiftMenuSceneProps = {
  /** Called once the chosen gift has turned the page and its destination can take over. */
  onChoose: (to: GiftDestination) => void;
};

/**
 * Page 5: "Yay! Choose your gift" (after Reference Image 7). Three gifts on a
 * polka-dot page — envelope, bouquet and a wrapped surprise — each a cut-out
 * over a ribbon banner. Gift 1 → Page 6, Gift 2 → Page 7, Gift 3 → the surprise
 * intro (they turn the page over; their pages arrive on the blank sheet).
 */
export function GiftMenuScene({ onChoose }: GiftMenuSceneProps) {
  const scope = useRef<HTMLElement>(null);
  const stageRef = useRef<Stage>("building");
  const [stage, setStage] = useState<Stage>("building");

  const goTo = (next: Stage) => {
    stageRef.current = next;
    setStage(next);
  };

  const { contextSafe } = useGSAP(
    () => {
      const onReady = () => goTo("ready");
      const mm = gsap.matchMedia();
      mm.add(motionMedia, (ctx) => {
        if (ctx.conditions?.reduceMotion) playEntranceReduced(scope.current!, onReady);
        else playEntrance(scope.current!, onReady);
      });
    },
    { scope },
  );

  const handleChoose = (el: HTMLElement, to: GiftDestination) => {
    if (stageRef.current !== "ready") return;

    goTo("leaving");
    contextSafe(() => {
      if (prefersReducedMotion()) playSelectReduced(scope.current!, () => onChoose(to));
      else playSelect(scope.current!, el, () => onChoose(to));
    })();
  };

  const ready = stage === "ready";

  return (
    <section
      ref={scope}
      aria-label="Choose your gift"
      className={`${styles.page} relative h-full w-full overflow-hidden`}
    >
      <div data-anim="content" className={`${styles.column} relative z-10 flex h-full flex-col items-center px-[4cqw]`}>
        <div className={`${styles.headingWrap} relative`}>
          <span data-anim="deco" aria-hidden className={`${styles.martini} absolute block`}>
            <MartiniGlass className="block h-auto w-full drop-shadow-[0_3px_3px_rgb(33_26_23/0.28)]" />
          </span>
          <span data-anim="deco" aria-hidden className={`${styles.kiss} absolute block`}>
            <LipKiss className="block h-auto w-full drop-shadow-[0_3px_3px_rgb(33_26_23/0.28)]" />
          </span>

          <h1 className={`${styles.heading} mx-auto text-center font-hand leading-[0.95] font-bold text-balance text-ink`}>
            {HEADING.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                <span data-anim="word" className="inline-block">
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>
        </div>

        <div className={`${styles.gifts} min-h-0 w-full flex-1`}>
          {GIFTS.map((gift) => (
            <button
              key={gift.label}
              type="button"
              data-anim="gift"
              onClick={(e) => handleChoose(e.currentTarget, gift.to)}
              aria-disabled={!ready}
              aria-label={`${gift.label} — ${gift.about}`}
              className={styles.gift}
            >
              <span className={styles.tilt} style={{ rotate: gift.tilt }}>
                <span className={styles.art}>
                  <gift.Art />
                </span>
              </span>
              <span className={styles.banner} style={{ rotate: gift.bannerTilt }}>
                {gift.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Darkens the page as it turns over (see lib/page-turn) */}
      <div data-part="pageShade" aria-hidden className="pointer-events-none absolute inset-0 z-50 bg-ink opacity-0" />
    </section>
  );
}
