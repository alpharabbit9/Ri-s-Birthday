# Birthday Scrapbook

A private, interactive birthday scrapbook: a handmade scrapbook turned into a web experience. It's built one page at a time; see `docs/PHASES.md`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
npm run lint
```

## Docs

- `docs/TECHSTACK.md`: technology, architecture, assets, animation and performance rules.
- `docs/PLAN.md`: the project plan and page map.
- `docs/INSTRUCTIONS.md`: persistent implementation rules.
- `docs/PHASES.md`: strict phase-by-phase execution order.
- `docs/ASSET_SOURCES.md`: source and license for every asset.

Workflow: read `docs/INSTRUCTIONS.md` and `docs/PHASES.md`, execute one phase, then stop for visual approval.

Dev shortcut: in `npm run dev` only, `http://localhost:3000/?scene=spread` (or `?scene=cake`, `?scene=accept`) starts on that scene, so you can skip the envelope and the lock. Production builds ignore it.

## Stack notes

- **Next.js 16** (App Router) with **TypeScript 6**. TypeScript is held at 6.0 because `typescript-eslint` doesn't support 7.x yet.
- **Tailwind CSS v4**. The design tokens are in `src/styles/globals.css` (`@theme`).
- **Motion** (the current name of Framer Motion), imported from `motion/react`. Shared springs and easings are in `src/lib/motion.ts`.
- **GSAP** with `@gsap/react` (`useGSAP`), registered in `src/lib/gsap.ts` along with reduced-motion media conditions.
- **Lenis is not installed.** Pages 1–3 are full-screen scenes rather than scrolling pages. It gets added only if a later page scrolls.
- **Loops are CSS, moments are GSAP.** Anything that repeats forever (candle flicker, garland and streamer sway, lingering smoke) is a CSS animation of transform/opacity on an HTML element, so the compositor runs it and the main thread stays idle. GSAP drives the one-off choreography, on wrapper elements around the looping ones. The confetti uses the Web Animations API for the same reason. Keep new loops off the main thread too.

## Layout

```text
src/app/                   routes (single page for now)
src/components/scrapbook/  shared scrapbook building blocks (ScrapbookStage)
src/components/animation/  motion providers/helpers
src/components/ui/         shared controls
src/components/dev/        dev-only tooling (Phase 0 preview)
src/features/page-0X-*/    page-specific logic, one folder per page
src/lib/                   fonts, motion tokens, gsap setup, the shared page turn
src/styles/                global CSS and tokens
public/assets/global/      shared textures, fonts, stickers, icons, decorations
public/assets/page-0X-*/   per-page images, stickers, decorations, textures, animations
Reference Images/          visual references (not served)
Her Image/                 original source photos (not served; optimised copies go in public/assets)
```

## Reduced motion

`prefers-reduced-motion: reduce` is handled in three places:

1. CSS: `globals.css` collapses CSS animations and transitions.
2. Motion: `MotionConfig reducedMotion="user"` in `MotionProvider`.
3. GSAP: build timelines inside `gsap.matchMedia()` using `motionMedia` from `src/lib/gsap.ts`.
