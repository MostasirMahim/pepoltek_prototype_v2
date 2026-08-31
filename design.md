# Pepoltek Design System & UI Architecture

This document serves as the single source of truth for design tokens, typography, component layout conventions, animation patterns, and UI styling standards across the **Pepoltek** enterprise web platform.

---

## 1. Design Vision & Aesthetic Principles

Pepoltek operates at the intersection of **Enterprise IT Workforce Solutions** and **Healthcare Technology Delivery**. The design system communicates **high precision, transparency, speed, and enterprise reliability**.

- **Light Canvas Foundation**: A crisp, high-clarity light canvas background (`#eef4fd`) replacing generic dark dashboards with an authoritative, modern enterprise feel.
- **High-Contrast Deep Ink Typography**: Deep navy ink (`#0a1428`) for headings paired with balanced slate ink (`#3d4c68`) for body copy ensures maximum legibility.
- **Electric Blue Energy**: Vibrant electric accents (`#0a84ff` / `#38bdf8`) provide visual hierarchy, focal points, interactive micro-animations, and status indicators.
- **Glassmorphism & Soft Metals**: Translucent frosted panels (`bg-white/80 backdrop-blur-md`) with soft metallic blue borderlines (`#bcd6fa`) create depth without visual noise.
- **Seamless Continuity**: Scroll-driven connected animations (such as the interactive 3D Globe travelling smoothly between Hero and Overview) unify the user journey.

---

## 2. Color Palette & Tokens

Configured in `src/app/globals.css` via Tailwind CSS `@theme` and custom utility classes.

### Primary Tokens
| Token Name | Hex / Value | Tailwind / CSS Var | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#eef4fd` | `bg-canvas` / `--color-canvas` | Primary root viewport background across all landing pages. |
| **Surface White** | `#ffffff` | `bg-white` | Card backgrounds, elevated modals, active dropdowns. |
| **Surface Glass** | `rgba(255,255,255,0.8)` | `bg-white/80 backdrop-blur` | Glassmorphic floating cards, feature grids, navbar pill. |
| **Deep Ink** | `#0a1428` | `text-ink` / `--color-ink` | `h1`-`h6` titles, bold lead metrics, prominent CTAs. |
| **Soft Ink** | `#3d4c68` | `text-ink-soft` / `--color-ink-soft` | Paragraphs, card descriptions, supporting labels, navigation links. |
| **Electric Blue** | `#0a84ff` | `text-electric` / `bg-electric` | Primary brand accent, button fills, active rings, SVG line strokes. |
| **Bright Electric** | `#38bdf8` | `text-electric-bright` | Hover highlights, glows, starlight beams, badge indicators. |
| **Soft Metal Border** | `#bcd6fa` | `border-[#bcd6fa]` | Grid dividing lines, card borders, separator rules. |
| **Subtle Border** | `rgba(188,214,250,0.6)` | `border-[#bcd6fa]/60` | Default card borders, quiet divider lines. |

### Color Gradient Utilities
```css
/* Card & Divider Gradients */
--gradient-divider-h: linear-gradient(90deg, transparent 0%, rgba(188, 214, 250, 0.8) 20%, rgba(188, 214, 250, 0.8) 80%, transparent 100%);
--gradient-divider-v: linear-gradient(to bottom, rgba(188, 214, 250, 0.8) 0%, transparent 100%);
--gradient-hover-top: linear-gradient(to bottom, transparent 0%, rgba(10, 132, 255, 0.04) 100%);
--gradient-hover-bottom: linear-gradient(to top, transparent 0%, rgba(10, 132, 255, 0.04) 100%);
```

---

## 3. Typography System

The typography hierarchy uses three Google Fonts configured via `next/font/google` in `src/app/layout.tsx`.

### 1. Display Font — **Sora** (`var(--font-sora)`)
- **Tailwind Class**: `font-display`
- **Weights**: `600`, `700`, `800`
- **Application**: Section titles, hero headlines, card titles, stat values, dialog headings.
- **Letter Spacing**: `-0.02em` to `-0.03em` for tight, punchy headlines.

### 2. Body Font — **Inter** (`var(--font-inter)`)
- **Tailwind Class**: `font-sans`
- **Weights**: `400`, `500`, `600`
- **Application**: Paragraphs, subtitles, descriptions, button labels, navigation menus.
- **Line Height**: `1.6` for optimal readability in dense enterprise specifications.

### 3. Monospace Font — **JetBrains Mono** (`var(--font-jetbrains-mono)`)
- **Tailwind Class**: `font-mono`
- **Weights**: `400`, `500`
- **Application**: Section category pills, technical SLA labels, compliance indicators, code blocks.
- **Letter Spacing**: `0.12em` to `0.16em` with `uppercase`.

### Type Scale Reference
```text
Display Hero (H1)  : 48px – 64px / 1.10 / font-extrabold / tracking-tight
Section Title (H2) : 32px – 44px / 1.15 / font-bold / tracking-tight
Card Heading (H3)  : 16px – 20px / 1.25 / font-bold / tracking-normal
Body Large         : 16px – 18px / 1.60 / font-normal / text-ink-soft
Body Standard      : 13.5px – 14px / 1.45 / font-normal / text-ink-soft
Badge Label        : 11px – 12px / 1.00 / font-mono font-medium / uppercase
```

---

## 4. UI Components & Design Patterns

