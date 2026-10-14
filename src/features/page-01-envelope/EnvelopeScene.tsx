"use client";

import { motion } from "motion/react";
import { useRef, useState, type CSSProperties } from "react";

import { gsap, motionMedia, useGSAP } from "@/lib/gsap";
import { ease, spring } from "@/lib/motion";

import { ArrowDoodle } from "./doodles";
import { Envelope } from "./Envelope";
import {
  getParts,
  peekFlap,
  playLockOut,
  playLockOutReduced,
  playUnlock,
  playUnlockReduced,
  startIdle,
} from "./envelope-timeline";
import { PadLock } from "./PadLock";

// Entrance choreography (seconds from page load).
const DROP_DELAY = 0.35;
const ADDRESS_DELAY = 1.1;
const HINT_DELAY = 2.1;
const IDLE_DELAY = 2.2;

/**
 * Envelope width. Capped by viewport height too, so there is room above the
 * envelope for the flap and the rising card on short landscape screens.
 */
const sceneSize = {
  "--env-w": "min(84vw, 520px, calc((100dvh - 160px) * 0.8))",
} as CSSProperties;

/** Padlock width. The lock is about 1.12 times as tall as it is wide. */
const lockSize = {
  "--lock-w": "min(84vw, 370px, calc((100dvh - 64px) / 1.12))",
} as CSSProperties;

/** sealed → (click) padlock out of the seal → (right code) envelope opens. */
type Stage = "sealed" | "locked" | "opening";

const prefersReducedMotion = () => window.matchMedia(motionMedia.reduceMotion).matches;

type EnvelopeSceneProps = {
  /**
   * Called the moment the correct code is entered — inside the user gesture,
   * so background music started here satisfies browser autoplay rules.
   */
  onUnlock?: () => void;
  /** Called once the card fills the screen and the next scene can take over. */
  onOpened: () => void;
};

export function EnvelopeScene({ onUnlock, onOpened }: EnvelopeSceneProps) {
  const scope = useRef<HTMLElement>(null);
  const stageRef = useRef<Stage>("sealed");
  const [stage, setStage] = useState<Stage>("sealed");

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionMedia.motionOk, () => {
        startIdle(getParts(scope.current!).idle, IDLE_DELAY);
      });
    },
    { scope },
  );

  const goTo = (next: Stage) => {
    stageRef.current = next;
    setStage(next);
  };

  const handleLockOut = () => {
    if (stageRef.current !== "sealed") return;
    goTo("locked");

    const parts = getParts(scope.current!);
    contextSafe(() => (prefersReducedMotion() ? playLockOutReduced(parts) : playLockOut(parts)))();
  };

  const handleUnlock = () => {
    if (stageRef.current !== "locked") return;
    goTo("opening");
    onUnlock?.(); // start the music while we still have the unlock gesture



    const parts = getParts(scope.current!);
    contextSafe(() => {
      if (prefersReducedMotion()) playUnlockReduced(parts, onOpened);
      else playUnlock(parts, contextSafe, onOpened);
    })();
  };

  const handlePeek = (lift: boolean) => {
    if (stageRef.current !== "sealed" || prefersReducedMotion()) return;
    const { flap } = getParts(scope.current!);
    contextSafe(() => peekFlap(flap, lift))();
  };

  const sealed = stage === "sealed";

  return (
    <section
      ref={scope}
      aria-label="An envelope for Madam"
      className="flex flex-col items-center gap-[calc(var(--env-w)*0.07)]"
      style={sceneSize}
    >
      {/* Page 1 sits on maroon cardstock so the cream envelope stands out. */}
      <div aria-hidden className="maroon-surface fixed inset-0 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: -60, rotate: -8, scale: 1.04 }}
        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        transition={{ ...spring.paper, delay: DROP_DELAY, opacity: { duration: 0.4, delay: DROP_DELAY } }}
      >
        <div data-part="idle">
          <button
            type="button"
            onClick={handleLockOut}
            onPointerEnter={(e) => e.pointerType === "mouse" && handlePeek(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && handlePeek(false)}
            aria-label="Open the envelope: To: Madam ❤️"
            aria-disabled={!sealed}
            tabIndex={sealed ? 0 : -1}
            className={`block touch-manipulation rounded-[4px] select-none [outline-offset:10px] ${
              sealed
                ? "cursor-pointer transition-transform duration-300 ease-settle hover:-translate-y-1 active:scale-[0.985]"
                : "cursor-default"
            }`}
          >
            <Envelope addressDelay={ADDRESS_DELAY} />
          </button>
        </div>
      </motion.div>

      <div data-part="hint" aria-hidden onClick={handleLockOut} className={sealed ? "cursor-pointer touch-manipulation" : "pointer-events-none"}>
        <motion.div
          className="flex flex-col items-center text-warm-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: HINT_DELAY, duration: 0.6, ease: ease.paper }}
        >
          <ArrowDoodle className="h-[max(28px,calc(var(--env-w)*0.1))] w-auto -rotate-6" />
          <p className="font-hand text-[max(22px,calc(var(--env-w)*0.075))] leading-none font-semibold">
            <span className="pointer-coarse:hidden">click me!</span>
            <span className="hidden pointer-coarse:inline">tap me!</span>
          </p>
        </motion.div>
      </div>

      {/*
        The padlock waits inside the seal until the envelope is clicked. Hidden
        with opacity + inert (not visibility) so it can take focus right away.
        It has its own layer, so popping out of the seal scales it without
        repainting it every frame.
      */}
      <div className="pointer-events-none fixed inset-0 z-30 grid place-items-center">
        <div
          data-part="lock"
          inert={stage !== "locked"}
          className={`opacity-0 will-change-transform ${stage === "locked" ? "pointer-events-auto" : ""}`}
          style={lockSize}
        >
          <PadLock active={stage === "locked"} onUnlock={handleUnlock} />
        </div>
      </div>
    </section>
  );
}
