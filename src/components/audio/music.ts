"use client";

import { createContext, useContext } from "react";

/**
 * Phase 16 — persistent background music.
 *
 * The scrapbook plays user-supplied local tracks (no copyrighted audio is
 * bundled or downloaded — see public/assets/global/music/README.txt):
 *
 *   "song"  — the full track that fades in when the Gift 3 surprise page
 *             opens (inside the gift-tap gesture on the "Choose your gift"
 *             menu), and carries on through every later scene — the diary,
 *             memories, reel and final letter.
 *   "tone"  — a gentle, melodic version meant to play earlier (from the Page 2
 *             unlock). The machinery is kept here and in MusicProvider, but it
 *             is not triggered yet: add tone.mp3 and wire startTone() back into
 *             the envelope unlock in SceneFlow to use it. Until then Pages 1–4
 *             are silent.
 *
 * "none" is the state before the song begins, when nothing plays and the
 * control is hidden.
 */
export type MusicTrack = "none" | "tone" | "song";

/** Local paths for the two tracks. Swap the files, keep the names (or edit here). */
export const MUSIC_SOURCES: Record<Exclude<MusicTrack, "none">, string> = {
  tone: "/assets/global/music/tone.mp3",
  song: "/assets/global/music/song.mp3",
};

/** Resting volume (0–1) when a track is playing at full. */
export const DEFAULT_VOLUME = 0.7;

/** Fade/crossfade lengths in ms. Collapsed to 0 under reduced motion. */
export const FADE = {
  /** Tone easing in after unlock. */
  toneIn: 1600,
  /** Tone easing out as the song takes over. */
  crossOut: 700,
  /** Song easing in behind the fading tone. */
  crossIn: 900,
} as const;

/**
 * One-shot sound effects, played over the background music by `playEffect`.
 *
 *   "pageTurn"  — a short paper turn, played on every scene change.
 *   "applause"  — a small group's cheer, played when the candles are blown out.
 *
 * They are played through the same controller so the mute toggle and volume
 * slider govern them too (one "sound" switch for the whole experience).
 */
export type SfxName = "pageTurn" | "applause";

/** Local paths for each effect. */
export const SFX_SOURCES: Record<SfxName, string> = {
  pageTurn: "/assets/global/sounds/page-turn.mp3",
  applause: "/assets/page-03-cake/sounds/applause.mp3",
};

/** Per-effect base volume (0–1), scaled by the master volume at play time. */
export const SFX_VOLUME: Record<SfxName, number> = {
  pageTurn: 0.6,
  applause: 0.85,
};

export type MusicContextValue = {
  /** Which track is loaded, or "none" before the scrapbook is unlocked. */
  track: MusicTrack;
  isPlaying: boolean;
  isMuted: boolean;
  /** Resting volume 0–1 (independent of mute). */
  volume: number;
  /**
   * True when the browser blocked playback or the file could not load, so the
   * control should invite a manual tap to start.
   */
  needsGesture: boolean;
  /**
   * Begin the gentle tone. Called from the unlock gesture on Page 2. No-op once
   * a track is already armed, so navigating back and forth never restarts it.
   */
  startTone: () => void;
  /** Crossfade to the full song. Called when Gift 3 (the surprise) opens. No-op if already on it. */
  playSong: () => void;
  /**
   * Play a one-shot sound effect over the music. Honors the mute toggle and the
   * master volume; fails silently if the file is missing or playback is blocked.
   */
  playEffect: (name: SfxName) => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (value: number) => void;
};

export const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within <MusicProvider>");
  return ctx;
}
