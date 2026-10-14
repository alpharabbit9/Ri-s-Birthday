import { memo, useId, type CSSProperties } from "react";

import { handTilt } from "@/lib/motion";

/*
 * Original SVG decorations for the cake page, after the party props in
 * Reference Image 2: paper-chain garlands with ribbons, firework starbursts,
 * presents, party hats and little stars. Colours are the scrapbook tokens.
 */

type DecoProps = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const WASH = "#ecd6d0";
const WARM_WHITE = "#fffdf8";
const GOLD = "#c9a227";
const INK = "#211a17";

/** Pencil-ish outline shared by the paper props. */
const EDGE = { stroke: INK, strokeOpacity: 0.4, strokeWidth: 1.3, strokeLinejoin: "round" } as const;

/** Chunky five-point star in a 100 x 100 box. */
const STAR =
  "M50 4 64.1 32.6 95.7 37.2 72.8 59.4 78.2 90.8 50 76 21.8 90.8 27.2 59.4 4.3 37.2 35.9 32.6Z";

/* ---------- Paper-chain garland ---------- */

type Pt = readonly [number, number];
type Link = { x: number; y: number; angle: number };

/** Points `step` apart along a cubic Bézier, each with the curve's direction there. */
function alongCurve(p0: Pt, p1: Pt, p2: Pt, p3: Pt, step: number): Link[] {
  const at = (t: number): Pt => {
    const u = 1 - t;
    const [a, b, c, d] = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
    return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
  };

  const links: Link[] = [];
  let prev = at(0);
  let run = step;
  for (let i = 1; i <= 300; i++) {
    const p = at(i / 300);
    run += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    if (run >= step) {
      links.push({ x: p[0], y: p[1], angle: (Math.atan2(p[1] - prev[1], p[0] - prev[0]) * 180) / Math.PI });
      run = 0;
    }
    prev = p;
  }
  return links;
}

/** One chain drapes from the top towards the outer edge, the other hangs almost straight. */
const CHAINS = [
  { links: alongCurve([104, -12], [120, 90], [84, 190], [98, 336], 12.5), colors: [GOLD, MAROON_DEEP, WARM_WHITE, MAROON_SOFT] },
  { links: alongCurve([152, -12], [134, 110], [40, 150], [16, 318], 12.5), colors: [MAROON, WARM_WHITE, GOLD, WASH] },
];

const RIBBON_A = "M58 -6C70 40 36 70 52 118S30 190 46 250";
const RIBBON_B = "M138 -6C146 30 124 64 136 104S124 160 132 206";

/** Stars hanging on threads: x, thread length, star size, colour. */
const CHARMS = [
  { x: 28, len: 150, size: 15, color: GOLD },
  { x: 80, len: 236, size: 13, color: WARM_WHITE },
  { x: 150, len: 126, size: 12, color: MAROON },
];

