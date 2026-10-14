# Claude Code Instructions — Birthday Scrapbook

## ROLE

You are building a highly personal interactive birthday scrapbook website.

Your job is to implement the user's exact creative direction while avoiding assumptions.

The project is **not** a generic birthday website.

It should feel like a handmade physical scrapbook that has been turned into an interactive digital experience.

---

# 1. ABSOLUTE RULES

## Rule 1 — One Page at a Time

Never build multiple pages/features in a single phase.

If the current task is Page 1, do not implement Page 2 or Page 3.

If the user asks for a change to Page 2, do not redesign Page 1 unless the change genuinely requires a shared component change.

---

## Rule 2 — Do Not Hallucinate

Never invent:

- Memories
- Dates
- Names
- Photos
- Quotes
- Inside jokes
- Passwords
- Relationship events
- Personal information
- Future page content

If required information is missing, ask the user.

Do not use generic romantic filler in place of missing personal content.

---

## Rule 3 — References Are Authoritative for Visual Direction

The provided images are the primary visual references for the corresponding pages.

Use them to understand:

- Layout
- Composition
- Decoration density
- Scrapbook style
- Typography placement
- Photo placement
- Interaction concept

Do not blindly copy copyrighted decorative artwork.

Recreate the visual language with original/CSS/SVG/Canva assets where practical.

---

# 2. COLOR SYSTEM

Primary:

```text
MAROON = #800000
```

The supplied references use blue.

**Replace the blue design language with maroon.**

Do not make the whole website maroon.

Use:

```text
#800000  Primary scrapbook accent
#F7F1E5  Paper
#FFFDF8  Warm white
#211A17  Ink
#E8DDCC  Secondary paper
#C9A227  Optional muted gold accent
```

Keep the overall visual soft and handmade.

Avoid:

- Neon red
- Bright Valentine's pink
- Purple AI gradients
- Generic SaaS blue
- Pure-black modern dashboard styling

---

# 3. ASSET RULES

Create a dedicated folder for every page.

Required structure:

```text
public/
  assets/
    global/

    page-01-envelope/
      images/
      stickers/
      decorations/
      textures/
      animations/

    page-02-birthday/
      images/
      stickers/
      decorations/
      textures/
      animations/

    page-03-cake/
      images/
      stickers/
      decorations/
      textures/
      animations/
```

Use meaningful names.

Example:

```text
maroon-star.svg
paper-tape.png
cake-candle.svg
madam-photo.webp
```

Do not dump all assets into one folder.

---

# 4. DOWNLOADING ASSETS

When an animation, sticker, icon, texture, or decoration is required:

### First choice

Create it with:

- CSS
- SVG
- Framer Motion
- GSAP
- simple custom illustration

### Second choice

Create it in Canva.

Canva can be used for:

- Scrapbook labels
- Paper decorations
- Cut-out lettering
- Decorative stickers
- Custom frames
- Tape
- Collage elements
- Original page decorations

Export transparent elements as PNG/SVG when appropriate.

### Third choice

Download an appropriate reusable asset from the web.

Only use assets whose license permits the intended use.

Preferred sources include:

- Public-domain repositories
- Open-license SVG/icon repositories
- Free assets with explicit reuse permissions
- Official asset libraries

For every externally downloaded asset, record:

```text
Asset
Source
URL
License
Page
Reason used
```

in:

```text
docs/ASSET_SOURCES.md
```

Never hotlink a random asset URL in production.

---

# 5. ANIMATION RULES

Animations should feel like physical scrapbook objects moving.

Prefer:

- opacity
- transform
- scale
- rotation
- spring motion
- slight imperfections
- staggered entrances

Avoid:

- excessive bouncing
- constant floating everywhere
- flashy particle effects
- generic SaaS fade-ins
- animation on every pixel

The user specifically wants elements to appear one after another.

Use animation timelines deliberately.

---

# 6. PAGE 1 INSTRUCTIONS

Page 1 is the entry.

Visual:

Mostly blank scrapbook/paper background.

Text:

```text
To: Madam ❤️
```

Center:

Envelope.

Interaction:

```text
Click/tap envelope
→ envelope opens
→ transition into lock screen
```

The transition must feel intentional.

Do not immediately jump to Page 2.

Page 1 should establish anticipation.

---

# 7. PAGE 2 LOCK SCREEN

After the Page 1 envelope interaction:

Show a lock-screen-like password experience.

Requirements:

- Password input
- Submit/unlock action
- Wrong-password state
- Correct-password state

Password value must come from the user.

Never invent it.

After correct password:

```text
unlock
→ envelope opens
→ scrapbook emerges
→ Page 2 birthday spread is revealed
```

The reveal should feel like a physical birthday scrapbook coming out of an envelope.

---

# 8. PAGE 2 BIRTHDAY SPREAD

Reference:

**Reference Image 1**

Composition:

### Left side

- Her photograph
- Scrapbook frame
- `MY MADAM`
- Decorative star at upper-left
- Tape/stickers/decorations

### Right side

Large birthday lettering:

