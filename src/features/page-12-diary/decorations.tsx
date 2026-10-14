import { memo, useId, type CSSProperties } from "react";

/*
 * Original SVG decorations for Phase 12 (Birthday Diary Opening Spread), after
 * the composition in Reference Image 12, with its red swapped for the site's
 * maroon (INSTRUCTIONS §2). Nothing is copied from the reference artwork;
 * every piece is redrawn.
 *
 * Pieces: a metal binder ring (the spiral down the gutter, repeated), a little
 * cupcake beside the big number, a gingham heart and a puffy star charm around
 * the Polaroid. The striped tape and the "favourite person" label are CSS/HTML
 * in the scene so their stripes/text stay crisp.
 */

type Props = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const WARM_WHITE = "#fffdf8";
const CREAM = "#fbf4e6";
const CREAM_LINE = "#c9b797";
const GOLD = "#c9a227";
const GOLD_DEEP = "#9c7b1b";
const STEEL = "#cfd3d8";
const STEEL_DEEP = "#8c9299";

/* ---------- Binder ring (the diary's spiral, repeated down the gutter) ---------- */

export const BinderRing = memo(function BinderRing({ className, style }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={WARM_WHITE} />
          <stop offset="0.4" stopColor={STEEL} />
          <stop offset="1" stopColor={STEEL_DEEP} />
        </linearGradient>
      </defs>
      {/* hole shadow in the page */}
      <circle cx="32" cy="34" r="17" fill="#000" opacity="0.12" />
      {/* metal ring */}
      <circle cx="32" cy="32" r="21" fill="none" stroke={`url(#${id})`} strokeWidth="8" />
      <circle cx="32" cy="32" r="21" fill="none" stroke={STEEL_DEEP} strokeOpacity="0.5" strokeWidth="1.4" />
      {/* top-left highlight */}
      <path d="M18 24a18 18 0 0 1 14-11" fill="none" stroke={WARM_WHITE} strokeWidth="2.6" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
});

/* ---------- Little cupcake (beside the big number) ---------- */

export const Cupcake = memo(function Cupcake({ className, style }: Props) {
  return (
    <svg viewBox="0 0 64 70" className={className} style={style} aria-hidden>
      {/* wrapper */}
      <path d="M16 38 48 38 44 64 20 64Z" fill={CREAM} stroke={CREAM_LINE} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M24 40 22 63M32 40 32 64M40 40 42 63" stroke={CREAM_LINE} strokeWidth="1.5" opacity="0.7" />
      {/* frosting swirl */}
      <path
        d="M12 38c0-9 8-13 13-13 1-7 15-7 16 0 7 0 11 6 7 13Z"
        fill={WARM_WHITE}
        stroke={MAROON_SOFT}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M17 34c4-5 11-6 16-2M22 28c3-3 9-3 12 0" fill="none" stroke={MAROON_SOFT} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      {/* cherry + sprinkles */}
      <circle cx="32" cy="16" r="5.5" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.6" />
      <path d="M32 11c2-4 6-5 9-4" fill="none" stroke={MAROON_DEEP} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20" cy="34" r="1.6" fill={GOLD} />
      <circle cx="43" cy="33" r="1.6" fill={MAROON} />
      <circle cx="31" cy="37" r="1.6" fill={GOLD} />
    </svg>
  );
});

/* ---------- Gingham heart sticker (top-left of the Polaroid) ---------- */

export const GinghamHeart = memo(function GinghamHeart({ className, style }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 60 56" className={className} style={style} aria-hidden>
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={WARM_WHITE} />
          <rect width="10" height="5" fill={MAROON} opacity="0.42" />
          <rect width="5" height="10" fill={MAROON} opacity="0.42" />
        </pattern>
      </defs>
      <path
        d="M30 52C12 37 4 26 10 17c5-8 16-5 20 4 4-9 15-12 20-4 6 9-2 20-20 35Z"
        fill={`url(#${id})`}
        stroke={MAROON_DEEP}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
});

/* ---------- Puffy star charm (bottom-right of the Polaroid) ---------- */

export const StarCharm = memo(function StarCharm({ className, style }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 48 48" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3dd94" />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
      </defs>
      <path
        d="M24 4 29.5 17.5 44 19 33 29 36 44 24 36 12 44 15 29 4 19 18.5 17.5Z"
        fill={`url(#${id})`}
        stroke={GOLD_DEEP}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="2.4" fill={WARM_WHITE} opacity="0.85" />
    </svg>
  );
});

/* ---------- Three tiny maroon hearts (scattered near the Polaroid) ---------- */

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
