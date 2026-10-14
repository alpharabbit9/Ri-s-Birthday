import { getImageProps } from "next/image";

/**
 * The five photographs on the film-strip reel (Phase 14, after Reference Image
 * 14). They are the user's own `us4`–`us8`, re-encoded as WebP from the
 * originals in "Our Image/" (which stay outside public/); `us4` was stored
 * sideways and is EXIF-rotated upright. Each film frame is a fixed 4:3 window
 * that covers (centre focus), so the mixed portrait/landscape sources are only
 * scaled and framed — never stretched.
 */
export type ReelPhoto = {
  readonly src: string;
  readonly alt: string;
};

export const reelPhotos: readonly ReelPhoto[] = [
  { src: "/assets/page-14-reel/images/us4.webp", alt: "A photo of us" },
  { src: "/assets/page-14-reel/images/us5.webp", alt: "A photo of us" },
  { src: "/assets/page-14-reel/images/us6.webp", alt: "A photo of us" },
  { src: "/assets/page-14-reel/images/us7.webp", alt: "A photo of us" },
  { src: "/assets/page-14-reel/images/us8.webp", alt: "A photo of us" },
] as const;

/** Each frame is served small (a strip cell); this covers both layouts. */
const REEL_SIZES = "(max-width: 760px) 66vw, 20vw";

/**
 * Fetch and decode the reel photos early (while earlier scenes are still
 * showing), so the strip is ready the moment it is scrolled into view. Same
 * off-screen approach as the gift, diary and memory pages.
 */
export function preloadReelPhotos() {
  for (const photo of reelPhotos) {
    const { props } = getImageProps({ ...photo, width: 1200, height: 900, sizes: REEL_SIZES });
    const img = new Image();
    img.fetchPriority = "low";
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
    img.decode().catch(() => {});
  }
}

export { REEL_SIZES };
