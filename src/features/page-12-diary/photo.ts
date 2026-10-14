import { getImageProps } from "next/image";

/**
 * The photograph on the diary's right page (Phase 12). It is the user's own
 * `us1`, re-encoded as WebP from "Our Image/us1.jpeg" (the original stays
 * outside public/). The Polaroid window keeps the photo's own 3:4 aspect, so
 * it shows whole and undistorted — just scaled down.
 */
export const diaryPhoto = {
  src: "/assets/page-12-diary/images/us1.webp",
  width: 900,
  height: 1200,
  alt: "A photo of us",
  // ~62% of a phone's width in the stacked spread; a page-half on a wide screen.
  sizes: "(orientation: portrait) 62vw, 32vw",
} as const;

/**
 * Fetch and decode the photo early (while the surprise card is still showing),
 * so the Polaroid is ready the moment the diary appears. Same off-screen
 * approach as the gift pages.
 */
export function preloadDiaryPhoto() {
  const { props } = getImageProps(diaryPhoto);
  const img = new Image();
  img.fetchPriority = "low";
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  img.decode().catch(() => {});
}
