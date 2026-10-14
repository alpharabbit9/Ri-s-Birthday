import { getImageProps } from "next/image";

/**
 * The three photographs in the filmstrip on Page 7 (Gift 2 — Flower). They are
 * the user's own photos, re-encoded as WebP from "Her Image/gift_2_1.jpeg",
 * "gift_2_2.jpeg" and "gift_2_3.jpeg"; the originals stay outside public/.
 *
 * The film cells crop to a fixed portrait window (like a real filmstrip frame),
 * so each photo is object-cover; `object` nudges the subject to stay in view.
 */
export type FilmPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  /** object-position for the <Image>, to keep the face/subject framed. */
  object: string;
};

export const filmPhotos: readonly FilmPhoto[] = [
  {
    src: "/assets/page-07-flower/images/gift-2-photo-1.webp",
    width: 900,
    height: 1200,
    // ~38% of a phone's width in the strip; a small cell on a wide screen.
    sizes: "(orientation: portrait) 38vw, 20vw",
    alt: "A photo of Madam",
    object: "58% 38%",
  },
  {
    src: "/assets/page-07-flower/images/gift-2-photo-2.webp",
    width: 903,
    height: 1200,
    sizes: "(orientation: portrait) 38vw, 20vw",
    alt: "Another photo of Madam",
    object: "50% 30%",
  },
  {
    src: "/assets/page-07-flower/images/gift-2-photo-3.webp",
    width: 900,
    height: 1200,
    sizes: "(orientation: portrait) 38vw, 20vw",
    alt: "Another photo of Madam",
    object: "50% 32%",
  },
] as const;

/**
 * Fetch and decode the three photos early (while earlier pages are showing), so
 * they paint straight away when the flower page comes in. Same approach as Page
 * 2's photo and Page 6's prints: off-screen images with the same srcset/sizes
 * pick the same candidate the <Image> will, without a console preload warning.
 */
export function preloadFlowerPhotos() {
  for (const photo of filmPhotos) {
    const { props } = getImageProps(photo);
    const img = new Image();
    img.fetchPriority = "low";
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
    img.decode().catch(() => {});
  }
}
