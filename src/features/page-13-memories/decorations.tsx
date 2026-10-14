import { memo, type CSSProperties } from "react";

/*
 * Original SVG decorations for Phase 13 (Scrolling Memory Scrapbook), after the
 * composition in Reference Image 13, with its red swapped for the site's maroon
 * (INSTRUCTIONS §2). Nothing is copied from the reference artwork; every piece
 * is redrawn.
 *
 * Pieces: an opened cream envelope that sits BEHIND the top Polaroid (body +
 * flap leaning open, with a tiny line bow doodled on the flap like the
 * reference), and a little maroon star stuck to the corner of the bottom
 * Polaroid. The sticky tape (candy-stripe on top, kraft on the bottom) is
 * CSS/HTML in memories.module.css so its stripes stay crisp.
 */

type Props = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const WARM_WHITE = "#fffdf8";
const CREAM = "#fbf4e6";
const CREAM_SHADE = "#ecdfc8";
const CREAM_DEEP = "#dccba8";
const CREAM_LINE = "#c9b797";

/* ---------- Opened cream envelope (sits behind the top Polaroid) ---------- */

export const OpenEnvelope = memo(function OpenEnvelope({ className, style }: Props) {
  return (
    <svg viewBox="0 0 240 180" className={className} style={style} aria-hidden>
      {/* body back wall — the Polaroid rests against this */}
      <rect x="10" y="54" width="220" height="118" rx="9" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2.6" />
      {/* front pocket, folds meeting low at the centre */}
      <path d="M10 92 120 150 230 92 230 172 10 172Z" fill={CREAM} stroke={CREAM_LINE} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M10 172 120 112 230 172" fill="none" stroke={CREAM_LINE} strokeWidth="1.7" strokeOpacity="0.6" strokeLinejoin="round" />
      {/* open flap, hinged at the top and leaning back */}
      <path d="M10 58 120 8 230 58 120 86Z" fill={CREAM} stroke={CREAM_LINE} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M10 58 120 86 230 58" fill={CREAM_DEEP} fillOpacity="0.45" stroke="none" />
      <path d="M10 58 120 8 230 58" fill="none" stroke={CREAM_LINE} strokeWidth="1.6" strokeOpacity="0.7" strokeLinejoin="round" />
      {/* tiny line bow doodled on the flap (like the reference) */}
      <g stroke={MAROON_SOFT} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
        <path d="M120 40c-7-7-18-4-18 3 0 6 11 6 18 0 7 6 18 6 18 0 0-7-11-10-18-3Z" />
        <path d="M120 43 114 55M120 43 126 55" />
      </g>
      <circle cx="120" cy="40" r="2.4" fill={MAROON_SOFT} opacity="0.85" />
    </svg>
  );
});

/* ---------- Little maroon star (stuck to the corner of the bottom Polaroid) ---------- */

export const CornerStar = memo(function CornerStar({ className, style }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <path
        d="M24 3 29.6 17.2 44.8 18.2 33.2 28 37 42.8 24 34.6 11 42.8 14.8 28 3.2 18.2 18.4 17.2Z"
        fill={MAROON}
        stroke={MAROON_DEEP}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="2.2" fill={WARM_WHITE} opacity="0.7" />
    </svg>
  );
});

/* ---------- Three tiny maroon hearts (scattered between the compositions) ---------- */

export const TinyHearts = memo(function TinyHearts({ className, style }: Props) {
  const heart = "M0 10C-7 2-11-3-7-7c3-3 6 0 7 3 1-3 4-6 7-3 4 4 0 9-7 17Z";
  return (
    <svg viewBox="0 0 90 60" className={className} style={style} aria-hidden>
      <path d={heart} transform="translate(20 14) rotate(-10)" fill={MAROON} />
      <path d={heart} transform="translate(52 6) scale(0.8) rotate(8)" fill={MAROON_SOFT} />
      <path d={heart} transform="translate(66 32) scale(0.65) rotate(-6)" fill={MAROON} />
    </svg>
  );
});
