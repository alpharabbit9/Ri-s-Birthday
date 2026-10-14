import { memo, useId, type CSSProperties } from "react";

import { handTilt } from "@/lib/motion";

import styles from "./cake.module.css";

/*
 * The cake, after Reference Image 2: one tier with white drip frosting and
 * sprinkles, striped candles, on a maroon cake board. Original SVG.
 *
 * The light on top of it (flames, glow, embers, smoke) is HTML laid over the
 * same coordinates, so the flicker runs as CSS animations on the compositor
 * and the cake itself never repaints while the candles burn.
 */

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const MAROON_SOFT = "#a33a3a";
const WASH = "#ecd6d0";
const WARM_WHITE = "#fffdf8";
const GOLD = "#c9a227";
const INK = "#211a17";

/** Extra room above the candles for the flames' glow and the smoke. */
const VIEW_BOX = "0 -64 400 466";
const VIEW_TOP = -64;
const VIEW_W = 400;
const VIEW_H = 466;

/** Places a light element at a point of the cake art. */
const at = (x: number, y: number): CSSProperties => ({
  left: `${+((x / VIEW_W) * 100).toFixed(3)}%`,
  top: `${+(((y - VIEW_TOP) / VIEW_H) * 100).toFixed(3)}%`,
});

/**
 * Each flame's loops get their own length and starting point, so no two
 * flicker in step. Deterministic, like the rest of the art.
 */
const beat = (candle: number, loop: number, seconds: number): CSSProperties => ({
  animationDuration: `${(seconds * (1 + handTilt(candle * 3 + loop + 50, 0.25))).toFixed(2)}s`,
  animationDelay: `-${Math.abs(handTilt(candle * 3 + loop + 90, seconds)).toFixed(2)}s`,
});

const CX = 200;
const RX = 148;
const RY = 38;
/** Centre of the top surface. */
const TOP = 178;
/** Centre of the bottom edge. */
const BASE = 338;
/** How far the frosting hangs over the rim before it starts to drip. */
const LIP = 9;

const n = (v: number) => +v.toFixed(1);

/** y of the front rim of the top surface at x. */
const rim = (x: number) => TOP + RY * Math.sqrt(Math.max(0, 1 - ((x - CX) / RX) ** 2));

/** [x, half-width, length] for each drip, left to right. */
const DRIPS: readonly (readonly [number, number, number])[] = [
  [64, 6, 24],
  [88, 7.5, 50],
  [113, 6.5, 32],
  [139, 8, 68],
  [166, 6.5, 38],
  [194, 8, 84],
  [222, 6.5, 46],
  [250, 8, 62],
  [277, 6.5, 30],
  [303, 7.5, 56],
  [329, 6, 34],
];

/** Frosting that runs over the front rim and down the side in drips. */
function dripPath() {
  const left = CX - RX;
  const right = CX + RX;
  let d = `M${left} ${TOP}L${left} ${TOP + LIP}`;
  for (const [x, w, len] of DRIPS) {
    const b = n(rim(x) + LIP);
    d += `L${n(x - w - 5)} ${n(rim(x - w - 5) + LIP)}`;
    d += `Q${n(x - w)} ${b} ${n(x - w)} ${n(b + 6)}L${n(x - w)} ${n(b + len)}`;
    d += `A${w} ${w} 0 0 0 ${n(x + w)} ${n(b + len)}`;
    d += `L${n(x + w)} ${n(b + 6)}Q${n(x + w)} ${b} ${n(x + w + 5)} ${n(rim(x + w + 5) + LIP)}`;
  }
  return `${d}L${right} ${TOP + LIP}L${right} ${TOP}Z`;
}

const DRIP_PATH = dripPath();
const SIDE_PATH = `M${CX - RX} ${TOP}L${CX - RX} ${BASE}A${RX} ${RY} 0 0 0 ${CX + RX} ${BASE}L${CX + RX} ${TOP}Z`;

const SPRINKLE_COLORS = [MAROON, GOLD, MAROON_SOFT, "#d99a8f", "#e8c766", MAROON_DEEP];

