# AGENTS.md — Birthday Scrapbook

Guidance for any AI agent working in this repo. Read this first, then the docs it points to.

## What this is

A private, interactive birthday scrapbook website — a handmade physical scrapbook turned into a web
experience for one person ("Madam"). It is **not** a generic birthday landing page. Everything should
feel like paper, tape, stickers, and cut-out letters placed by hand, with gentle cinematic animation.

It is built **one page (phase) at a time**, and each page is reviewed and approved before the next begins.

## The rules that matter most

These override normal "just get it done" instincts. Violating them is the main way to go wrong here.

1. **One phase at a time.** Build only the phase the user asks for. Do not build the next page because
   its structure is "obvious." Do not touch an unrelated page unless a genuinely shared component needs it.
2. **Stop after each phase and wait for approval.** Never auto-continue to the next phase. Report exactly
   what changed, then stop.
3. **Never invent personal content.** No made-up memories, dates, names, photos, quotes, inside jokes,
   passwords, or relationship details. If real content is missing, use a clearly-marked placeholder and
   **ask the user** — never fill the gap with generic romantic filler. Letter text and the lock code are
   user-supplied; the current lock code (`1234`) and some note text are placeholders awaiting the real values.
4. **References are visual direction, not assets to copy.** Recreate the *design language* of each
   reference image with original CSS/SVG/your own assets. Do not reproduce copyrighted artwork.
5. **Replace the references' blue with maroon `#800000`.** Maroon is the dominant *accent*, not the whole
   page — keep cream/paper/white/ink neutral. Avoid neon red, Valentine's pink, purple gradients, SaaS blue.
6. **Don't over-engineer.** No database, auth backend, CMS, API layer, or state-management/component
   library unless a feature genuinely requires it. This is a lightweight client-interactive frontend.

Before coding a phase, give a short plan (phase, reference, components to change, assets, animation
sequence, validation). If a critical requirement is ambiguous, ask instead of guessing.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

Dev shortcut (dev build only; ignored in production): `http://localhost:3000/?scene=spread`
(also `cake`, `accept`, `choose`, `letter`, `flower`) starts on that scene so you can skip the
envelope and lock while reviewing. See `SCENES` in `src/components/scrapbook/SceneFlow.tsx`.

To run/verify the app in-session, use `preview_start` with the `dev` config in `.claude/launch.json`.
After a visual change, verify in the browser (console errors, layout, mobile) rather than asking the user
to check by hand. Note: the in-app preview pane throttles rAF, which can stall GSAP/Motion timelines —
confirm real animation behavior with the dev server / a real browser, not just the pane.

**Not a git repository.** There is no VCS here; don't rely on `git` for history or assume commits.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 6** (held at 6.0 — `typescript-eslint` has no 7.x yet).
- **Tailwind CSS v4**; design tokens live in `src/styles/globals.css` under `@theme` (no `tailwind.config`).
- **Motion** (formerly Framer Motion), imported from `motion/react`. Shared springs/easings: `src/lib/motion.ts`.
- **GSAP** + `@gsap/react` (`useGSAP`), set up in `src/lib/gsap.ts` with reduced-motion media conditions.
- **Lenis** smooths the one scrolling surface — the Gift 4 memory flow (Phases 12–15), via `useLenis`
  (`src/lib/lenis.ts`) wired into `MemoryScroll`. Pages 1–7 are full-screen scenes, not scrolling pages,
  so they do not use it. Lenis smooths that wrapper/content pair (not the window); it honours reduced
  motion itself (`respectReducedMotion`) and needs no ScrollTrigger sync (reveals are Motion `whileInView`).
- Path alias: `@/*` → `src/*`.

## Architecture

- **Single route, no per-page URLs.** `src/app/page.tsx` renders `ScrapbookStage` → `SceneFlow`.
  `SceneFlow` (client component) owns which scene is showing via local state and crossfades between them
  with `AnimatePresence`. Scenes live on one route *on purpose* — so nobody can link past the envelope or
  the lock. Don't convert scenes into separate routes.
- **`ScrapbookStage`** is the full-viewport paper surface every scene renders into: `min-h-dvh`, safe-area
  padding, `overflow-hidden` (prevents horizontal scroll from decorations).
- **Navigation between scenes** is done by passing callbacks (`onTurn`, `onAccept`, `onChoose`, `onBack`)
  down to each scene; the scene calls them to ask `SceneFlow` to switch. Wire a new scene into `SceneFlow`.
