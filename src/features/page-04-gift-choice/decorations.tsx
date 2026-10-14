import { memo, useId, type CSSProperties } from "react";

import { handTilt } from "@/lib/motion";

/*
 * Original SVG decorations for Page 4, after the props in Reference Image 4:
 * mirror balls, a star ribbon and cloud-shaped buttons. The reference's blue
 * is maroon; paper and white stay neutral.
 */

type DecoProps = { className?: string; style?: CSSProperties };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const WARM_WHITE = "#fffdf8";
const GOLD = "#c9a227";
const INK = "#211a17";

/** Chunky five-point star in a 100 x 100 box. */
const STAR =
  "M50 4 64.1 32.6 95.7 37.2 72.8 59.4 78.2 90.8 50 76 21.8 90.8 27.2 59.4 4.3 37.2 35.9 32.6Z";

/* ---------- Mirror ball ---------- */

const R = 50;
const ROWS = 13;
const COLS = 14;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Light from the upper left, a little in front (x right, y down, z towards you). */
const LIGHT = (() => {
  const v = [-0.5, -0.62, 0.6];
  const len = Math.hypot(...v);
  return v.map((c) => c / len);
})();

/** Dark to bright maroon mirror tones. */
const TONES = ["#2a0000", "#4a0000", MAROON, "#a33a3a", "#cf7d72", "#efc6bd", "#fff4ef"];

/**
 * Mirror tiles on the front of a sphere, seen straight on. Each tile is lit by
 * how much it faces the light, give or take a little, and a few near the
 * bright side catch the light completely.
 */
const TILES = (() => {
  const p = (lat: number, lon: number) =>
    `${(R * Math.cos(rad(lat)) * Math.sin(rad(lon))).toFixed(2)},${(-R * Math.sin(rad(lat))).toFixed(2)}`;
  const tiles: { points: string; fill: string }[] = [];

  for (let i = 0; i < ROWS; i++) {
    const lat0 = -90 + (i * 180) / ROWS;
    const lat1 = lat0 + 180 / ROWS;
    for (let j = 0; j < COLS; j++) {
      const lon0 = -90 + (j * 180) / COLS;
      const lon1 = lon0 + 180 / COLS;
      const lat = rad((lat0 + lat1) / 2);
      const lon = rad((lon0 + lon1) / 2);
      const n = [Math.cos(lat) * Math.sin(lon), -Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
      const lit = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);
      const k = i * COLS + j;
      const flash = lit > 0.55 && handTilt(k + 7, 1) > 0.72;
      const level = flash ? TONES.length - 1 : lit * (TONES.length - 2.2) + 0.4 + handTilt(k, 1.1);
      tiles.push({
        points: [p(lat0, lon0), p(lat0, lon1), p(lat1, lon1), p(lat1, lon0)].join(" "),
        fill: TONES[Math.min(TONES.length - 1, Math.max(0, Math.round(level)))],
      });
    }
  }
  return tiles;
})();

/**
 * A maroon mirror ball with a gold cap. Memoised: it's a couple of hundred
 * static tiles. The string it hangs from is drawn by the caller.
 */
export const MirrorBall = memo(function MirrorBall({ className, style }: DecoProps) {
  const id = useId();
  return (
    <svg viewBox="-52 -60 104 112" className={className} style={style} aria-hidden>
      <defs>
        <radialGradient id={`${id}rim`} cx="0.42" cy="0.4" r="0.62">
          <stop offset="0.55" stopColor="#1a0000" stopOpacity="0" />
          <stop offset="1" stopColor="#1a0000" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id={`${id}shine`} cx="0.34" cy="0.3" r="0.3">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r={R} fill="#3d0000" />
      <g stroke="#1f0000" strokeOpacity="0.55" strokeWidth="0.55" strokeLinejoin="round">
        {TILES.map((t, i) => (
          <polygon key={i} points={t.points} fill={t.fill} />
        ))}
      </g>
      <circle r={R} fill={`url(#${id}rim)`} />
      <circle r={R} fill={`url(#${id}shine)`} />
      <circle r={R - 0.4} fill="none" stroke="#1f0000" strokeOpacity="0.6" strokeWidth="0.8" />
      {/* Cap and hanging loop */}
      <path d="M-2.5 -56.5a2.5 2.5 0 1 1 5 0" fill="none" stroke={GOLD} strokeWidth="1.4" />
      <rect x="-6" y="-56" width="12" height="7" rx="1.6" fill={GOLD} stroke={MAROON_DEEP} strokeWidth="0.8" />
      <rect x="-4.6" y="-55" width="3" height="5" rx="1" fill="#f0d675" opacity="0.8" />
    </svg>
  );
});

