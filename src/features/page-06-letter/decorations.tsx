import { memo, useId, type CSSProperties } from "react";

/*
 * Original SVG decorations for Page 6 (Gift 1 — Letter), after the stickers in
 * Reference Image 8, with the reference's blue swapped for maroon (INSTRUCTIONS
 * §2). Paper, cream and white stay neutral. Nothing is copied from the
 * reference artwork; every piece is redrawn.
 *
 * Left (the letter): a binder clip, a lipstick kiss, a star washi-tape strip,
 * a small cake and a felt teddy. Centre: a painted couple holding hands.
 * Right (the photos): a camera, two mirror balls, a balloon dog, daisies and a
 * party hat.
 */

type Props = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const WARM_WHITE = "#fffdf8";
const WASH = "#ecd6d0";
const PAPER2 = "#e8ddcc";
const GOLD = "#c9a227";

/* ---------- Left: letter decorations ---------- */

/** A dark binder clip, as if clamping the top of the letter. */
export const BinderClip = memo(function BinderClip({ className, style }: Props) {
  return (
    <svg viewBox="0 0 90 64" className={className} style={style} aria-hidden>
      {/* two wire handles splayed up from the clip */}
      <path d="M30 40 20 10 44 24" fill="none" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 40 70 10 46 24" fill="none" stroke={MAROON_DEEP} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* clip body: trapezoid, wider at the base */}
      <path d="M26 30 64 30 72 60 18 60Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M26 30 64 30 62.5 36 27.5 36Z" fill={WARM_WHITE} opacity="0.14" />
    </svg>
  );
});

/** A lipstick kiss: cupid's-bow upper lip, full lower lip. */
export const LipKiss = memo(function LipKiss({ className, style }: Props) {
  return (
    <svg viewBox="0 0 100 80" className={className} style={style} aria-hidden>
      <path
        d="M6 33C14 20 26 13 34 16 40 18 46 23 50 29 54 23 60 18 66 16 74 13 86 20 94 33 76 29 58 31 50 34 42 31 24 29 6 33Z"
        fill={MAROON}
        stroke={MAROON_DEEP}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 37C26 41 74 41 91 37 82 58 64 68 50 68 36 68 18 58 9 37Z"
        fill={MAROON}
        stroke={MAROON_DEEP}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M30 22 28 31M50 20 50 32M70 22 72 31" stroke={WARM_WHITE} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M26 46 30 40M50 50 50 41M74 46 70 40" stroke={WARM_WHITE} strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
});

/**
 * A strip of maroon washi tape patterned with little white stars, like the
 * star tape down the left of the reference. Drawn with preserveAspectRatio
 * "none" so CSS can stretch it to any length and angle; the ends are torn.
 */
export const StarTape = memo(function StarTape({ className, style }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 240 44" preserveAspectRatio="none" className={className} style={style} aria-hidden>
      <defs>
        <pattern id={id} width="34" height="22" patternUnits="userSpaceOnUse">
          <path d="M9 3 11 8 16.5 8.4 12.3 12 13.7 17.4 9 14.4 4.3 17.4 5.7 12 1.5 8.4 7 8Z" fill={WARM_WHITE} opacity="0.92" />
          <path d="M26 14 27.3 17.4 31 17.7 28.1 20.1 29 23.6 26 21.6 23 23.6 23.9 20.1 21 17.7 24.7 17.4Z" fill={WARM_WHITE} opacity="0.55" />
        </pattern>
      </defs>
      {/* torn-ended strip */}
      <path
        d="M4 4 236 2 232 22 238 40 4 42 8 22Z"
        fill={MAROON}
      />
      <path d="M4 4 236 2 232 22 238 40 4 42 8 22Z" fill={MAROON_DEEP} opacity="0.18" />
      <rect x="4" y="2" width="234" height="40" fill={`url(#${id})`} />
    </svg>
  );
});

/** A small two-tier birthday cake with a lit candle and a sparkle. */
export const MiniCake = memo(function MiniCake({ className, style }: Props) {
  return (
    <svg viewBox="0 0 84 90" className={className} style={style} aria-hidden>
      {/* plate */}
      <ellipse cx="42" cy="82" rx="36" ry="6" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="1.6" />
      {/* bottom tier */}
      <rect x="12" y="52" width="60" height="28" rx="4" fill={WARM_WHITE} stroke={MAROON_DEEP} strokeWidth="2" />
      <path d="M12 60c8 6 14-4 22 1s14 4 22-1 12 5 16 1" fill="none" stroke={MAROON_SOFT} strokeWidth="3" />
      {/* top tier */}
      <rect x="24" y="30" width="36" height="24" rx="4" fill={WASH} stroke={MAROON_DEEP} strokeWidth="2" />
      <path d="M24 37c6 5 10-3 16 1s10 3 14-1" fill="none" stroke={MAROON} strokeWidth="2.6" />
      {/* candle + flame */}
      <rect x="39.5" y="14" width="5" height="16" fill={MAROON} />
      <path d="M42 4c3 4 3 7 0 10-3-3-3-6 0-10Z" fill={GOLD} />
      {/* sparkle */}
      <path d="M68 20 70 26 76 28 70 30 68 36 66 30 60 28 66 26Z" fill={GOLD} opacity="0.9" />
    </svg>
  );
});

