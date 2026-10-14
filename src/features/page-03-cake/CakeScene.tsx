"use client";

import { Fragment, useRef, useState, type CSSProperties } from "react";

import { useMusic } from "@/components/audio/music";
import { gsap, motionMedia, useGSAP } from "@/lib/gsap";
import { handTilt } from "@/lib/motion";
import { turnPage, turnPageReduced } from "@/lib/page-turn";

import { CakeArt } from "./Cake";
import styles from "./cake.module.css";
import { playBlowOut, playBlowOutReduced, playEntrance, playEntranceReduced } from "./cake-timeline";
import { ArrowRight, ArrowUp, Garland, GiftBox, PartyHat, Scribble, SmallStar, Starburst } from "./decorations";

const BEFORE = ["Blow", "Out", "the", "Candles"];
const AFTER = ["Yay!!", "Happy", "birthdayyyy", "madam"];

/** lighting (entrance) → lit (waiting for a tap) → blown → turning (to Page 4) */
type Stage = "lighting" | "lit" | "blown" | "turning";

const prefersReducedMotion = () => window.matchMedia(motionMedia.reduceMotion).matches;

const MAROON = "#800000";
const MAROON_SOFT = "#a33a3a";
const WASH = "#ecd6d0";
const WARM_WHITE = "#fffdf8";
const PAPER = "#f7f1e5";
const GOLD = "#c9a227";

/** Paper confetti: strips, squares, dots and tiny stars. Fixed looks; where they fall is random. */
const CONFETTI_COLORS = [MAROON, GOLD, "#e2a99f", MAROON_SOFT, "#5c0000", "#e8c766"];
const STAR_CUT = "polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
const CONFETTI: CSSProperties[] = Array.from({ length: 42 }, (_, i) => {
  const shape = i % 4;
  const s = 7 + Math.abs(handTilt(i + 400, 4));
  return {
    width: shape === 0 ? s * 0.6 : shape === 3 ? s * 1.5 : s,
    height: shape === 0 ? s * 1.7 : shape === 3 ? s * 1.5 : s,
    backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    borderRadius: shape === 2 ? "50%" : shape === 0 ? "1px" : undefined,
    clipPath: shape === 3 ? STAR_CUT : undefined,
  };
});

/** Little stars dotted round the edges of the page. */
const TWINKLES = [
  { at: { left: "3cqw", top: "50cqh" }, size: "3.4cqmin", color: GOLD, outline: false },
  { at: { left: "9cqw", top: "65cqh" }, size: "2.4cqmin", color: MAROON, outline: true },
  { at: { right: "4cqw", top: "45cqh" }, size: "2.8cqmin", color: GOLD, outline: true },
  { at: { right: "10cqw", top: "61cqh" }, size: "3cqmin", color: GOLD, outline: false },
];

type CakeSceneProps = {
  /** Called once the page has been turned and the next scene can take over. */
  onTurn: () => void;
};

/**
 * Page 3: Blow Out the Candles (after Reference Image 2). A cake on a
 * polka-dot page; tapping the candles blows them out, and the heading becomes
 * the birthday wish (after Reference Image 3). Then Turn Page goes on to Page 4.
 */
