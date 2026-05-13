# Capriagos — Version 2 Expansion Plan

> **Skill applied:** `frontend-design` — Production-grade, distinctive UI with intentional aesthetic direction, bold motion design, and spatial composition.

---

## 🎯 Design Direction: "Editorial Slow Cinema"

V2 doubles down on the brand's core identity: **a curated, slow, intentional experience**. Think editorial fashion film — not a shop, but a discovery. Every scroll should feel like turning a page in a high-end lookbook. Animations are unhurried, weighted, and purposeful. The site should feel *alive* without feeling busy.

**Mood keywords:** Warm silence · Tactile luxury · Considered motion · Human imperfection

---

## 🧩 New Sections & Pages

### 1. Lookbook / Editorial Section
**Status:** Missing — High Priority

A horizontal-scroll editorial gallery inspired by fashion magazine spreads.

- **Layout:** Full-bleed imagery with overlapping serif captions, like printed pages
- **Interaction:** Mouse-drag horizontal scroll (Framer Motion `useDragControls`) with inertia
- **Animation:**
  - Images enter with a slow `clipPath` wipe: `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`
  - Caption text reveals via a masked `y-offset` slide-up (text clip mask technique)
  - Drag cursor transforms: custom cursor morphs to a circular "drag" indicator on hover
- **Content:** 5–7 styled editorial shots per collection drop

---

### 2. Product Detail Modal / Page
**Status:** Missing — High Priority

Currently, clicking a product does nothing meaningful. V2 needs a full product experience.

- **Layout:** Split-screen — left: large image gallery, right: product details
- **Interaction:** Shared element transition — product card image "expands" into the detail view (Framer Motion `layoutId`)
- **Animation:**
  - Card image morphs smoothly to fill the left panel (`layoutId` magic)
  - Details panel slides in from right with stagger on each text element
  - Size selector uses morphing pill buttons with spring scale on selection
  - "Add to bag" button: magnetic effect + ink-blot fill animation on click
- **Image Gallery:** Thumbnail strip with smooth crossfade on thumbnail click

---

### 3. Brand Story Page (`/story`)
**Status:** Stub — Needs Expansion

Transform the current `StorySection` into a dedicated immersive page.

- **Layout:** Long-form scroll narrative, alternating image/text in a zig-zag composition
- **Visual Style:** Textured paper-like sections using CSS `::before` grain overlays
- **Animation:**
  - Handwritten script (`Caveat`) text draws itself via SVG `stroke-dashoffset` animation on scroll entry
  - Section dividers: organic wavy SVG line that animates in on scroll
  - Parallax depth: background images scroll at 0.6× the foreground text speed
  - Pull-quote blocks rotate ±2° with a subtle paper-curl shadow (`box-shadow` layered)

---

### 4. Wishlist / Save for Later
**Status:** New Feature

