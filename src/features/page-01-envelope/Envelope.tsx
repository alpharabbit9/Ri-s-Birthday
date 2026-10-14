"use client";

import { motion } from "motion/react";
import { useId, type CSSProperties } from "react";

import { ease } from "@/lib/motion";

import { GinghamHeart, HandHeart, HeartDoodle, RibbonBow } from "./doodles";

// Cream envelope paper (after Reference Image 11), maroon gingham liner.
const FLAP_PAPER = "#faf4e8";
const SIDE_FOLD = "#f1e7d4";
const BOTTOM_FOLD = "#f6eee0";
const EDGE = "rgb(33 26 23 / 0.14)";
const LINER_BASE = "#fbf3ee";
const LINER_INK = "rgb(128 0 0 / 0.26)";

// Flap is 60% of the envelope height: viewBox 300 x 119 matches that ratio.
const FLAP_PATH = "M0 0H300L163 110Q150 119.5 137 110Z";

// Zigzag crack down the middle of the seal; the two halves share it.
const CRACK = "50% 0, 45% 16%, 55% 33%, 44% 51%, 54% 69%, 46% 86%, 51% 100%";
const CRACK_LEFT = `polygon(0 0, ${CRACK}, 0 100%)`;
const CRACK_RIGHT = `polygon(100% 0, ${CRACK}, 100% 100%)`;

/** Gingham tile = 1/20 of envelope width, same as the flap liner's SVG pattern. */
const ginghamLiner: CSSProperties = {
  backgroundColor: LINER_BASE,
  backgroundImage: `linear-gradient(90deg, ${LINER_INK} 50%, transparent 50%), linear-gradient(${LINER_INK} 50%, transparent 50%)`,
  backgroundSize: "calc(var(--env-w) / 20) calc(var(--env-w) / 20)",
};

const grain: CSSProperties = { backgroundImage: "var(--paper-grain)" };

type EnvelopeProps = {
  /** Seconds before "To: Madam" is written onto the envelope. */
  addressDelay: number;
};

/**
 * Layer order (back to front): gingham liner, card, front pocket with the
 * address, flap. Once the flap swings past 90° the timeline drops it behind
 * the card so the card can rise in front of it.
 *
 * Parts carry data-part attributes for envelope-timeline.ts. Sized by the
 * --env-w custom property set on the scene.
 */
export function Envelope({ addressDelay }: EnvelopeProps) {
  const linerId = useId();

  return (
    <div
      data-part="body"
      className="relative"
      style={{
        width: "var(--env-w)",
        height: "calc(var(--env-w) * 0.66)",
        perspective: "calc(var(--env-w) * 2.5)",
      }}
    >
      {/* Inside of the envelope */}
      <div data-part="back" className="absolute inset-0 z-[1] rounded-[3px] shadow-[0_2px_3px_rgb(30_0_0/0.25),0_26px_40px_-14px_rgb(30_0_0/0.6)]"
        style={ginghamLiner} />

      {/* The card */}
      <div
        data-part="card"
        className="absolute top-[7%] left-[6%] z-[2] h-[84%] w-[88%] rounded-[2px] bg-warm-white shadow-paper ring-1 ring-ink/10"
      >
        <div data-part="cardArt" className="absolute inset-0">
          <div className="absolute inset-0 opacity-60" style={grain} />
          <RibbonBow className="absolute -top-[10%] -left-[6%] w-[24%] -rotate-12" />
          <div className="absolute top-1/2 left-1/2 w-[19%] -translate-x-1/2 -translate-y-1/2">
            <HeartDoodle className="w-full rotate-[-4deg]" />
          </div>
        </div>
      </div>

      {/* Front pocket: side folds + bottom fold */}
      <div data-part="pocket" className="pointer-events-none absolute inset-0 z-[3]">
        <svg viewBox="0 0 300 198" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <path d="M0 0 150 112 0 198Z" fill={SIDE_FOLD} stroke={EDGE} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          <path d="M300 0 150 112 300 198Z" fill={SIDE_FOLD} stroke={EDGE} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          <path d="M0 198 147 96.5Q150 94.5 153 96.5L300 198Z" fill={BOTTOM_FOLD} stroke={EDGE} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        <div className="absolute inset-0 rounded-[3px] opacity-50 mix-blend-multiply" style={grain} />

        <motion.p
          className="absolute inset-x-0 top-[63%] -rotate-3 text-center font-hand leading-none font-semibold text-maroon"
          style={{ fontSize: "calc(var(--env-w) * 0.105)" }}
          initial={{ clipPath: "inset(-30% 100% -30% -5%)" }}
          animate={{ clipPath: "inset(-30% -5% -30% -5%)" }}
          transition={{ duration: 1.1, delay: addressDelay, ease: ease.paper }}
        >
          To: Madam <HandHeart className="inline-block h-[0.72em] w-auto align-[-0.06em]" />
        </motion.p>

        <HandHeart className="absolute right-[9%] bottom-[11%] w-[4.2%] rotate-12 opacity-90" />
        <HandHeart className="absolute right-[14.5%] bottom-[7%] w-[2.8%] -rotate-12 opacity-80" />
      </div>

      {/* Flap: front face (outside paper + seal) and back face (liner) */}
      <div data-part="flap" className="absolute inset-x-0 top-0 z-[4] h-[60%] origin-top [transform-style:preserve-3d]">
        <div className="absolute inset-0 backface-hidden">
          <svg
            viewBox="0 0 300 119"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ filter: "drop-shadow(0 3px 3px rgb(33 26 23 / 0.14))" }}
            aria-hidden
          >
            <path d={FLAP_PATH} fill={FLAP_PAPER} stroke={EDGE} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
          <div className="absolute top-[86%] left-1/2 w-[14%] -translate-x-1/2 -translate-y-1/2">
            <div data-part="seal" className="relative drop-shadow-[0_2px_2px_rgb(33_26_23/0.25)]">
              <div data-part="sealWhole">
                <GinghamHeart className="block w-full" />
              </div>
              {/* The two pieces it cracks into once the padlock is back inside */}
              <div data-part="sealL" className="invisible absolute inset-0" style={{ clipPath: CRACK_LEFT }}>
                <GinghamHeart className="block w-full" />
              </div>
              <div data-part="sealR" className="invisible absolute inset-0" style={{ clipPath: CRACK_RIGHT }}>
                <GinghamHeart className="block w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 backface-hidden [transform:rotateX(180deg)]">
          <svg viewBox="0 0 300 119" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <pattern id={linerId} width="15" height="15" patternUnits="userSpaceOnUse">
                <rect width="15" height="15" fill={LINER_BASE} />
                <rect width="7.5" height="15" fill={LINER_INK} />
                <rect width="15" height="7.5" fill={LINER_INK} />
              </pattern>
            </defs>
            <path d={FLAP_PATH} fill={`url(#${linerId})`} stroke={EDGE} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
