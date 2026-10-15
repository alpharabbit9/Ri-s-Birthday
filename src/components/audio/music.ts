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
 *   "tone"  — a gentle, melodic version that plays from the Page 1 unlock
 *             (inside the unlock gesture in SceneFlow) until the song
 *             crossfades in on Gift 3 — see public/assets/global/music/tone.mp3.
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
 *   "pageTurn"      — a short paper turn, played on every scene change.
 *   "applause"      — a small group's cheer, played when the candles are blown out.
 *   "envelopeOpen"  — a paper slide, played as the envelope flap opens on Page 1.
 *   "keyClick"      — a soft lock tap, played on each padlock keypress on Page 1.
 *   "unlock"        — a metallic lock clunk, played when the right code lands.
 *   "giftOpen"      — a bright success chime, played when a gift is chosen on Page 5.
 *   "noFail"        — the user's "Faaaah" meme sound, played when the NO sheet
 *                     is fully up on Page 4 (user-supplied file, like song.mp3).
 *
 * They are played through the same controller so the mute toggle and volume
 * slider govern them too (one "sound" switch for the whole experience).
 */
export type SfxName = "pageTurn" | "applause" | "envelopeOpen" | "keyClick" | "unlock" | "giftOpen" | "noFail";

/** Local paths for each effect. */
export const SFX_SOURCES: Record<SfxName, string> = {
  pageTurn: "/assets/global/sounds/page-turn.mp3",
  applause: "/assets/page-03-cake/sounds/applause.mp3",
  envelopeOpen: "/assets/page-01-envelope/sounds/envelope-open.mp3",
  keyClick: "/assets/page-01-envelope/sounds/key-click.mp3",
  unlock: "/assets/page-01-envelope/sounds/unlock.mp3",
  giftOpen: "/assets/page-05-gift-menu/sounds/gift-open.mp3",
  noFail: "/assets/global/sounds/fahhh.mp3",
};

/** Per-effect base volume (0–1), scaled by the master volume at play time. */
export const SFX_VOLUME: Record<SfxName, number> = {
  pageTurn: 0.6,
  applause: 0.85,
  envelopeOpen: 0.7,
  keyClick: 0.5,
  unlock: 0.8,
  giftOpen: 0.7,
  noFail: 0.9,
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
