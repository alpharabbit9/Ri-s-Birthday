import { memo, type CSSProperties } from "react";

/*
 * Original SVG decorations for Phase 15 (Final Memory Letter), after the
 * composition in Reference Image 15, with its red swapped for the site's maroon
 * (INSTRUCTIONS §2). Nothing is copied from the reference artwork; every piece
 * is redrawn.
 *
 * Pieces:
 *   RibbonBow   — a small maroon ribbon bow at the letter's top-left.
 *   GoldStar    — a puffy gold star (scattered a few times over the page).
 *   Cassette    — a cream/black cassette tape resting at the bottom. It is purely
 *                 decorative: Phase 15 defines no interaction (background music is
 *                 Phase 16), so it carries no "click me" label.
 *   MusicNotes  — a little cluster of notes beside the cassette.
 *   TeddyBears  — two teddy bears hugging a heart, stuck at the bottom-left.
 *
 * The paper page itself (cream stock with large postage-stamp scalloped edges)
 * is CSS in final-letter.module.css.
 */

type Props = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const GOLD = "#c9a227";
const GOLD_DEEP = "#9c7a1b";
const WARM_WHITE = "#fffdf8";
const CREAM = "#f1e7d4";
const CREAM_SHADE = "#e0d2b6";
const INK = "#211a17";
const FUR = "#c98f5c";
const FUR_SHADE = "#b2794a";
const FUR_LIGHT = "#eccfa6";

/* ---------- Ribbon bow (top-left of the letter) ---------- */

export const RibbonBow = memo(function RibbonBow({ className, style }: Props) {
  return (
    <svg viewBox="0 0 80 64" className={className} style={style} aria-hidden>
      <g fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.5" strokeLinejoin="round">
        {/* two tails dropping from the knot */}
        <path d="M38 30c-3 10-11 16-9 26 1 4 6 4 7 0 1-9 5-16 6-24Z" fill={MAROON_SOFT} />
        <path d="M42 30c3 10 11 15 10 25 0 4-6 5-7 1-2-9-5-16-7-23Z" fill={MAROON_SOFT} />
        {/* left loop */}
        <path d="M38 28C26 16 6 17 9 29c3 11 23 11 31 1Z" />
        {/* right loop */}
        <path d="M42 28C54 16 74 17 71 29c-3 11-23 11-31 1Z" />
        {/* knot */}
        <path d="M35 24c3 5 7 5 10 0 2 5 2 11-5 11s-7-6-5-11Z" fill={MAROON} />
      </g>
    </svg>
  );
});

/* ---------- Puffy gold star (scattered) ---------- */

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

/* ---------- Cassette tape (decorative only) ---------- */

export const Cassette = memo(function Cassette({ className, style }: Props) {
  return (
    <svg viewBox="0 0 180 120" className={className} style={style} aria-hidden>
      {/* body */}
      <rect x="2" y="2" width="176" height="116" rx="12" fill={CREAM} stroke={INK} strokeWidth="2.5" />
      <rect x="2" y="2" width="176" height="116" rx="12" fill="none" stroke={CREAM_SHADE} strokeWidth="1" opacity="0.8" />
      {/* corner screws */}
      {[
        [14, 14],
        [166, 14],
        [14, 106],
        [166, 106],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" fill={CREAM_SHADE} stroke={INK} strokeWidth="1" />
      ))}
      {/* dark centre panel */}
      <rect x="24" y="24" width="132" height="58" rx="7" fill="#262220" stroke={INK} strokeWidth="2" />
      {/* label strip above the reels */}
      <rect x="34" y="29" width="112" height="13" rx="3" fill={CREAM} opacity="0.92" />
      <line x1="40" y1="35.5" x2="140" y2="35.5" stroke={MAROON} strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      {/* two reels */}
      {[62, 118].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="60" r="15" fill="#171412" stroke="#3a3430" strokeWidth="2" />
          <circle cx={cx} cy="60" r="7.5" fill={CREAM} stroke={INK} strokeWidth="1.2" />
          {/* spokes */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const r = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={cx + Math.cos(r) * 8}
                y1={60 + Math.sin(r) * 8}
                x2={cx + Math.cos(r) * 13}
                y2={60 + Math.sin(r) * 13}
                stroke="#4a443f"
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={cx} cy="60" r="2.4" fill={INK} />
        </g>
      ))}
      {/* tape window between the reels */}
      <rect x="80" y="54" width="20" height="12" rx="2" fill="#0d0b0a" opacity="0.7" />
      {/* lower lip with the two capstan openings */}
      <rect x="40" y="94" width="100" height="16" rx="4" fill={CREAM_SHADE} stroke={INK} strokeWidth="1.5" />
      <circle cx="66" cy="102" r="3.2" fill="#262220" />
      <circle cx="114" cy="102" r="3.2" fill="#262220" />
      <rect x="84" y="98" width="12" height="8" rx="1.5" fill="#262220" />
    </svg>
  );
});

