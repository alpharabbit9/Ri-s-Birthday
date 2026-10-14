import { memo, type CSSProperties } from "react";

/*
 * Original SVG artwork for Page 5 (Choose your gift), after Reference Image 7:
 * a martini and a lipstick kiss by the heading, and the four gifts — an
 * envelope, a tulip bouquet, stacked gift boxes and a wrapped "surprise"
 * parcel. The reference's blue is maroon; paper, cream and white stay neutral.
 * Each is drawn flat like a cut-out sticker; the white die-cut edge is added in
 * CSS (menu.module.css .art).
 */

type Props = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const WASH = "#ecd6d0";
const WARM_WHITE = "#fffdf8";
const PAPER2 = "#e8ddcc";
const GOLD = "#c9a227";

/* ---------- Gift 1: envelope ---------- */

export const Envelope = memo(function Envelope({ className, style }: Props) {
  return (
    <svg viewBox="0 0 128 96" className={className} style={style} aria-hidden>
      {/* body */}
      <rect x="4" y="14" width="120" height="78" rx="7" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2.5" />
      <rect x="4" y="14" width="120" height="30" rx="7" fill={WARM_WHITE} opacity="0.06" />
      {/* lower folds rising to the centre, and side creases */}
      <path d="M7 89 64 54 121 89" fill="none" stroke={MAROON_DEEP} strokeOpacity="0.4" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 17 54 52M121 17 74 52" stroke={MAROON_DEEP} strokeOpacity="0.28" strokeWidth="1.6" />
      {/* top flap */}
      <path d="M5 16 64 58 123 16" fill={MAROON_SOFT} stroke={MAROON_DEEP} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M5 16 64 58 123 16" fill={WARM_WHITE} opacity="0.08" />
      {/* little wax heart where the flap closes */}
      <path d="M64 50c-4.5-5.4-13-3.6-13 2.7 0 4.6 7.4 8.2 13 11.8 5.6-3.6 13-7.2 13-11.8 0-6.3-8.5-8.1-13-2.7Z" fill={WARM_WHITE} stroke={MAROON_DEEP} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
});

/* ---------- Gift 2: tulip bouquet ---------- */

/** A single tulip head (three petals) centred at (x, y). */
function Tulip({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 11} ${y - 1}C${x - 12} ${y + 13} ${x + 12} ${y + 13} ${x + 11} ${y - 1}C${x + 6} ${y + 3} ${x + 4} ${y - 15} ${x} ${y - 6}C${x - 4} ${y - 15} ${x - 6} ${y + 3} ${x - 11} ${y - 1}Z`}
      fill={WARM_WHITE}
      stroke={MAROON}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  );
}

export const Bouquet = memo(function Bouquet({ className, style }: Props) {
  return (
    <svg viewBox="0 0 108 132" className={className} style={style} aria-hidden>
      {/* leaves behind the blooms */}
      <path d="M54 80C40 70 30 48 34 34 48 46 56 66 54 82Z" fill={MAROON_SOFT} opacity="0.85" />
      <path d="M54 80C68 70 78 48 74 34 60 46 52 66 54 82Z" fill={MAROON_SOFT} opacity="0.85" />
      {/* stems gathered to the tie */}
      <path d="M54 92 40 50M54 92 54 44M54 92 68 50" fill="none" stroke={MAROON_DEEP} strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" />
      {/* three tulips */}
      <Tulip x={40} y={46} />
      <Tulip x={68} y={46} />
      <Tulip x={54} y={34} />
      {/* wrapping cone */}
      <path d="M54 124 20 80C38 90 70 90 88 80Z" fill={WASH} stroke={MAROON_DEEP} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M54 124 54 86" stroke={MAROON_DEEP} strokeOpacity="0.4" strokeWidth="1.8" />
      <path d="M54 124 36 84M54 124 72 84" stroke={MAROON_DEEP} strokeOpacity="0.22" strokeWidth="1.4" />
      {/* tie bow */}
      <path d="M54 99c-7-6-15-3-15 3 0 5 9 5 15 0 6 5 15 5 15 0 0-6-8-9-15-3Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="54" cy="100" r="3.2" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.2" />
    </svg>
  );
});

/* ---------- Gift 3: surprise (a wrapped parcel, contents unknown) ---------- */

export const Surprise = memo(function Surprise({ className, style }: Props) {
  return (
    <svg viewBox="0 0 112 124" className={className} style={style} aria-hidden>
      {/* kraft-paper parcel */}
      <rect x="14" y="36" width="84" height="78" rx="4" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.4" />
      <rect x="14" y="36" width="84" height="26" rx="4" fill={WARM_WHITE} opacity="0.35" />
      {/* folded-over corner */}
      <path d="M78 36 98 36 98 56Z" fill={WASH} stroke={MAROON_DEEP} strokeWidth="1.6" strokeLinejoin="round" />
      {/* twine */}
      <path d="M56 36 56 114M14 74 98 74" stroke={MAROON} strokeWidth="4" />
      <path d="M56 36 56 114M14 74 98 74" stroke={MAROON_DEEP} strokeOpacity="0.4" strokeWidth="1.4" />
      {/* knotted bow where the twine crosses */}
      <path d="M56 74c-7-6-16-2-16 4 0 6 10 5 16-1 6 6 16 7 16 1 0-6-9-10-16-4Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="56" cy="74" r="3.4" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.2" />
      {/* round gift tag on a short string, asking what's inside */}
      <path d="M80 30 92 18" stroke={MAROON_DEEP} strokeWidth="1.8" />
      <circle cx="94" cy="16" r="13" fill={WARM_WHITE} stroke={MAROON_DEEP} strokeWidth="2.2" />
      <circle cx="94" cy="9" r="1.8" fill="none" stroke={MAROON_DEEP} strokeWidth="1.6" />
      <text x="94" y="22" textAnchor="middle" fontFamily="var(--font-hand)" fontWeight="700" fontSize="17" fill={MAROON}>?</text>
    </svg>
  );
});

/* ---------- Heading decorations ---------- */

/** A maroon martini with an olive, like the one by the heading in the reference. */
export const MartiniGlass = memo(function MartiniGlass({ className, style }: Props) {
  return (
    <svg viewBox="0 0 84 96" className={className} style={style} aria-hidden>
      {/* bowl and drink */}
      <path d="M12 14 72 14 42 50Z" fill={WASH} stroke={MAROON_DEEP} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M21 19 63 19 42 44Z" fill={MAROON_SOFT} />
      <path d="M21 19 63 19" stroke={WARM_WHITE} strokeOpacity="0.6" strokeWidth="2" />
      {/* stem and base */}
      <path d="M42 50 42 82" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M26 84 58 84" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" />
      {/* olive on a pick */}
      <path d="M50 10 58 36" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="58" cy="37" r="6" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.6" />
      <circle cx="56.4" cy="35.4" r="1.8" fill={WARM_WHITE} opacity="0.7" />
    </svg>
  );
});

/** A lipstick kiss mark: cupid's-bow upper lip, full lower lip. */
export const LipKiss = memo(function LipKiss({ className, style }: Props) {
  return (
    <svg viewBox="0 0 100 80" className={className} style={style} aria-hidden>
      {/* upper lip */}
      <path
        d="M6 33C14 20 26 13 34 16 40 18 46 23 50 29 54 23 60 18 66 16 74 13 86 20 94 33 76 29 58 31 50 34 42 31 24 29 6 33Z"
        fill={MAROON}
        stroke={MAROON_DEEP}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* lower lip */}
      <path
        d="M9 37C26 41 74 41 91 37 82 58 64 68 50 68 36 68 18 58 9 37Z"
        fill={MAROON}
        stroke={MAROON_DEEP}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* lipstick striations */}
      <path d="M30 22 28 31M50 20 50 32M70 22 72 31" stroke={WARM_WHITE} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M26 46 30 40M50 50 50 41M74 46 70 40" stroke={WARM_WHITE} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
});
