import { getImageProps } from "next/image";

/**
 * The single designated photograph for Phase 15 (Final Memory Letter): the
 * user's own `us9`, re-encoded as WebP from the original in "Our Image/" (which
 * stays outside public/). PHASES.md names only this one asset
 * (`public/assets/page-15-final-letter/images/us9`), so it is the only photo
 * placed here — no extra photos are invented. It is portrait (3:4); the frame
 * keeps that aspect so the photo shows whole and undistorted.
 */
export const finalPhoto = {
  src: "/assets/page-15-final-letter/images/us9.webp",
  alt: "A photo of us, hand in hand",
  width: 900,
  height: 1200,
  sizes: "(max-width: 820px) 60vw, 300px",
} as const;

/**
 * Fetch and decode the letter photo early (while earlier scenes are still on
 * screen) so it is ready the moment the final letter is scrolled into view —
 * same off-screen approach as the diary, memory and reel pages.
 */
export function preloadFinalLetterPhoto() {
  const { props } = getImageProps({
    src: finalPhoto.src,
    alt: finalPhoto.alt,
    width: finalPhoto.width,
    height: finalPhoto.height,
    sizes: finalPhoto.sizes,
  });
  const img = new Image();
  img.fetchPriority = "low";
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  img.decode().catch(() => {});
}