/** A paper loop seen face-on (an open ring) or edge-on (a flat band). */
function ChainLink({ x, y, angle, color, face }: Link & { color: string; face: boolean }) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)})`}>
      {face ? (
        <>
          <ellipse rx="10" ry="6.8" fill="none" stroke={INK} strokeOpacity="0.32" strokeWidth="6.4" />
          <ellipse rx="10" ry="6.8" fill="none" stroke={color} strokeWidth="4.6" />
        </>
      ) : (
        <ellipse rx="10.5" ry="2.7" fill={color} stroke={INK} strokeOpacity="0.32" strokeWidth="0.9" />
      )}
    </g>
  );
}

/**
 * Paper chains, twisted ribbons and star charms hanging from a top corner.
 * Drawn for the left corner; `flip` mirrors it for the right. Memoised: it's
 * a few hundred static shapes.
 */
export const Garland = memo(function Garland({ className, style, flip = false }: DecoProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 340"
      className={className}
      style={{ ...style, scale: flip ? "-1 1" : undefined }}
      aria-hidden
    >
      {/* Twisted ribbons: a solid stroke with a lighter dashed twist over it */}
      <path d={RIBBON_A} fill="none" stroke={MAROON} strokeWidth="6" strokeLinecap="round" />
      <path d={RIBBON_A} fill="none" stroke={MAROON_SOFT} strokeWidth="6" strokeDasharray="6 9" strokeLinecap="round" />
      <path d={RIBBON_B} fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
      <path d={RIBBON_B} fill="none" stroke="#e9cf72" strokeWidth="5" strokeDasharray="5 9" strokeLinecap="round" />

      {CHAINS.map(({ links, colors }, c) => (
        <g key={c}>
          {links.map((link, i) => (
            <ChainLink key={i} {...link} color={colors[i % colors.length]} face={i % 2 === 0} />
          ))}
        </g>
      ))}

      {CHARMS.map(({ x, len, size, color }) => (
        <g key={x}>
          <path d={`M${x} -6V${len}`} stroke={INK} strokeOpacity="0.5" strokeWidth="1.1" />
          <path
            d={STAR}
            transform={`translate(${x - size / 2} ${len - size * 0.12}) scale(${size / 100})`}
            fill={color}
            stroke={MAROON_DEEP}
            strokeWidth="9"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
});

/* ---------- Firework starburst ---------- */

const RAYS = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2 + handTilt(i + 31, 0.05);
  const long = i % 2 === 0;
  const r1 = 8 + Math.abs(handTilt(i + 57, 3));
  const r2 = (long ? 44 : 29) + handTilt(i + 83, 4);
  return {
    x1: +(Math.cos(a) * r1).toFixed(2),
    y1: +(Math.sin(a) * r1).toFixed(2),
    x2: +(Math.cos(a) * r2).toFixed(2),
    y2: +(Math.sin(a) * r2).toFixed(2),
    color: [GOLD, MAROON_SOFT, MAROON][i % 3],
    dot: long && i % 4 === 0,
  };
});

/** Thin-rayed firework burst, like the ones beside the heading in the reference. */
export function Starburst({ className, style }: DecoProps) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} style={style} aria-hidden>
      {RAYS.map((r, i) => (
        <g key={i}>
          <line x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={r.color} strokeWidth={r.dot ? 1.3 : 0.9} strokeLinecap="round" />
          {r.dot && <circle cx={r.x2} cy={r.y2} r="1.7" fill={r.color} />}
        </g>
      ))}
      <circle r="2.6" fill={GOLD} />
    </svg>
  );
}

/* ---------- Party props ---------- */

type GiftProps = DecoProps & { box: string; ribbon: string; dots?: string };

/** Wrapped present with a ribbon and bow, optionally on polka-dot paper. */
export function GiftBox({ className, style, box, ribbon, dots }: GiftProps) {
  const id = useId();
  const paper = dots ? `url(#${id})` : box;
  return (
    <svg viewBox="0 0 100 96" className={className} style={style} aria-hidden>
      {dots && (
        <defs>
          <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill={box} />
            <circle cx="3.5" cy="3.5" r="2.2" fill={dots} />
            <circle cx="10.5" cy="10.5" r="2.2" fill={dots} />
          </pattern>
        </defs>
      )}
      {/* Bow loops */}
      <path d="M50 31C40 14 24 11 23 20c-1 8 12 11 27 11Z" fill={ribbon} {...EDGE} />
      <path d="M50 31C60 14 76 11 77 20c1 8-12 11-27 11Z" fill={ribbon} {...EDGE} />
      {/* Box, with the lid's shadow and a darker side */}
      <rect x="11" y="42" width="78" height="52" rx="2" fill={paper} {...EDGE} />
      <rect x="11.6" y="43" width="76.8" height="6" fill={INK} fillOpacity="0.14" />
      <rect x="66" y="49" width="22.4" height="44.4" fill={INK} fillOpacity="0.08" />
      <rect x="6" y="30" width="88" height="14" rx="2" fill={paper} {...EDGE} />
      {/* Ribbon and knot */}
      <rect x="44" y="30" width="12" height="64" fill={ribbon} {...EDGE} />
      <ellipse cx="50" cy="31" rx="7" ry="5" fill={ribbon} {...EDGE} />
    </svg>
  );
}

/** Striped paper party hat with a gold brim and a pompom. */
export function PartyHat({ className, style, body, stripe }: DecoProps & { body: string; stripe: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 88" className={className} style={style} aria-hidden>
      <defs>
        <pattern id={id} width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <rect width="11" height="11" fill={body} />
          <rect width="11" height="4.5" fill={stripe} />
        </pattern>
      </defs>
      <path d="M32 14 57 75Q32 83 7 75Z" fill={`url(#${id})`} {...EDGE} />
      <path d="M6 74Q32 82 58 74L58.6 80Q32 88 5.4 80Z" fill={GOLD} {...EDGE} />
      <circle cx="32" cy="11.5" r="7.5" fill={WARM_WHITE} {...EDGE} />
      <path d="M27.5 9c2-2.4 5.6-2.8 8.4-1" fill="none" stroke={INK} strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Small star sticker: filled, or just an outline. */
export function SmallStar({ className, color = GOLD, outline = false }: DecoProps & { color?: string; outline?: boolean }) {
  return (
    <svg viewBox="-6 -6 112 112" className={className} aria-hidden>
      <path
        d={STAR}
        fill={outline ? "none" : color}
        stroke={outline ? color : MAROON_DEEP}
        strokeWidth={outline ? 8 : 4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Doodles ---------- */

/** Hand-drawn arrow curving up towards the cake. Takes the text colour. */
export function ArrowUp({ className }: DecoProps) {
  return (
    <svg viewBox="0 0 32 44" className={className} fill="none" aria-hidden>
      <path d="M18 41C10 31 10.5 18 16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9.5 11.8 16 4.6l6.2 7.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hand-drawn arrow pointing right, for Turn Page. Takes the text colour. */
export function ArrowRight({ className }: DecoProps) {
  return (
    <svg viewBox="0 0 48 24" className={className} fill="none" aria-hidden>
      <path d="M3 13.5C14 10 28 10.5 42 12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M34 4.5 43.5 12 34.5 19.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Quick pen underline, drawn in after the word above it (data-anim="underline"). */
export function Scribble({ className }: DecoProps) {
  return (
    <svg viewBox="0 0 120 16" preserveAspectRatio="none" className={className} fill="none" aria-hidden>
      <path
        data-anim="underline"
        d="M3 8.5C34 4 74 3 116 5.5 84 8 50 10.5 22 13"
        pathLength={1}
        stroke={MAROON}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
    </svg>
  );
}