### 1. Section Header Pattern
Standardized layout for announcing every page section.
```tsx
<div className="mx-auto flex max-w-3xl flex-col items-center text-center">
  {/* Category Badge */}
  <div className="inline-flex items-center gap-2 rounded-full border border-electric/20 bg-electric/[0.08] px-4 py-1 text-xs font-mono font-medium tracking-[0.14em] uppercase text-electric">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric shadow-[0_0_6px_rgba(10,132,255,0.6)]" />
    Platform Capabilities
  </div>

  {/* Headline */}
  <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0a1428] sm:text-4xl lg:text-[38px]">
    In-House Delivery Pod Breakdown
  </h2>

  {/* Subtitle */}
  <p className="mt-3 text-base leading-relaxed text-[#3d4c68] sm:text-lg">
    High-velocity talent engineering pods, strict technical vetting, and proven execution leadership.
  </p>
</div>
```

### 2. Connected Grid & Divider Cards Pattern (`FeaturesGrid.tsx`)
Used for capability pods, leadership highlights, and service features.
- **Desktop**: 3 columns (top row) over 2 columns (bottom row), linked with seamless gradient line dividers.
- **Mobile**: Vertically stacked cards with a left indicator bar and bottom soft divider lines.
- **Directional Hover Overlays**: Top row illuminates with a top-down electric blue gradient; bottom row with a bottom-up gradient.

```tsx
<div className="group relative flex h-auto min-h-[210px] w-full flex-col justify-start px-6 py-7 text-left lg:h-[210px] lg:w-[320px] lg:px-4 lg:py-6 lg:text-center">
  {/* Directional Hover Gradient */}
  <div className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-b from-transparent to-electric/[0.04]" />
  
  {/* 40x40 SVG Icon with Electric Blue accents */}
  <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
    {icon}
  </div>

  {/* Card Title & Description */}
  <h3 className="relative z-10 font-display text-[16px] font-bold text-[#0a1428] transition-colors duration-200 group-hover:text-electric">
    {title}
  </h3>
  <p className="relative z-10 mt-2 text-[13.5px] leading-relaxed text-[#3d4c68]">
    {description}
  </p>
</div>
```

### 3. SVG Icon Guidelines
- **Canvas Size**: `40x40` pixels, `viewBox="0 0 40 40"`.
- **Stroke**: `#0a84ff` (Electric Blue), `strokeWidth="1.2"` to `"1.75"`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- **Gradient Backdrop Fill**: Radial/linear gradient from `#0a84ff` to transparent with `fillOpacity="0.14"` to `"0.18"`.
- **Center Alignment**: Centered on desktop (`mx-auto mb-4`), left-aligned on mobile (`max-lg:mx-0`).

### 4. Primary & Secondary CTA Buttons
```tsx
{/* Primary CTA */}
<Link
  href="/contact"
  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-electric px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-5px_rgba(10,132,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-electric-bright hover:shadow-[0_14px_30px_-5px_rgba(56,189,248,0.5)] focus:outline-none"
>
  <span>Get Started</span>
  <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</Link>

{/* Secondary / Frosted CTA */}
<Link
  href="/solutions"
  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#bcd6fa] bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#0a1428] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-electric/50 hover:bg-white hover:text-electric focus:outline-none"
>
  <span>Explore Solutions</span>
</Link>
```

---

## 5. Animation & Motion Guidelines

1. **Lenis Smooth Scroll (`SmoothScrollProvider.tsx`)**:
   - Provides silky momentum scrolling across all viewports.
2. **GSAP ScrollTrigger Cross-Section Bridges (`GlobeScrollBridge.tsx`)**:
   - Animates elements seamlessly across section boundaries without jumpy CSS clipping.
   - **Crucial Rule**: Outer `<section>` wrapper elements must **NOT** have `overflow-hidden` if they host cross-section ScrollTrigger traveling objects.
3. **Word Wave Color Cycling (`@keyframes word-wave`)**:
   - Subtitle highlighted words cycle through electric blue hues smoothly **without** vertical `translateY` jumps to maintain rigid text line stability.
4. **Interactive Micro-Grids (`CursorGrid.tsx`)**:
   - Low-opacity background canvas grid (`gridOpacity: 0`, `maxOpacity: 0.35`) reacting subtly to pointer motion.

---

## 6. Directory Conventions

```text
src/
├── app/
│   ├── (main)/
│   │   ├── layout.tsx       # Landing page shell (Header, wrappers)
│   │   └── page.tsx         # Assembles section components sequentially
│   ├── globals.css          # @theme variables, base resets, keyframes
│   └── layout.tsx           # Root HTML layout with Google Fonts
├── components/
│   ├── main/
│   │   ├── Header.tsx       # Main sticky navigation bar
│   │   ├── GlobeScrollBridge.tsx # GSAP cross-section travel controller
│   │   └── sections/
│   │       ├── Hero.tsx          # Hero section with interactive 3D Globe
│   │       ├── Overview.tsx      # "Who We Are" with brand morphing logo
│   │       ├── FeaturesGrid.tsx  # In-House Delivery Pods & Leadership
│   │       └── ...               # Additional single-file Tailwind sections
│   ├── GlobeVisual.tsx      # Canvas 3D globe renderer
│   ├── CursorGrid.tsx       # Interactive mouse-tracking canvas grid
│   └── SmoothScrollProvider.tsx # Lenis scroll engine
```

---

## 7. Developer & Validation Rules

- **Pure Tailwind CSS**: Prefer single-file TSX components with Tailwind utility classes for all new sections to maintain clean portability.
- **NEVER run `npm run build`**: The development server (`npm run dev`) is active. Running production builds can corrupt local dev state.
- **Type Checking Only**: Run `npm run typecheck` (`tsc --noEmit`) to validate type safety.
