"use client";

import Image from "next/image";
import { Fragment, useRef, useState, type CSSProperties, type Ref } from "react";
import { flushSync } from "react-dom";

import { gsap, motionMedia, useGSAP } from "@/lib/gsap";

import { Cloud, Glint, MirrorBall, StarRibbon } from "./decorations";
import styles from "./gift.module.css";
import {
  playAccept,
  playAcceptReduced,
  playDecline,
  playDeclineReduced,
  playEntrance,
  playEntranceReduced,
  playReturn,
  playReturnReduced,
} from "./gift-timeline";
import { stickerOne, stickerTwo } from "./sticker";

const QUESTION = ["Accept", "your", "gift?"];
const SORRY = ["Please", "try", "again"];

/**
 * building (entrance) → asking → declining → declined (the maroon sheet is up)
 * → returning → asking … or asking → accepting (the page turns).
 */
type Stage = "building" | "asking" | "declining" | "declined" | "returning" | "accepting";

const prefersReducedMotion = () => window.matchMedia(motionMedia.reduceMotion).matches;

const WASH = "#e9cbc3";
const WARM_WHITE = "#fffdf8";

/** The three mirror balls, after the reference: two over the gingham top left, one top right. */
const BALLS = [
  { className: styles.ballA, late: true, glints: [[36, 40], [64, 74]] },
  { className: styles.ballB, late: false, glints: [[30, 46], [58, 34], [70, 76]] },
  { className: styles.ballC, late: true, glints: [[34, 38], [66, 52], [46, 82]] },
] as const;

type GiftChoiceSceneProps = {
  /** Called once YES has turned the page and the next scene can take over. */
  onAccept: () => void;
};

/**
 * Page 4: "Accept your gift?" (after Reference Image 4). The user's sticker-2
 * (a kitten with flowers and a present) on a polka-dot page, with YES and NO clouds. NO lays a sheet of maroon card
 * over the page with the user's sticker-1 on it (after Reference Image 5, but
 * not its cat); OKAY takes it away again. YES turns the page.
 */
