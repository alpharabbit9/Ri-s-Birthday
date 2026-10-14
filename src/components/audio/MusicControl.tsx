"use client";

import { motion } from "motion/react";

import { ease } from "@/lib/motion";

import styles from "./music.module.css";
import { useMusic } from "./music";

/** ▶ / ⏸ sit in the middle of the spinning disc. */
function TransportIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden className={styles.transportGlyph}>
      <rect x="7" y="5.5" width="3.4" height="13" rx="1" />
      <rect x="13.6" y="5.5" width="3.4" height="13" rx="1" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden className={styles.transportGlyph}>
      <path d="M8 5.5 18.5 12 8 18.5Z" />
    </svg>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={styles.speakerGlyph}>
      <path d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4Z" />
      {muted ? (
        <path d="M15.5 9.5l5 5m0-5l-5 5" className={styles.speakerStroke} />
      ) : (
        <>
          <path d="M15.4 9.2a4 4 0 0 1 0 5.6" className={styles.speakerStroke} />
          <path d="M17.8 7a7 7 0 0 1 0 10" className={styles.speakerStroke} />
        </>
      )}
    </svg>
  );
}

/**
 * Small handmade music control pinned in the corner: a spinning record
 * (play/pause), a mute toggle and a volume slider. Appears only once a track is
 * armed (after unlock). Fades/slides in — Motion honours reduced motion via the
 * app-wide MotionConfig, and the disc's idle spin is a CSS loop.
 */
export function MusicControl() {
  const { isPlaying, isMuted, volume, needsGesture, togglePlay, toggleMute, setVolume } = useMusic();

  return (
    <motion.div
      className={styles.dock}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: ease.paper, delay: 0.4 }}
    >
      <div className={styles.pill} role="group" aria-label="Background music">
        <button
          type="button"
          onClick={togglePlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className={`${styles.disc} ${isPlaying ? styles.spinning : ""} ${needsGesture ? styles.attention : ""}`}
        >
          <span aria-hidden className={styles.discFace} />
          <span className={styles.transport}>
            <TransportIcon playing={isPlaying} />
          </span>
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-pressed={isMuted}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          className={styles.iconBtn}
        >
          <SpeakerIcon muted={isMuted} />
        </button>

        <label className={styles.volume}>
          <span className="sr-only">Music volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Music volume"
            className={styles.slider}
          />
        </label>
      </div>
    </motion.div>
  );
}