```text
H A P P Y

B I R T H D A Y
```

Use maroon where the reference uses blue.

Keep neutral paper and white areas neutral.

### Animation

Elements enter sequentially.

Suggested choreography:

```text
Scrapbook appears
↓
Paper settles
↓
Photo frame appears
↓
Photo enters
↓
Tape/decorations appear
↓
MY MADAM appears
↓
Star appears
↓
HAPPY appears letter-by-letter
↓
BIRTHDAY appears letter-by-letter
↓
Small decorations settle
↓
Turn Page control appears
```

The exact timing can be adjusted during visual testing.

---

# 9. PAGE NAVIGATION

Bottom-right:

```text
Turn Page →
```

It should look like a scrapbook navigation element rather than a standard web button.

It can use:

- handwritten typography
- paper tab
- arrow doodle
- subtle hover/tap animation

Do not use a standard rounded SaaS button unless explicitly requested.

---

# 10. PAGE 3 CAKE

Reference:

**Reference Image 2**

Main composition:

- Scrapbook page
- Centered decorated cake
- Candles
- Decorative elements
- Heading:

```text
Blow Out the Candles
```

Cake should have subtle movement.

Candles:

- Flame flicker
- Slight organic variation
- No excessive motion

Interaction:

```text
User interacts with candles
→ flames disappear
→ celebration transition
```

The interaction should work on mobile touch screens.

Do not implement microphone blowing unless explicitly requested.

After the candles are blown out:

```text
Yay!! Happy birthdayyyy madam
```

The transition should feel celebratory.

Use Reference Image 3 once it is supplied.

---

# 11. RESPONSIVE DESIGN

The recipient may open this on a phone.

Therefore:

- Design mobile-first.
- Do not simply shrink desktop.
- Preserve scrapbook composition.
- Reposition decorative elements intentionally.
- Make interactions touch-friendly.
- Prevent horizontal overflow.

Test at minimum:

```text
360px
390px
430px
768px
1280px+
```

---

# 12. FILE ORGANIZATION

Recommended:

```text
src/
  app/
  components/
    scrapbook/
    animation/
    ui/

  features/
    page-01-envelope/
    page-02-birthday/
    page-03-cake/

  lib/
  styles/

public/
  assets/
    global/
    page-01-envelope/
    page-02-birthday/
    page-03-cake/

docs/
  TECHSTACK.md
  PLAN.md
  INSTRUCTIONS.md
  PHASES.md
  ASSET_SOURCES.md
```

Keep page-specific logic inside the page feature folder.

Shared components belong in shared folders.

---

# 13. CLAUDE CODE WORKFLOW

Before each phase:

1. Read `TECHSTACK.md`.
2. Read `PLAN.md`.
3. Read `INSTRUCTIONS.md`.
4. Read `PHASES.md`.
5. Inspect the existing implementation.
6. Inspect the relevant reference image.
7. Identify required assets.
8. Implement only the requested phase.
9. Run the application.
10. Test interaction.
11. Check mobile layout.
12. Fix visual issues.
13. Report exactly what changed.
14. Stop.

Do not automatically continue to the next phase.

---

# 14. BEFORE CODING

For every phase, first provide a short implementation plan:

```text
Current phase:
Reference:
Components to create/change:
Assets required:
Animation sequence:
Validation:
```

Then implement.

Do not start coding if a critical requirement is ambiguous.

---

# 15. AFTER CODING

Always verify:

- TypeScript errors
- Build errors
- Runtime errors
- Broken image paths
- Missing assets
- Mobile overflow
- Animation glitches
- Click/tap interaction
- Accessibility basics

Do not declare the phase complete merely because the code compiles.

---

# 16. VISUAL QA

For each page, compare the implementation against the reference.

Check:

- Overall composition
- Proportions
- Spacing
- Photo position
- Decorative density
- Typography scale
- Maroon usage
- Paper appearance
- Animation timing
- Mobile composition

If something looks wrong, fix it before moving forward.

---

# 17. CANVA USAGE

Use Canva when custom visual assets will be faster or better than coding them.

Good Canva candidates:

- Scrapbook stickers
- Cutout lettering
- Decorative frames
- Tape
- Paper scraps
- Custom labels
- Handwritten elements
- Photo collage elements

Do not use Canva to build the entire interactive website.

Canva creates the visual assets.

Claude Code builds the interactive experience.

---

# 18. DO NOT OVERENGINEER

This is a personal interactive experience.

Do not introduce:

- Database
- Authentication backend
- CMS
- Admin dashboard
- API layer
- unnecessary state-management library
- unnecessary component library

unless a later feature genuinely requires one.

Pages 1–3 should work as a lightweight interactive frontend.

---

# 19. DEFINITION OF DONE

A phase is done only when:

- The intended visual design is implemented.
- The intended interaction works.
- Required assets are local.
- Assets have source/license documentation when externally sourced.
- Mobile layout works.
- Animations are smooth.
- No unrelated feature was changed.
- No invented personal content was added.
- The user can review and approve the result.

STOP after the phase.

Do not continue automatically.
