# ICA Training Center — Landing Page Design Spec

**Date:** 2026-06-02  
**Project:** ICA Training Center Website  
**Stack:** React 19 + TypeScript + Vite  
**Scope:** Single landing page (Phase 1)

---

## 1. Overview

A single-page landing site for ICA, a Georgian training center offering 8 subject classes. The primary visitors are students (teens/young adults), with parents as secondary decision-makers. The page is Georgian-language only in Phase 1, with a structure that supports adding English later.

**Goal:** Communicate what ICA offers, show class details (schedule + price), and drive visitors to call the center.

---

## 2. Design Direction

- **Tone:** Modern and energetic with warmth — clean layout, bold typography, approachable feel. Not cold/corporate, not overly academic.
- **Brand anchor:** The existing logo (deep crimson background, Ionic column graphic in gray/white, Georgian script) defines the visual identity. The site extends this palette.
- **CTA:** Phone number (clickable `tel:` link). Designed so it can be swapped for an enrollment form in a future phase without structural changes.

---

## 3. Color System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#8B1818` | Hero bg, navbar bg, CTA strip bg, buttons |
| `--color-primary-dark` | `#6B1010` | Hover states, shadows |
| `--color-bg` | `#F8F6F2` | Services section background (warm off-white) |
| `--color-surface` | `#FFFFFF` | Subject cards |
| `--color-footer` | `#1A1010` | Footer background |
| `--color-text` | `#1A1A1A` | Primary body text |
| `--color-text-muted` | `#6B6B6B` | Secondary/descriptive text |
| `--color-gray-accent` | `#9E9E9E` | Decorative accents (mirrors column gray) |

All tokens defined as CSS custom properties on `:root` for easy theming and future i18n/brand updates.

---

## 4. Typography

- **Font:** Noto Sans Georgian (Google Fonts) — modern, highly legible for Georgian script, free
- **Heading weight:** 700 (bold)
- **Body weight:** 400 (regular)
- **Line height:** 1.6 for body, 1.2 for headings
- Font loaded via `<link>` in `index.html` with `display=swap` for performance

---

## 5. Page Structure

```
┌─────────────────────────────────────┐
│  Navbar (sticky)                    │
├─────────────────────────────────────┤
│  Hero Section                       │
├─────────────────────────────────────┤
│  Services Section                   │
├─────────────────────────────────────┤
│  CTA Strip                          │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

---

## 6. Component Specifications

### 6.1 Navbar

- **Position:** Sticky, `top: 0`, `z-index: 100`
- **Background:** `--color-primary` (`#8B1818`)
- **Layout:** flex row, space-between
- **Left:** Logo — column image (32px height) + "ICA" or Georgian name text in white
- **Right:** Phone number as a white outlined button (`<a href="tel:+995XXXXXXXXX">`)
- **On scroll:** adds `box-shadow` to indicate floating above content
- **Mobile:** logo left, phone right — no hamburger (only 2 items, fits at all sizes)

### 6.2 Hero Section

- **Height:** `min-height: 90vh`
- **Background:** `--color-primary` (`#8B1818`)
- **Layout:** centered column (flexbox), vertically and horizontally centered
- **Content (top to bottom):**
  1. Logo column graphic (200px height)
  2. Bold Georgian tagline headline — e.g. "შენი წარმატება იწყება აქ"
  3. 1–2 sentence Georgian description of the center
  4. Phone CTA button — white background, crimson text, rounded, prominent
  5. Scroll-down chevron indicator at bottom of section
- **Text color:** white (`#FFFFFF`)
- **CTA button hover:** slight scale transform + shadow

### 6.3 Services Section

- **Background:** `--color-bg` (`#F8F6F2`)
- **Padding:** generous vertical padding (80px top/bottom)
- **Section header (centered):**
  - Georgian title — e.g. "ჩვენი კურსები"
  - Thin crimson underline accent beneath the title
  - Short Georgian subtitle
- **Subject card grid:**
  - 4 columns desktop (≥1024px), 2 columns tablet (≥640px), 1 column mobile
  - Gap: 24px
