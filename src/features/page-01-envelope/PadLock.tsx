"use client";

import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";

import { handTilt, spring } from "@/lib/motion";

import { HandHeart, UndoDoodle } from "./doodles";
import { LOCK_CODE } from "./lock-code";

type Status = "idle" | "wrong" | "right";

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const BACK = "back";
const SLOTS = Array.from({ length: LOCK_CODE.length }, (_, i) => i);

const MESSAGE: Record<Status, string> = {
  idle: "enter the secret code",
  wrong: "hmm, not quite… try again",
  right: "yay, unlocked!",
};

/**
 * Every size on the lock is a fraction of --lock-w, set by the scene. Inline
 * styles stick to longhands; shorthands with var() (padding, gap, radius)
 * live in classes, because they serialise differently on server and client.
 */
const u = (n: number) => `calc(var(--lock-w) * ${n})`;

/** Handmade tilt, rounded so server and client render the same string. */
const tilt = (index: number, maxDeg: number) => `${handTilt(index, maxDeg).toFixed(2)}deg`;

const SHACKLE = "M24 50V31A26 26 0 0 1 76 31V50";

/** Brass shackle with a die-cut white edge. Its legs disappear behind the body. */
function Shackle() {
  const id = useId();
  return (
    <svg
      data-part="shackle"
      viewBox="0 0 100 50"
      className="absolute inset-x-0 top-0 w-full overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor="#9c7a14" />
          <stop offset="0.3" stopColor="#e6c962" />
          <stop offset="0.55" stopColor="#c9a227" />
          <stop offset="1" stopColor="#8a6a10" />
        </linearGradient>
      </defs>
      <path d={SHACKLE} fill="none" stroke="#fffdf8" strokeWidth="14" />
      <path d={SHACKLE} fill="none" stroke={`url(#${id})`} strokeWidth="9" />
      <path d={SHACKLE} fill="none" stroke="#f6e7a6" strokeOpacity="0.75" strokeWidth="1.8" transform="translate(-1.8 -0.6)" />
    </svg>
  );
}

type PadLockProps = {
  /** Keys respond only while the lock is out of the seal. */
  active: boolean;
  /** Called once the right code has been entered and celebrated. */
  onUnlock: () => void;
};

/**
 * Keypad padlock that comes out of the envelope seal. Enter the code with the
 * paper keys or a keyboard; it checks itself once every slot is filled.
 *
 * States: idle → typing → wrong (rattle, hearts drop, try again) or right.
 */
