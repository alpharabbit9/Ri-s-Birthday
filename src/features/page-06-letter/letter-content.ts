/**
 * Letter text for Page 6 (Gift 1 — Letter).
 *
 * The body below is the user's own words. The salutation uses the term of
 * address used throughout the site. The `closing` and `signature` fields are
 * still clearly-marked placeholders awaiting the user's sign-off and name
 * (INSTRUCTIONS.md Rule 2: never invent personal relationship content), which is
 * why `placeholder` stays true — it keeps the draft styling until those are set.
 */
export const letter = {
  placeholder: true,
  salutation: "Hey, Ri! ❤️,",
  /** Each entry is one paragraph of the letter. */
  body: [
    "We already have so many little memories to look back on, but you know what? I think the best part is that we still have so much ahead of us.",
    "More pictures, more late-night conversations, more random outings, more laughing at absolutely nothing, and probably many more moments where you tell me “CHUP.” 😂",
    "I don't know exactly what the future will look like, but there are so many things I want to experience with you. And when we look back years from now, I hope we have a thousand little stories that make us smile the same way they do today.",
    "Here's to us, and all the memories waiting to happen.",
    ,
  ],
  closing: " The guy u hate most,",
  
} as const;
