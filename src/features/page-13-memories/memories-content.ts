/**
 * Text for Page 13 (Scrolling Memory Scrapbook).
 *
 * Both note areas below are the user's own words, so `placeholder` is false —
 * the scene drops the dashed "fill-in-later" outline once real content is set.
 * Each entry in a note's `lines` array is one paragraph (the note style spaces
 * the paragraphs apart).
 */
export const memoriesContent = {
  placeholder: false,

  /** TOP composition — the note to the RIGHT of the Polaroid + envelope. */
  topNote: {
    lines: [
      "Ri, ❤️",
      "You know what I love the most about us? It's not just the big moments. It's the little things. Our random conversations, sharing stories about our day, watching movies together, your funny reels, and all the silly things that somehow become my favourite memories.",
      "Sometimes we don't even need to do anything special. Just talking to you is enough to make an ordinary day feel a little better. And I hope we never stop having these little moments, no matter how busy life gets.",
      "Because honestly, it's the little things with you that mean the most to me.",
    ],
  },

  /** BOTTOM composition — the note to the LEFT of the Polaroid. */
  bottomNote: {
    lines: [
      "I don't think you realise how much you inspire me. There are days when I doubt myself, overthink everything, or feel like I'm not doing enough. But somehow, having you in my life makes me want to do better and become someone I'm proud of.",
      "I want to keep growing, chasing my dreams, and building a life that makes both of us proud. And I hope I can be that kind of person for you too — someone who supports you, believes in you, and reminds you of how capable you are whenever you forget.",
      "I'm really glad it's you, madam. Always rooting for you. ❤️",
    ],
  },
} as const;
