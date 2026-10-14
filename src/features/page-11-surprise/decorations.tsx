import { memo, useId, type CSSProperties } from "react";

/*
 * Original SVG decorations for Phase 11 (Gift 4 — Birthday Surprise Intro),
 * after the composition in Reference Image 11, with its red swapped for the
 * site's maroon (INSTRUCTIONS §2). Nothing is copied from the reference
 * artwork; every piece is redrawn. The reference's camera wordmark is left
 * out entirely — the camera here is a generic, unbranded compact.
 *
 * The envelope is drawn in two parts that share one coordinate box so they
 * overlay perfectly in CSS: EnvelopeBack (body + open flap) sits BEHIND the
 * birthday card, EnvelopeFront (the front pocket) sits IN FRONT of the card's
 * base, so the card genuinely rises out of the envelope. The card itself is
 * HTML (in SurpriseScene) so its "Happy Birthday Madam" script stays crisp.
 *
 * Other pieces: a generic white compact camera, a rose bouquet seated in a
 * cream cone wrap with a maroon ribbon, a pink bow, a gingham heart and three
 * tiny hearts.
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
const GOLD = "#c9a227";
const SAGE = "#93a386";
const SAGE_DEEP = "#5f6e55";
const PINK = "#e3a7b8";
const PINK_DEEP = "#a34a62";

/* ---------- Open cream envelope — BACK (body + open flap), behind the card ---------- */

export const EnvelopeBack = memo(function EnvelopeBack({ className, style }: Props) {
  return (
    <svg viewBox="0 0 220 150" className={className} style={style} aria-hidden>
      {/* body back wall — the card rests against this */}
      <rect x="9" y="42" width="202" height="102" rx="8" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2.4" />
      {/* open flap, hinged at the top and leaning back */}
      <path d="M9 46 110 3 211 46 110 70Z" fill={CREAM} stroke={CREAM_LINE} strokeWidth="2.4" strokeLinejoin="round" />
      {/* flap inner crease + soft underside shade */}
      <path d="M9 46 110 3 211 46" fill="none" stroke={CREAM_LINE} strokeWidth="1.6" strokeOpacity="0.7" strokeLinejoin="round" />
      <path d="M9 46 110 70 211 46" fill={CREAM_DEEP} fillOpacity="0.5" stroke="none" />
    </svg>
  );
});

/* ---------- Open cream envelope — FRONT pocket, over the card's base ---------- */

export const EnvelopeFront = memo(function EnvelopeFront({ className, style }: Props) {
  return (
    <svg viewBox="0 0 220 150" className={className} style={style} aria-hidden>
      {/* front pocket: top edge dips to the centre (the mouth the card comes out of) */}
      <path d="M10 76 110 98 210 76 210 144 10 144Z" fill={CREAM} stroke={CREAM_LINE} strokeWidth="2.4" strokeLinejoin="round" />
      {/* pocket-mouth shadow along the top edge */}
      <path d="M10 76 110 98 210 76" fill="none" stroke={CREAM_DEEP} strokeWidth="2.4" strokeLinejoin="round" />
      {/* the two front folds meeting at the centre seam */}
      <path d="M10 144 110 100 210 144" fill="none" stroke={CREAM_LINE} strokeWidth="1.8" strokeOpacity="0.65" strokeLinejoin="round" />
      {/* faint sheen across the pocket */}
      <path d="M10 110 210 94" stroke={WARM_WHITE} strokeOpacity="0.5" strokeWidth="2" />
    </svg>
  );
});

/* ---------- Generic white compact camera (unbranded) ---------- */

