import type { ReactNode } from "react";

type ScrapbookStageProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Full-viewport paper scene that every page renders into. Uses dynamic
 * viewport height so mobile browser chrome doesn't crop it, respects notch
 * safe areas, and clips decorations so nothing causes horizontal scroll.
 */
export function ScrapbookStage({ children, className = "" }: ScrapbookStageProps) {
  return (
    <main
      className={`paper-surface relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden px-[max(1rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] ${className}`}
    >
      {children}
    </main>
  );
}
