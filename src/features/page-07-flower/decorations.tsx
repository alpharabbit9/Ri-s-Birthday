import { memo, useId, type CSSProperties } from "react";

/*
 * Original SVG decorations for Page 7 (Gift 2 — Flower), after Reference Image
 * 9 ("Some flowers for you"), with the reference's blue swapped for maroon
 * (INSTRUCTIONS §2). Paper, cream and white stay neutral. Nothing is copied
 * from the reference or from any branded character — every piece is redrawn:
 * party hats and a little star-and-bloom cluster in the top corner, a soft
 * white plush bunny peeking over the filmstrip, a bulldog clip, a vinyl record
 * and a martini by the strip, a filigree swirl down the right edge and a puffy
 * heart by the kitten.
 */

type Props = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const WARM_WHITE = "#fffdf8";
const WASH = "#ecd6d0";
const PAPER2 = "#e8ddcc";
const GOLD = "#c9a227";

/* ---------- Top corner: party hat, stars, bloom ---------- */

/** A party hat with a pompom, zigzag trim and dots. */
export const PartyHat = memo(function PartyHat({ className, style }: Props) {
  return (
    <svg viewBox="0 0 70 92" className={className} style={style} aria-hidden>
      <path d="M35 6 60 80 10 80Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M10 80 17 72 24 80 31 72 38 80 45 72 52 80 59 72" fill="none" stroke={WARM_WHITE} strokeWidth="2.6" strokeLinejoin="round" opacity="0.85" />
      <circle cx="35" cy="34" r="3.2" fill={WARM_WHITE} opacity="0.85" />
      <circle cx="27" cy="52" r="3" fill={GOLD} />
      <circle cx="44" cy="54" r="3" fill={WARM_WHITE} opacity="0.85" />
      <circle cx="35" cy="66" r="3" fill={GOLD} />
      <circle cx="35" cy="8" r="8" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.6" />
    </svg>
  );
});

/** A little five-point star. */
function Star({ cx, cy, r, fill, rot = 0 }: { cx: number; cy: number; r: number; fill: string; rot?: number }) {
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = (Math.PI / 180) * (rot - 90 + i * 72);
    const ai = a + Math.PI / 5;
    const ri = r * 0.42;
    return `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)} ${cx + ri * Math.cos(ai)} ${cy + ri * Math.sin(ai)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} stroke={MAROON_DEEP} strokeWidth="1.4" strokeLinejoin="round" />;
}

/** A cluster of stars, as in the reference's top corner. */
export const StarBurst = memo(function StarBurst({ className, style }: Props) {
  return (
    <svg viewBox="0 0 96 90" className={className} style={style} aria-hidden>
      <Star cx={30} cy={56} r={26} fill={MAROON} rot={-8} />
      <Star cx={66} cy={40} r={20} fill={MAROON_SOFT} rot={12} />
      <Star cx={56} cy={68} r={13} fill={GOLD} rot={4} />
      <circle cx="30" cy="54" r="3" fill={WARM_WHITE} opacity="0.6" />
    </svg>
  );
});

/** A small five-petal bloom with a gold centre, sitting on the stars. */
export const Bloom = memo(function Bloom({ className, style }: Props) {
  const petals = Array.from({ length: 5 }, (_, i) => i * 72);
  return (
    <svg viewBox="0 0 60 60" className={className} style={style} aria-hidden>
      {petals.map((a) => (
        <ellipse key={a} cx="30" cy="14" rx="8" ry="12.5" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.3" transform={`rotate(${a} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="8" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.3" />
      <circle cx="27.5" cy="27.5" r="2" fill={WARM_WHITE} opacity="0.7" />
    </svg>
  );
});

/* ---------- The filmstrip's friends ---------- */

/** A soft white plush bunny, peeking over the top of the filmstrip. */
export const PlushBunny = memo(function PlushBunny({ className, style }: Props) {
  return (
    <svg viewBox="0 0 90 110" className={className} style={style} aria-hidden>
      {/* ears */}
      <ellipse cx="33" cy="30" rx="10" ry="28" fill={WARM_WHITE} stroke={MAROON_SOFT} strokeWidth="2" transform="rotate(-10 33 30)" />
      <ellipse cx="57" cy="30" rx="10" ry="28" fill={WARM_WHITE} stroke={MAROON_SOFT} strokeWidth="2" transform="rotate(10 57 30)" />
      <ellipse cx="33" cy="32" rx="4.5" ry="18" fill={WASH} transform="rotate(-10 33 32)" />
      <ellipse cx="57" cy="32" rx="4.5" ry="18" fill={WASH} transform="rotate(10 57 32)" />
      {/* head */}
      <circle cx="45" cy="70" r="30" fill={WARM_WHITE} stroke={MAROON_SOFT} strokeWidth="2.2" />
      {/* cheeks */}
      <circle cx="30" cy="76" r="6" fill={WASH} opacity="0.8" />
      <circle cx="60" cy="76" r="6" fill={WASH} opacity="0.8" />
      {/* face: dot eyes, little nose and a stitched mouth */}
      <circle cx="35" cy="66" r="3.2" fill={MAROON_DEEP} />
      <circle cx="55" cy="66" r="3.2" fill={MAROON_DEEP} />
      <path d="M45 72v4M45 76c-3 2.5-7 1-7-2M45 76c3 2.5 7 1 7-2" fill="none" stroke={MAROON_DEEP} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="45" cy="71" rx="2.6" ry="2" fill={MAROON_SOFT} />
    </svg>
  );
});