/** A four-point glint, for the light catching a mirror ball. */
export function Glint({ className, style }: DecoProps) {
  return (
    <svg viewBox="-10 -10 20 20" className={className} style={style} aria-hidden>
      <path d="M0-10C.8-2.6 2.6-.8 10 0 2.6.8.8 2.6 0 10-.8 2.6-2.6.8-10 0-2.6-.8-.8-2.6 0-10Z" fill={WARM_WHITE} />
    </svg>
  );
}

/* ---------- Star ribbon ---------- */

const RIBBON_STARS = Array.from({ length: 11 }, (_, i) => 14 + i * 27);

/** Long maroon grosgrain ribbon with white stars, like the one down the reference's left edge. */
export function StarRibbon({ className, style }: DecoProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 26 304" preserveAspectRatio="none" className={className} style={style} aria-hidden>
      <defs>
        <pattern id={id} width="26" height="2.4" patternUnits="userSpaceOnUse">
          <rect width="26" height="2.4" fill={MAROON_DEEP} />
          <rect width="26" height="0.8" fill="#000" fillOpacity="0.16" />
        </pattern>
      </defs>
      <path d="M0 0H26V304L13 296 0 304Z" fill={`url(#${id})`} />
      <path d="M2.4 0V299M23.6 0V299" stroke={WARM_WHITE} strokeOpacity="0.32" strokeWidth="0.7" strokeDasharray="2.4 1.8" />
      {RIBBON_STARS.map((y, i) => (
        <path
          key={y}
          d={STAR}
          transform={`translate(${5.2} ${y - 7.8}) rotate(${handTilt(i + 12, 14)} 7.8 7.8) scale(0.156)`}
          fill={WARM_WHITE}
        />
      ))}
    </svg>
  );
}

/* ---------- Cloud button ---------- */

/** Puffs that make up the cloud. */
const PUFFS = [
  [48, 72, 30],
  [80, 50, 34],
  [120, 44, 34],
  [154, 64, 30],
  [166, 88, 22],
  [132, 90, 26],
  [92, 92, 25],
  [54, 96, 21],
  [30, 88, 18],
] as const;

/**
 * Paper cloud cut-out: one flat sheet, slightly lighter at the top, with a
 * faint cut edge. The puffs are a clip path, so the shading runs across the
 * whole cloud instead of piling up where they overlap.
 */
export function Cloud({ className, style, fill, edge = INK }: DecoProps & { fill: string; edge?: string }) {
  const id = useId();
  return (
    <svg viewBox="8 6 184 112" className={className} style={style} aria-hidden>
      <defs>
        <clipPath id={`${id}puffs`}>
          {PUFFS.map(([cx, cy, r]) => (
            <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </clipPath>
        <linearGradient id={`${id}shade`} x1="0" y1="10" x2="0" y2="118" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={WARM_WHITE} stopOpacity="0.4" />
          <stop offset="0.45" stopColor={WARM_WHITE} stopOpacity="0" />
          <stop offset="1" stopColor={INK} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <g fill={edge} fillOpacity="0.16">
        {PUFFS.map(([cx, cy, r]) => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r={r + 1.4} />
        ))}
      </g>
      <g clipPath={`url(#${id}puffs)`}>
        <rect x="0" y="0" width="200" height="124" fill={fill} />
        <rect x="0" y="0" width="200" height="124" fill={`url(#${id}shade)`} />
      </g>
    </svg>
  );
}