export const Camera = memo(function Camera({ className, style }: Props) {
  return (
    <svg viewBox="0 0 220 140" className={className} style={style} aria-hidden>
      {/* strap lugs */}
      <circle cx="8" cy="46" r="5" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2" />
      <circle cx="212" cy="46" r="5" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2" />
      {/* body */}
      <rect x="12" y="30" width="196" height="92" rx="16" fill={WARM_WHITE} stroke={CREAM_LINE} strokeWidth="2.6" />
      {/* top plate */}
      <path d="M12 46a16 16 0 0 1 16-16h164a16 16 0 0 1 16 16v10H12Z" fill={CREAM} />
      <path d="M12 56h196" stroke={CREAM_LINE} strokeWidth="1.6" opacity="0.7" />
      {/* grip ridges */}
      <path d="M28 66v44M38 66v44M48 66v44" stroke={CREAM_LINE} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      {/* shutter button + dial */}
      <rect x="168" y="18" width="26" height="12" rx="6" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2" />
      <circle cx="146" cy="24" r="9" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2" />
      {/* flash window */}
      <rect x="26" y="34" width="34" height="14" rx="7" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2" />
      {/* lens barrel */}
      <circle cx="122" cy="88" r="36" fill={CREAM} stroke={CREAM_LINE} strokeWidth="2.4" />
      <circle cx="122" cy="88" r="27" fill="#3a2f2a" />
      <circle cx="122" cy="88" r="19" fill="#171110" />
      <circle cx="122" cy="88" r="11" fill="#2c4a5a" opacity="0.85" />
      {/* glass highlight */}
      <path d="M108 78a17 17 0 0 1 12-10" fill="none" stroke={WARM_WHITE} strokeWidth="4" strokeLinecap="round" opacity="0.85" />
      <circle cx="114" cy="96" r="3" fill={WARM_WHITE} opacity="0.5" />
      {/* tiny focus dot */}
      <circle cx="186" cy="88" r="4" fill={MAROON} />
    </svg>
  );
});

/** One rose head centred at (x, y) with radius r. */
function Rose({ x, y, r }: { x: number; y: number; r: number }) {
  const inner = r * 0.58;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={MAROON_SOFT} stroke={MAROON_DEEP} strokeWidth="2.2" />
      {/* outer petal notches */}
      <path
        d={`M${x - r} ${y}A${r} ${r} 0 0 1 ${x} ${y - r}M${x + r} ${y}A${r} ${r} 0 0 1 ${x} ${y + r}`}
        fill="none"
        stroke={MAROON_DEEP}
        strokeWidth="1.6"
        opacity="0.7"
      />
      {/* curled centre */}
      <circle cx={x} cy={y} r={inner} fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.8" />
      <path
        d={`M${x - inner * 0.7} ${y + inner * 0.2}A${inner * 0.75} ${inner * 0.75} 0 1 1 ${x + inner * 0.5} ${y - inner * 0.55}`}
        fill="none"
        stroke={CREAM}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx={x} cy={y} r={r * 0.18} fill={MAROON_DEEP} />
    </g>
  );
}

/** A eucalyptus sprig: a stem with round leaves, leaning by `tilt` degrees. */
function Sprig({ x, y, tilt, flip }: { x: number; y: number; tilt: number; flip?: boolean }) {
  const s = flip ? -1 : 1;
  const leaves: Array<[number, number, number]> = [
    [0, 0, 9],
    [-11, -16, 8],
    [11, -16, 8],
    [-18, -32, 7],
    [18, -32, 7],
    [0, -46, 7],
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <path d="M0 6 0 -50" stroke={SAGE_DEEP} strokeWidth="2.4" strokeLinecap="round" />
      {leaves.map(([lx, ly, lr], i) => (
        <g key={i}>
          <path d={`M0 ${ly + 8} ${lx * s} ${ly}`} stroke={SAGE_DEEP} strokeWidth="1.4" />
          <circle cx={lx * s} cy={ly} r={lr} fill={SAGE} stroke={SAGE_DEEP} strokeWidth="1.6" />
          <path d={`M${lx * s - lr * 0.4} ${ly - lr * 0.3}a${lr * 0.55} ${lr * 0.55} 0 0 1 ${lr * 0.5} -${lr * 0.4}`} stroke={WARM_WHITE} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
        </g>
      ))}
    </g>
  );
}