/* ---------- Music notes (beside the cassette) ---------- */

export const MusicNotes = memo(function MusicNotes({ className, style }: Props) {
  return (
    <svg viewBox="0 0 72 72" className={className} style={style} aria-hidden>
      {/* a beamed pair of eighth notes */}
      <g fill={MAROON}>
        <rect x="24" y="12" width="4" height="40" rx="2" />
        <rect x="52" y="8" width="4" height="40" rx="2" />
        <path d="M24 12l32-5v8l-32 5Z" />
        <ellipse cx="20" cy="53" rx="9" ry="7" transform="rotate(-18 20 53)" />
        <ellipse cx="48" cy="49" rx="9" ry="7" transform="rotate(-18 48 49)" />
      </g>
      {/* a small gold single note tucked behind */}
      <g fill={GOLD}>
        <rect x="8" y="26" width="3.2" height="26" rx="1.6" />
        <path d="M8 26c6 0 9 3 9 7 0 1-1 2-2 1-1-3-4-4-7-4Z" />
        <ellipse cx="6" cy="53" rx="6.4" ry="5" transform="rotate(-18 6 53)" />
      </g>
    </svg>
  );
});

/* ---------- Two teddy bears hugging a heart (bottom-left) ---------- */

export const TeddyBears = memo(function TeddyBears({ className, style }: Props) {
  // One bear, drawn from a local origin so the pair can be mirrored/placed.
  const Bear = ({ flip }: { flip?: boolean }) => (
    <g transform={flip ? "scale(-1,1)" : undefined}>
      {/* body */}
      <ellipse cx="0" cy="46" rx="26" ry="28" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <ellipse cx="0" cy="50" rx="15" ry="16" fill={FUR_LIGHT} opacity="0.8" />
      {/* legs */}
      <ellipse cx="-14" cy="70" rx="10" ry="8" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <ellipse cx="14" cy="70" rx="10" ry="8" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <ellipse cx="-14" cy="71" rx="4.5" ry="3.5" fill={FUR_LIGHT} />
      <ellipse cx="14" cy="71" rx="4.5" ry="3.5" fill={FUR_LIGHT} />
      {/* inner arm reaching toward the heart */}
      <ellipse cx="18" cy="40" rx="9" ry="7" transform="rotate(28 18 40)" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      {/* head */}
      <circle cx="-2" cy="16" r="20" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      {/* ears */}
      <circle cx="-16" cy="2" r="8" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <circle cx="12" cy="2" r="8" fill={FUR} stroke={FUR_SHADE} strokeWidth="2" />
      <circle cx="-16" cy="2" r="4" fill={FUR_LIGHT} />
      <circle cx="12" cy="2" r="4" fill={FUR_LIGHT} />
      {/* muzzle */}
      <ellipse cx="-2" cy="22" rx="11" ry="9" fill={FUR_LIGHT} />
      <ellipse cx="-2" cy="18" rx="3.2" ry="2.4" fill={INK} />
      <path d="M-2 20v4" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="-9" cy="12" r="2.4" fill={INK} />
      <circle cx="5" cy="12" r="2.4" fill={INK} />
    </g>
  );

  return (
    <svg viewBox="0 0 150 100" className={className} style={style} aria-hidden>
      <g transform="translate(42 14)">
        <Bear />
      </g>
      <g transform="translate(108 14)">
        <Bear flip />
      </g>
      {/* heart held between them */}
      <g transform="translate(75 64)">
        <path
          d="M0 14C-9 5-20 1-20-8c0-6 5-10 10-10 4 0 8 3 10 6 2-3 6-6 10-6 5 0 10 4 10 10 0 9-11 13-20 22Z"
          fill="#9e2b2b"
          stroke={MAROON_DEEP}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <ellipse cx="-6" cy="-6" rx="3.5" ry="2.5" fill={WARM_WHITE} opacity="0.55" transform="rotate(-30 -6 -6)" />
      </g>
    </svg>
  );
});
