import { getImageProps } from "next/image";

/**
 * The hero of Page 7 (Gift 2 — Flower): the kitten holding a bouquet, the same
 * sticker the user chose for Page 4's question (from "Sticker/sticker-2.png").
 * Reference Image 9's centrepiece is this cat with its flowers, so it is reused
 * here as the "Some flowers for you" bouquet. A page-local copy is served so the
 * flower page owns its own asset folder.
 */
export const heroKitten = {
  src: "/assets/page-07-flower/stickers/sticker-2.webp",
  width: 866,
  height: 1100,
  alt: "A kitten holding a bouquet of flowers for you",
  // Big on a phone (about two-thirds of the stage); a large cut-out on desktop.
  sizes: "(orientation: portrait) 58vw, 32vw",
} as const;

/**
 * Fetch and decode the kitten early (while earlier pages are showing), so it is
 * there the moment the flower page presses it on. Same approach as Page 4's
 * sticker: an off-screen image with the same srcset and sizes.
 */
export function preloadFlowerSticker() {
  const { props } = getImageProps({ ...heroKitten });
  const img = new Image();
  img.fetchPriority = "low";
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  img.decode().catch(() => {});
}
