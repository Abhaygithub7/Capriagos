# Capriagos — Version 3 Aesthetic Upgrade Plan

> **Skill applied:** `frontend-design` — Intentional aesthetic direction. Bold typographic shift. Dominant colour with sharp accent. No generic AI palettes.

---

## 🎨 Colour Scheme Analysis (from `colour_scheme.html`)

The reference document defines a **radically different** palette from the current dark-earth-tone scheme:

| Token | Hex | Role |
|---|---|---|
| Brand Red | `#E20613` | Primary action, hero brand blocks, high-emphasis |
| Foundation Cream | `#F5F5F0` | Global page background (warm, not pure white) |
| Obsidian Black | `#1A1A1A` | Text, structure, maximum contrast |
| Surface White | `#FFFFFF` | Cards, panels, elevated surfaces |
| Muted Rose | `#CE8DB1` | Subtle accent, secondary elements |

**Typography shift:**
- `Public Sans` (100–900 weight range) → Headlines, UI, body
- `JetBrains Mono` → Metadata, product IDs, price tags, labels, badges

**Visual Language:**
- Clean, editorial whites with sharp `#E20613` punctuation
- High contrast: dark text on light cream, not reversed
- Brutally modern: heavy tracking, uppercase labels, mono details
- Imagery style: architectural, clean lines, bold single colour focal points

---

## 🔀 V1/V2 → V3 Aesthetic Shift

| Dimension | V1/V2 | V3 |
|---|---|---|
| **Mode** | Dark (charcoal background) | Light (cream background) |
| **Primary accent** | Rust `#A65D3F` / Gold `#C9A962` | Brand Red `#E20613` |
| **Typography** | Playfair Display (serif) + DM Sans | Public Sans + JetBrains Mono |
| **Feel** | Warm, moody, editorial | Sharp, modern, precision editorial |
| **Card surfaces** | Dark brown overlays | Pure white lifted panels |
| **Labels/badges** | Caveat handwritten | JetBrains Mono uppercase |
| **Buttons** | Rust fill, rounded-2px | Brand Red fill, sharp rectangular |
| **Section dividers** | Organic, gradient | 1px `#E5E5E0` hairline rules |

---

## 🛠️ Implementation — Bottom-Up Order

The approach: **start with the foundation tokens, work upward through atoms → components → sections → pages.**

### Layer 0: Design Tokens (`index.css`)
Replace all colour variables. Add new font imports. Redefine global body background/text.

### Layer 1: Atoms
- Scrollbar
- Selection highlight  
- `::before`/`::after` pseudo-element colours
- Gradient mesh (update to cream-tinted)
- Noise overlay (keep, reduce opacity on light bg)

### Layer 2: Base Components
1. **Header** — Cream background panel, black text, red cart badge
2. **Footer** — Obsidian black (dark footer contrasts the cream body)
3. **Logo** — Switch colour to `#E20613` or `#1A1A1A`

### Layer 3: Navigation Overlay
- Background: `#1A1A1A` (keep dark — contrast moment)
- Nav links: White text, red hover
- Index numbers: JetBrains Mono, muted

### Layer 4: Hero Section
- Background: `#F5F5F0` cream base
- Title: `#1A1A1A` black, Public Sans ultra-heavy
- Accent span: `#E20613` red
- CTA buttons: Red fill on cream background
- Tagline label: JetBrains Mono uppercase

### Layer 5: Category Nav
- Section background: White surface
- Cards: retain image overlay but update label to mono uppercase
- Hover accent: Red underline vs image scale

### Layer 6: Product Cards
- Card info area: White background surface
- Name: Black, Public Sans medium
- Price: JetBrains Mono, `#E20613`
- Quick Add button: Black fill → Red on hover
- Wishlist icon: Red when active
- Featured badge: `#E20613` red, JetBrains Mono

### Layer 7: Product Grid Section
- Section bg: `#F5F5F0`
- Section heading: Black, Public Sans heavy, uppercase tracked

### Layer 8: Story Section
- Background: White surface panel
- Tag: JetBrains Mono red uppercase
- Letter card: Cream `#F5F5F0` background, black border
- Stat numbers: `#E20613` red, heavy
- Handwritten copy: Keep Caveat but darken to `#1A1A1A`

### Layer 9: Testimonials
- Background: `#1A1A1A` dark (contrast section)
- Quote marks: Red
- Text: White/cream

### Layer 10: Cart Drawer
- Background: White surface
- Text: Black
- Total/CTA: Red button

### Layer 11: Recently Dropped Ticker
- Background: `#E20613` red band
- Text: White, JetBrains Mono

### Layer 12: Newsletter Section
- Background: `#F5F5F0`
- Input border: Black, focus → Red
- CTA: Black fill button

---

## ✅ V3 Success Criteria

- [ ] Light cream page background replaces dark charcoal
- [ ] `#E20613` red is used as the **only** accent — no rust, no gold
- [ ] Public Sans is used across all text
- [ ] JetBrains Mono used for all metadata: prices, labels, badges, product IDs
- [ ] Cards are white elevated surfaces, not dark panels
- [ ] The footer provides a dark contrast anchor at the page bottom
- [ ] The nav overlay remains dark (cinematic contrast moment)
- [ ] Zero occurrences of old earth-tone palette in visible UI
- [ ] 60fps maintained on all transitions

---

*Plan authored: 2026-05-13 · V3 Aesthetic Upgrade*