/** Sprinkles over the top, and a few stuck to the drips. Deterministic, so every render matches. */
const SPRINKLES = Array.from({ length: 54 }, (_, i) => {
  let x: number;
  let y: number;
  if (i < 40) {
    const a = (handTilt(i * 3 + 1, 1) + 1) * Math.PI;
    const r = Math.sqrt(Math.abs(handTilt(i * 3 + 2, 1)));
    x = CX + Math.cos(a) * r * (RX - 14);
    y = TOP + Math.sin(a) * r * (RY - 6);
  } else {
    x = CX + handTilt(i * 3 + 1, RX - 18);
    y = rim(x) + 4 + Math.abs(handTilt(i * 3 + 2, 16));
  }
  return { x: n(x), y: n(y), rot: n(handTilt(i * 3 + 3, 90)), color: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length], dot: i % 7 === 0 };
});

/** Candle papers: [wax, spiral stripe]. */
const LOOKS = [
  [WARM_WHITE, MAROON],
  [GOLD, WARM_WHITE],
  [WASH, MAROON],
  [MAROON, WARM_WHITE],
  ["#f1d98c", MAROON_SOFT],
] as const;

/**
 * Back row first, so the front row overlaps it. The front row is short enough
 * that its tops stay below the back row's flames.
 */
const CANDLES = [
  { x: 136, base: 166, h: 80, look: 0 },
  { x: 178, base: 160, h: 92, look: 1 },
  { x: 222, base: 160, h: 84, look: 2 },
  { x: 264, base: 166, h: 90, look: 3 },
  { x: 114, base: 186, h: 72, look: 4 },
  { x: 156, base: 192, h: 84, look: 2 },
  { x: 200, base: 196, h: 76, look: 0 },
  { x: 244, base: 192, h: 86, look: 1 },
  { x: 286, base: 186, h: 74, look: 3 },
];

const FLAME = "M0 0C-6.5-1.5-8-10-4.6-17.5-2.8-21.6-.6-25.4 0-31c1.6 5 5 9 6.4 14C8.4-9.4 6.4-1.4 0 0Z";
const FLAME_CORE = "M0-1.2C-3.4-2-4-6.6-2.2-10.6-1.2-12.8-.3-15 0-18c.9 2.8 2.7 5 3.4 7.6C4.4-5.6 3.4-1.8 0-1.2Z";

/** Wisps of smoke, rising from the wick. A few shapes so they don't match. */
const SMOKE = [
  "M0 0c-5-7 4-13-1-21s-7-14 0-22 2-15-4-21",
  "M0 0c4-6-5-12 0-20s6-15-1-23-1-13 4-20",
  "M0 0c-3-8 6-12 1-21s-6-13 1-21 3-16-2-22",
];

const OUTLINE = { stroke: "#7a5a44", strokeOpacity: 0.3, strokeWidth: 1.1 } as const;

