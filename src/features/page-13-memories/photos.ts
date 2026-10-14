import { getImageProps } from "next/image";

/**
 * The two photographs in the memory scrapbook (Phase 13), both the user's own,
 * re-encoded as WebP from the originals in "Our Image/" (which stay outside
 * public/). The Polaroid windows crop with CSS (3:2, focus kept on the faces),
 * so the photos are only scaled, never distorted.
 *
 *   Top    — `us2`. Stored portrait but EXIF-rotated to landscape, so the served
 *            copy is auto-oriented to a 16:9 frame.
 *   Bottom — `us3` (the user's confirmed pick for the second Polaroid). A 4:3
 *            landscape photo, kept whole.
 */
export const memoriesTopPhoto = {
  src: "/assets/page-13-memories/images/us2.webp",
  width: 1200,
  height: 675,
  alt: "A photo of us",
  // ~78% of a phone's width when the composition stacks; a column on desktop.
  sizes: "(max-width: 820px) 78vw, 38vw",
} as const;

export const memoriesBottomPhoto = {
  src: "/assets/page-13-memories/images/us3.webp",
  width: 1400,
  height: 1050,
  alt: "A photo of us",
  // Same sizing as the top Polaroid: ~78% of a phone's width stacked, a column wide.
  sizes: "(max-width: 820px) 78vw, 38vw",
} as const;

/**
 * Fetch and decode both photos early (while earlier scenes are still showing),
 * so the Polaroids are ready the moment the memories section is scrolled into
 * view. Same off-screen approach as the gift and diary pages.
 */
export function preloadMemoriesPhotos() {
  for (const photo of [memoriesTopPhoto, memoriesBottomPhoto]) {
    const { props } = getImageProps(photo);
    const img = new Image();
    img.fetchPriority = "low";
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
    img.decode().catch(() => {});
  }
}
