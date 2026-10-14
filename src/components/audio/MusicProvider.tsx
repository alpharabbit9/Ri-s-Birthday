"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { MusicControl } from "./MusicControl";
import {
  DEFAULT_VOLUME,
  FADE,
  MUSIC_SOURCES,
  MusicContext,
  SFX_SOURCES,
  SFX_VOLUME,
  type MusicContextValue,
  type MusicTrack,
  type SfxName,
} from "./music";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Owns the one persistent <audio> element for the whole site and exposes it
 * through context. Mounted once (in page.tsx), above the scene flow, so it
 * survives every scene change and scroll — music never restarts on navigation.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [track, setTrack] = useState<MusicTrack>("none");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [needsGesture, setNeedsGesture] = useState(false);

  // Mirror state in refs so the stable callbacks below never read stale values.
  const trackRef = useRef<MusicTrack>("none");
  const mutedRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const fadeRaf = useRef<number | null>(null);

  // One reusable <audio> per effect, created on first use.
  const sfxRef = useRef<Partial<Record<SfxName, HTMLAudioElement>>>({});

  const cancelFade = useCallback(() => {
    if (fadeRaf.current !== null) {
      cancelAnimationFrame(fadeRaf.current);
      fadeRaf.current = null;
    }
  }, []);

  /** Ramp audio.volume from its current value to `to` over `ms` (0 = instant). */
  const rampVolume = useCallback(
    (to: number, ms: number, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      cancelFade();

      const duration = prefersReducedMotion() ? 0 : ms;
      const from = audio.volume;
      if (duration <= 0) {
        audio.volume = to;
        onDone?.();
        return;
      }

      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        audio.volume = from + (to - from) * t;
        if (t < 1) {
          fadeRaf.current = requestAnimationFrame(step);
        } else {
          fadeRaf.current = null;
          onDone?.();
        }
      };
      fadeRaf.current = requestAnimationFrame(step);
    },
    [cancelFade],
  );

  /** Point the element at a track and start it, fading in from silence. */
  const loadAndPlay = useCallback(
    (next: Exclude<MusicTrack, "none">, fadeInMs: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      trackRef.current = next;
      setTrack(next);

      audio.src = MUSIC_SOURCES[next];
      audio.loop = true;
      audio.muted = mutedRef.current;
      audio.volume = 0;
      audio.load();

      const started = audio.play();
      if (started && typeof started.then === "function") {
        started
          .then(() => {
            setIsPlaying(true);
            setNeedsGesture(false);
            rampVolume(volumeRef.current, fadeInMs);
          })
          .catch(() => {
            // Autoplay blocked or the file is missing: let the user tap to start.
            setIsPlaying(false);
            setNeedsGesture(true);
          });
      }
    },
    [rampVolume],
  );

  const startTone = useCallback(() => {
    if (trackRef.current !== "none") return; // already armed — don't restart
    loadAndPlay("tone", FADE.toneIn);
  }, [loadAndPlay]);

  const playSong = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || trackRef.current === "song") return;

    if (trackRef.current === "none") {
      loadAndPlay("song", FADE.crossIn);
      return;
    }
    // Crossfade: ease the tone out, then swap the source and ease the song in.
    rampVolume(0, FADE.crossOut, () => loadAndPlay("song", FADE.crossIn));
  }, [loadAndPlay, rampVolume]);

  const playEffect = useCallback((name: SfxName) => {
    if (typeof window === "undefined") return;

    let el = sfxRef.current[name];
    if (!el) {
      el = new Audio(SFX_SOURCES[name]);
      el.preload = "auto";
      sfxRef.current[name] = el;
    }

    el.muted = mutedRef.current;
    el.volume = clamp01(SFX_VOLUME[name] * volumeRef.current);
    // Restart from the top so a quick re-trigger re-fires rather than no-ops.
    try {
      el.currentTime = 0;
    } catch {
      /* some browsers throw if metadata isn't loaded yet; play() still works */
    }
    const started = el.play();
    if (started && typeof started.then === "function") {
      // Autoplay blocked, file missing, or interrupted by a re-trigger: ignore.
      started.catch(() => {});
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || trackRef.current === "none") return;

    if (audio.paused) {
      const started = audio.play();
      if (started && typeof started.then === "function") {
        started
          .then(() => {
            setIsPlaying(true);
            setNeedsGesture(false);
            if (audio.volume === 0) rampVolume(volumeRef.current, FADE.crossIn);
          })
          .catch(() => setNeedsGesture(true));
      }
    } else {
      cancelFade();
      audio.pause();
      setIsPlaying(false);
    }
  }, [cancelFade, rampVolume]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    const next = !mutedRef.current;
    mutedRef.current = next;
    setIsMuted(next);
    if (audio) audio.muted = next;
    // Mute/unmute any in-flight effects too (e.g. applause while it's playing).
    for (const el of Object.values(sfxRef.current)) if (el) el.muted = next;
  }, []);

  const setVolume = useCallback((value: number) => {
    const vol = Math.min(1, Math.max(0, value));
    volumeRef.current = vol;
    setVolumeState(vol);

    // Scale any in-flight effects with the same slider.
    for (const [name, el] of Object.entries(sfxRef.current)) {
      if (el) el.volume = clamp01(SFX_VOLUME[name as SfxName] * vol);
    }

    const audio = audioRef.current;
    if (audio) {
      cancelFade();
      audio.volume = vol;
    }
    // Nudging the slider up again implies "unmute".
    if (vol > 0 && mutedRef.current) {
      mutedRef.current = false;
      setIsMuted(false);
      if (audio) audio.muted = false;
      for (const el of Object.values(sfxRef.current)) if (el) el.muted = false;
    }
  }, [cancelFade]);

  // Keep React state in sync if the browser pauses/plays the element itself.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setIsPlaying(false);
      if (trackRef.current !== "none") setNeedsGesture(true);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, []);

  useEffect(() => cancelFade, [cancelFade]);

  const value = useMemo<MusicContextValue>(
    () => ({
      track,
      isPlaying,
      isMuted,
      volume,
      needsGesture,
      startTone,
      playSong,
      playEffect,
      togglePlay,
      toggleMute,
      setVolume,
    }),
    [track, isPlaying, isMuted, volume, needsGesture, startTone, playSong, playEffect, togglePlay, toggleMute, setVolume],
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* The single persistent audio element. preload="none" so no file is fetched until unlock. */}
      <audio ref={audioRef} preload="none" aria-hidden tabIndex={-1} />
      {track !== "none" && <MusicControl />}
    </MusicContext.Provider>
  );
}