export function CakeScene({ onTurn }: CakeSceneProps) {
  const scope = useRef<HTMLElement>(null);
  const stageRef = useRef<Stage>("lighting");
  const [stage, setStage] = useState<Stage>("lighting");
  const { playEffect } = useMusic();

  const goTo = (next: Stage) => {
    stageRef.current = next;
    setStage(next);
  };

  const { contextSafe } = useGSAP(
    () => {
      const onLit = () => goTo("lit");
      const mm = gsap.matchMedia();
      mm.add(motionMedia, (ctx) => {
        if (ctx.conditions?.reduceMotion) playEntranceReduced(onLit);
        else playEntrance(scope.current!, onLit);
      });
    },
    { scope },
  );

  const handleBlow = () => {
    if (stageRef.current !== "lit") return;
    goTo("blown");

    // Candles out — a little cheer goes up with the confetti.
    playEffect("applause");

    contextSafe(() => {
      if (prefersReducedMotion()) playBlowOutReduced(scope.current!);
      else playBlowOut(scope.current!);
    })();
  };

  const handleTurn = () => {
    if (stageRef.current !== "blown") return;
    goTo("turning");

    // Sound the paper turn as the flip starts (the scene switches when it ends).
    playEffect("pageTurn");

    contextSafe(() => {
      if (prefersReducedMotion()) turnPageReduced(scope.current!, onTurn);
      else turnPage(scope.current!, onTurn);
    })();
  };

  const lit = stage === "lit";
  const blown = stage === "blown" || stage === "turning";

  return (
    <section
      ref={scope}
      aria-label="Blow out the candles"
      className={`${styles.page} ${stage === "lighting" ? "" : styles.idle} relative h-full w-full overflow-hidden`}
    >
      {/* Paper chains and ribbons hanging from the top corners */}
      <div data-anim="garland" className={`${styles.garland} absolute top-0 left-[1cqw]`}>
        <div className={styles.sway}>
          <Garland className="block w-full" />
        </div>
      </div>
      <div data-anim="garland" className={`${styles.garland} absolute top-0 right-[1cqw]`}>
        <div className={`${styles.sway} ${styles.mirror}`}>
          <Garland className="block w-full" flip />
        </div>
      </div>

      {/* Torn gingham scraps in the bottom corners, with presents and party hats on them */}
      <div aria-hidden className={`${styles.corner} absolute bottom-0 left-0`}>
        <div data-anim="scrap" className="absolute inset-0 -scale-x-100">
          <div className={`absolute inset-0 bg-warm-white ${styles.torn}`} />
          <div className={`absolute inset-0 top-[0.8cqmin] left-[0.8cqmin] ${styles.gingham} ${styles.torn}`} />
        </div>
        <span data-anim="gift" className={`${styles.sticker} absolute bottom-[3%] left-[7%] block w-[46%]`}>
          <GiftBox className="block w-full" box={MAROON} ribbon={WARM_WHITE} />
        </span>
        <span data-anim="gift" className={`${styles.sticker} absolute bottom-[45%] left-[15%] block w-[32%] -rotate-6`}>
          <GiftBox className="block w-full" box={PAPER} dots={MAROON} ribbon={GOLD} />
        </span>
        <span data-anim="gift" className={`${styles.sticker} absolute bottom-[3%] left-[57%] block w-[25%] rotate-[10deg]`}>
          <PartyHat className="block w-full" body={MAROON} stripe={WARM_WHITE} />
        </span>
      </div>
      <div aria-hidden className={`${styles.corner} absolute right-0 bottom-0`}>
        <div data-anim="scrap" className="absolute inset-0">
          <div className={`absolute inset-0 bg-warm-white ${styles.torn}`} />
          <div className={`absolute inset-0 top-[0.8cqmin] left-[0.8cqmin] ${styles.gingham} ${styles.torn}`} />
        </div>
        <span data-anim="gift" className={`${styles.sticker} absolute right-[9%] bottom-[3%] block w-[42%]`}>
          <GiftBox className="block w-full" box={GOLD} ribbon={MAROON} />
        </span>
        <span data-anim="gift" className={`${styles.sticker} absolute right-[19%] bottom-[40%] block w-[23%] -rotate-[9deg]`}>
          <PartyHat className="block w-full" body={WARM_WHITE} stripe={MAROON} />
        </span>
        <span data-anim="gift" className={`${styles.sticker} absolute right-[55%] bottom-[3%] block w-[28%] rotate-3`}>
          <GiftBox className="block w-full" box={WASH} ribbon={MAROON} />
        </span>
      </div>

      {TWINKLES.map(({ at, size, color, outline }, i) => (
        <span key={i} data-anim="twinkle" aria-hidden className="absolute block" style={{ ...at, width: size }}>
          <span className={`${styles.twinkle} block`} style={{ animationDelay: `${i * 0.45}s` }}>
            <SmallStar className="block w-full" color={color} outline={outline} />
          </span>
        </span>
      ))}

      <div className={`${styles.column} relative z-10 flex h-full flex-col items-center px-[4cqw] pt-[max(4cqh,env(safe-area-inset-top))]`}>
        {/* Both headings share one grid cell; only one is shown (and read) at a time. */}
        <h1
          aria-live="polite"
          className={`${styles.heading} relative isolate grid w-fit text-center font-hand leading-[0.95] font-bold text-balance text-ink`}
        >
          <span aria-hidden={blown} className="relative self-center justify-self-center [grid-area:1/1]">
            {/* Firework bursts either side of the words, behind them */}
            <span data-anim="burst" aria-hidden className="absolute top-[55%] -left-[0.85em] -z-10 block w-[1.4em] -translate-y-1/2 landscape:w-[2em]">
              <span className={`${styles.spin} block`}>
                <Starburst className="block w-full" />
              </span>
            </span>
            <span data-anim="burst" aria-hidden className="absolute -top-[0.5em] -right-[0.75em] -z-10 block w-[1.2em] landscape:w-[1.7em]">
              <span className={`${styles.spin} ${styles.mirror} block`}>
                <Starburst className="block w-full" />
              </span>
            </span>

            {BEFORE.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                <span data-anim="word" className="inline-block">
                  {word}
                </span>
              </Fragment>
            ))}
          </span>

          <span aria-hidden={!blown} className="self-center [grid-area:1/1]">
            {AFTER.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                {/* Padding gives the write-in wipe room for the script's overhangs. */}
                <span
                  data-anim="yay"
                  className={`invisible relative -mx-[0.08em] inline-block px-[0.08em] ${word === "madam" ? "text-maroon" : ""}`}
                >
                  {word}
                  {word === "madam" && <Scribble className="absolute right-[0.06em] -bottom-[0.06em] left-[0.1em] h-[0.2em]" />}
                </span>
              </Fragment>
            ))}
          </span>
        </h1>

        <div className={`${styles.stage} grid min-h-0 w-full flex-1 place-items-center py-[1.5cqh]`}>
          <button
            type="button"
            onClick={handleBlow}
            aria-label="Blow out the candles"
            aria-disabled={!lit}
            className={`${styles.cake} block touch-manipulation rounded-[1.5rem] select-none [outline-offset:2px] ${
              lit ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <span data-anim="cake" className="block">
              <span className={`${styles.cakeIdle} block`}>
                <span className={`${styles.cakeLift} block`}>
                  <CakeArt />
                </span>
              </span>
            </span>
          </button>
        </div>

        {/* The hint under the cake; once the wish is made, Turn Page takes its place. */}
        <div className="grid place-items-center font-hand text-[length:clamp(22px,4.6cqmin,40px)] leading-none text-maroon">
          <div
            data-anim="hint"
            aria-hidden
            onClick={handleBlow}
            className={`font-semibold [grid-area:1/1] ${lit ? "cursor-pointer touch-manipulation" : "pointer-events-none"}`}
          >
            <div className={`${styles.hintBob} flex flex-col items-center`}>
              <ArrowUp className="h-[1.3em] w-auto rotate-[8deg]" />
              <p>
                <span className="pointer-coarse:hidden">click the candles!</span>
                <span className="hidden pointer-coarse:inline">tap the candles!</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            data-anim="turn"
            onClick={handleTurn}
            disabled={stage !== "blown"}
            className="group invisible cursor-pointer touch-manipulation font-bold outline-none select-none [grid-area:1/1] disabled:cursor-default"
          >
            <span className="relative block -rotate-2 drop-shadow-[0_2px_3px_rgb(33_26_23/0.28)] transition-[translate,rotate] duration-300 ease-settle group-hover:-translate-y-0.5 group-hover:-rotate-3 group-active:translate-y-px group-focus-visible:-translate-y-0.5 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-maroon group-focus-visible:outline-dashed">
              <span className={`flex min-h-11 items-center gap-[0.3em] bg-warm-white py-[0.14em] pr-[0.6em] pl-[0.7em] ${styles.strip}`}>
                Turn Page
                <ArrowRight className={`w-[1.25em] ${styles.nudge}`} />
              </span>
              <span aria-hidden className={`${styles.tape} absolute -top-[0.22em] -left-[0.35em] h-[0.42em] w-[1.3em] -rotate-[28deg]`} />
            </span>
          </button>
        </div>
      </div>

      {/* Confetti waits above the page until the candles are out. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
        {CONFETTI.map((style, i) => (
          <span key={i} data-anim="confetti" className={styles.confetti} style={style} />
        ))}
      </div>

      {/* Darkens the page as it turns over (see lib/page-turn) */}
      <div data-part="pageShade" aria-hidden className="pointer-events-none absolute inset-0 z-40 bg-ink opacity-0" />
    </section>
  );
}
