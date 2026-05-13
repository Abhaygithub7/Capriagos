# Capriagos Frontend Refactor Specification

## Project Overview
- **Project Name:** Capriagos - Sustainable Fashion E-commerce
- **Type:** React-based Premium E-commerce Website
- **Core Functionality:** Pre-loved sustainable fashion retail with editorial, high-end UX inspired by Odd Ritual Golf
- **Target Users:** Conscious consumers seeking sustainable, curated fashion

## Design Philosophy

### Aesthetic Direction
- **Style:** Editorial luxury meets sustainable warmth
- **Theme:** Dark, moody, premium - avoiding the "standard thrift shop" look
- **Key Differentiator:** Fluid animations, "slow down" UX philosophy, hand-drawn elements

### Color Palette (Earth-Tone Luxury)
```css
--color-cream: #F5F0E8
--color-charcoal: #1A1A1A
--color-forest: #2D3A2E
--color-rust: #A65D3F
--color-sage: #8B9A7D
--color-warm-white: #FAF7F2
--color-deep-brown: #3D2B1F
--color-gold-accent: #C9A962
```

### Typography
- **Display/Headers:** "Playfair Display" (Serif) - Heritage, editorial feel
- **Body/UI:** "DM Sans" (Sans-Serif) - Modern, clean readability
- **Accent:** "Caveat" (Script) - Handwritten feel for story elements

## UI/UX Specification

### 1. Header/Navigation
- **Type:** Minimalist overlay menu (no standard sticky header)
- **Behavior:** Click hamburger → full-screen staggered text reveal
- **Animation:** Menu items stagger in from bottom with 0.1s delay each
- **Logo:** Centered, animated SVG with hand-drawn stroke effect
- **Cart Icon:** Floating, magnetic button with pulse on add

### 2. Hero Section
- **Layout:** Full-viewport, asymmetrical composition
- **Content:** 
  - Large editorial image (70% viewport)
  - Overlapping text with "Select a category" CTA
  - Subtle parallax on scroll
- **Animation:** Text reveals with spring physics, images scale on entry

### 3. Category Navigation
- **Style:** Horizontal scroll with snap points
- **Items:** Women, Men, Unisex, Home
- **Interaction:** Magnetic hover effect, scale on hover
- **Animation:** Smooth scroll with fade edges

### 4. Product Grid
- **Layout:** Asymmetrical masonry (not boxy grid)
- **Card Design:**
  - Large image with parallax on hover
  - Minimal text overlay (product name, price)
  - Quick-view on hover
- **Animation:** 
  - Staggered entrance on scroll
  - Layout reflows fluidly (no hard refresh)
  - "Float up" hover with shadow expansion

### 5. Story Section (The "Handwritten" Element)
- **Position:** Persistent sidebar or parallax section
- **Content:** Sustainability mission, handwritten letter copy
- **Style:** Textured paper background, script font for quotes
- **Animation:** Reveals on scroll with blur-to-sharp effect

### 6. Testimonials ("Loved by You")
- **Layout:** Horizontal carousel with snap
- **Design:** Large quote marks, customer photos, star ratings
- **Animation:** Smooth scroll with parallax effect

### 7. Footer
- **Style:** Minimal, clean, dark background
- **Content:** Mission statement, policy links, social
- **Animation:** Fade in with stagger

### 8. Cart Drawer
- **Type:** Slide-in overlay with blur backdrop
- **Animation:** "Slide-and-blur" entry (300ms spring)
- **Background:** Dims to 60% opacity charcoal

## Interaction Specification

### Micro-Interactions
- **Hover States:** 0.2s delay with long decay (0.5s) - "weighted" feel
- **Buttons:** Magnetic effect (follows cursor slightly)
- **Cards:** Float up 8px with shadow expansion

### Page Transitions
- **Type:** Shared element transitions
- **Behavior:** Product image "flows" from grid to detail
- **Duration:** 400ms spring animation

### Scroll Animations
- **Library:** Framer Motion
- **Effects:**
  - Text reveals (y-offset + fade)
  - Image scale on entry
  - Parallax containers
  - Section fade-in

## Component Structure
```
/src
  /components
    Header.jsx
    NavigationOverlay.jsx
    Hero.jsx
    CategoryNav.jsx
    ProductGrid.jsx
    ProductCard.jsx
    StorySection.jsx
    Testimonials.jsx
    Footer.jsx
    CartDrawer.jsx
    Logo.jsx
  /hooks
    useScrollAnimation.js
    useMagnetic.js
  /styles
    globals.css
  App.jsx
  main.jsx
```

## Technical Stack
- **Framework:** React 18 + Vite
- **Animation:** Framer Motion
- **Styling:** CSS Modules + CSS Variables
- **State:** React Context (cart state)

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark, premium aesthetic with earth tones
- [ ] Asymmetrical layouts (no boxy grids)
- [ ] Serif headers + Sans body typography
- [ ] Generous whitespace

### Interaction Checkpoints
- [ ] Menu opens with staggered text reveal
- [ ] Product cards have float-up hover effect
- [ ] Cart drawer slides in with blur backdrop
- [ ] Scroll triggers smooth text/image reveals
- [ ] Hover effects have 0.2s delay (feels "weighted")

### Content Checkpoints
- [ ] "Handwritten letter" story is prominent (hero content)
- [ ] Sustainability mission is featured
- [ ] All navigation categories present

### Performance
- [ ] Lazy loading on images with blur-up
- [ ] Smooth 60fps animations
- [ ] No layout shift on interaction