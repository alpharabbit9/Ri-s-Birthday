import { Abril_Fatface, Caveat, Lora } from "next/font/google";

// next/font downloads these at build time and self-hosts them, so the site
// makes no runtime requests to Google. All three are SIL Open Font License.
// See docs/ASSET_SOURCES.md.

/** Body / letter text. */
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

/** Handwritten scrapbook labels. */
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

/** Bold cut-out display lettering. */
export const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
  display: "swap",
});

export const fontVariables = [lora.variable, caveat.variable, abril.variable].join(" ");
