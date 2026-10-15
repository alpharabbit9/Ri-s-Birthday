"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { useMusic } from "@/components/audio/music";
import { EnvelopeScene } from "@/features/page-01-envelope/EnvelopeScene";
import { BirthdaySpread } from "@/features/page-02-birthday/BirthdaySpread";
import { preloadPhoto } from "@/features/page-02-birthday/photo";
import { CakeScene } from "@/features/page-03-cake/CakeScene";
import { GiftChoiceScene } from "@/features/page-04-gift-choice/GiftChoiceScene";
import { preloadGiftSticker } from "@/features/page-04-gift-choice/sticker";
import { GiftMenuScene } from "@/features/page-05-gift-menu/GiftMenuScene";
import { LetterScene } from "@/features/page-06-letter/LetterScene";
import { preloadLetterPhotos } from "@/features/page-06-letter/photos";
import { FlowerScene } from "@/features/page-07-flower/FlowerScene";
import { preloadFlowerPhotos } from "@/features/page-07-flower/photos";
import { preloadFlowerSticker } from "@/features/page-07-flower/sticker";
import { SurpriseScene } from "@/features/page-11-surprise/SurpriseScene";
import { preloadDiaryPhoto } from "@/features/page-12-diary/photo";
import { preloadMemoriesPhotos } from "@/features/page-13-memories/photos";
import { preloadReelPhotos } from "@/features/page-14-reel/photos";
import { preloadFinalLetterPhoto } from "@/features/page-15-final-letter/photo";

import { MemoryScroll } from "./MemoryScroll";

/**
 * The password lock lives inside the envelope scene (it comes out of the seal).
 * "choose" is Page 5 (Choose your gift). "letter" is Page 6 (Gift 1), "flower"
 * is Page 7 (Gift 2), "surprise" is the Phase 11 Gift 3 intro (the big birthday
 * surprise) and "diary" is the Phase 12 birthday diary spread it opens into.
 * "diary" and "memories" share one vertical scroll surface (MemoryScroll): the
 * diary spread scrolls straight down into the Phase 13 memory scrapbook with no
 * page-turn between them, then on into the Phase 14 reel and the Phase 15 final
 * letter. "memories" and "final" are dev shortcuts that start scrolled to those
 * sections.
 */
type Scene = "envelope" | "spread" | "cake" | "accept" | "choose" | "letter" | "flower" | "surprise" | "diary" | "memories" | "final";

/** Scenes that exist so far (the ones the dev shortcut can start on). */
const SCENES: readonly Scene[] = ["envelope", "spread", "cake", "accept", "choose", "letter", "flower", "surprise", "diary", "memories", "final"];

/**
 * Dev only: `?scene=spread` (or `cake`, `accept`) starts on that scene for review.
 * Always null in production, so nobody can skip the envelope and the lock.
 */
function useDevStartScene(): Scene | null {
  return useSyncExternalStore(
    () => () => {},
    () => {
      if (process.env.NODE_ENV !== "development") return null;
      const wanted = new URLSearchParams(window.location.search).get("scene");
      return SCENES.find((s) => s === wanted) ?? null;
    },
    () => null,
  );
}

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6 },
};

/**
 * Owns which scene is showing. Scenes live on one route so nobody can link
 * past the envelope or the lock.
 */
export function SceneFlow() {
  const devStart = useDevStartScene();
  const { playSong, playEffect, startTone } = useMusic();
  const [chosen, setChosen] = useState<Scene | null>(null);
  const scene = chosen ?? devStart ?? "envelope";

  // Change scene with a paper-turn sound. The two scenes that flip a page over
  // (spread, cake) play the sound themselves when their flip starts, so their
  // onTurn uses plain setChosen and isn't routed through here.
  const go = (next: Scene) => {
    playEffect("pageTurn");
    setChosen(next);
  };

  // Fetch her photos (and the gift stickers) while the envelope is still on screen.
  useEffect(() => {
    preloadPhoto();
    preloadGiftSticker();
    preloadLetterPhotos();
    preloadFlowerPhotos();
    preloadFlowerSticker();
    preloadDiaryPhoto();
    preloadMemoriesPhotos();
    preloadReelPhotos();
    preloadFinalLetterPhoto();
  }, []);

  return (
    <>
      <AnimatePresence>
        {scene === "envelope" && (
          <motion.div key="envelope" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <EnvelopeScene
              onUnlock={() => {
                // The gentle tone begins here: tone.mp3 fades in as the lock
                // opens, and carries on until the full song crossfades in on
                // Gift 3. Called inside the unlock gesture so the browser
                // allows playback.
                startTone();
              }}
              onOpened={() => go("spread")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === "spread" && (
          <motion.div key="spread" className="absolute inset-0 z-20" {...fade}>
            <BirthdaySpread onTurn={() => setChosen("cake")} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === "cake" && (
          <motion.div key="cake" className="absolute inset-0 z-20" {...fade}>
            <CakeScene onTurn={() => setChosen("accept")} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === "accept" && (
          <motion.div key="accept" className="absolute inset-0 z-20" {...fade}>
            <GiftChoiceScene
              onAccept={() => {
                go("choose");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === "choose" && (
          <motion.div key="choose" className="absolute inset-0 z-20" {...fade}>
            <GiftMenuScene
              onChoose={(to) => {
                // A bright chime as the chosen gift opens, then the page turn.
                playEffect("giftOpen");
                // The music begins here: song.mp3 fades in as the Gift 3
                // (surprise) page opens, and carries on through every later
                // scene. Called inside the gift-tap gesture so the browser
                // allows playback.
                if (to === "surprise") playSong();
                go(to);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === "letter" && (
          <motion.div key="letter" className="absolute inset-0 z-20" {...fade}>
            <LetterScene onBack={() => go("choose")} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === "flower" && (
          <motion.div key="flower" className="absolute inset-0 z-20" {...fade}>
            <FlowerScene onBack={() => go("choose")} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scene === "surprise" && (
          <motion.div key="surprise" className="absolute inset-0 z-20" {...fade}>
            <SurpriseScene
              onBack={() => go("choose")}
              onAdvance={() => go("diary")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(scene === "diary" || scene === "memories" || scene === "final") && (
          <motion.div key="memory" className="absolute inset-0 z-20" {...fade}>
            <MemoryScroll
              onBack={() => go("choose")}
              startAtMemories={scene === "memories"}
              startAtFinal={scene === "final"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
