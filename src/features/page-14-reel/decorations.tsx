import { memo, type CSSProperties } from "react";

/*
 * Original SVG decorations for Phase 14 (Photo Reel), after the composition in
 * Reference Image 14, with its red swapped for the site's maroon
 * (INSTRUCTIONS §2). Nothing is copied from the reference artwork; every piece
 * is redrawn.
 *
 * Pieces: a thin white string bow tied at the top-left of the film strip (two
 * loops, a little knot and two curling tails, like the reference's string bow),
 * and a small puffy gold star stuck past the strip's right end. The film strip
 * itself (black stock, sprocket perforations, frames) is CSS in reel.module.css.
 */

type Props = { className?: string; style?: CSSProperties };

const GOLD = "#c9a227";
const GOLD_DEEP = "#9c7a1b";
const WARM_WHITE = "#fffdf8";
const STRING = "#fdf6ea";
const STRING_SHADE = "#e7dcc6";

/* ---------- White string bow (tied at the top-left of the strip) ---------- */

export const StringBow = memo(function StringBow({ className, style }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden>
      <g
        fill="none"
        stroke={STRING}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* two curling tails dropping from the knot */}
        <path d="M58 44c-6 14-20 22-16 38 2 9 12 11 15 3" stroke={STRING_SHADE} />
        <path d="M64 44c7 12 23 16 24 32 1 9-9 14-14 6" stroke={STRING_SHADE} />
        {/* left loop */}
        <path d="M60 42C44 24 18 26 20 40c2 12 28 14 40 2Z" />
        {/* right loop */}
        <path d="M60 42C76 24 102 26 100 40c-2 12-28 14-40 2Z" />
        {/* knot */}
        <path d="M54 36c4 7 8 7 12 0 2 6 2 12-6 12s-8-6-6-12Z" fill={STRING} />
      </g>
    </svg>
  );
});

/* ---------- Puffy gold star (past the strip's right end) ---------- */

export const GoldStar = memo(function GoldStar({ className, style }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <path
        d="M24 3 29.6 17.2 44.8 18.2 33.2 28 37 42.8 24 34.6 11 42.8 14.8 28 3.2 18.2 18.4 17.2Z"
        fill={GOLD}
        stroke={GOLD_DEEP}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="2.4" fill={WARM_WHITE} opacity="0.75" />
    </svg>
  );
});