- Heart icon on product cards, persisted to `localStorage`
- Wishlist drawer (mirroring the Cart Drawer's slide-in pattern)
- **Animation:** Heart "burst" animation on save — particles scatter using CSS keyframes, icon fills with a spring-physics pulse

---

### 5. Newsletter / Community Capture
**Status:** Missing

- Minimal mid-page interstitial (not a popup): a full-width section between StorySection and Testimonials
- **Layout:** Dark, textured panel with a handwritten headline in `Caveat`, single email input
- **Animation:**
  - Input field border animates a slow "draw" outline on focus (SVG animated border)
  - Submit button uses a "liquid fill" CSS clip-path animation on hover

---

### 6. "Recently Dropped" Live Ticker
**Status:** New Feature

- Top of page, above the header: a thin marquee bar showing recently added pieces
- **Animation:** CSS `animation: marquee` with `translateX`, paused on hover
- **Content:** `["Just added: Rust Silk Slip · ₹799", "Now live: Vintage Cord Blazer · ₹1,499", ...]`

---

## 🎬 Animation Overhaul (Fluid Motion Upgrade)

### A. Page Load Sequence — "The Curtain Rises"

Current: simple fade-ins per element.

**V2 Plan:** A choreographed, cinematic page-load sequence.

```
0ms    → Logo draws in via SVG stroke animation (0.8s)
200ms  → Ticker bar slides down from top (0.4s spring)
400ms  → Nav items materialize left-to-right (stagger 0.06s each)
600ms  → Hero background slowly scales from 1.05 → 1.0 (Ken Burns, 1.5s)
800ms  → Hero tagline: character-by-character reveal using split text
1000ms → Hero title: masked slide-up, line by line
1200ms → CTA buttons fade up with spring overshoot
```

**Implementation:** Framer Motion `AnimatePresence` + `useAnimate` with a sequenced `animate()` call in a single orchestrating hook `usePageEntrance.js`.

---

### B. Scroll-Linked Animation System

Replace isolated `whileInView` triggers with a cohesive scroll-linked system.

| Section | Effect |
|---|---|
| CategoryNav | Cards tilt 3D on scroll approach (`rotateY` + `perspective`) |
| ProductGrid | Items enter in a cascading wave — row by row, not card by card |
| StorySection | Text lines reveal sequentially, tied to scroll position (not just viewport entry) |
| Testimonials | Carousel cards blur-shift in depth (`filter: blur` + `scale`) as they move off-center |
| Footer | Content columns fan out from center on scroll entry |

**Implementation:** `useScroll` + `useTransform` from Framer Motion, scroll progress mapped to each visual property.

---

### C. Cursor System — Custom Magnetic Cursor

Replace the browser default cursor with a branded two-layer cursor.

- **Outer ring:** 40px circle, follows cursor with ~100ms lag (`lerp` animation in `requestAnimationFrame`)
- **Inner dot:** 8px dot, exact cursor position, instant
- **States:**
  - Default: outer ring visible, inner dot
  - Hovering links/buttons: outer ring expands to 60px, fills with `--color-rust` at 20% opacity
  - Hovering product images: outer ring transforms to show "VIEW" text
  - Dragging lookbook: ring morphs to show "DRAG →"
- **Implementation:** `useMagnetic.js` hook using `useMotionValue` + `useSpring` from Framer Motion

---

### D. Product Card — Full Interaction Redesign

Current state: basic float-up hover.

**V2 Plan:**

```
Default state:
  - Image at rest, info below

Hover (entry, 0–200ms):
  - Card lifts 12px (cubic-bezier spring)
  - Shadow expands: 0 8px 40px rgba(166,93,63,0.3)
  - Image scales to 1.06 with parallax shift tied to mouse position (mousemove → translate)

Hover (settled, 200ms+):
  - Mouse position drives subtle image tilt: rotateX/Y ±5° (3D card effect)
  - Overlay fades in with "Quick Add" button

Exit (200ms spring):
  - Smooth return with slight overshoot on y-axis
```

**Implementation:** `useMotionValue(mouseX/Y)` + `useTransform` for tilt, Framer Motion `whileHover` for scale/shadow.

---

### E. Cart Drawer — Spring Physics Upgrade

Current: basic slide-in.

**V2:**
- Entry: `x: "110%"` → `x: 0` using a spring with `stiffness: 300, damping: 30` (bouncy but controlled)
- Backdrop: blur animates from 0 → 8px simultaneously
- Item add: new item "drops in" from top with `y: -20 → 0` + flash of `--color-gold-accent` border
- Quantity change: number flips using exit/enter animation (`AnimatePresence` + `y` offset)
- Remove item: item slides out right with `opacity: 0, x: 100%` then remaining items compress smoothly (`layout` prop)

---

### F. Navigation Overlay — Cinematic Open/Close

Current: staggered text reveal.

**V2:**
- **Open:** Black panel sweeps in from top with `clipPath: inset(0 0 100% 0)` → `inset(0 0 0% 0)` (0.6s `easeInOut`)
- **Nav items:** Each letter in each word staggers in independently (split-character animation)
- **Background:** While menu is open, the page content behind scales to `0.96` and blurs `4px`
- **Close:** Panel sweeps out upward, page scales back with spring overshoot to `1.0`
- **Hover on nav item:** Large ambient image fades in the background showing that category's editorial shot

---

## 📐 Layout & Composition Improvements

### Asymmetric Product Grid V2

Replace the current uniform grid with a true **editorial masonry** layout:

```
Row 1: [Large 2-col card] [Small card] [Small card]
Row 2: [Small card] [Small card] [Large 2-col card]
Row 3: [Medium card] [Medium card] [Medium card]
```

Use CSS `grid-column: span 2` on featured items, driven by a `featured: true` flag in product data.

### Section Breathing Room

- Increase vertical spacing between sections: `min(12vw, 160px)` between major sections
- Add thin horizontal rule dividers: 1px lines with a slow horizontal `scaleX` reveal animation

---

## 🛠️ Technical Upgrades

| Item | Current | V2 |
|---|---|---|
| Image Loading | `loading="lazy"` | Blur-up placeholder (base64 LQIP → full image crossfade) |
| Animation Library | Framer Motion (basic) | Framer Motion + custom hooks for cursor, magnetic, split-text |
| State Management | React Context | React Context + `localStorage` sync for wishlist |
| Scroll Engine | `whileInView` | `useScroll` + `useTransform` for scroll-linked animations |
| Routing | None (SPA) | React Router for `/story`, `/product/:id`, `/lookbook` |
| Performance | None | `React.lazy` + `Suspense` for route-level code splitting |
| SEO | None | React Helmet for title/meta per page |
| Fonts | Google Fonts (network) | Self-hosted subset via `fontsource` (faster, no FOUT) |

---

## 🆕 New Hooks & Utilities

```
/src/hooks/
  usePageEntrance.js        — Orchestrates the cinematic page load sequence
  useMagnetic.js            — Magnetic cursor effect for interactive elements
  useParallaxTilt.js        — 3D tilt on mouse position for cards
  useSplitText.js           — Splits text into spans for character animation
  useScrollProgress.js      — Per-section scroll progress values
  useLQIP.js                — Low-quality image placeholder blur-up logic
  useWishlist.js            — Wishlist state with localStorage persistence
```

---

## 📋 Implementation Priority

| Priority | Feature | Est. Effort |
|---|---|---|
| 🔴 P0 | Custom cursor system | 1 day |
| 🔴 P0 | Product detail modal with `layoutId` | 2 days |
| 🔴 P0 | Cinematic page load sequence | 1 day |
| 🟠 P1 | Product card 3D tilt + mouse parallax | 1 day |
| 🟠 P1 | Lookbook horizontal scroll section | 2 days |
| 🟠 P1 | Cart drawer spring physics upgrade | 0.5 days |
| 🟠 P1 | Asymmetric editorial product grid | 1 day |
| 🟡 P2 | Nav overlay cinematic redesign | 1 day |
| 🟡 P2 | Brand story immersive page | 2 days |
| 🟡 P2 | Wishlist feature + drawer | 1 day |
| 🟢 P3 | Newsletter section | 0.5 days |
| 🟢 P3 | Recently Dropped ticker | 0.5 days |
| 🟢 P3 | Blur-up image placeholders (LQIP) | 0.5 days |
| 🟢 P3 | React Router + page routing | 1 day |

**Total estimated effort: ~15 dev days**

---

## 🎨 Design Token Additions for V2

```css
/* New additions to :root */
--color-ink: #0D0D0D;           /* Deeper black for text on light backgrounds */
--color-parchment: #EDE8DF;     /* Warmer, more textured cream */
--color-terracotta: #C4622D;    /* Richer rust alternative for hover states */
--color-moss: #3E4A3F;          /* Deeper forest for layered depth */
--color-copper: #B87333;        /* New metallic accent */

--shadow-float: 0 16px 64px rgba(20, 12, 8, 0.5);
--shadow-card: 0 4px 24px rgba(20, 12, 8, 0.3);

--spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1);
--spring-soft:   cubic-bezier(0.22, 1, 0.36, 1);
--spring-stiff:  cubic-bezier(0.76, 0, 0.24, 1);

--duration-instant: 150ms;
--duration-fast:    300ms;
--duration-normal:  500ms;
--duration-slow:    800ms;
--duration-cinematic: 1200ms;
```

---

## ✅ V2 Success Criteria

- [ ] Page load feels like a film opening — choreographed, not scattered
- [ ] Every interactive element has a distinct, weighted micro-interaction
- [ ] Clicking a product card transitions seamlessly into the product detail (no jarring page jump)
- [ ] The lookbook section makes users want to linger and explore
- [ ] Custom cursor feels like a premium design signature
- [ ] All animations maintain 60fps on mid-range hardware
- [ ] Scroll-linked animations feel tied to user intent, not auto-playing
- [ ] The site feels unmistakably Capriagos — not a template, a brand

---

## 🗂️ Full Page Expansions

V2 introduces proper routing via React Router. Every category and utility page gets a distinct layout, personality, and entrance animation while sharing the global design system.

---

### Page: `/women` — Women's Collection

**Concept:** Warmth meets edge. A soft, editorial space that doesn't shy away from boldness.

**Layout:**
- **Hero Banner:** Full-width, tall (70vh) image — a styled model shot with overlaid serif headline: *"Dressed with intention"*. Text sits bottom-left, large and unhurried.
- **Filter Bar:** Sticky below the hero. Pill-based filters: `All · Tops · Bottoms · Dresses · Outerwear · Accessories`. Active filter glows with a `--color-rust` underline that slides between pills.
- **Product Grid:** Asymmetric editorial grid (see grid spec above). Featured "drop" items span 2 columns.
- **Lookbook Insert:** After every 8 products, a full-width editorial image breaks up the grid — no border, bleeds edge-to-edge.
- **Sort & Count Bar:** *"24 pieces found"* in `Caveat` font, sort dropdown with custom styled select.

**Animations:**
- Hero image enters with a `clipPath` curtain reveal top-to-bottom (0.8s)
- Headline characters stagger in left-to-right after image settles (0.6s delay)
- Filter pills cascade in from left with `x: -20 → 0`, stagger 0.04s each
- On filter change: grid items exit with `opacity: 0, scale: 0.96`, then new items enter staggered (smooth reflow using Framer Motion `layout` prop)
- Lookbook inserts scale from `1.04 → 1.0` as they enter the viewport

**Unique Detail:** A thin handwritten label in `Caveat` — *"women's"* — floats top-right of the page at 45° angle, fading in at 10% opacity. Subtle brand texture.

---

### Page: `/men` — Men's Collection

**Concept:** Structured restraint. A darker, moodier tone — forest greens and deep browns dominate. More editorial spacing.

**Layout:**
- **Hero Banner:** Split composition — 60% left: large dark image, 40% right: stacked headline + category stats (*"42 one-of-a-kind pieces"*).
- **Filter Bar:** Same pill system as Women but with Men's categories: `All · Shirts · Trousers · Outerwear · Knitwear · Accessories`.
- **Product Grid:** Slightly tighter grid — 3 columns at desktop, uniform sizing with more white space between cards. "Measured" not "maximalist".
- **Featured Picks Strip:** A curated horizontal scroll strip above the main grid: *"Picked for you this week"* — 4–5 manually curated items.
- **Size Availability Dots:** Small coloured dots below each product name indicate available sizes at a glance (S·M·L·XL).

**Animations:**
- Hero: left image fades up, right text block slides in from right — simultaneous, 0.6s spring
- Featured strip items: scroll-linked `x` parallax — items shift slightly as user scrolls past the strip
- Cards enter in strict left-to-right row waves (not scatter)

**Unique Detail:** A subtle `--color-forest` tint overlays the page background (via a fixed `div` at 8% opacity) — distinct from the Women's page warm-neutral feel.

---

### Page: `/unisex` — Unisex Collection

**Concept:** Fluid, boundary-free. The most experimental layout on the site — reflects the "between" nature of the category.

**Layout:**
- **Hero:** Full-viewport, no text initially. A single image fades in. Then a centered headline appears: *"Wear what speaks to you."* — minimal, powerful.
- **No Filter Bar:** By design. Unisex resists categorisation. Instead, a text toggle: *"Sort by: Newest · Price · Colour"*
- **Product Grid:** Most experimental layout — a true masonry grid with varying heights. Items are sized by their image's natural aspect ratio.
- **Colour-Story Groups:** Products are softly grouped into colour families with a thin painted watercolour swatch as a divider (SVG, hand-drawn aesthetic)

**Animations:**
- Hero text uses a per-word blur-in: `filter: blur(8px) → 0` with `opacity: 0 → 1` staggered per word
- Masonry items enter with a gentle `scale: 0.98 → 1` + `opacity: 0 → 1`, no hard directional slide
- Colour swatch SVG dividers draw themselves in on scroll (SVG `stroke-dashoffset`)

**Unique Detail:** A rotating ambient text ring in the hero — a circle of text that reads *"pre-loved · sustainable · one of a kind · pre-loved · sustainable ·"* slowly rotating at 20s/revolution. Pure CSS `animation: rotate`. Disappears on scroll past the hero.

---

### Page: `/home-decor` — Home Collection

**Concept:** Cozy editorial. Think a lifestyle magazine's "living" spread — slow afternoons, textured surfaces, warm objects.

**Layout:**
- **Hero:** Lifestyle shot — a styled interior vignette (candles, ceramics, fabrics). Headline: *"Objects with a past life."*
- **Category Tabs:** `All · Textiles · Ceramics · Art · Books · Décor` — tab bar with an ink-underline that slides.
- **Grid Style:** Large cards — only 2 columns at desktop. Images are tall (3:4 ratio). Generous padding. The products breathe.
- **"Style It Together" Curated Sets:** Below the main grid, 2–3 curated bundles — *"A Sunday Morning"* set showing complementary items in a mood-board layout.

**Animations:**
- Hero image has a very slow Ken Burns zoom: `scale: 1.08 → 1.0` over 3s on page load
- Tab switch: content fades out `opacity: 0` then new items cascade up `y: 20 → 0` (0.3s)
- Curated sets: items stagger in with a depth blur (`filter: blur(4px) → 0`) as they enter view

**Unique Detail:** A sticky sidebar on desktop (right side) with a hand-drawn illustration of a room that has clickable product hotspots — click a rug in the illustration, it links to that product. Mobile collapses to a simple featured strip.

---

### Page: `/story` — Brand Story (Full Immersive Page)

**Concept:** A long-form narrative experience. The reader slows down. This page earns the brand's sustainability claim rather than just stating it.

**Sections:**
1. **Opening:** Full-viewport dark screen. A single Caveat-font line fades in: *"Every piece has a past."* Then the page content reveals below.
2. **The Origin:** Two-column — left: founders' photo in an off-white border with a subtle paper texture. Right: handwritten-style body copy in `Caveat` at 22px, describing how Capriagos started.
3. **The Numbers:** A full-width stat strip — animated counters: *"1,200+ pieces rehomed · 0 new garments produced · ∞ stories continued"*. Numbers count up on scroll entry.
4. **The Process:** A 4-step horizontal scroll section showing the journey of a garment — *Found → Cleaned → Photographed → Loved Again*. Each step has a small icon, heading, and body text.
5. **The Letter:** A literal scanned handwritten letter on a paper-texture background (sepia tones), slightly rotated ±1°. This is the emotional core of the brand.
6. **The Promise:** A dark closing section — *"We promise to never sell fast fashion. Ever."* in 60px display serif, centered, with a slow line growing underneath as the user scrolls through.

**Animations:**
- Opening: fade from black, 1.5s
- Body text sections: each paragraph line reveals with a `y: 24 → 0` + `opacity` trigger on scroll entry, staggered 0.08s per line
- Stat counters: count up from 0 using a custom `useCountUp` hook, triggered by scroll entry
- The Letter: subtle paper flutter — `rotate: ±0.3°` on a 4s loop CSS animation
- Promise section: the line under the text `scaleX: 0 → 1` tied directly to scroll progress within the section

**Route:** `/story` — Full page, not a modal. Shares Header + Footer.

---

### Page: `/lookbook` — Editorial Lookbook

**Concept:** A fashion magazine, interactive. Not a product page — a mood, a world.

**Layout:**
- **Chapter System:** The lookbook is divided into 3 "chapters" (e.g., *"Morning Ritual"*, *"After Dark"*, *"The Weekend"*). Chapter switcher at top using large serif labels.
- **Per Chapter:** Full horizontal scroll. Each "spread" is two panels side by side — one image, one text — like an open book.
- **Product Tags:** Hovering over a model in an image reveals floating product tags (small bubbles with product name + price + link). These fade in on hover with a gentle scale.
- **Film Grain:** A heavier grain overlay (6% opacity vs the global 3%) on the lookbook page for a more cinematic feel.

**Animations:**
- Chapter switch: current chapter fades out `opacity → 0`, new chapter slides in from right (`x: 100% → 0`), 0.5s
- Horizontal drag: `useDragControls` with `dragElastic: 0.05` and momentum via Framer Motion `dragTransition: { power: 0.3, timeConstant: 200 }`
- Product tags: `scale: 0.8 → 1`, `opacity: 0 → 1` on hover, 200ms spring
- Spread images: parallax on drag — image moves at 0.85× the drag speed creating depth

**Route:** `/lookbook`

---

### Page: `/contact` — Contact Page

**Concept:** Human and warm. Not a cold form — feels like writing to a friend.

**Layout:**
- **Left Half:** A personal note — *"We're a small team. We read every message."* in Caveat at large size. Below: response time note and social links.
- **Right Half:** The form — Name, Email, Subject (dropdown: *Order Query · Sustainability Question · Collaboration · Just saying hi*), Message. Single CTA: *"Send it"*.
- **No sidebar clutter.** Generous whitespace. Clean.

**Animations:**
- Form fields: on focus, a slow animated border draws around the field (`clip-path` border trick)
- Submit button: on hover, a liquid fill animation (`radial-gradient` that expands from the center)
- On success: the form fades out, a handwritten *"Message received ✓"* in Caveat fades in at 48px

**Route:** `/contact`

---

### Page: `/faq` — FAQ / Help

**Concept:** Transparent and reassuring. Especially important given the *No Return & Exchange Policy*.

**Layout:**
- **Category Pills:** `Ordering · Shipping · Sustainability · Sizing · Payments · Returns` — filter the FAQ list.
- **Accordion Items:** Each question expands with a smooth height animation. Answer text reveals with `opacity: 0 → 1` + slight `y` offset.
- **Key Policy Callout:** A distinct card (warm cream background, rust border) that surfaces the No Return policy clearly but gently, with the brand's reasoning explained.
- **Live Chat Nudge:** Bottom of page — *"Still confused? We're real people."* with a link to `/contact`.

**Animations:**
- Accordion open: `height: 0 → auto` via Framer Motion `AnimatePresence` + `initial={{ height: 0 }}` pattern
- Active category pill: background color fills with a `scaleX` animation from the left
- Scroll entry: question items cascade in with stagger

**Route:** `/faq`

---

### Page: `/about` — About (New)

**Concept:** A minimal, editorial "who we are" — distinct from `/story` which is about the mission. This is about the *people*.

**Layout:**
- **Team section:** 2–3 founders/team members. Each card: off-center portrait photo + name + Caveat-font title (*"Chief Thrift Officer"*) + a one-line quote.
- **Values Grid:** 4 values listed in a 2×2 grid: *Honesty · Sustainability · Curation · Community* — each with a small hand-drawn icon SVG and 2-line description.
- **Location Note:** *"Operating from India. Loved across the world."* — with a minimal map illustration (SVG, no Google Maps).

**Animations:**
- Team cards: enter with a `rotateY: 15deg → 0` 3D flip + opacity, staggered
- Values grid: items draw in from a center point outward (CSS `scale: 0 → 1` with `transform-origin: center`)

**Route:** `/about`

---

## 📋 Implementation Priority (Updated)

| Priority | Feature | Est. Effort |
|---|---|---|
| 🔴 P0 | React Router setup + shared layout | 0.5 days |
| 🔴 P0 | Custom cursor system | 1 day |
| 🔴 P0 | Product detail modal with `layoutId` | 2 days |
| 🔴 P0 | Cinematic page load sequence | 1 day |
| 🔴 P0 | `/women` collection page | 2 days |
| 🔴 P0 | `/men` collection page | 1.5 days |
| 🟠 P1 | `/unisex` collection page | 1.5 days |
| 🟠 P1 | `/home-decor` collection page | 1.5 days |
| 🟠 P1 | `/story` full immersive page | 2 days |
| 🟠 P1 | Product card 3D tilt + mouse parallax | 1 day |
| 🟠 P1 | `/lookbook` editorial page | 2 days |
| 🟠 P1 | Cart drawer spring physics upgrade | 0.5 days |
| 🟠 P1 | Asymmetric editorial product grid | 1 day |
| 🟡 P2 | Nav overlay cinematic redesign | 1 day |
| 🟡 P2 | Wishlist feature + drawer | 1 day |
| 🟡 P2 | `/contact` page | 1 day |
| 🟡 P2 | `/faq` page | 1 day |
| 🟡 P2 | `/about` page | 1 day |
| 🟢 P3 | Newsletter section | 0.5 days |
| 🟢 P3 | Recently Dropped ticker | 0.5 days |
| 🟢 P3 | Blur-up image placeholders (LQIP) | 0.5 days |
| 🟢 P3 | Home Decor room hotspot sidebar | 1 day |
| 🟢 P3 | SEO: React Helmet per page | 0.5 days |

**Total estimated effort: ~26 dev days**

---

## 🗺️ Full Site Route Map (V2)

```
/                     → Homepage (Hero + CategoryNav + ProductGrid + Story + Testimonials)
/women                → Women's Collection
/men                  → Men's Collection  
/unisex               → Unisex Collection
/home-decor           → Home & Décor Collection
/product/:id          → Product Detail (shared element transition from grid)
/lookbook             → Editorial Lookbook
/story                → Brand Story (immersive narrative)
/about                → About the Team
/contact              → Contact Form
/faq                  → Help & FAQ
/cart                 → Cart (mobile full-page fallback; desktop = drawer)
```

**Shared across all pages:**
- Global Header (hamburger nav overlay)
- Custom cursor
- Gradient mesh + noise texture background
- Cart drawer
- Footer

---

## ✅ V2 Success Criteria (Updated)

- [ ] Page load feels like a film opening — choreographed, not scattered
- [ ] Every interactive element has a distinct, weighted micro-interaction
- [ ] Clicking a product card transitions seamlessly into the product detail (no jarring page jump)
- [ ] `/women`, `/men`, `/unisex`, `/home-decor` each feel like distinct rooms in the same house
- [ ] `/story` makes users feel something — not just read information
- [ ] `/lookbook` makes users want to linger and explore
- [ ] Custom cursor feels like a premium design signature
- [ ] All animations maintain 60fps on mid-range hardware
- [ ] Scroll-linked animations feel tied to user intent, not auto-playing
- [ ] The FAQ page handles the No Return policy with transparency and warmth
- [ ] The site has clear routes for every nav item — no dead links
- [ ] The site feels unmistakably Capriagos — not a template, a brand

---

*Plan authored: 2026-05-13 · Based on frontend-design skill guidelines + current v1 codebase audit*
