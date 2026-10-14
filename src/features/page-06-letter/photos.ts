import { getImageProps } from "next/image";

/**
 * The two photographs on the right of Page 6 (Gift 1 — Letter). They are the
 * user's own photos, re-encoded as WebP from "Her Image/gift_1_1.jpeg" and
 * "Her Image/gift_1_2.jpeg"; the originals stay outside public/. Each frame
 * keeps the photo's own aspect ratio (width/height below) so nothing is
 * cropped. `object` nudges the subject within the frame.
 */
export type LetterPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  /** object-position for the <Image>, to keep the face/subject in view. */
  object: string;
};

export const letterPhotos: readonly LetterPhoto[] = [
  {
    src: "/assets/page-06-letter/images/gift-1-photo-1.webp",
    width: 1040,
    height: 1258,
    alt: "A photo of Madam",
    // ~34% of the viewport side by side, most of the width when stacked on a phone.
    sizes: "(orientation: portrait) 66vw, 34vw",
    object: "50% 32%",
  },
  {
    src: "/assets/page-06-letter/images/gift-1-photo-2.webp",
    width: 1040,
    height: 1364,
    alt: "Another photo of Madam",
    sizes: "(orientation: portrait) 66vw, 34vw",
    object: "52% 38%",
  },
] as const;

/**
 * Fetch and decode both photos early (while earlier pages are showing), so they
 * paint straight away when the letter page comes in. Same approach as Page 2's
 * photo: off-screen images with the same srcset/sizes pick the same candidate
 * the <Image> will, without a console preload warning.
 */
export function preloadLetterPhotos() {
  for (const photo of letterPhotos) {
    const { props } = getImageProps(photo);
    const img = new Image();
    img.fetchPriority = "low";
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
    img.decode().catch(() => {});
  }
}
