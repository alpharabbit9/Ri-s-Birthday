# PHASES — Interactive Birthday Scrapbook

This document controls the development order.

**CRITICAL: Claude Code must execute exactly one phase at a time.**

Never combine phases unless the user explicitly requests it.

---

# PHASE 0 — FOUNDATION

## Objective

Create the project foundation without building the actual birthday pages.

## Tasks

- Initialize/inspect Next.js project.
- Configure TypeScript.
- Configure Tailwind.
- Install/configure Framer Motion.
- Install/configure GSAP.
- Install/configure Lenis if appropriate.
- Establish global scrapbook design tokens.
- Establish `#800000` maroon theme.
- Create asset directories.
- Create page feature directories.
- Create documentation files.
- Create base responsive layout.
- Add reduced-motion support.

## Do NOT

- Build Page 1.
- Build Page 2.
- Build Page 3.
- Invent personal content.

## Validation

Application starts successfully.

No unnecessary pages/features are created.

---

# PHASE 1 — PAGE 1: ENVELOPE

## Reference

Use the user's Page 1 description.

If a dedicated reference image is provided later, inspect it before coding.

## Objective

Create the opening scene.

## Visual

Mostly blank scrapbook/paper background.

Text:

```text
To: Madam ❤️
```

Centered envelope.

## Interaction

```text
Click/tap envelope
→ envelope opening animation
→ transition to Page 2 lock-screen state
```

## Animation

The envelope should feel physical.

Suggested:

- subtle idle movement
- click response
- flap opening
- contents/reveal
- scene transition

Avoid a generic modal transition.

## Validation

Test:

- desktop
- 360px mobile
- 390px mobile
- touch interaction
- reduced motion

STOP.

Wait for approval.

---

# PHASE 2 — PAGE 2: PASSWORD LOCK

## Objective

After Page 1 interaction, present the password lock.

## Visual

A scrapbook-inspired lock screen.

Keep it consistent with the paper/maroon theme.

## Function

Password is user-provided.

Do not invent it.

States:

```text
Locked
→ typing
→ incorrect
→ correct
→ unlocking
```

## Wrong password

Use a subtle scrapbook-style error animation.

No aggressive red error screen.

## Correct password

Transition:

```text
unlock
→ envelope opens
→ scrapbook emerges
→ birthday spread becomes visible
```

## Do NOT

Do not implement the cake page.

STOP.

---

# PHASE 3 — PAGE 2: BIRTHDAY SCRAPBOOK

## Reference

**Use Reference Image 1.**

The image is the authoritative visual reference for composition.

### Important

Do not reproduce the exact artwork.

Recreate its:

- two-page composition
- scrapbook feel
- photo framing
- cutout typography
- decorative arrangement
- handmade appearance

Change the reference blue to:

```text
#800000
```

---

## Left Page

Include:

- Her photo
- Scrapbook frame
- `MY MADAM`
- Star at upper-left
- Tape/decorative objects

Do not invent which photo should be used.

If the final photo has not been provided, use a temporary clearly marked development placeholder and ask the user for the real photo before finalizing.

---

## Right Page

Large birthday lettering:

```text
H A P P Y

B I R T H D A Y
```

Decorative elements should match the scrapbook style.

---

## Entrance Animation

Use staggered entrance.

Example:

```text
scrapbook
↓
paper
↓
photo frame
↓
photo
↓
tape
↓
MY MADAM
↓
star
↓
HAPPY
↓
BIRTHDAY
↓
decorations
↓
Turn Page
```

Make the sequence feel natural.

Do not animate every object with the exact same motion.

---

## Turn Page

Bottom-right:

```text
Turn Page →
```

It should be a scrapbook-style interactive element.

Click/tap:

```text
→ Page 3
```

STOP.

---

# PHASE 4 — PAGE 3: BLOW OUT THE CANDLES

## Reference

**Use Reference Image 2.**

When Reference Image 3 is provided, use it for the post-candle state.

---

## Initial State

Centered decorated cake.

Heading:

```text
Blow Out the Candles
```

Subtle candle flame animation.

Cake should have gentle movement.

Decorations can have tiny idle motion.

---

## Interaction

Primary interaction:

```text
Tap/click candle area
```

or another interaction explicitly approved by the user.

Do not implement microphone input unless explicitly requested.

---

## Candle Sequence

On successful interaction:

```text
interaction
→ flame flickers
→ flame shrinks
→ flames disappear
→ tiny smoke effect
→ celebratory transition
```

Keep it elegant.

---

## Final State

Replace:

```text
Blow Out the Candles
```

with:

```text
Yay!! Happy birthdayyyy madam
```

Use the user's provided Reference Image 3 to determine the final visual composition.

STOP.

---

# PHASE 5 — VISUAL POLISH

Only after Phases 1–4 are approved.

## Tasks

- Animation timing refinement
- Mobile layout refinement
- Image optimization
- Asset compression
- Touch interaction refinement
- Page transition polish
- Reduced-motion handling
- Performance testing
- Browser testing

Do not add new content.

---

# PHASE 6 — FUTURE PAGES

Reserved for later.

Potential future pages may include:

- Relationship memories
- Long birthday letter
- Things I love about you
- Photo gallery
- Timeline
- Final message

**Do not implement these until the user provides their exact content and approves their page design.**

---

# FINAL EXECUTION RULE

At the end of every phase, Claude Code must stop.

The next phase begins only when the user explicitly requests it.
