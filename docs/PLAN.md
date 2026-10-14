# Development Plan — Interactive Birthday Scrapbook

## Project Vision

Create a private interactive birthday scrapbook website for the user's girlfriend.

The visual language is based on the provided scrapbook references.

### Reference rules

The provided reference images are **visual direction**, not assets to copy blindly.

Use them to understand:

- Composition
- Layout
- Scrapbook density
- Paper treatment
- Decorative placement
- Typography hierarchy
- Photo framing
- Interaction concept

Replace the reference blue with:

```text
#800000
```

The final result should feel original and personal.

---

# Page Map

## Page 1 — Envelope / Entry

Concept:

A mostly blank scrapbook-like screen.

Content:

```text
To: Madam ❤️
```

A centered envelope.

Interaction:

```text
Click envelope
→ transition to lock screen
```

The envelope itself is the entry point.

---

# Page 2 — Password + Birthday Scrapbook Reveal

This page has two sequential states.

### State A — Lock Screen

After Page 1 envelope click:

Show a lock-screen-like interface.

The user must enter a password.

The password must be provided by the user during development.

Do not guess the password.

Wrong password:

- Gentle error animation
- No harsh red error screen
- Keep scrapbook aesthetic

Correct password:

```text
Password accepted
→ envelope-opening animation
→ birthday scrapbook emerges
```

### State B — Birthday Scrapbook

Use Reference Image 1.

Reference composition:

- Two-page scrapbook spread
- Left page contains her photograph
- Text such as `MY MADAM` near the photo
- Decorative star near upper-left
- Right page contains:

```text
H A P P Y
B I R T H D A Y
```

- Decorative scrapbook elements around the page
- Bottom-right page-turn/next control

### Color transformation

Reference blue becomes:

```text
#800000
```

Do not replace every neutral color with maroon.

Keep:

- Cream
- White
- Paper beige
- Dark ink

Maroon should be the dominant accent.

### Animation choreography

Elements should not appear simultaneously.

Suggested sequence:

```text
0.00s  scrapbook/page enters
0.20s  paper settles
0.40s  left photograph appears
0.55s  photo frame/tape appears
0.70s  MY MADAM lettering appears
0.85s  star appears
1.00s  birthday lettering begins
1.10s+ individual letters/stickers appear
1.80s decorations settle
2.00s next-page control becomes visible
```

These timings are suggestions, not rigid requirements.

Animation should feel handmade and physical rather than like a standard website fade-in.

---

# Page 3 — Blow Out the Candles

Use Reference Image 2 as the main layout reference.

Concept:

A decorated cake is centered on a scrapbook page.

Text:

```text
Blow Out the Candles
```

The cake should have subtle living/moving animation.

Possible animation:

- Candle flames gently flicker
- Tiny decorative elements have subtle movement
- Cake has a very slight idle motion
- Background decorations move minimally

The user then interacts with the candles.

Preferred interaction:

```text
Tap/click/hold candles
→ blow-out sequence
```

If microphone interaction is later requested, treat microphone access as a separate feature and ask before implementing it.

### After successful interaction

Candles extinguish.

The text changes from:

```text
Blow Out the Candles
```

to:

```text
Yay!! Happy birthdayyyy madam
```

Use Reference Image 3 when it is provided.

The transition should feel celebratory but still fit the scrapbook aesthetic.

---

# Phase Development Order

## Phase 0 — Project Foundation

Create:

- Next.js project
- TypeScript
- Tailwind
- Animation libraries
- Global design tokens
- Asset folders
- Basic layout
- Documentation
- Reduced-motion foundation

Do not build the actual pages yet.

---

## Phase 1 — Page 1

Build only the envelope entry experience.

Deliverables:

- Background
- `To: Madam ❤️`
- Envelope
- Hover/tap feedback
- Envelope opening transition
- Transition into lock-screen state

Do not implement Page 2 scrapbook content yet.

---

## Phase 2 — Page 2 Lock Screen

Build only:

- Lock screen
- Password field
- Password validation
- Error state
- Correct-password transition

Do not implement Page 3.

---

## Phase 3 — Page 2 Birthday Scrapbook

Implement Reference Image 1-inspired spread.

Deliverables:

- Left photo area
- `MY MADAM`
- Star
- Birthday lettering
- Decorative objects
- Paper treatment
- Page navigation
- Staggered entrance animation

---

## Phase 4 — Page 3 Cake

Implement Reference Image 2-inspired cake page.

Deliverables:

- Cake
- Candles
- Candle flame animation
- Decorative scrapbook elements
- `Blow Out the Candles`
- Interaction
- Candle extinguishing
- Success text

---

## Phase 5 — Polish

Only after Pages 1–3 are approved:

- Mobile optimization
- Animation timing polish
- Image optimization
- Touch interactions
- Reduced-motion support
- Loading behavior
- Final visual consistency

---

# Non-Negotiable Development Rule

**ONE PAGE AT A TIME.**

Claude Code must never:

- Build all pages in one pass
- Invent future pages
- Add placeholder pages unnecessarily
- Change unrelated pages
- Replace user assets without permission
- Invent memories, messages, names, dates, or relationship details
- Change the visual direction without approval

Before beginning a phase, inspect the current implementation and only modify what is necessary for that phase.

---

# Reference Image Workflow

For each phase:

1. Locate the supplied reference image.
2. Study its composition.
3. Identify:
   - layout
   - hierarchy
   - spacing
   - decorative objects
   - photo treatment
   - typography
   - animation opportunities
4. Recreate the **design language**, not a pixel-for-pixel copy.
5. Replace blue with `#800000`.
6. Preserve cream/white/neutral scrapbook materials.
7. Compare the implementation against the reference visually.
8. Iterate before proceeding.

If a reference image is missing, do not invent its exact content. Ask the user to provide it.

---

# Validation Gate

A phase is complete only when:

- It runs without errors.
- The intended interaction works.
- Desktop layout is acceptable.
- Mobile layout is acceptable.
- Animations do not visibly break.
- Assets load locally.
- No unnecessary remote asset dependency remains.
- No unrelated page/feature was modified.
- The user has approved the visual result.

Only then continue to the next phase.