- The password lock is **inside** the envelope scene (the padlock pops out of the envelope seal); there is
  no separate lock screen component.

### One folder per page

```
src/features/page-0X-name/
  <Scene>.tsx          "use client" scene component
  <...>.tsx            sub-pieces (photo page, cake, etc.)
  decorations.tsx      inline-SVG scrapbook decorations for this page
  *-timeline.ts        GSAP entrance choreography (playEntrance + playEntranceReduced)
  *.module.css         CSS-module paper/texture/idle-loop styling
  photos.ts / sticker.ts / *-content.ts   typed asset + text data and preload helpers
```

Keep page-specific logic in its feature folder. Shared pieces go in `src/components/{scrapbook,animation,ui}`
and shared setup in `src/lib` (`fonts.ts`, `motion.ts`, `gsap.ts`, `page-turn.ts`).

### Scene conventions

- Scene files start with `"use client"`. Run GSAP inside `useGSAP(() => {...}, { scope })` with a ref scope.
- Timelines select targets by `data-anim="..."` attributes within the scope — see any `*-timeline.ts` and
  the matching scene. Keep the timeline in its own file; the scene just invokes `playEntrance` /
  `playEntranceReduced`.
- Resting tilts belong in CSS as the `rotate` property; GSAP animates `rotation` (the transform) so the two
  compose without fighting.

## Design system

Palette (tokens in `globals.css @theme`): maroon `#800000`, paper `#F7F1E5`, warm white `#FFFDF8`,
ink `#211A17`, secondary paper `#E8DDCC`, muted gold `#C9A227` (plus maroon tints and `ink-soft`).
Utilities: `paper-surface`, `maroon-surface`, `tilt-l` / `tilt-r`.

Fonts (via `next/font/google`, self-hosted at build, all SIL OFL): **Lora** (`--font-serif`, body/letter),
**Caveat** (`--font-hand`, handwritten labels), **Abril Fatface** (`--font-display`, cut-out lettering).
Keep to these three.

## Animation rules

- **Loops are CSS, moments are GSAP.** Anything that repeats forever (candle flicker, garland/streamer sway,
  lingering smoke, idle bobs) must be a CSS animation of `transform`/`opacity` so the compositor runs it and
  the main thread stays idle. GSAP drives one-off entrance choreography on *wrapper* elements around the
  looping ones. Confetti uses the Web Animations API for the same reason. Keep any new loop off the main thread.
- **Elements enter sequentially**, staggered, like objects placed by hand — not all at once. Prefer opacity,
  transform, scale, rotation, spring, slight imperfections. Avoid constant floating, flashy particles,
  heavy bouncing, generic SaaS fade-ins. Use the shared tokens in `src/lib/motion.ts` (`ease`, `spring`,
  `duration`, `stagger`, `handTilt`).
- **Reduced motion is handled in three places** and every new animation must honor it:
  1. CSS — `globals.css` collapses CSS animations/transitions.
  2. Motion — `MotionConfig reducedMotion="user"` in `MotionProvider`.
  3. GSAP — build timelines inside `gsap.matchMedia()` using `motionMedia` from `src/lib/gsap.ts`, and
     provide a fade-only `playEntranceReduced`.

## Asset rules

- **All assets are local.** Never hotlink a remote URL in production.
- **Create first, download last.** Prefer CSS/SVG/Motion/GSAP, then Canva originals, then only properly
  licensed reusable assets. Don't download copyrighted artwork just because it matches a reference.
- **Per-page folders** under `public/assets/page-0X-name/{images,stickers,decorations,textures,animations}`,
  plus `public/assets/global/`. Meaningful filenames (`maroon-star.svg`, `madam-photo.webp`). Don't dump
  everything into one folder.