export function PadLock({ active, onUnlock }: PadLockProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [flashKey, setFlashKey] = useState<string | null>(null);
  const [shaker, animate] = useAnimate<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const group = useRef<HTMLDivElement>(null);

  // Refs, not state, so quick typing between renders never loses a digit.
  const entered = useRef("");
  const checking = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const verify = (attempt: string) => {
    checking.current = true;
    // A short beat so the last heart lands before the verdict.
    later(() => {
      if (attempt === LOCK_CODE) {
        setStatus("right");
        later(onUnlock, 700);
        return;
      }
      setStatus("wrong");
      if (!reduceMotion) {
        animate(
          shaker.current,
          { x: [0, -9, 8, -6, 4, 0], rotate: [0, -2.5, 2, -1.5, 1, 0] },
          { duration: 0.55, ease: "easeInOut" },
        );
      }
      later(() => {
        entered.current = "";
        setCode("");
        checking.current = false;
      }, 650);
    }, 260);
  };

  const press = (key: string) => {
    if (!active || checking.current) return;
    if (key === BACK) entered.current = entered.current.slice(0, -1);
    else if (entered.current.length < LOCK_CODE.length) entered.current += key;
    setCode(entered.current);
    setStatus("idle");
    if (entered.current.length === LOCK_CODE.length) verify(entered.current);
  };

  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const key = /^\d$/.test(e.key) ? e.key : e.key === "Backspace" ? BACK : null;
    if (!key) return;
    e.preventDefault();
    press(key);
    // Show the paper key being pressed, as if it were tapped.
    setFlashKey(key);
    later(() => setFlashKey(null), 140);
  });

  useEffect(() => {
    if (!active) return;
    group.current?.focus({ preventScroll: true });
    const listener = (e: KeyboardEvent) => onKeyDown(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [active]);

  return (
    <div ref={group} role="group" aria-label="Padlock" tabIndex={-1} className="w-[var(--lock-w)] outline-none">
      <div ref={shaker} className="relative" style={{ paddingTop: u(0.36) }}>
        <Shackle />

        {/* Body: maroon cardstock with a white die-cut edge and stitching */}
        <div
          className="relative z-[1] rounded-[calc(var(--lock-w)*0.1)] px-[calc(var(--lock-w)*0.065)] pt-[calc(var(--lock-w)*0.07)] pb-[calc(var(--lock-w)*0.075)] text-warm-white"
          style={{
            backgroundImage: "linear-gradient(165deg, #931414 0%, #800000 45%, #680000 100%)",
            boxShadow: `0 0 0 ${u(0.016)} #fffdf8, 0 ${u(0.05)} ${u(0.09)} ${u(-0.02)} rgb(30 0 0 / 0.6)`,
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-40 mix-blend-multiply"
            style={{ backgroundImage: "var(--paper-grain)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[calc(var(--lock-w)*0.03)] rounded-[calc(var(--lock-w)*0.075)] border-[1.5px] border-dashed border-warm-white/35"
          />

          {/* Code label: a paper strip taped onto the lock */}
          <div
            className="relative flex items-center rounded-[calc(var(--lock-w)*0.012)] bg-[#fbf3e6] pr-[calc(var(--lock-w)*0.02)] pl-[calc(var(--lock-w)*0.03)] shadow-paper"
            style={{ height: u(0.16), rotate: "-1.2deg" }}
          >
            <span
              aria-hidden
              className="absolute bg-maroon-wash/85"
              style={{ width: u(0.11), height: u(0.04), left: u(-0.04), top: u(-0.012), rotate: "-32deg" }}
            />
            <span
              aria-hidden
              className="absolute bg-maroon-wash/85"
              style={{ width: u(0.11), height: u(0.04), right: u(-0.04), bottom: u(-0.008), rotate: "-28deg" }}
            />

            <div
              role="img"
              aria-label={`${code.length} of ${LOCK_CODE.length} digits entered`}
              className="flex flex-1 justify-center gap-[calc(var(--lock-w)*0.035)]"
              style={{ paddingLeft: u(0.1) }}
            >
              {SLOTS.map((i) => (
                <span key={i} className="relative grid place-items-center" style={{ width: u(0.1), height: u(0.115) }}>
                  <span
                    className="absolute inset-x-[4%] bottom-[4%] h-[2px] rounded-full bg-maroon/40"
                    style={{ rotate: tilt(i + 3, 5) }}
                  />
                  <AnimatePresence>
                    {i < code.length && (
                      <motion.span
                        className="block w-[80%]"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={
                          status === "right"
                            ? { scale: [1, 1.4, 1], rotate: 0, transition: { delay: i * 0.09, duration: 0.42 } }
                            : { scale: 1, rotate: handTilt(i + 11, 12) }
                        }
                        exit={{ scale: 0, opacity: 0, y: 6, transition: { duration: 0.22, delay: i * 0.04 } }}
                        transition={spring.sticker}
                      >
                        <HandHeart className="block w-full" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              ))}
            </div>

            {/* The drawn key is small; an invisible ::before stretches the tap target past 44px. */}
            <button
              type="button"
              onClick={() => press(BACK)}
              disabled={!code.length || status === "right"}
              aria-label="Delete last digit"
              data-pressed={flashKey === BACK || undefined}
              className="relative grid touch-manipulation cursor-pointer place-items-center rounded-full text-maroon transition-[opacity,scale] duration-150 select-none before:absolute before:-inset-[calc(var(--lock-w)*0.03)] active:scale-90 disabled:cursor-default disabled:opacity-30 data-pressed:scale-90"
              style={{ width: u(0.12), height: u(0.12) }}
            >
              <UndoDoodle className="w-[62%]" />
            </button>
          </div>

          <p
            aria-live="polite"
            className="relative mt-[calc(var(--lock-w)*0.045)] mb-[calc(var(--lock-w)*0.04)] text-center font-hand leading-none font-semibold"
            style={{ fontSize: u(0.068), height: u(0.068) }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={status}
                className="inline-block"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {MESSAGE[status]}
              </motion.span>
            </AnimatePresence>
          </p>

          {/* Paper keys */}
          <div className="relative grid grid-cols-5 gap-[calc(var(--lock-w)*0.025)]">
            {DIGITS.map((digit, i) => (
              <button
                key={digit}
                type="button"
                onClick={() => press(digit)}
                data-pressed={flashKey === digit || undefined}
                className="grid touch-manipulation cursor-pointer place-items-center rounded-[calc(var(--lock-w)*0.03)] bg-warm-white font-hand leading-none font-bold text-maroon shadow-[0_2px_0_rgb(70_0_0/0.5),0_5px_8px_-3px_rgb(20_0_0/0.45)] transition-[translate,scale,box-shadow] duration-100 select-none hover:-translate-y-px active:translate-y-[2px] active:scale-95 active:shadow-[0_0_0_rgb(70_0_0/0.5)] data-pressed:translate-y-[2px] data-pressed:scale-95 data-pressed:shadow-[0_0_0_rgb(70_0_0/0.5)]"
                style={{ height: u(0.145), fontSize: u(0.09), rotate: tilt(i + 1, 2.2) }}
              >
                {digit}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
