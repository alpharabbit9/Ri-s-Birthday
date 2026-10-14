import type { CSSProperties } from "react";

import { CutoutLetter, type LetterSpec } from "./CutoutLetter";
import { ArrowRight, GoldStar, Streamers, Tape } from "./decorations";
import styles from "./spread.module.css";

// Mixed case and mixed papers, like a ransom note (after Reference Image 1).
const HAPPY: LetterSpec[] = [
  { char: "H", paper: "white", face: "display" },
  { char: "A", paper: "maroon", face: "display", size: 1.06 },
  { char: "P", paper: "ink", face: "serif" },
  { char: "P", paper: "wash", face: "display", size: 0.96 },
  { char: "Y", paper: "beige", face: "italic", size: 1.04 },
];

const BIRTHDAY: LetterSpec[] = [
  { char: "B", paper: "white", face: "serif", size: 1.06 },
  { char: "i", paper: "maroon", face: "display" },
  { char: "R", paper: "gold", face: "serif" },
  { char: "t", paper: "ink", face: "display" },
  { char: "H", paper: "maroon", face: "display", size: 1.08 },
  { char: "d", paper: "white", face: "serif" },
  { char: "A", paper: "ink", face: "display" },
  { char: "Y", paper: "wash", face: "display", size: 1.04 },
];

/** Dark maroon sticker backing behind a word, with a white die-cut edge. */
function Backing({ tilt }: { tilt: string }) {
  return (
    <span
      data-anim="backing"
      aria-hidden
      className="absolute inset-0 -z-10 rounded-[0.12em] bg-maroon-deep"
      style={{
        rotate: tilt,
        boxShadow: "0 0 0 0.075em #fffdf8, 0 0.14em 0.22em -0.06em rgb(33 26 23 / 0.45)",
      }}
    />
  );
}

const streamerSize: CSSProperties = { width: "min(22cqw, 15cqh)" };

type GreetingPageProps = {
  onTurn: () => void;
  turning: boolean;
};

/** Right page: polka dots, streamers, cut-out HAPPY BIRTHDAY and the page turn. */
export function GreetingPage({ onTurn, turning }: GreetingPageProps) {
  return (
    <div data-anim="page" className={`${styles.face} ${styles.page} ${styles.dots} ${styles.spineRight}`}>
      <div data-anim="streamer" className="absolute top-0 left-[3%]" style={streamerSize}>
        <div className={styles.sway}>
          <Streamers className="block w-full" />
        </div>
      </div>
      <div data-anim="streamer" className="absolute top-0 right-[3%]" style={streamerSize}>
        <div className={`${styles.sway} ${styles.mirror}`}>
          <Streamers className="block w-full" flip />
        </div>
      </div>

      {/* Torn scrap of gingham tucked into the corner */}
      <div data-anim="patch" aria-hidden className="absolute right-0 bottom-0 h-[30cqh] w-[46cqw]">
        <div className={`absolute inset-0 bg-warm-white ${styles.torn}`} />
        <div className={`absolute inset-0 top-[0.8cqmin] left-[0.8cqmin] ${styles.gingham} ${styles.torn}`} />
      </div>

      <h1
        className="absolute top-[52%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ fontSize: "min(10cqw, 13.5cqh)" }}
      >
        <span className="sr-only">Happy Birthday</span>

        <span aria-hidden className="relative isolate flex items-center gap-[0.07em] px-[0.26em] py-[0.18em]">
          <Backing tilt="-1.6deg" />
          <span data-anim="gold-star" className="absolute top-1/2 -left-[0.8em] block w-[1.1em] -translate-y-1/2 -rotate-12">
            <GoldStar className="block w-full" />
          </span>
          {HAPPY.map((letter, i) => (
            <CutoutLetter key={i} {...letter} seed={i} anim="happy" />
          ))}
          <span data-anim="gold-star" className="absolute top-[42%] -right-[0.8em] block w-[1.1em] -translate-y-1/2 rotate-[14deg]">
            <GoldStar className="block w-full" />
          </span>
        </span>

        <span aria-hidden className="relative isolate -mt-[0.02em] flex items-center gap-[0.06em] px-[0.22em] py-[0.18em]">
          <Backing tilt="1deg" />
          {BIRTHDAY.map((letter, i) => (
            <CutoutLetter key={i} {...letter} seed={i + 9} anim="birthday" />
          ))}
        </span>
      </h1>

      {/* Turn Page: a torn paper tab, and the page corner lifts when you reach for it */}
      <button
        type="button"
        data-anim="turn"
        onClick={onTurn}
        disabled={turning}
        className="group absolute right-0 bottom-0 z-10 cursor-pointer touch-manipulation p-[4cqmin] font-hand leading-none font-bold text-maroon outline-none select-none disabled:cursor-default"
        style={{ fontSize: "clamp(18px, 6.8cqmin, 34px)" }}
      >
        <span
          className="relative block drop-shadow-[0_2px_3px_rgb(33_26_23/0.28)] transition-[translate,rotate] duration-300 ease-settle group-hover:-translate-y-0.5 group-hover:-rotate-2 group-active:translate-y-px group-focus-visible:-translate-y-0.5 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-maroon group-focus-visible:outline-dashed"
          style={{ rotate: "-3deg" }}
        >
          <span className={`flex min-h-11 items-center gap-[0.3em] bg-warm-white py-[0.14em] pr-[0.6em] pl-[0.7em] ${styles.strip}`}>
            Turn Page
            <ArrowRight className={`w-[1.25em] ${styles.nudge}`} />
          </span>
          <Tape className="absolute -top-[0.22em] -left-[0.35em] h-[0.42em] w-[1.3em] -rotate-[28deg]" />
        </span>
        <span
          aria-hidden
          className="absolute right-0 bottom-0 block h-[1.4em] w-[1.4em] origin-bottom-right transition-[scale] duration-300 ease-settle group-hover:scale-150 group-focus-visible:scale-150"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, #e7dcc8 0%, #fbf6ec 47%, rgb(33 26 23 / 0.28) 49.5%, #f3ecdf 50%)",
          }}
        />
      </button>
    </div>
  );
}
