import { getImageProps } from "next/image";

/**
 * The user's sticker for the question (from "Sticker/sticker-2.png"): a kitten
 * with a bouquet and a present. The served copy drops a faint alpha haze
 * around the cut-out and makes the subject fully opaque, so the die-cut edge
 * follows the kitten cleanly. The picture itself is unchanged.
 */
export const stickerTwo = {
  src: "/assets/page-04-gift-choice/stickers/sticker-2.webp",
  width: 866,
  height: 1100,
  alt: "A kitten holding a bouquet of flowers and a present",
  // Most of a phone's width; about a quarter of the screen side by side.
  sizes: "(orientation: portrait) 78vw, 30vw",
} as const;

/**
 * The user's sticker for the NO answer (from "Sticker/sticker-1.png").
 * The original has a grey-and-white checkerboard painted into its pixels
 * rather than real transparency, so the served copy has that background cut
 * out (alpha) so it can sit on maroon. The drawing itself is unchanged.
 */
export const stickerOne = {
  src: "/assets/page-04-gift-choice/stickers/sticker-1.webp",
  width: 921,
  height: 1000,
  alt: "Sticker of an unimpressed face",
  // Up to ~60% of the width on a phone, ~30% side by side.
  sizes: "(orientation: portrait) 64vw, 32vw",
} as const;

/**
 * Fetch and decode the question's sticker early (while the earlier pages are
 * showing), so it's there the moment Page 4 presses it on. Same approach as
 * the photo on Page 2: an off-screen image with the same srcset and sizes.
 */
export function preloadGiftSticker() {
  const { props } = getImageProps({ ...stickerTwo });
  const img = new Image();
  img.fetchPriority = "low";
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  img.decode().catch(() => {});
}
