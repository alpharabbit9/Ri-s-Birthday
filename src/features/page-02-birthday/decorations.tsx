import { useId, type CSSProperties } from "react";

import styles from "./spread.module.css";

/*
 * Original SVG/CSS decorations for the birthday spread, after the stickers in
 * Reference Image 1: felt stars, gold stars, hanging streamers and washi tape.
 * Colours are the scrapbook tokens.
 */

type DecoProps = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const WARM_WHITE = "#fffdf8";
const GOLD = "#c9a227";

/** Chunky five-point star in a 100 x 100 box. */
const STAR =
  "M50 4 64.1 32.6 95.7 37.2 72.8 59.4 78.2 90.8 50 76 21.8 90.8 27.2 59.4 4.3 37.2 35.9 32.6Z";

/** Maroon felt star with a woven texture and white running stitch. */
export function FeltStar({ className, style }: DecoProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <defs>
        <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="4" height="4" fill={MAROON} />
          <rect width="1.5" height="4" fill={MAROON_DEEP} fillOpacity="0.5" />
        </pattern>
      </defs>
      <path d={STAR} fill={`url(#${id})`} stroke="#3d0000" strokeWidth="2.6" strokeLinejoin="round" />
      <path
        d={STAR}
        transform="translate(50 52) scale(0.8) translate(-50 -52)"
        fill="none"
        stroke={WARM_WHITE}
        strokeOpacity="0.8"
        strokeWidth="1.9"
        strokeDasharray="4.5 3.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shiny gold star sticker with a white die-cut edge. */
export function GoldStar({ className, style }: DecoProps) {
  const id = useId();
  return (
    <svg viewBox="-6 -6 112 112" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#f0d675" />
          <stop offset="0.5" stopColor={GOLD} />
          <stop offset="1" stopColor="#a07c12" />
        </linearGradient>
      </defs>
      <path d={STAR} fill={WARM_WHITE} stroke={WARM_WHITE} strokeWidth="11" strokeLinejoin="round" />
      <path d={STAR} fill={`url(#${id})`} stroke={MAROON_DEEP} strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M50 18 57 33" stroke="#fff6cf" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/** A bunch of twisted paper streamers hanging from the top edge, with a gold star charm. */
export function Streamers({ className, style, flip = false }: DecoProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 240"
      className={className}
      style={{ ...style, scale: flip ? "-1 1" : undefined }}
      overflow="visible"
      aria-hidden
    >
      <g>
        {/* Twisted ribbons: a solid stroke with a lighter dashed twist over it */}
        <path d="M22 -6C34 30 6 58 22 96S10 156 30 196" fill="none" stroke={MAROON} strokeWidth="7" strokeLinecap="round" />
        <path d="M22 -6C34 30 6 58 22 96S10 156 30 196" fill="none" stroke="#b33a3a" strokeWidth="7" strokeDasharray="7 9" strokeLinecap="round" />

        <path d="M48 -6C60 24 38 60 52 98S40 150 56 228" fill="none" stroke={GOLD} strokeWidth="6" strokeLinecap="round" />
        <path d="M48 -6C60 24 38 60 52 98S40 150 56 228" fill="none" stroke="#e9cf72" strokeWidth="6" strokeDasharray="6 10" strokeLinecap="round" />

        <path d="M72 -6C80 26 62 56 74 90S66 126 76 152" fill="none" stroke={MAROON_DEEP} strokeWidth="8.5" strokeLinecap="round" />
        <path d="M72 -6C80 26 62 56 74 90S66 126 76 152" fill="none" stroke={WARM_WHITE} strokeWidth="5.5" strokeLinecap="round" />
        <path d="M72 -6C80 26 62 56 74 90S66 126 76 152" fill="none" stroke="#ecd6d0" strokeWidth="5.5" strokeDasharray="5 8" strokeLinecap="round" />

        {/* Star charm on a thread */}
        <path d="M90 -6V118" stroke="#211a17" strokeOpacity="0.55" strokeWidth="1.2" />
        <path
          d="M90 112 93.2 118.5 100.3 119.5 95.1 124.5 96.4 131.6 90 128.2 83.6 131.6 84.9 124.5 79.7 119.5 86.8 118.5Z"
          fill={GOLD}
          stroke={MAROON_DEEP}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M8 -6V84" stroke="#211a17" strokeOpacity="0.5" strokeWidth="1.2" />
        <path
          d="M8 80 10.4 84.9 15.8 85.6 11.9 89.4 12.8 94.7 8 92.2 3.2 94.7 4.1 89.4 0.2 85.6 5.6 84.9Z"
          fill={WARM_WHITE}
          stroke={MAROON}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/** Strip of translucent washi tape. Size and angle come from the caller. */
export function Tape({ className = "", style, anim }: DecoProps & { anim?: string }) {
  return <span data-anim={anim} aria-hidden className={`${styles.tape} ${className}`} style={style} />;
}

/** Hand-drawn arrow pointing right. Takes the text colour. */
export function ArrowRight({ className }: DecoProps) {
  return (
    <svg viewBox="0 0 48 24" className={className} fill="none" aria-hidden>
      <path d="M3 13.5C14 10 28 10.5 42 12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M34 4.5 43.5 12 34.5 19.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