- **Source photos stay out of `public/`.** Originals live in `Her Image/` (photos of her) and `Our Image/`
  (photos of them; `us1`–`us9` are referenced by later phases), and raw stickers in `Sticker/`
  (`sticker-1.png`, `sticker-2.png`). Re-encode optimized copies (WebP, preserve the image, don't crop faces)
  into the page's `public/assets/.../images|stickers/` folder, and load them with `next/image`. Preload
  per-page photos early with the `preload*` helpers wired in `SceneFlow` (see `photos.ts` for the pattern).
  Note: the raw sticker PNGs have *painted* checkerboard/haze backgrounds, not real transparency — the served
  copies key that out; `sticker-2` is reused as both Page 4's kitten and Page 7's flower hero.
- **Document every asset** (original or external) in `docs/ASSET_SOURCES.md` — original ones too, so nothing
  in `public/assets` is undocumented. External entries need Asset / Source / URL / License / Page / Reason.

## Responsiveness & quality bar

Mobile-first — the recipient likely opens this on a phone. Don't just shrink desktop; reposition decorations
intentionally and keep interactions touch-friendly with no horizontal overflow. Test ~360 / 390 / 430 / 768 /
1280px. A phase is done only when the visual design and interaction work on desktop *and* mobile, animations
are smooth, assets load locally and are documented, nothing unrelated changed, no personal content was
invented, typecheck/lint/build are clean — and the user has approved it. "It compiles" is not done.

## Current state & the plan

The full roadmap is **Phases 0–17**, defined in `PHASES.md` (repo root). A phase maps to a page/section;
pages 1–3 are full-screen scenes and the later gift pages are too, while Phases 12–15 introduce a single
**vertically scrolling** flow (no page-turn between those sections).

| Phase | Page / section | Status |
|---|---|---|
| 0  | Foundation (tokens, folders, libs, reduced motion) | ✅ built |
| 1  | Page 1 — Envelope entry | ✅ built |
| 2  | Page 2 — Password lock (lives inside the envelope) | ✅ built |
| 3  | Page 2 — Birthday spread | ✅ built |
| 4  | Page 3 — Cake / blow out the candles | ✅ built |
| 5  | Visual polish pass | ✅ built |
| 6  | Page 4 — "Accept your gift?" (YES/NO) | ✅ built |
| 7  | Page 5 — "Choose your gift" menu (4 gifts) | ✅ built |
| 8  | Page 6 — Gift 1: Letter | ✅ built |
| 9  | Page 7 — Gift 2: Flower | ✅ built |
| 10 | Page 8 — Gift 3: Gift box | 🗑️ removed (per user, 2026-10-15) |
| 11 | Gift 4 — Birthday surprise intro ("Happy Birthday Madam" card) | ✅ built |
| 12 | Spiral diary opening spread (`page-12-diary`) | ✅ built |
| 13 | Scrolling memory scrapbook (`page-13-memories`) | ✅ built |
| 14 | Photo reel (`page-14-reel`, `us4`–`us8`) | ✅ built |
| 15 | Final memory letter (`page-15-final-letter`) | ⬜ not built |
| 16 | Persistent background music (global controller) | ⬜ not built |
| 17 | Final polish (only after all phases approved) | ⬜ not built |

Built so far: Phases 0–14 → Pages 1–7 (Page 8 / Gift 3 was removed at the user's request 2026-10-15; the Choose-your-gift menu now shows three gifts, the surprise relabelled "Gift 3") plus the Gift 4 surprise intro, the birthday diary spread, the
scrolling memory scrapbook and the photo reel (`src/features/page-01-envelope` … `page-14-reel`). The memory
scrapbook's two **note areas** are still **placeholders** awaiting the user's real words, and some earlier
letter/note text and the lock code (`1234`) are placeholders too. Phases 15–17 are **specified in `PHASES.md`
but not yet built** — no `src/features/` or `public/assets/` folders exist for them yet. Create one feature
folder + one asset folder per new page, and for Phase 15 note that `PHASES.md` names a specific asset path
(`public/assets/page-15-final-letter/images/us9`) and **exact** letter/message text that must be used
verbatim — do not rewrite it. (The memory/reel phases re-encoded `us1`–`us8` to WebP under each page's
`public/assets/.../images/` folder, following the project's WebP convention rather than the literal `.jpeg`
paths named in `PHASES.md`.)

Docs (read the relevant ones before each phase):

- `docs/TECHSTACK.md` — stack, architecture, asset/animation/performance rules.
- `docs/PLAN.md` — project vision and page map.
- `docs/INSTRUCTIONS.md` — persistent implementation rules (role, color system, asset/animation workflow).
- `PHASES.md` (repo root) — the **current, authoritative** phase-by-phase execution order, Phases 0–17.
  An older, shorter copy at `docs/PHASES.md` stops at a "Future Pages" phase and is out of date — always
  prefer the root `PHASES.md`.
- `docs/ASSET_SOURCES.md` — source and license for every asset.
- `README.md` — quick orientation.

Per-phase workflow: read the docs above → inspect existing code → inspect the phase's reference image →
identify assets → implement **only** that phase → run and verify (desktop, mobile, reduced motion, touch) →
fix visual issues → report what changed → **stop**.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