/** Baby's-breath: thin stems fanning out with tiny white buds. */
function Breath({ x, y }: { x: number; y: number }) {
  const stems: Array<[number, number]> = [
    [-26, -34],
    [-13, -44],
    [0, -48],
    [13, -44],
    [26, -34],
    [-19, -24],
    [19, -24],
  ];
  return (
    <g transform={`translate(${x} ${y})`} stroke={SAGE_DEEP} strokeWidth="1.3">
      {stems.map(([dx, dy], i) => (
        <g key={i}>
          <path d={`M0 0 ${dx} ${dy}`} fill="none" />
          <circle cx={dx} cy={dy} r="3.2" fill={WARM_WHITE} stroke={SAGE_DEEP} strokeWidth="1.2" />
          <circle cx={dx * 0.55} cy={dy * 0.55} r="2.2" fill={WARM_WHITE} stroke={SAGE_DEEP} strokeWidth="1" />
        </g>
      ))}
    </g>
  );
}

/* ---------- Rose bouquet seated in a cream cone wrap with a maroon ribbon ---------- */

export const Bouquet = memo(function Bouquet({ className, style }: Props) {
  return (
    <svg viewBox="0 0 200 280" className={className} style={style} aria-hidden>
      {/* back wrap sheet (the cone) — flares up from the hand to the bloom mouth */}
      <path d="M100 272 30 150 170 150Z" fill={CREAM_SHADE} stroke={CREAM_LINE} strokeWidth="2.2" strokeLinejoin="round" />
      {/* foliage behind the blooms, rising out of the mouth */}
      <Sprig x={54} y={150} tilt={-20} />
      <Sprig x={146} y={150} tilt={20} flip />
      <Breath x={66} y={146} />
      <Breath x={134} y={146} />
      <Breath x={100} y={150} />
      {/* bloom cluster — the lowest blooms overlap the wrap mouth (no gap) */}
      <Rose x={70} y={108} r={20} />
      <Rose x={110} y={92} r={23} />
      <Rose x={148} y={110} r={20} />
      <Rose x={88} y={142} r={19} />
      <Rose x={130} y={142} r={19} />
      <Rose x={109} y={132} r={16} />
      {/* front wrap sheet, layered over the back one */}
      <path d="M100 272 58 162 142 162Z" fill={CREAM} stroke={CREAM_LINE} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M100 272 100 168" stroke={CREAM_LINE} strokeWidth="1.6" strokeOpacity="0.6" />
      <path d="M100 272 74 160M100 272 126 160" stroke={CREAM_LINE} strokeOpacity="0.45" strokeWidth="1.3" />
      {/* ribbon tails down the cone */}
      <path d="M100 196 86 252l12-9 8 11Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M100 196 114 252l-12-9-8 11Z" fill={MAROON_SOFT} stroke={MAROON_DEEP} strokeWidth="1.8" strokeLinejoin="round" />
      {/* ribbon bow at the neck */}
      <path d="M100 192c-12-10-28-4-28 7 0 9 17 8 28-2 11 10 28 11 28 2 0-11-16-17-28-7Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="100" cy="193" r="6" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.8" />
    </svg>
  );
});

/* ---------- Little pink bow (tied where the card meets the envelope) ---------- */

export const PinkBow = memo(function PinkBow({ className, style }: Props) {
  return (
    <svg viewBox="0 0 100 70" className={className} style={style} aria-hidden>
      <path d="M50 34C40 24 24 22 22 32c-2 9 14 10 28 6 14 4 30 3 28-6-2-10-18-8-28 2Z" fill={PINK} stroke={PINK_DEEP} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M50 36 38 62l9-5 6 7Z" fill={PINK} stroke={PINK_DEEP} strokeWidth="2" strokeLinejoin="round" />
      <path d="M50 36 62 62l-9-5-6 7Z" fill={PINK} stroke={PINK_DEEP} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="50" cy="35" r="6.5" fill={PINK_DEEP} />
      <circle cx="48" cy="33" r="2" fill={WARM_WHITE} opacity="0.7" />
    </svg>
  );
});

/* ---------- Gingham heart sticker (on the envelope's front) ---------- */

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

/* ---------- Three tiny maroon hearts scattered by the envelope ---------- */

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

/* ---------- Left arrow for the Back tab ---------- */

export const ArrowLeft = memo(function ArrowLeft({ className, style }: Props) {
  return (
    <svg viewBox="0 0 32 20" className={className} style={style} aria-hidden>
      <path d="M11 2 2 10l9 8M3 10h27" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});
