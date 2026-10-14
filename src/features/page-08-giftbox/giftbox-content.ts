/**
 * Text for Page 8 (Gift 3 — the notebook).
 *
 * Reference Image 10's open journal carries a short sentiment card on the left
 * page and a longer handwritten letter on the right. The `letter.body` below is
 * the user's own words. The short `note` card and the letter's `sign` are still
 * clearly-marked placeholders awaiting the user's words (INSTRUCTIONS.md Rule 2:
 * never invent relationship content), which is why `placeholder` stays true —
 * it keeps the draft styling on those until they are set.
 *
 * The two photographs are the real, user-provided contents of the notebook; the
 * "Birthday Girl" cut-out is a decorative label (the reference's "Birthday Boy",
 * matched to the recipient).
 */

/** Short sentiment card on the left page (placeholder until supplied). */
export const note = {
  placeholder: true,
  lines: ["[ A little note goes here —", "your words for her. ]"],
} as const;

/** The longer letter on the right page. Paragraphs are separated by blank lines
 * (the .letterBody style renders the newlines via `white-space: pre-line`). */
export const letter = {
  placeholder: true,
  body: [
    "My Madam, ❤️",
    "You know what? One of my favourite things about us is how we can turn the simplest moments into something worth remembering. Our random conversations, sharing little details about our days, watching movies together, and sending each other things that make us think of one another.",,
  ].join("\n\n"),
  /** Handwritten sign-off under the letter (placeholder until supplied). */
  sign: "[ — boring person ]",
} as const;

/** Decorative cut-out label (not personal content). */
export const cutout = "Birthday Girl" as const;
