import type { CSSProperties } from "react";

import { handTilt } from "@/lib/motion";

/**
 * One ransom-note letter: a scrap of paper with a slightly uneven cut, its own
 * paper colour and typeface. Sized in em, so the parent's font-size sets the
 * scale of a whole word.
 */

export type Paper = "maroon" | "white" | "ink" | "beige" | "wash" | "gold" | "news";
type Face = "display" | "serif" | "italic";

const PAPERS: Record<Paper, { bg: string; fg: string; edge?: string }> = {
  maroon: { bg: "#800000", fg: "#fffdf8" },
  white: { bg: "#fffdf8", fg: "#211a17", edge: "rgb(33 26 23 / 0.18)" },
  ink: { bg: "#211a17", fg: "#fffdf8" },
  beige: { bg: "#e8ddcc", fg: "#800000" },
  wash: { bg: "#ecd6d0", fg: "#5c0000" },
  gold: { bg: "#c9a227", fg: "#3d0000" },
  // Newsprint: faint printed lines behind the letter.
  news: { bg: "#efe9dc", fg: "#211a17", edge: "rgb(33 26 23 / 0.15)" },
};

const FACES: Record<Face, string> = {
  display: "font-display",
  serif: "font-serif font-bold",
  italic: "font-serif font-bold italic",
};

/** Slightly irregular quadrilateral so no two scraps share a cut. */
function cut(seed: number) {
  const j = (k: number) => (Math.abs(handTilt(seed * 7 + k, 1)) * 7).toFixed(1);
  return `polygon(${j(1)}% ${j(2)}%, ${100 - +j(3)}% ${j(4)}%, 100% ${100 - +j(5)}%, ${j(6)}% 100%)`;
}

export type LetterSpec = {
  char: string;
  paper: Paper;
  face: Face;
  /** Relative size, around 1. */
  size?: number;
};

type CutoutLetterProps = LetterSpec & {
  /** Stable index for the handmade tilt and cut. */
  seed: number;
  className?: string;
  style?: CSSProperties;
  anim: string;
};

export function CutoutLetter({ char, paper, face, size = 1, seed, className = "", style, anim }: CutoutLetterProps) {
  const p = PAPERS[paper];
  const newsprint =
    paper === "news"
      ? "repeating-linear-gradient(0deg, rgb(33 26 23 / 0.08) 0 1px, transparent 1px 0.16em)"
      : undefined;

  return (
    <span
      data-anim={anim}
      aria-hidden
      className={`inline-block drop-shadow-[0_0.03em_0.04em_rgb(33_26_23/0.35)] ${className}`}
      style={{ rotate: `${handTilt(seed, 8).toFixed(2)}deg`, ...style }}
    >
      <span
        className={`grid min-w-[0.86em] place-items-center px-[0.13em] pt-[0.1em] pb-[0.06em] leading-none ${FACES[face]}`}
        style={{
          fontSize: `${size}em`,
          color: p.fg,
          backgroundColor: p.bg,
          backgroundImage: newsprint,
          boxShadow: p.edge ? `inset 0 0 0 1px ${p.edge}` : undefined,
          clipPath: cut(seed),
        }}
      >
        {char}
      </span>
    </span>
  );
}
