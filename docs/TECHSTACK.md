# Tech Stack — Interactive Birthday Scrapbook

## 1. Project Goal

Build a highly personal, interactive birthday scrapbook website for the user's girlfriend.

The experience should feel like a **physical handmade scrapbook brought to life on the web**, not like a normal landing page.

Primary visual direction:

- Handmade scrapbook / journal
- Maroon and warm off-white instead of the blue shown in the reference images
- Paper textures
- Polaroid/photo frames
- Cut-out letters
- Stickers
- Tape
- Doodles
- Slightly imperfect handmade edges
- Cinematic but gentle animations
- Personal photos and memories
- Mobile-first because the recipient is likely to open it on a phone

### Primary brand color

```text
Maroon: #800000
```

Use maroon as the replacement for the dominant blue in the references.

Suggested supporting colors:

```text
Cream / paper: #F7F1E5
Warm white: #FFFDF8
Dark ink: #211A17
Soft beige: #E8DDCC
Muted gold accent: #C9A227
```

Do not turn the project into a generic red/pink Valentine's Day design.

---

# 2. Core Stack

## Framework

- Next.js
- TypeScript
- App Router

Use the current stable versions available in the development environment unless the repository already has an established version.

## Styling

- Tailwind CSS
- CSS variables for the scrapbook design tokens
- CSS where it is more appropriate than utility classes for paper textures, masks, irregular borders, etc.

## Animation

### Framer Motion

Primary animation library for:

- Element entrance animations
- Delayed staggered reveals
- Page transitions
- Buttons
- Modal/overlay transitions
- Image/card animations
- Simple transforms

### GSAP

Use GSAP when Framer Motion is not the best fit, especially for:

- Complex timeline animations
- Candle flame/blow-out sequence
- Scrapbook/page choreography
- Scroll-linked sequences
- Precise multi-element movement
- Complex entrance timelines

Do not use both libraries for the same simple animation without a reason.

### Lenis

Use Lenis for smooth scrolling on scroll-heavy pages.

Do not force Lenis into pages where normal scrolling is better.

---

# 3. UI / Icons

Use:

- Lucide React for simple interface icons when needed.
- Custom SVG assets for scrapbook decorations when appropriate.

Avoid generic UI iconography when a handmade decorative element would fit the visual language better.

The website should not look like a component-library demo.

---

# 4. Assets

All visual assets must be stored locally in the repository.

Never depend on random remote image URLs for production.

Recommended structure:

```text
public/
  assets/
    global/
      textures/
      fonts/
      stickers/
      icons/
      decorations/

    page-01-envelope/
      images/
      stickers/
      decorations/
      sounds/

    page-02-birthday/
      images/
      stickers/
      decorations/
      textures/

    page-03-cake/
      images/
      stickers/
      decorations/
      animations/
```

Every asset should have a meaningful filename.

Example:

```text
page-02-birthday/
  images/
    madam-photo-01.webp

  decorations/
    maroon-star.svg
    paper-tape-01.png

  stickers/
    birthday-lettering.svg
```

---

# 5. Asset Acquisition Rules

If an animation, sticker, icon, texture, font, or decorative asset is needed:

1. First determine whether it can be created with CSS/SVG.
2. If not, search for an appropriate downloadable asset.
3. Prefer:
   - Public-domain assets
   - Openly licensed assets
   - Assets explicitly permitted for reuse
   - Canva-created original assets
4. Download the asset into the appropriate page-specific folder.
5. Do not hotlink the asset.
6. Record the source and license in:

```text
docs/ASSET_SOURCES.md
```

Do not download random copyrighted artwork merely because it visually matches the reference.

For custom scrapbook decorations, Canva can be used to create original assets and export them as PNG/SVG with transparent backgrounds.

---

# 6. Fonts

Typography is a major part of the scrapbook aesthetic.

Use a combination such as:

- A readable serif for body/letter text
- A handwritten/script font for scrapbook labels
- A bold display font for cut-out birthday lettering

Do not use too many fonts.

Maximum recommended:

```text
1 body font
1 handwritten/display font
1 optional decorative font
```

Any externally sourced font must have a usable license and be stored/documented appropriately.

---

# 7. Image Handling

User photos are first-class content.

Requirements:

- Optimize images for web.
- Prefer WebP/AVIF where practical.
- Preserve visual quality.
- Use `next/image` where appropriate.
- Do not crop faces aggressively.
- Do not alter personal photos unless explicitly requested.
- Keep original source photos outside generated/optimized asset folders when possible.

---

# 8. Audio

Audio is optional and must never autoplay unexpectedly.

If background music is added later:

- Provide an obvious mute/unmute control.
- Respect browser autoplay restrictions.
- Keep audio assets local.
- Document source/license.

---

# 9. Deployment

Recommended:

- Vercel
- GitHub

The project should remain deployable as a mostly static/client-interactive experience.

No backend is required for Pages 1–3 unless a future feature explicitly needs one.

---

# 10. Performance

This is a visual project, but performance matters.

Requirements:

- Lazy-load non-critical images.
- Avoid enormous PNGs where WebP/WebP-compatible alternatives work.
- Keep animation transforms GPU-friendly where possible.
- Prefer `transform` and `opacity`.
- Avoid expensive continuous layout calculations.
- Respect `prefers-reduced-motion`.
- Test mobile performance.
- Do not add a library merely for one tiny effect.

---

# 11. Accessibility

Even though this is a personal surprise website:

- Buttons must be keyboard accessible.
- Images should have meaningful alt text where appropriate.
- Interactive elements must have clear labels.
- Do not make essential content dependent on hover.
- Respect reduced-motion preferences.

---

# 12. Development Principle

The project must be developed **one page/feature at a time**.

Never implement future pages merely because their rough structure is known.

For each phase:

```text
Understand reference
→ inspect existing code
→ implement one page
→ run
→ visually verify
→ fix
→ validate mobile
→ only then proceed
```

Do not invent missing content.

When something is unclear, stop and ask the user rather than hallucinating.