export function GiftChoiceScene({ onAccept }: GiftChoiceSceneProps) {
  const scope = useRef<HTMLElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const okayRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<Stage>("building");
  const [stage, setStage] = useState<Stage>("building");

  const goTo = (next: Stage) => {
    stageRef.current = next;
    setStage(next);
  };

  const { contextSafe } = useGSAP(
    () => {
      const onReady = () => goTo("asking");
      const mm = gsap.matchMedia();
      mm.add(motionMedia, (ctx) => {
        if (ctx.conditions?.reduceMotion) playEntranceReduced(scope.current!, onReady);
        else playEntrance(scope.current!, onReady);
      });
    },
    { scope },
  );

  const handleYes = () => {
    if (stageRef.current !== "asking") return;
    goTo("accepting");
    contextSafe(() => {
      if (prefersReducedMotion()) playAcceptReduced(scope.current!, onAccept);
      else playAccept(scope.current!, onAccept);
    })();
  };

  const handleNo = () => {
    if (stageRef.current !== "asking") return;
    goTo("declining");
    // Hand focus to OKAY once it's on the sheet.
    const done = () => {
      goTo("declined");
      okayRef.current?.focus();
    };
    contextSafe(() => {
      if (prefersReducedMotion()) playDeclineReduced(scope.current!, done);
      else playDecline(scope.current!, done);
    })();
  };

  const handleOkay = () => {
    if (stageRef.current !== "declined") return;
    goTo("returning");
    // The question stops being inert on this render; only then can NO take focus back.
    const done = () => {
      flushSync(() => goTo("asking"));
      noRef.current?.focus();
    };
    contextSafe(() => {
      if (prefersReducedMotion()) playReturnReduced(scope.current!, done);
      else playReturn(scope.current!, done);
    })();
  };

  const asking = stage === "asking";
  const sheetUp = stage === "declining" || stage === "declined" || stage === "returning";

  return (
    <section
      ref={scope}
      aria-label="Accept your gift?"
      className={`${styles.page} ${stage === "building" ? "" : styles.idle} relative h-full w-full overflow-hidden`}
    >
      <div data-anim="content" inert={sheetUp} className="absolute inset-0">
        {/* Torn gingham scraps, top left and bottom right */}
        <div data-anim="scrap" aria-hidden className={`${styles.scrapTop} absolute top-0 left-0`}>
          <div className={`absolute inset-0 bg-warm-white ${styles.tornTop}`} />
          <div className={`absolute inset-0 right-[0.8cqmin] bottom-[0.8cqmin] ${styles.gingham} ${styles.tornTop}`} />
        </div>
        <div data-anim="scrap" aria-hidden className={`${styles.scrapBottom} absolute right-0 bottom-0`}>
          <div className={`absolute inset-0 bg-warm-white ${styles.tornBottom}`} />
          <div className={`absolute inset-0 top-[0.8cqmin] left-[0.8cqmin] ${styles.gingham} ${styles.tornBottom}`} />
        </div>

        <span data-anim="ribbon" aria-hidden className={`${styles.ribbon} absolute block drop-shadow-[0_2px_2px_rgb(33_26_23/0.3)]`}>
          <StarRibbon className="block h-full w-full" />
        </span>

        {/* Mirror balls hanging from the top edge */}
        {BALLS.map(({ className, late, glints }, i) => (
          <div key={i} data-anim="ball" aria-hidden className={`${styles.ball} ${className}`}>
            <div className={`${styles.swing} ${late ? styles.late : ""}`}>
              <span className={styles.string} />
              <div className="relative">
                <MirrorBall className="block w-full drop-shadow-[0_6px_6px_rgb(33_26_23/0.28)]" />
                {glints.map(([x, y], g) => (
                  <span key={g} className={styles.glint} style={{ left: `${x}%`, top: `${y}%` }}>
                    <span className={`${styles.twinkle} block`} style={{ animationDelay: `${(i * 0.9 + g * 1.1).toFixed(1)}s` }}>
                      <Glint className="block w-full" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className={`${styles.column} relative z-10 flex h-full flex-col items-center px-[4cqw]`}>
          <h1 className={`${styles.heading} text-center font-hand leading-[0.95] font-bold text-balance text-ink`}>
            {QUESTION.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                <span data-anim="word" className="inline-block">
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>

          <div className={`${styles.stage} grid min-h-0 w-full flex-1 place-items-center py-[1.5cqh]`}>
            <div data-anim="cat" className={styles.cat}>
              <div data-anim="cat-squash">
                <div className={styles.catIdle}>
                  <div className={styles.sticker}>
                    <Image
                      src={stickerTwo.src}
                      alt={stickerTwo.alt}
                      width={stickerTwo.width}
                      height={stickerTwo.height}
                      sizes={stickerTwo.sizes}
                      loading="eager"
                      fetchPriority="high"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.choices} flex items-start`}>
            <ChoiceCloud label="YES" onClick={handleYes} disabled={!asking} fill={WASH} />
            <ChoiceCloud ref={noRef} label="NO" onClick={handleNo} disabled={!asking} fill={WASH} right style={{ marginTop: "3cqh" }} />
          </div>
        </div>
      </div>

      {/* NO: a sheet of maroon card with sticker-1 on it, laid over the page */}
      <div
        data-anim="sheet"
        aria-hidden={!sheetUp}
        inert={!sheetUp}
        className={`${styles.sheet} maroon-surface invisible absolute inset-0 z-40 shadow-[0_-12px_30px_-10px_rgb(33_26_23/0.45)]`}
      >
        <div aria-hidden className={`${styles.sheetDots} absolute inset-0`} />
        <div className={`${styles.column} relative flex h-full flex-col items-center px-[4cqw]`}>
          <h2 aria-live="polite" className={`${styles.sorry} text-center font-hand leading-[0.95] font-bold text-balance text-warm-white`}>
            {SORRY.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                <span data-anim="sorry" className="inline-block">
                  {word}
                </span>
              </Fragment>
            ))}
          </h2>

          <div className={`${styles.sheetStage} grid min-h-0 w-full flex-1 place-items-center py-[2cqh]`}>
            <div data-anim="sticker-one" className={styles.stickerOne}>
              <div data-anim="sticker-squash" className={styles.sticker}>
                {/* Loaded with the page (it's hidden until NO), so it's ready the moment it's needed. */}
                <Image
                  src={stickerOne.src}
                  alt={stickerOne.alt}
                  width={stickerOne.width}
                  height={stickerOne.height}
                  sizes={stickerOne.sizes}
                  loading="eager"
                  fetchPriority="low"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          </div>

          <ChoiceCloud ref={okayRef} anim="okay" label="OKAY" onClick={handleOkay} disabled={stage !== "declined"} fill={WARM_WHITE} text="text-maroon" />
        </div>
      </div>

      {/* Darkens the page as it turns over (see lib/page-turn) */}
      <div data-part="pageShade" aria-hidden className="pointer-events-none absolute inset-0 z-50 bg-ink opacity-0" />
    </section>
  );
}

type ChoiceCloudProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
  fill: string;
  ref?: Ref<HTMLButtonElement>;
  anim?: string;
  right?: boolean;
  text?: string;
  style?: CSSProperties;
};

/** A paper cloud with a word on it: YES, NO or OKAY. */
function ChoiceCloud({ label, onClick, disabled, fill, ref, anim = "choice", right = false, text = "text-ink", style }: ChoiceCloudProps) {
  return (
    <button
      ref={ref}
      type="button"
      data-anim={anim}
      onClick={onClick}
      aria-disabled={disabled}
      className={`${styles.cloud} ${right ? styles.right : ""} relative block touch-manipulation select-none ${
        disabled ? "cursor-default" : "cursor-pointer"
      }`}
      style={style}
    >
      <span className={`${styles.cloudFace} relative grid h-full w-full place-items-center`}>
        <Cloud className={`${styles.cloudArt} absolute inset-0 h-full w-full`} fill={fill} />
        {/* A thin stroke in the text colour makes the script read like marker. */}
        <span className={`relative mt-[0.1em] font-hand leading-none font-bold tracking-[0.05em] [-webkit-text-stroke:0.03em_currentColor] ${text}`}>
          {label}
        </span>
      </span>
    </button>
  );
}
