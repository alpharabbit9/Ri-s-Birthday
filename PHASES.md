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
- `MADAM Ji`
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

# PHASE 6 — PAGE 4: ACCEPT YOUR GIFT?
Reference

Use Reference Image 4 as the primary reference.

Objective

Create an interactive page asking:

Accept your gift?

The page should feel like the same scrapbook universe as Pages 1–3.

Visual

Recreate the visual language and composition of Reference Image 4.

Do not copy the artwork directly.

Replace reference blue with:

#800000

Keep paper/cream/white elements neutral.

Cat Birthday Gift Sticker

Find a suitable cat-with-birthday-gift sticker matching the reference style.

Preferred order:

Create a suitable original asset.
Create the asset with Canva.
Download a properly licensed reusable asset.

Store it in:

public/assets/page-04-gift-choice/stickers/

Document external assets in:

docs/ASSET_SOURCES.md

Do not hotlink external assets.

Buttons

Two choices:

YES
NO

Buttons must feel like scrapbook elements.

NO PATH

When the user selects:

NO

navigate to a separate response state/page inspired by Reference Image 5.

Important

Do NOT use the cat from Reference Image 5.

Use:

sticker/sticker-1

The sticker must appear against:

#800000

maroon background.

The provided sticker already contains the intended visual/text.

Do not replace it with an invented sticker.

Animation

Suggested:

NO clicked
↓
transition
↓
maroon background
↓
sticker enters
↓
sticker settles
YES PATH

When the user selects:

YES

navigate to:

Page 5

Use a scrapbook/page-transition animation.

Validation

Verify:

YES works.
NO works.
sticker-1 is used.
Maroon background is correct.
Mobile touch works.
Desktop click works.
No horizontal overflow.

Do not build Page 5 yet.

STOP.

## PHASE 7 — PAGE 5: CHOOSE YOUR GIFT
Reference

Use Reference Image 7.

Heading

Display:

Yay! Choose your gift
Gifts

There are FOUR gift options:

Gift 1 → Envelope
Gift 2 → Flower
Gift 3 → Gift Box
Gift 4 → Surprise

The four gifts should be presented in a scrapbook-style arrangement.

On desktop they may appear side-by-side if visually appropriate.

On mobile, rearrange them into a readable layout.

Gift 1

Visual:

Envelope

Click:

→ Page 6
Gift 2

Visual:

Flower

Click:

→ Page 7
Gift 3

Visual:

Gift Box

Click:

→ Page 8
Gift 4

Visual:

Surprise

Gift 4 has no destination/content yet.

DO NOT invent the surprise.

Do not create Page 9.

Leave the interaction ready for future implementation.

Animation

Entrance:

heading
↓
gift 1
↓
gift 2
↓
gift 3
↓
gift 4

Use staggered scrapbook-style animation.

On hover/tap:

subtle lift
slight rotation
slight scale

Avoid excessive bouncing.

Validation

Verify:

Four gifts exist.
Gift 1 → Page 6.
Gift 2 → Page 7.
Gift 3 → Page 8.
Gift 4 does not invent content.
Mobile works.
Touch targets are usable.

Do not build Pages 6–8 during this phase.

STOP.

# PHASE 8 — PAGE 6: GIFT 1 — LETTER
Reference

Use Reference Image 8.

## Objective

Create the letter page opened through:

Gift 1 → Envelope
Layout
LEFT

A letter/paper area with:

Torn paper edge
RIGHT

Two photographs.

The photographs must be provided by the user.

Do not invent personal photographs.

If they have not been provided:

Use temporary development placeholders.
Ask for the actual images before finalizing.
Letter

The letter should feel physical.

Use:

paper texture
torn edge
scrapbook decorations
handwritten/serif typography
subtle paper movement

The actual letter content must come from the user.

Do not invent personal relationship content.

Animation

Suggested:

page enters
↓
paper settles
↓
torn letter reveals
↓
letter content appears
↓
photo 1 enters
↓
photo 2 enters
↓
decorations settle

Keep the text readable.

Back Button

Include:

← Back

Return to:

Page 5

The back button should be styled as part of the scrapbook.

Validation

Check:

Torn-paper effect
Letter readability
Two photographs
Animation
Back navigation
Mobile layout

STOP.

PHASE 9 — PAGE 7: GIFT 2 — FLOWER
Reference

Use Reference Image 9.

Main Asset

Use:

sticker/sticker-2

This is the primary visual asset for Gift 2.

If the file cannot be found, stop and ask the user to provide it.

Do not replace it with a random sticker.

Visual

Follow Reference Image 9's:

Composition
Scrapbook structure
Paper treatment
Decorative density
Interaction concept

Replace reference blue with:

#800000
Animation

Suggested:

page transition
↓
paper appears
↓
sticker/flower enters
↓
decorations appear
↓
subtle idle movement

Keep it elegant.

Back Button

Include:

← Back

Return to:

Page 5
Validation

Verify:

Correct sticker-2
Reference composition
Maroon theme
Back navigation
Mobile layout

STOP.

