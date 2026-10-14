import { useId } from "react";

/*
 * Original hand-drawn style SVG doodles for Page 1. Colours are the scrapbook
 * tokens (maroon #800000, deep maroon #5c0000, warm white #fffdf8).
 */

type DoodleProps = { className?: string };

const MAROON = "#800000";
const MAROON_DEEP = "#5c0000";
const WARM_WHITE = "#fffdf8";

const HEART =
  "M20 34C8 26 1 19.5 1 11.5 1 5.5 5.5 1 11 1c4 0 7.2 2.4 9 6 1.8-3.6 5-6 9-6 5.5 0 10 4.5 10 10.5 0 8-7 14.5-19 22.5Z";

/** Maroon gingham heart sticker with a white die-cut border. Used as the envelope seal. */
export function GinghamHeart({ className }: DoodleProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 44 40" className={className} aria-hidden>
      <defs>
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <rect width="6" height="6" fill="#fbefec" />
          <rect width="3" height="6" fill={MAROON} fillOpacity="0.55" />
          <rect width="6" height="3" fill={MAROON} fillOpacity="0.55" />
        </pattern>
      </defs>
      <path
        d={HEART}
        transform="translate(2 2)"
        fill={`url(#${id})`}
        stroke={WARM_WHITE}
        strokeWidth="3"
        strokeLinejoin="round"
        paintOrder="stroke"
      />
    </svg>
  );
}

/** Slightly wobbly filled heart, like one drawn with a marker. */
export function HandHeart({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 23" className={className} aria-hidden>
      <path
        d="M12 21.2C5.4 16.6 2.1 12.6 2.5 7.9 2.8 4.4 5.7 2.3 8.7 2.6c1.9.2 2.9 1.5 3.5 3 .8-1.6 2.2-3 4.3-3.1 3.2-.1 5.6 2.5 5 6.1-.6 3.9-4.4 7.9-9.5 12.6Z"
        fill={MAROON}
      />
    </svg>
  );
}

/** Outline heart drawn twice, slightly off, like a quick pen sketch. */
export function HeartDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 44" className={className} fill="none" aria-hidden>
      <path
        d="M24 40C11 31 4 24 4.5 15 5 8.5 10 4.5 15.5 5c4 .3 6.6 2.9 8.3 6.4C25.5 7.7 28.6 5 33 5c6 0 10.5 5 9.8 11.4C42 24.4 35.6 31.6 24 40Z"
        stroke={MAROON}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.2 38.6C12.4 30.8 6.2 24.6 6.6 16.4c.3-5.4 4.4-9 9-8.8"
        stroke={MAROON}
        strokeOpacity="0.45"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Small maroon ribbon bow. */
export function RibbonBow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 46" className={className} aria-hidden>
      <path d="M28 21 21 42l4.6-3.2L28 44l4-22Z" fill={MAROON_DEEP} />
      <path d="M32 21l7 21-4.6-3.2L32 44l-4-22Z" fill={MAROON} />
      <path d="M30 19C22 6.5 6 4 5.5 14.5 5 24.5 21.5 25 30 19Z" fill={MAROON} />
      <path d="M30 19C38 6.5 54 4 54.5 14.5 55 24.5 38.5 25 30 19Z" fill={MAROON} />
      <path
        d="M27 18c-5-5.5-12-8.5-16-6M33 18c5-5.5 12-8.5 16-6"
        stroke={MAROON_DEEP}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="30" cy="19.5" rx="4.4" ry="5" fill={MAROON_DEEP} />
    </svg>
  );
}

/** Hand-drawn "rub out" arrow for the padlock's delete key. Takes the text colour. */
export function UndoDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 26" className={className} fill="none" aria-hidden>
      <path
        d="M9.5 6.2C15.5 5 24.6 5.2 27 11.4c2.2 5.8-3.4 10.2-11.6 9.6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M13.4 1.8 8.6 6.4l4.9 4.4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn curved arrow pointing up. Takes the text colour. */
export function ArrowDoodle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 48" className={className} fill="none" aria-hidden>
      <path d="M12 45C7 33 9.5 19 20.5 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M12.5 8.6 20.8 6.8l1 8.2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
