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

All tokens defined in a MUI `createTheme()` config (`src/theme.ts`). Components consume colors via the MUI `sx` prop or `styled()` — no manual CSS custom properties needed.

---

## 4. Typography

- **Font:** Noto Sans Georgian (Google Fonts) — modern, highly legible for Georgian script, free
- **Heading weight:** 700 (bold)
- **Body weight:** 400 (regular)
- **Line height:** 1.6 for body, 1.2 for headings
- Font loaded via `<link>` in `index.html` with `display=swap` for performance
- Font registered in the MUI theme under `typography.fontFamily` so all MUI `Typography` components inherit it automatically

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

- **MUI components:** `AppBar` (position="sticky"), `Toolbar`, `Button`
- **Background:** `primary.main` (`#8B1818`) via MUI theme — set `color="primary"` on `AppBar`
- **Layout:** `Toolbar` with `sx={{ justifyContent: 'space-between' }}`
- **Left:** Logo image (`src/assets/logo.png`, ~40px height) — the PNG already contains the column graphic and Georgian text, rendered as `<img>` with alt="ICA"
- **Right:** Phone number as a MUI `Button` variant="outlined" color="inherit" wrapping an `<a href="tel:+995XXXXXXXXX">` — white outlined style on crimson bg
- **On scroll:** MUI `AppBar` `elevation` prop toggled via scroll listener (0 at top, 4 on scroll)
- **Mobile:** logo left, phone right — no hamburger (only 2 items, fits at all sizes)

### 6.2 Hero Section

- **MUI components:** `Box`, `Container`, `Typography`, `Button`
- **Height:** `min-height: 90vh`
- **Background:** `primary.main` (`#8B1818`) via `sx={{ bgcolor: 'primary.main' }}`
- **Layout:** `Box` with `display: flex`, `flexDirection: column`, `alignItems: center`, `justifyContent: center`
- **Content (top to bottom):**
  1. Logo column graphic (200px height) as `<img>`
  2. MUI `Typography` variant="h2" — bold Georgian tagline, e.g. "შენი წარმატება იწყება აქ"
  3. MUI `Typography` variant="body1" — 1–2 sentence Georgian description
  4. MUI `Button` variant="contained" color="secondary" (white bg, crimson text) wrapping `<a href="tel:...">` — prominent CTA
  5. Scroll-down chevron (`KeyboardArrowDown` from `@mui/icons-material`) at bottom
- **Text color:** `color: 'white'` via sx
- **CTA button hover:** MUI default ripple + `sx` scale transform

### 6.3 Services Section

- **MUI components:** `Box`, `Container`, `Typography`, `Grid`, `Card`, `CardContent`
- **Background:** `#F8F6F2` via `sx={{ bgcolor: '#F8F6F2' }}`
- **Padding:** `py: 10` (80px top/bottom via MUI spacing)
- **Section header (centered):**
  - MUI `Typography` variant="h3" — Georgian title, e.g. "ჩვენი კურსები"
  - Thin crimson underline accent beneath: a styled `Box` with `width: 60px`, `height: 3px`, `bgcolor: 'primary.main'`, centered
  - MUI `Typography` variant="subtitle1" color="text.secondary" — short Georgian subtitle
- **Subject card grid:**
  - MUI `Grid` container, spacing={3}
  - `Grid` item `xs={12}` `sm={6}` `md={3}` — 1 / 2 / 4 columns at mobile / tablet / desktop
- **Each SubjectCard (`Card` component) contains:**
  - MUI icon from `@mui/icons-material` (32px, `color: 'primary'`)
  - MUI `Typography` variant="h6" — subject name in Georgian (bold)
  - MUI `Typography` variant="body2" color="text.secondary" — schedule
  - MUI `Typography` variant="body2" fontWeight="600" — price
- **Card styles:** MUI `Card` with `sx={{ borderTop: '3px solid', borderColor: 'primary.main', borderRadius: 2 }}`
- **Card hover:** `sx` with `transition`, `'&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }`

**Subject list:**

| Georgian | English | Icon (`@mui/icons-material`) |
|---|---|---|
| ისტორია | History | `MenuBook` |
| ინგლისური | English | `Language` |
| ქართული | Georgian | `Edit` |
| მათემატიკა | Mathematics | `Calculate` |
| სამოქალაქო განათლება | Civics | `AccountBalance` |
| გეოგრაფია | Geography | `Map` |
| ფიზიკა | Physics | `Science` |
| ქიმია | Chemistry | `Biotech` |

*Note: Schedule and price values are placeholder content — to be filled in by the client before launch.*

### 6.4 CTA Strip

- **MUI components:** `Box`, `Container`, `Typography`, `Button`
- **Background:** `primary.main` via `sx={{ bgcolor: 'primary.main' }}`
- **Layout:** `Box` flex column, centered
- **Content:** MUI `Typography` variant="h4" color="white" (e.g. "დაგვიკავშირდი") + MUI `Button` variant="outlined" color="inherit" size="large" wrapping `<a href="tel:...">`
- **Purpose:** Reinforces the call-to-action after the user has reviewed all services

### 6.5 Footer

- **MUI components:** `Box`, `Container`, `Grid`, `Typography`
- **Background:** `#1A1010` via `sx={{ bgcolor: '#1A1010' }}`
- **Layout:** MUI `Grid` container — 2 columns on desktop (`md={6}`), stacked on mobile (`xs={12}`)
- **Left column:** Small logo `<img>` (32px) + MUI `Typography` variant="body2" — one-line Georgian description
- **Right column:** Phone as `<a href="tel:...">` styled with MUI `Typography`, address placeholder, social icon placeholders
- **Bottom bar:** MUI `Divider` + `Typography` variant="caption" — "© 2026 ICA. ყველა უფლება დაცულია"
- **Text color:** `color: 'white'` / `color: 'grey.400'` via sx

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
    Hero/
      Hero.tsx
    ServicesSection/
      ServicesSection.tsx
      SubjectCard.tsx
    CTAStrip/
      CTAStrip.tsx
    Footer/
      Footer.tsx
  data/
    subjects.ts       ← subject list, MUI icon components, schedule, price data
  theme.ts            ← MUI createTheme() config (palette, typography, components)
  styles/
    global.css        ← minimal: font import, html scroll-behavior: smooth, body margin reset
  assets/
    logo.png          ← the ICA logo/column image
  App.tsx             ← wraps everything in MUI ThemeProvider + CssBaseline, composes sections
  main.tsx
```

**No per-component CSS files** — all styling is done via the MUI `sx` prop or `styled()`. Plain CSS is limited to the single `global.css` for font import and scroll behavior.

**Data approach:** Subject data lives in `src/data/subjects.ts` as a typed array. This keeps content separate from components and makes it easy to update schedules/prices without touching component code.

---

## 9. i18n Readiness

All user-facing strings are defined in one place (`subjects.ts` for card content, and inline in each component for section headings). When English support is added:
- Wrap strings in a simple i18n context/hook
- No structural changes to components needed
- Language toggle can be added to the Navbar

---

## 10. Dependencies to Add

- `@mui/material` — core MUI component library
- `@mui/icons-material` — MUI icon set (subject icons, chevron, etc.)
- `@emotion/react` + `@emotion/styled` — required MUI styling engine
- Noto Sans Georgian via Google Fonts CDN in `index.html`

No additional CSS framework. MUI covers all layout and component styling needs. `global.css` is minimal (font import + scroll reset only).

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