/** Static apart from its animations, so it skips re-rendering when the scene's stage changes. */
export const CakeArt = memo(function CakeArt() {
  const id = useId();
  const ref = (name: string) => `url(#${id}-${name})`;

  return (
    <div className="relative">
      {/* ---------- The cake ---------- */}
      <svg viewBox={VIEW_BOX} className="block w-full" aria-hidden>
        <defs>
          <radialGradient id={`${id}-ground`}>
            <stop offset="0" stopColor={INK} stopOpacity="0.32" />
            <stop offset="1" stopColor={INK} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-board`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#951a1a" />
            <stop offset="0.6" stopColor={MAROON} />
            <stop offset="1" stopColor={MAROON_DEEP} />
          </linearGradient>
          <linearGradient id={`${id}-side`} x1="0" x2="1">
            <stop offset="0" stopColor="#dccab2" />
            <stop offset="0.2" stopColor="#f2e8d9" />
            <stop offset="0.45" stopColor="#faf4ea" />
            <stop offset="0.8" stopColor="#ebdecb" />
            <stop offset="1" stopColor="#d5c2a8" />
          </linearGradient>
          <radialGradient id={`${id}-top`} cx="0.42" cy="0.38" r="0.7">
            <stop offset="0" stopColor={WARM_WHITE} />
            <stop offset="1" stopColor="#f2e8d9" />
          </radialGradient>
          <linearGradient id={`${id}-drip`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={WARM_WHITE} />
            <stop offset="1" stopColor="#f6eee2" />
          </linearGradient>
          <linearGradient id={`${id}-wax`} x1="0" x2="1">
            <stop offset="0" stopColor={INK} stopOpacity="0.22" />
            <stop offset="0.32" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor={INK} stopOpacity="0.26" />
          </linearGradient>
          <radialGradient id={`${id}-flame`} cx="0.5" cy="0.78" r="0.75">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset="0.45" stopColor="#ffcd55" />
            <stop offset="1" stopColor="#ef8a26" />
          </radialGradient>
          {LOOKS.map(([wax, stripe], i) => (
            <pattern key={i} id={`${id}-look${i}`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
              <rect width="12" height="12" fill={wax} />
              <rect width="12" height="4.4" fill={stripe} />
            </pattern>
          ))}
        </defs>

        {/* Shadow on the paper, then the cake board */}
        <ellipse cx={CX} cy={372} rx={204} ry={36} fill={ref("ground")} />
        <ellipse cx={CX} cy={353} rx={184} ry={46} fill="#3d0000" />
        <ellipse cx={CX} cy={344} rx={184} ry={46} fill={ref("board")} />
        <ellipse cx={CX} cy={344} rx={176} ry={42} fill="none" stroke={GOLD} strokeOpacity="0.75" strokeWidth="1.4" />
        <ellipse cx={CX + 5} cy={BASE + 7} rx={RX + 6} ry={RY + 5} fill="#2a0000" fillOpacity="0.45" />

        {/* Side, drips (with their shadow), top */}
        <path d={SIDE_PATH} fill={ref("side")} {...OUTLINE} />
        <path d={DRIP_PATH} fill="#d6c2a6" fillOpacity="0.75" transform="translate(1.5 3.5)" />
        <path d={DRIP_PATH} fill={ref("drip")} {...OUTLINE} />
        <ellipse cx={CX} cy={TOP} rx={RX} ry={RY} fill={ref("top")} {...OUTLINE} />

        {SPRINKLES.map((s, i) =>
          s.dot ? (
            <circle key={i} cx={s.x} cy={s.y} r="1.7" fill={s.color} />
          ) : (
            <rect key={i} x="-3.2" y="-1.1" width="6.4" height="2.2" rx="1.1" fill={s.color} transform={`translate(${s.x} ${s.y}) rotate(${s.rot})`} />
          ),
        )}

        {CANDLES.map((c, i) => {
          const top = c.base - c.h;
          return (
            <g key={i} data-anim="candle">
              <rect x={c.x - 6.5} y={top} width="13" height={c.h} rx="2" fill={ref(`look${c.look}`)} />
              <rect x={c.x - 6.5} y={top} width="13" height={c.h} rx="2" fill={ref("wax")} stroke={INK} strokeOpacity="0.3" strokeWidth="0.9" />
              <ellipse cx={c.x} cy={top} rx="6.5" ry="2.2" fill="#fff" fillOpacity="0.35" />
              <path d={`M${c.x} ${top}c.5-2.4-.7-4.2.3-6.6`} fill="none" stroke="#3a2a22" strokeWidth="1.7" strokeLinecap="round" />
              {/* Frosting squeezed up round the foot of the candle */}
              <ellipse cx={c.x} cy={c.base} rx="9.5" ry="3.8" fill={WARM_WHITE} {...OUTLINE} />
            </g>
          );
        })}
      </svg>

      {/* ---------- The light: flames, glow, embers, smoke ---------- */}
      <div className={styles.light} aria-hidden>
        <div data-anim="halo" className={styles.halo} />

        {CANDLES.map((c, i) => (
          <div key={i} className={styles.wick} style={at(c.x, c.base - c.h)}>
            <div data-anim="glow" className={styles.glow}>
              <div className={styles.glowFlicker} style={beat(i, 0, 1.4)} />
            </div>
            {/* Two loops of different lengths, so the flicker never quite repeats */}
            <div data-anim="flame" className={styles.flame}>
              <div className={styles.flicker} style={beat(i, 1, 0.9)}>
                <div className={styles.lean} style={beat(i, 2, 1.7)}>
                  <svg viewBox="-9 -32 18 33" className="block h-full w-full overflow-visible">
                    <path d={FLAME} fill={ref("flame")} />
                    <path d={FLAME_CORE} fill="#fffaf0" fillOpacity="0.9" />
                  </svg>
                </div>
              </div>
            </div>
            <div data-anim="ember" className={`${styles.ember} invisible`} />
            <div data-anim="smoke" className={`${styles.smoke} invisible`}>
              <svg viewBox="-10 -68 20 70" className="block h-full w-full overflow-visible">
                <path
                  data-part="smokePath"
                  d={SMOKE[i % SMOKE.length]}
                  pathLength={1}
                  fill="none"
                  stroke="#9a8f87"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