/** A little felt teddy bear in cream, sitting. */
export const Teddy = memo(function Teddy({ className, style }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={className} style={style} aria-hidden>
      {/* ears */}
      <circle cx="30" cy="22" r="12" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.4" />
      <circle cx="66" cy="22" r="12" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.4" />
      <circle cx="30" cy="22" r="5" fill={WASH} />
      <circle cx="66" cy="22" r="5" fill={WASH} />
      {/* legs */}
      <ellipse cx="32" cy="82" rx="13" ry="10" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.4" />
      <ellipse cx="64" cy="82" rx="13" ry="10" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.4" />
      <ellipse cx="32" cy="82" rx="6" ry="4.5" fill={WASH} />
      <ellipse cx="64" cy="82" rx="6" ry="4.5" fill={WASH} />
      {/* body */}
      <ellipse cx="48" cy="64" rx="26" ry="24" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.6" />
      {/* arms */}
      <ellipse cx="22" cy="58" rx="9" ry="13" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.4" transform="rotate(20 22 58)" />
      <ellipse cx="74" cy="58" rx="9" ry="13" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.4" transform="rotate(-20 74 58)" />
      {/* head */}
      <circle cx="48" cy="38" r="22" fill={PAPER2} stroke={MAROON_DEEP} strokeWidth="2.6" />
      <ellipse cx="48" cy="44" rx="11" ry="9" fill={WASH} />
      {/* face */}
      <circle cx="40" cy="35" r="2.6" fill={MAROON_DEEP} />
      <circle cx="56" cy="35" r="2.6" fill={MAROON_DEEP} />
      <path d="M48 42v4M48 46c-3 3-7 1-7-2M48 46c3 3 7 1 7-2" fill="none" stroke={MAROON_DEEP} strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="48" cy="40.5" rx="3.2" ry="2.4" fill={MAROON_DEEP} />
      {/* bow tie */}
      <path d="M48 58c-6-5-13-2-13 3 0 5 7 4 13-1 6 5 13 6 13 1 0-5-7-8-13-3Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="48" cy="60" r="3" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.2" />
    </svg>
  );
});

/** Two figures holding hands, painted like a rough maroon stamp. */
export const Couple = memo(function Couple({ className, style }: Props) {
  return (
    <svg viewBox="0 0 150 150" className={className} style={style} aria-hidden>
      <g fill={MAROON_SOFT} opacity="0.9" stroke={MAROON} strokeWidth="1.5" strokeLinejoin="round">
        {/* left figure */}
        <circle cx="46" cy="30" r="15" />
        <path d="M30 62c0-12 7-20 16-20s16 8 16 20l-4 58c0 5-8 5-8 0l-4-40-4 40c0 5-8 5-8 0Z" />
        {/* left arm reaching to the clasp */}
        <path d="M58 70 80 86" stroke={MAROON_SOFT} strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* right figure */}
        <circle cx="104" cy="30" r="15" />
        <path d="M88 62c0-12 7-20 16-20s16 8 16 20l-4 58c0 5-8 5-8 0l-4-40-4 40c0 5-8 5-8 0Z" />
        {/* right arm reaching to the clasp */}
        <path d="M92 70 70 86" stroke={MAROON_SOFT} strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      {/* clasped hands */}
      <circle cx="75" cy="87" r="6" fill={MAROON} />
    </svg>
  );
});

/* ---------- Right: photo decorations ---------- */

/** A compact camera, like the sticker over the top photo in the reference. */
export const Camera = memo(function Camera({ className, style }: Props) {
  return (
    <svg viewBox="0 0 104 76" className={className} style={style} aria-hidden>
      {/* flash hump + shutter button */}
      <rect x="28" y="6" width="26" height="12" rx="3" fill={MAROON_SOFT} stroke={MAROON_DEEP} strokeWidth="2" />
      <rect x="74" y="8" width="12" height="8" rx="2" fill={MAROON_DEEP} />
      {/* body */}
      <rect x="6" y="16" width="92" height="54" rx="8" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2.6" />
      <rect x="6" y="16" width="92" height="16" rx="8" fill={WARM_WHITE} opacity="0.08" />
      {/* lens */}
      <circle cx="52" cy="44" r="19" fill={MAROON_DEEP} stroke={WARM_WHITE} strokeWidth="2.2" />
      <circle cx="52" cy="44" r="11" fill={MAROON_SOFT} stroke={MAROON_DEEP} strokeWidth="2" />
      <circle cx="47" cy="39" r="3.4" fill={WARM_WHITE} opacity="0.7" />
      {/* viewfinder + indicator */}
      <rect x="14" y="22" width="12" height="8" rx="2" fill={WARM_WHITE} opacity="0.85" />
      <circle cx="86" cy="26" r="3" fill={GOLD} />
    </svg>
  );
});

