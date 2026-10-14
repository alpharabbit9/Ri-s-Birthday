"use client";

import { useEffect, useRef } from "react";

import { DiaryScene } from "@/features/page-12-diary/DiaryScene";
import { MemoriesScene } from "@/features/page-13-memories/MemoriesScene";
import { ReelScene } from "@/features/page-14-reel/ReelScene";
import { FinalLetterScene } from "@/features/page-15-final-letter/FinalLetterScene";
import { useLenis } from "@/lib/lenis";

type MemoryScrollProps = {
  /** Return to Page 5 (Choose your gift) from the diary's Back tab. */
  onBack: () => void;
  /** Dev shortcut (?scene=memories): start already scrolled to the memories. */
  startAtMemories?: boolean;
  /** Dev shortcut (?scene=final): start already scrolled to the final letter. */
  startAtFinal?: boolean;
};

/**
 * The single vertical scroll surface for the memory sections. The diary spread
 * (Phase 12) is the first full-viewport panel; scrolling down continues
 * straight into the memory scrapbook (Phase 13) — there is deliberately no
 * page-turn between them (PHASES.md Phase 12/13). Scrolling on continues
 * straight into the photo reel (Phase 14) — again no page-turn — and on into the
 * final memory letter (Phase 15), once more with no page-turn.
 *
 * Gift 4 is the one place in the scrapbook that scrolls, so this surface gets
 * Lenis smooth scrolling (useLenis). Lenis smooths this wrapper/content pair,
 * not the window — the sections scroll inside this container. The children sit
 * in a single `content` element (its scrollHeight is what Lenis measures); the
 * diary panel therefore takes its one-screen height from `h-dvh` rather than
 * `h-full`, which keeps its `container-type: size` layout working. The reel's
 * horizontal film strip opts out with `data-lenis-prevent`.
 */
export function MemoryScroll({
  onBack,
  startAtMemories = false,
  startAtFinal = false,
}: MemoryScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const memoriesRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const lenisRef = useLenis(wrapperRef, contentRef);

  useEffect(() => {
    // Jump (not smooth) straight to a later section for review. Drive Lenis so
    // its scroll position stays in sync; fall back to native if it is not up.
    const target = startAtFinal ? finalRef.current : startAtMemories ? memoriesRef.current : null;
    if (!target) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(target, { immediate: true });
    else target.scrollIntoView({ block: "start" });
  }, [startAtMemories, startAtFinal, lenisRef]);

  return (
    <div ref={wrapperRef} className="h-full w-full overflow-x-hidden overflow-y-auto">
      <div ref={contentRef}>
        <div className="h-dvh w-full">
          <DiaryScene onBack={onBack} />
        </div>
        <div ref={memoriesRef}>
          <MemoriesScene />
        </div>
        <ReelScene />
        <div ref={finalRef}>
          <FinalLetterScene />
        </div>
      </div>
    </div>
  );
}
