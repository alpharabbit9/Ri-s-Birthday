import Image from "next/image";
import type { CSSProperties } from "react";

import { CutoutLetter, type LetterSpec } from "./CutoutLetter";
import { FeltStar, Tape } from "./decorations";
import { photo } from "./photo";
import styles from "./spread.module.css";

const MY: LetterSpec[] = [
  { char: "M", paper: "ink", face: "display", size: 1.08 },
  { char: "Y", paper: "white", face: "serif" },
];

const MADAM: LetterSpec[] = [
  { char: "M", paper: "news", face: "serif", size: 1.05 },
  { char: "A", paper: "maroon", face: "display" },
  { char: "D", paper: "white", face: "display", size: 1.1 },
  { char: "A", paper: "ink", face: "italic" },
  { char: "M", paper: "beige", face: "display", size: 0.98 },
];

/*
 * Everything is placed in frame widths (--f) from the frame's top-left corner,
 * so the stars, tape and lettering stay pinned to the photo at any page shape.
 * "MY" sits over the top edge; "MADAM" tumbles down across the top-right corner.
 */
const MY_AT = [
  [0.4, -0.135],
  [0.52, -0.105],
];
const MADAM_AT = [
  [0.62, -0.02],
  [0.725, 0.035],
  [0.83, 0.09],
  [0.935, 0.15],
  [1.03, 0.21],
];

const at = (x: number, y: number): CSSProperties => ({
  left: `calc(var(--f) * ${x})`,
  top: `calc(var(--f) * ${y})`,
});

/** Left page: her photo in a stamp frame, felt stars, tape and "MY MADAM". */
export function PhotoPage() {
  return (
    <div data-anim="page" className={`${styles.page} ${styles.stripes} ${styles.spineLeft}`}>
      <div
        className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ "--f": "min(68cqw, 60cqh)", width: "var(--f)" } as CSSProperties}
      >
        <div data-anim="frame" className={styles.stampShadow} style={{ rotate: "-1.5deg" }}>
          <div className={styles.stamp}>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
              <div data-anim="photo" className="absolute inset-0">
                <Image src={photo.src} alt={photo.alt} sizes={photo.sizes} fill loading="eager" className="object-cover object-[50%_30%]" />
              </div>
            </div>
          </div>
        </div>

        <Tape anim="tape" className="absolute" style={{ ...at(-0.12, 1.13), width: "calc(var(--f) * 0.34)", height: "calc(var(--f) * 0.08)", rotate: "38deg" }} />
        <Tape anim="tape" className="absolute" style={{ ...at(0.8, 1.12), width: "calc(var(--f) * 0.32)", height: "calc(var(--f) * 0.08)", rotate: "-34deg" }} />

        {/* Two felt stars stitched on at the top-left corner */}
        <span data-anim="star" className="absolute block" style={{ ...at(-0.04, -0.21), width: "calc(var(--f) * 0.37)", rotate: "-12deg" }}>
          <FeltStar className="block w-full drop-shadow-[0_2px_2px_rgb(33_26_23/0.3)]" />
        </span>
        <span data-anim="star" className="absolute block" style={{ ...at(-0.17, -0.02), width: "calc(var(--f) * 0.26)", rotate: "15deg" }}>
          <FeltStar className="block w-full drop-shadow-[0_2px_2px_rgb(33_26_23/0.3)]" />
        </span>

        {/* MY MADAM, cut out letter by letter */}
        <p className="sr-only">My Madam</p>
        <div aria-hidden style={{ fontSize: "calc(var(--f) * 0.12)" }}>
          {[...MY, ...MADAM].map((letter, i) => {
            const [x, y] = i < MY.length ? MY_AT[i] : MADAM_AT[i - MY.length];
            return <CutoutLetter key={i} {...letter} seed={i + 20} anim="my" className="absolute" style={at(x, y)} />;
          })}
        </div>
      </div>

      {/* Shadow of the page turning over this one */}
      <div data-part="turnShade" className="pointer-events-none absolute inset-0 z-20 bg-ink opacity-0" />
    </div>
  );
}