- **Each SubjectCard contains:**
  - Subject icon (Lucide React icon, 32px, crimson color)
  - Subject name in Georgian (bold, `--color-text`)
  - Schedule — days and time (e.g. "ორშ, ოთხ · 16:00–18:00"), muted text
  - Price (e.g. "150 ₾ / თვე"), semi-bold
  - Thin crimson top border accent on card
- **Card styles:** white bg, 8px border-radius, subtle box-shadow, crimson `3px` top border
- **Card hover:** `translateY(-4px)` + stronger shadow (smooth transition 200ms)

**Subject list:**

| Georgian | English | Icon (Lucide) |
|---|---|---|
| ისტორია | History | `BookOpen` |
| ინგლისური | English | `Globe` |
| ქართული | Georgian | `PenLine` |
| მათემატიკა | Mathematics | `Calculator` |
| სამოქალაქო განათლება | Civics | `Landmark` |
| გეოგრაფია | Geography | `Map` |
| ფიზიკა | Physics | `Atom` |
| ქიმია | Chemistry | `FlaskConical` |

*Note: Schedule and price values are placeholder content — to be filled in by the client before launch.*

### 6.4 CTA Strip

- **Background:** `--color-primary` (`#8B1818`)
- **Layout:** centered column
- **Content:** Georgian heading (e.g. "დაგვიკავშირდი"), phone number as a large white outlined button
- **Purpose:** Reinforces the call-to-action after the user has reviewed all services

### 6.5 Footer

- **Background:** `--color-footer` (`#1A1010`)
- **Layout:** 2 columns on desktop, stacked on mobile
- **Left column:** Small logo + one-line Georgian description of the center
- **Right column:** Phone number (clickable), address (placeholder), social links (placeholder for future)
- **Bottom bar:** Copyright — "© 2026 ICA. ყველა უფლება დაცულია"
- **Text color:** white / light gray

---

## 7. Responsive Breakpoints

| Name | Min-width | Notes |
|---|---|---|
| Mobile | 0px | 1-column grid, stacked layouts |
| Tablet | 640px | 2-column subject grid |
| Desktop | 1024px | 4-column subject grid, 2-column footer |
| Wide | 1280px | Max content width: 1200px, centered |

---

## 8. Architecture & File Structure

```
src/
  components/
    Navbar/
      Navbar.tsx
      Navbar.css
    Hero/
      Hero.tsx
      Hero.css
    ServicesSection/
      ServicesSection.tsx
      ServicesSection.css
      SubjectCard.tsx
    CTAStrip/
      CTAStrip.tsx
      CTAStrip.css
    Footer/
      Footer.tsx
      Footer.css
  data/
    subjects.ts       ← subject list, icons, schedule, price data
  styles/
    variables.css     ← CSS custom properties (colors, fonts, spacing)
    global.css        ← reset, base styles, font import
  assets/
    logo.png          ← the ICA logo/column image
  App.tsx             ← composes all sections
  main.tsx
```

**Data approach:** Subject data lives in `src/data/subjects.ts` as a typed array. This keeps content separate from components and makes it easy to update schedules/prices without touching component code.

---

## 9. i18n Readiness

All user-facing strings are defined in one place (`subjects.ts` for card content, and inline in each component for section headings). When English support is added:
- Wrap strings in a simple i18n context/hook
- No structural changes to components needed
- Language toggle can be added to the Navbar

---

## 10. Dependencies to Add

- `lucide-react` — subject icons (lightweight, tree-shakeable)
- Noto Sans Georgian via Google Fonts CDN in `index.html`

No other new dependencies required. No CSS framework — plain CSS with custom properties keeps bundle lean and avoids overriding issues with Georgian font rendering.

---

## 11. Out of Scope (Phase 1)

- Enrollment / contact form
- English language toggle
- Additional pages (about, teacher bios, blog)
- Authentication or backend
- Analytics integration

---

## 12. Success Criteria

- Page loads and is fully readable on mobile, tablet, and desktop
- Phone number is tappable on mobile devices
- Georgian text renders correctly with Noto Sans Georgian
- All 8 subject cards display with correct icon, schedule placeholder, and price placeholder
- Scroll behavior is smooth (CSS `scroll-behavior: smooth`)