/** A bulldog/binder clip clamping the top of the filmstrip. */
export const BinderClip = memo(function BinderClip({ className, style }: Props) {
  return (
    <svg viewBox="0 0 90 64" className={className} style={style} aria-hidden>
      <path d="M30 40 20 10 44 24" fill="none" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 40 70 10 46 24" fill="none" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 30 64 30 72 60 18 60Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M26 30 64 30 62.5 36 27.5 36Z" fill={WARM_WHITE} opacity="0.14" />
    </svg>
  );
});

/** A vinyl record with grooves and a maroon label. */
export const Record = memo(function Record({ className, style }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={className} style={style} aria-hidden>
      <circle cx="48" cy="48" r="46" fill="#241a18" stroke={MAROON_DEEP} strokeWidth="2" />
      {[40, 34, 28].map((r) => (
        <circle key={r} cx="48" cy="48" r={r} fill="none" stroke={MAROON_SOFT} strokeOpacity="0.35" strokeWidth="1.2" />
      ))}
      <circle cx="48" cy="48" r="18" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.6" />
      <circle cx="48" cy="48" r="3" fill={PAPER2} />
      {/* a soft sheen across the disc */}
      <path d="M22 26A46 46 0 0 1 70 20" fill="none" stroke={WARM_WHITE} strokeOpacity="0.12" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
});

/** A maroon martini with an olive, like the one near the reference's strip. */
export const MartiniGlass = memo(function MartiniGlass({ className, style }: Props) {
  return (
    <svg viewBox="0 0 84 96" className={className} style={style} aria-hidden>
      <path d="M12 14 72 14 42 50Z" fill={WASH} stroke={MAROON_DEEP} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M21 19 63 19 42 44Z" fill={MAROON_SOFT} />
      <path d="M21 19 63 19" stroke={WARM_WHITE} strokeOpacity="0.6" strokeWidth="2" />
      <path d="M42 50 42 82" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M26 84 58 84" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M50 10 58 36" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="58" cy="37" r="6" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.6" />
      <circle cx="56.4" cy="35.4" r="1.8" fill={WARM_WHITE} opacity="0.7" />
    </svg>
  );
});

/* ---------- Right edge and the kitten ---------- */

/** A filigree double-swirl flourish, like the scrollwork down the reference's right side. */
export const Swirl = memo(function Swirl({ className, style }: Props) {
  return (
    <svg viewBox="0 0 120 230" className={className} style={style} aria-hidden>
      <g fill="none" stroke={MAROON} strokeWidth="6" strokeLinecap="round">
        <path d="M60 6C60 54 96 60 96 94c0 26-40 26-40 0 0-16 22-16 22 2" />
        <path d="M60 118c0 48 36 54 36 88 0 26-40 26-40 0 0-16 22-16 22 2" />
      </g>
      <g fill="none" stroke={MAROON_SOFT} strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <path d="M60 6C60 54 96 60 96 94c0 26-40 26-40 0 0-16 22-16 22 2" />
        <path d="M60 118c0 48 36 54 36 88 0 26-40 26-40 0 0-16 22-16 22 2" />
      </g>
      <circle cx="60" cy="112" r="5" fill={GOLD} />
    </svg>
  );
});

/** A puffy heart, rosy maroon with a soft highlight (no neon pink). */
export const PuffHeart = memo(function PuffHeart({ className, style }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 72 66" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id={id} cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#c76a6a" />
          <stop offset="60%" stopColor={MAROON_SOFT} />
          <stop offset="100%" stopColor={MAROON} />
        </radialGradient>
      </defs>
      <path
        d="M36 62C13 46 4 35 4 22 4 11 12 4 22 4c6 0 11 3 14 8 3-5 8-8 14-8 10 0 18 7 18 18 0 13-9 24-32 40Z"
        fill={`url(#${id})`}
        stroke={MAROON_DEEP}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M20 16c-5 2-8 7-8 13" fill="none" stroke={WARM_WHITE} strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
});

/** Hand-drawn arrow pointing left, for the Back control. Takes the text colour. */
export const ArrowLeft = memo(function ArrowLeft({ className }: Props) {
  return (
    <svg viewBox="0 0 48 24" className={className} fill="none" aria-hidden>
      <path d="M45 11.5C34 10 20 10.5 6 12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M14 4.5 4.5 12 13.5 19.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});
