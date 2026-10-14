import { getImageProps } from "next/image";

/**
 * Her photo on the left page (from "Her Image/page2.jpeg", re-encoded as WebP;
 * the original stays outside public/). One definition feeds both the <Image>
 * and the early preload, so the browser fetches the exact same candidate.
 */
export const photo = {
  src: "/assets/page-02-birthday/images/madam-photo.webp",
  alt: "Photo of Madam",
  // The frame is ~30% of the viewport width side by side, ~60% when stacked.
  sizes: "(orientation: portrait) 60vw, 30vw",
} as const;

/**
 * Fetch and decode the photo early (e.g. while the envelope is showing), so it
 * paints straight away when the spread comes in. An off-screen image with the
 * same srcset and sizes picks the same candidate the <Image> will; unlike a
 * <link rel=preload>, it doesn't warn in the console when the visitor lingers
 * on the envelope.
 */
export function preloadPhoto() {
  const { props } = getImageProps({ ...photo, fill: true });
  const img = new Image();
  img.fetchPriority = "low";
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
  img.decode().catch(() => {});
}