/** A hanging mirror ball on a thread, with a faceted grid. */
export const MirrorBall = memo(function MirrorBall({ className, style }: Props) {
  const id = useId();
  return (
    <svg viewBox="0 0 70 96" className={className} style={style} aria-hidden overflow="visible">
      <defs>
        <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill={MAROON} />
          <rect width="9" height="9" fill="none" stroke={MAROON_DEEP} strokeWidth="0.8" />
          <rect x="1" y="1" width="3.4" height="3.4" fill={MAROON_SOFT} opacity="0.8" />
        </pattern>
      </defs>
      {/* thread + cap */}
      <path d="M35 0V18" stroke={MAROON_DEEP} strokeWidth="1.4" />
      <rect x="31" y="16" width="8" height="6" rx="1.5" fill={MAROON_DEEP} />
      {/* ball */}
      <circle cx="35" cy="57" r="30" fill={`url(#${id})`} stroke={MAROON_DEEP} strokeWidth="2.2" />
      <circle cx="35" cy="57" r="30" fill="none" stroke={WARM_WHITE} strokeOpacity="0.1" strokeWidth="6" />
      {/* a couple of highlights */}
      <rect x="20" y="40" width="6" height="6" fill={WARM_WHITE} opacity="0.85" />
      <rect x="44" y="64" width="5" height="5" fill={WARM_WHITE} opacity="0.7" />
    </svg>
  );
});

/** A twisted-balloon dog. */
export const BalloonDog = memo(function BalloonDog({ className, style }: Props) {
  return (
    <svg viewBox="0 0 112 92" className={className} style={style} aria-hidden>
      <g fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2">
        {/* back legs */}
        <rect x="80" y="40" width="13" height="40" rx="6.5" />
        <rect x="94" y="40" width="13" height="40" rx="6.5" />
        {/* front legs */}
        <rect x="18" y="40" width="13" height="40" rx="6.5" />
        <rect x="32" y="40" width="13" height="40" rx="6.5" />
        {/* body */}
        <rect x="20" y="34" width="80" height="16" rx="8" />
        {/* neck */}
        <rect x="18" y="12" width="14" height="30" rx="7" />
        {/* head */}
        <rect x="8" y="6" width="34" height="14" rx="7" />
        {/* ear */}
        <rect x="6" y="16" width="12" height="22" rx="6" />
      </g>
      {/* knot highlights + eye */}
      <circle cx="25" cy="27" r="2.5" fill={MAROON_DEEP} />
      <circle cx="15" cy="12" r="2.4" fill={WARM_WHITE} opacity="0.85" />
      <path d="M26 36c6 3 46 3 70 0" fill="none" stroke={WARM_WHITE} strokeOpacity="0.25" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
});

/** A small daisy: white petals, gold centre. */
export const Daisy = memo(function Daisy({ className, style }: Props) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 60 60" className={className} style={style} aria-hidden>
      <g>
        {petals.map((a) => (
          <ellipse key={a} cx="30" cy="13" rx="6.2" ry="12" fill={WARM_WHITE} stroke={MAROON_SOFT} strokeWidth="1.3" transform={`rotate(${a} 30 30)`} />
        ))}
      </g>
      <circle cx="30" cy="30" r="8.5" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.4" />
      <circle cx="27" cy="27" r="2" fill={WARM_WHITE} opacity="0.7" />
    </svg>
  );
});

/** A party hat with a pompom and polka dots. */
export const PartyHat = memo(function PartyHat({ className, style }: Props) {
  return (
    <svg viewBox="0 0 70 92" className={className} style={style} aria-hidden>
      {/* cone */}
      <path d="M35 6 60 80 10 80Z" fill={MAROON} stroke={MAROON_DEEP} strokeWidth="2.4" strokeLinejoin="round" />
      {/* zigzag trim at the base */}
      <path d="M10 80 17 72 24 80 31 72 38 80 45 72 52 80 59 72" fill="none" stroke={WARM_WHITE} strokeWidth="2.6" strokeLinejoin="round" opacity="0.85" />
      {/* dots */}
      <circle cx="35" cy="34" r="3.2" fill={WARM_WHITE} opacity="0.85" />
      <circle cx="27" cy="52" r="3" fill={GOLD} />
      <circle cx="44" cy="54" r="3" fill={WARM_WHITE} opacity="0.85" />
      <circle cx="35" cy="66" r="3" fill={GOLD} />
      {/* pompom */}
      <circle cx="35" cy="8" r="8" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="1.6" />
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