PHASE 10 — PAGE 8: GIFT 3 — GIFT BOX
[REMOVED 2026-10-15 at the user's request. This page, its feature folder (`src/features/page-08-giftbox/`) and its assets (`public/assets/page-08-giftbox/`) were deleted; the Choose-your-gift menu no longer links to it and now shows three gifts (the surprise relabelled "Gift 3"). The spec below is kept for historical reference only — do not rebuild it unless the user asks.]
Reference

Use Reference Image 10.

Objective

Create the page opened through:

Gift 3 → Gift Box
Visual

Follow Reference Image 10's:

Layout
Scrapbook composition
Paper treatment
Decorative style
Interaction concept

Replace reference blue with:

#800000
Gift Box

The gift box should be the primary interactive object.

If the reference contains an opening/reveal interaction, recreate the concept using:

Framer Motion
GSAP
CSS

Do not invent what is inside the box.

If the contents have not been provided:

Build the box/opening interaction only.
Leave the reveal content ready for later.
Animation

Suggested:

page enters
↓
gift box appears
↓
subtle idle motion
↓
user clicks/taps
↓
box opens
↓
provided content/reveal appears
Back Button

Include:

← Back

Return to:

Page 5
Validation

Verify:

Reference Image 10 is followed.
Gift box interaction works.
No invented contents.
Back works.
Mobile interaction works.
Animation is smooth.

STOP.

# Phase 11 — Gift 4: Birthday Surprise Intro

### Objective
Implement the destination for Gift 4 from Page 5, following Reference Image 11 as closely as possible.

### Design and Content
- Use a full maroon background matching the website’s existing color palette.
- Display an envelope, camera, and rose bouquet as decorative elements.
- Show a birthday card emerging from the envelope.
- The card must display **“Happy Birthday Madam”**.
- Add **“Click me”** underneath the composition.
- Match the reference’s layout, proportions, decorative elements, and handmade scrapbook aesthetic.
- Use suitable local assets and stickers. Do not replace the established design with a generic layout.

### Interaction
- Clicking the card or “Click me” transitions to Phase 12.
- Keep the transition consistent with the website’s existing animation style.

### Validation
- Verify the Gift 4 button on Page 5 navigates to this page.
- Test the click interaction, animations, and responsive layout.
- Stop after completing this phase and report the result.

---

# Phase 12 — Birthday Diary Opening Spread

### Objective
Create the opened spiral-diary birthday spread based on Reference Image 12.

### Design and Content
- Use a maroon background.
- Display a large, open spiral-bound diary.
- **Left page:**
  - Large number: **“22”**
  - Birthday message:

    “Happy Birthday Madam! Another year of being you and somehow you making my life better by just being in it ❤️”

- **Right page:**
  - Display `public/assets/page-12-diary/images/us1.jpeg` as a Polaroid-style photograph.
  - Add a **“favourite person”** sticker at the top-right of the Polaroid.
  - Surround the photograph with suitable scrapbook stickers and small decorative elements.
  - Add **“I love you”** as a subtitle.

### Design Rules
- Follow Reference Image 12 for the diary, spiral binding, composition, spacing, and visual hierarchy.
- Use the existing maroon, cream, beige, and paper-texture palette.
- Preserve the original photograph without distorting it.
- Do not add any extra personal messages.

### Interaction
- This spread leads into the scrolling scrapbook sections.
- Do not create a page-turn transition between this spread and Phase 13. The following sections must appear through normal vertical scrolling.

### Validation
- Check the photograph, text, stickers, diary proportions, and mobile responsiveness.
- Stop after completing this phase and report the result.

---

# Phase 13 — Scrolling Memory Scrapbook

### Objective
Create the next vertically scrollable section, inspired by Reference Image 13.

### Layout
This section contains two distinct scrapbook compositions stacked vertically within the same scrolling page.

### Top Composition
- **Left side:** Display `public/assets/page-13-memories/images/us2.jpeg` in a Polaroid-style frame.
- Place an opened envelope behind the Polaroid.
- **Right side:** Leave a dedicated text area for the user to fill in later.
- Do not invent or write placeholder personal messages.

### Bottom Composition
- **Right side:** Display a Polaroid-style photograph using an appropriate user-provided image only if the intended image asset is available and confirmed. Do not assume that `us2.jpeg` should be reused.
- Add decorative sticky tape at the top-right and bottom-left corners of the Polaroid.
- **Left side:** Leave a dedicated text area for the user to fill in later.
- Do not invent or write placeholder personal messages.

### Design Rules
- Match Reference Image 13’s scrapbook composition and spacing.
- Maintain the maroon background and complementary paper colors.
- Keep the top and bottom compositions visually distinct.
- On smaller screens, stack the elements cleanly without losing the intended scrapbook appearance.
- Use natural vertical scrolling, not a page-turn animation.

### Validation
- Verify both compositions appear in the correct order.
- Confirm the text areas remain easy to edit later.
- Test desktop and mobile scrolling.
- Stop after completing this phase and report the result.

---

# Phase 14 — Photo Reel

### Objective
Create a dedicated photo-reel section inspired by Reference Image 14.

### Content
Use the following user-provided photographs:

- `us4`
- `us5`
- `us6`
- `us7`
- `us8`

Locate the actual image files in the project before implementation. Do not invent replacements if an asset is missing.

### Design and Interaction
- Recreate the reference’s photo-reel composition as closely as possible.
- Arrange the photographs into a cohesive visual sequence.
- Use subtle, polished motion that complements the scrapbook style.
- Preserve the original images and their aspect ratios.
- Make the reel responsive and usable on desktop and mobile.
- Integrate it into the existing vertical scrolling flow; do not add an unnecessary page transition.

### Validation
- Confirm all five photographs are included and displayed correctly.
- Test any reel animation or interaction.
- Ensure scrolling into and out of the section works naturally.
- Stop after completing this phase and report the result.

---

# Phase 15 — Final Memory Letter

### Objective
Create the final scrapbook letter section inspired by Reference Image 15.

### Design
- Use the existing maroon background.
- Create a paper page with rounded cutouts along its sides.
- Arrange photographs unevenly along the right side, following the reference.
- Include a cassette, musical-note decorations, and teddy-bear stickers.
- Use `public/assets/page-15-final-letter/images/us9` for the designated photograph. Locate the exact file extension and path in the project before implementation.
- Keep the letter readable and visually prominent.
- Use scrapbook-style paper textures, layered decorations, and subtle shadows without overcrowding the composition.

### Letter Content
Display the following text exactly as provided:

“And just like that another little chapter becomes a memory . I hope you always remember how loved you are , not just today . But in all the ordinary moment in between . here's to out late night converation , Our funny reels ( well technically your reels , coz u dont find my ones funny) , silly pictures , our bus moments and all the memories we havent made yet . whatever comes next , i am glad I get to e part of it”

Do not rewrite, correct, or change the wording without permission.

### Closing Message
Add the following in a slightly larger, prominent font:

**“Saranghaeyo nae sarang”**

### Interaction and Layout
- This section appears naturally when the user scrolls down from the photo reel.
- Do not introduce an unnecessary page-turn transition.
- Keep the letter comfortable to read on mobile and desktop.
- Make sure the photograph and decorations do not overlap or obscure the text.

### Validation
- Verify the complete letter against the supplied text.
- Check the photograph, cassette, music notes, teddy bears, and side cutouts.
- Test the full scrolling experience and responsive layout.
- Stop after completing this phase and report the result.

---

# Phase 16 — Persistent Background Music

### Objective
Add background music to the birthday scrapbook website without disrupting the existing design, navigation, or scrolling experience.

### Audio Asset
- Store the selected music file under `public/assets/global/music/`.
- Use a song explicitly provided or approved by the user.
- If no song file has been provided, implement the music functionality without inventing or downloading a copyrighted song.

### Playback Requirements
- Start playback after the user successfully unlocks the scrapbook on Page 2, following a user-triggered action.
- Use a gentle fade-in when playback begins.
- Continue playing across all page transitions and scrolling sections.
- Loop the track when it ends.
- Do not restart the song when navigating between pages or sections.
- Add a small, unobtrusive music control that fits the scrapbook aesthetic.
- Include play/pause and mute/unmute controls, plus volume adjustment.
- Keep the controls accessible on desktop and mobile.
- Handle playback failures gracefully and provide a way for the user to start playback manually if needed.
- Respect reduced-motion preferences when animating the fade-in.

### Implementation Rules
- Use a single persistent audio element managed by a shared React context or equivalent global music controller.
- Keep the audio controller mounted across navigation.
- Keep playback state separate from individual page components.
- Handle the promise returned by `audio.play()` and browser autoplay restrictions correctly.
- Do not create separate audio players on individual pages.
- Do not autoplay before the user has interacted with the website.

### Validation
- Test playback after unlocking.
- Test play/pause, mute/unmute, volume, looping, and fade-in.
- Navigate through all scrapbook pages and sections to confirm music continues without restarting.
- Test mobile behavior and browser playback restrictions.
- Verify the music controls do not obscure important content.

### Final Review
- Run the project's available checks and fix regressions caused by this phase.
- Test the full scrapbook from the initial envelope through the final letter.
- Confirm all links, buttons, photos, scrolling sections, and responsive layouts work.
- Report any missing assets or unfinished text areas without inventing content.
- Stop after the final review and provide a concise completion report.
DO NOT:

Invent the surprise.

Create random content.
Guess the intended interaction.

Wait for explicit user instructions.

STOP.

### PHASE 17 — FINAL POLISH

Only execute after all phases are approved.

Tasks
Final animation polish.
Final page transitions.
Mobile optimization.
Touch interaction refinement.
Asset optimization.
Loading optimization.
Production build testing.
Browser testing.
Reduced-motion testing.
Final consistency check.

Do not add new personal content during this phase.

**Do not implement these until the user provides their exact content and approves their page design.**

---

# FINAL EXECUTION RULE

At the end of every phase, Claude Code must stop.

The next phase begins only when the user explicitly requests it.
