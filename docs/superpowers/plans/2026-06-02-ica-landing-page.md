# ICA Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ICA training center landing page — sticky navbar, crimson hero, 8-subject services grid, CTA strip, and footer — using React 19 + TypeScript + Vite + Material UI v6.

**Architecture:** Flat component tree composed in `App.tsx` under a single MUI `ThemeProvider`. Each section is a standalone component. Subject data and contact info live in `src/data/subjects.ts` and `src/config.ts`, keeping content decoupled from components so the client can update schedules, prices, and phone number in one place.

**Tech Stack:** React 19, TypeScript, Vite, Material UI v6 (`@mui/material`, `@mui/icons-material`), Emotion, Vitest, React Testing Library.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/theme.ts` | Create | MUI `createTheme`: crimson palette, Noto Sans Georgian typography |
| `src/config.ts` | Create | Central contact config: phone number constant |
| `src/data/subjects.ts` | Create | 8 subject definitions: id, name, schedule, price, icon |
| `src/styles/global.css` | Create | Font import, `scroll-behavior: smooth`, bounce keyframe, body reset |
| `src/assets/logo.png` | Create (manual) | ICA logo image (column graphic + Georgian text) |
| `src/components/Navbar/Navbar.tsx` | Create | Sticky `AppBar`: logo left, phone CTA right |
| `src/components/Hero/Hero.tsx` | Create | Full-height crimson hero: logo, tagline, description, phone CTA, chevron |
| `src/components/ServicesSection/SubjectCard.tsx` | Create | Card: icon, subject name, schedule, price |
| `src/components/ServicesSection/ServicesSection.tsx` | Create | Section header + `Grid2` of 8 `SubjectCard`s |
| `src/components/CTAStrip/CTAStrip.tsx` | Create | Crimson contact band |
| `src/components/Footer/Footer.tsx` | Create | Dark footer: logo, description, phone, copyright |
| `src/test/setup.ts` | Create | `@testing-library/jest-dom` setup for Vitest |
| `src/App.tsx` | Modify | Compose all sections under `ThemeProvider` + `CssBaseline` |
| `src/main.tsx` | Modify | Swap `./index.css` import for `./styles/global.css` |
| `index.html` | Modify | Fix lang, title, add Noto Sans Georgian font link |
| `vite.config.ts` | Modify | Add Vitest config block |

---

### Task 1: Install MUI and Emotion

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install dependencies**

```bash
cd /home/giorgi_dzirkvelishvili/ica/project/ica_project
npm install @mui/material@^6 @mui/icons-material@^6 @emotion/react @emotion/styled
```

Expected: installation completes, `package.json` shows the four new packages under `dependencies`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install MUI v6 and Emotion"
```

---

### Task 2: Install and Configure Vitest

**Files:**
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Install test dependencies**

```bash
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
```

Expected: four packages added to `devDependencies`.

- [ ] **Step 2: Write a failing smoke test**

Create `src/test/vitest-setup.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';

describe('vitest setup', () => {
  it('runs', () => {
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 3: Run — expect config error or "no test files found"**

```bash
npx vitest run --reporter=verbose 2>&1 | head -20
```

Expected: error about missing test config or unknown test runner.

- [ ] **Step 4: Update `vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

- [ ] **Step 5: Create `src/test/setup.ts`**

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 6: Run — expect PASS**

```bash
npx vitest run --reporter=verbose
```

Expected:
```
✓ src/test/vitest-setup.test.ts > vitest setup > runs
Test Files  1 passed (1)
```

- [ ] **Step 7: Commit**

```bash
git add vite.config.ts src/test/setup.ts src/test/vitest-setup.test.ts package.json package-lock.json
git commit -m "chore: configure Vitest with jsdom and Testing Library"
```

---

### Task 3: MUI Theme

**Files:**
- Create: `src/theme.ts`
- Create: `src/theme.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/theme.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import theme from './theme';

describe('MUI theme', () => {
  it('sets primary color to crimson', () => {
    expect(theme.palette.primary.main).toBe('#8B1818');
  });

  it('sets primary dark color', () => {
    expect(theme.palette.primary.dark).toBe('#6B1010');
  });

  it('uses Noto Sans Georgian font', () => {
    expect(theme.typography.fontFamily).toContain('Noto Sans Georgian');
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/theme.test.ts --reporter=verbose
```

Expected: FAIL — `Cannot find module './theme'`

- [ ] **Step 3: Create `src/theme.ts`**

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B1818',
      dark: '#6B1010',
    },
  },
  typography: {
    fontFamily: '"Noto Sans Georgian", "Roboto", sans-serif',
    h2: { fontWeight: 700, lineHeight: 1.2 },
    h3: { fontWeight: 700, lineHeight: 1.2 },
    h4: { fontWeight: 700, lineHeight: 1.2 },
    h6: { fontWeight: 700 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none' as const,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});

export default theme;
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/theme.test.ts --reporter=verbose
```

Expected:
```
✓ src/theme.test.ts > MUI theme > sets primary color to crimson
✓ src/theme.test.ts > MUI theme > sets primary dark color
✓ src/theme.test.ts > MUI theme > uses Noto Sans Georgian font
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/theme.ts src/theme.test.ts
git commit -m "feat: add MUI theme with crimson palette and Georgian font"
```

---

### Task 4: Global Styles and Font

**Files:**
- Modify: `index.html`
- Create: `src/styles/global.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Update `index.html`**

Replace the full file content with:

```html
<!doctype html>
<html lang="ka">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ICA — სასწავლო ცენტრი</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
```

- [ ] **Step 3: Update `src/main.tsx`** — swap the CSS import

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: Commit**

```bash
git add index.html src/styles/global.css src/main.tsx
git commit -m "feat: add global styles and Noto Sans Georgian font"
```

---

### Task 5: Contact Config

**Files:**
- Create: `src/config.ts`

- [ ] **Step 1: Create `src/config.ts`**

```typescript
/** Replace with the actual ICA phone number before launch */
export const PHONE = '+995599000000';
```

- [ ] **Step 2: Commit**

```bash
git add src/config.ts
git commit -m "feat: add contact config with phone number placeholder"
```

---

### Task 6: Subject Data

**Files:**
- Create: `src/data/subjects.ts`
- Create: `src/data/subjects.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/data/subjects.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { subjects } from './subjects';

describe('subjects data', () => {
  it('exports exactly 8 subjects', () => {
    expect(subjects).toHaveLength(8);
  });

  it('each subject has all required fields', () => {
    for (const s of subjects) {
      expect(s.id, `${s.id} missing id`).toBeTruthy();
      expect(s.name, `${s.id} missing name`).toBeTruthy();
      expect(s.schedule, `${s.id} missing schedule`).toBeTruthy();
      expect(s.price, `${s.id} missing price`).toBeTruthy();
      expect(s.Icon, `${s.id} missing Icon`).toBeDefined();
    }
  });

  it('all subject ids are unique', () => {
    const ids = subjects.map((s) => s.id);
    expect(new Set(ids).size).toBe(subjects.length);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/data/subjects.test.ts --reporter=verbose
```

Expected: FAIL — `Cannot find module './subjects'`

- [ ] **Step 3: Create `src/data/subjects.ts`**

```typescript
import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapIcon from '@mui/icons-material/Map';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';

export interface Subject {
  id: string;
  name: string;
  schedule: string;
  price: string;
  Icon: ComponentType<SvgIconProps>;
}

/** Placeholder schedules and prices — update before launch */
export const subjects: Subject[] = [
  { id: 'history',   name: 'ისტორია',            schedule: 'ორშ, ოთხ · 16:00–18:00', price: '150 ₾ / თვე', Icon: MenuBookIcon },
  { id: 'english',   name: 'ინგლისური',           schedule: 'სამ, ხუთ · 16:00–18:00', price: '150 ₾ / თვე', Icon: LanguageIcon },
  { id: 'georgian',  name: 'ქართული',             schedule: 'ორშ, ოთხ · 14:00–16:00', price: '150 ₾ / თვე', Icon: EditIcon },
  { id: 'math',      name: 'მათემატიკა',           schedule: 'სამ, ხუთ · 14:00–16:00', price: '150 ₾ / თვე', Icon: CalculateIcon },
  { id: 'civics',    name: 'სამოქალაქო განათლება', schedule: 'პარ · 14:00–17:00',       price: '150 ₾ / თვე', Icon: AccountBalanceIcon },
  { id: 'geography', name: 'გეოგრაფია',            schedule: 'ორშ, ოთხ · 10:00–12:00', price: '150 ₾ / თვე', Icon: MapIcon },
  { id: 'physics',   name: 'ფიზიკა',              schedule: 'სამ, ხუთ · 10:00–12:00', price: '150 ₾ / თვე', Icon: ScienceIcon },
  { id: 'chemistry', name: 'ქიმია',               schedule: 'პარ · 10:00–13:00',       price: '150 ₾ / თვე', Icon: BiotechIcon },
];
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/data/subjects.test.ts --reporter=verbose
```

Expected:
```
✓ src/data/subjects.test.ts > subjects data > exports exactly 8 subjects
✓ src/data/subjects.test.ts > subjects data > each subject has all required fields
✓ src/data/subjects.test.ts > subjects data > all subject ids are unique
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/data/subjects.ts src/data/subjects.test.ts
git commit -m "feat: add subject data with 8 courses"
```

---

### Task 7: Logo Asset

**Files:**
- Create: `src/assets/logo.png`

- [ ] **Step 1: Save the ICA logo**

Copy the ICA logo image (crimson background, Ionic column graphic, Georgian text) to:
```
/home/giorgi_dzirkvelishvili/ica/project/ica_project/src/assets/logo.png
```

The file must be named exactly `logo.png`. The existing `hero.png` in that directory can remain (it is no longer imported).

- [ ] **Step 2: Commit**

```bash
git add src/assets/logo.png
git commit -m "feat: add ICA logo asset"
```

---

### Task 8: SubjectCard Component

**Files:**
- Create: `src/components/ServicesSection/SubjectCard.tsx`
- Create: `src/components/ServicesSection/SubjectCard.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/ServicesSection/SubjectCard.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ScienceIcon from '@mui/icons-material/Science';
import theme from '../../theme';
import SubjectCard from './SubjectCard';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SubjectCard', () => {
  it('renders the subject name', () => {
    render(
      <SubjectCard name="ფიზიკა" schedule="სამ · 14:00" price="150 ₾ / თვე" Icon={ScienceIcon} />,
      { wrapper },
    );
    expect(screen.getByText('ფიზიკა')).toBeInTheDocument();
  });

  it('renders the schedule', () => {
    render(
      <SubjectCard name="ფიზიკა" schedule="სამ · 14:00" price="150 ₾ / თვე" Icon={ScienceIcon} />,
      { wrapper },
    );
    expect(screen.getByText('სამ · 14:00')).toBeInTheDocument();
  });

  it('renders the price', () => {
    render(
      <SubjectCard name="ფიზიკა" schedule="სამ · 14:00" price="150 ₾ / თვე" Icon={ScienceIcon} />,
      { wrapper },
    );
    expect(screen.getByText('150 ₾ / თვე')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/components/ServicesSection/SubjectCard.test.tsx --reporter=verbose
```

Expected: FAIL — `Cannot find module './SubjectCard'`

- [ ] **Step 3: Create `src/components/ServicesSection/SubjectCard.tsx`**

```typescript
import type { ComponentType } from 'react';
import type { SvgIconProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface SubjectCardProps {
  name: string;
  schedule: string;
  price: string;
  Icon: ComponentType<SvgIconProps>;
}

export default function SubjectCard({ name, schedule, price, Icon }: SubjectCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        borderTop: '3px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box sx={{ color: 'primary.main', mb: 1.5 }}>
          <Icon fontSize="medium" />
        </Box>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {schedule}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/components/ServicesSection/SubjectCard.test.tsx --reporter=verbose
```

Expected:
```
✓ SubjectCard > renders the subject name
✓ SubjectCard > renders the schedule
✓ SubjectCard > renders the price
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ServicesSection/SubjectCard.tsx src/components/ServicesSection/SubjectCard.test.tsx
git commit -m "feat: add SubjectCard component"
```

---

### Task 9: Navbar Component

**Files:**
- Create: `src/components/Navbar/Navbar.tsx`
- Create: `src/components/Navbar/Navbar.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Navbar/Navbar.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import Navbar from './Navbar';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Navbar', () => {
  it('renders the ICA logo image', () => {
    render(<Navbar />, { wrapper });
    expect(screen.getByAltText('ICA')).toBeInTheDocument();
  });

  it('renders a tel: phone link', () => {
    render(<Navbar />, { wrapper });
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toMatch(/^tel:/);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/components/Navbar/Navbar.test.tsx --reporter=verbose
```

Expected: FAIL — `Cannot find module './Navbar'`

- [ ] **Step 3: Create `src/components/Navbar/Navbar.tsx`**

```typescript
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { PHONE } from '../../config';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar position="sticky" color="primary" elevation={elevated ? 4 : 0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component="img"
          src={logo}
          alt="ICA"
          sx={{ height: 40, display: 'block' }}
        />
        <Button
          variant="outlined"
          color="inherit"
          href={`tel:${PHONE}`}
          sx={{
            borderColor: 'rgba(255,255,255,0.7)',
            color: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {PHONE}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/components/Navbar/Navbar.test.tsx --reporter=verbose
```

Expected:
```
✓ Navbar > renders the ICA logo image
✓ Navbar > renders a tel: phone link
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar/Navbar.tsx src/components/Navbar/Navbar.test.tsx
git commit -m "feat: add Navbar component"
```

---

### Task 10: Hero Component

**Files:**
- Create: `src/components/Hero/Hero.tsx`
- Create: `src/components/Hero/Hero.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Hero/Hero.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import Hero from './Hero';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Hero', () => {
  it('renders the logo image', () => {
    render(<Hero />, { wrapper });
    expect(screen.getByAltText('ICA')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Hero />, { wrapper });
    expect(screen.getByText('შენი წარმატება იწყება აქ')).toBeInTheDocument();
  });

  it('renders a tel: phone link as CTA', () => {
    render(<Hero />, { wrapper });
    const links = screen.getAllByRole('link');
    const phoneLink = links.find((l) => l.getAttribute('href')?.startsWith('tel:'));
    expect(phoneLink).toBeDefined();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/components/Hero/Hero.test.tsx --reporter=verbose
```

Expected: FAIL — `Cannot find module './Hero'`

- [ ] **Step 3: Create `src/components/Hero/Hero.tsx`**

```typescript
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PHONE } from '../../config';
import logo from '../../assets/logo.png';

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '90vh',
        bgcolor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          component="img"
          src={logo}
          alt="ICA"
          sx={{ height: 200, mb: 4 }}
        />
        <Typography variant="h2" color="white" gutterBottom>
          შენი წარმატება იწყება აქ
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}
        >
          ICA — სასწავლო ცენტრი, სადაც მოსწავლეები ეუფლებიან ცოდნას
          გამოცდილი პედაგოგების მეშვეობით.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href={`tel:${PHONE}`}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 700,
            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: 'grey.100',
              transform: 'scale(1.03)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {PHONE}
        </Button>
      </Container>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: 24,
          color: 'rgba(255,255,255,0.6)',
          animation: 'bounce 1.5s ease-in-out infinite',
        }}
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </Box>
    </Box>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/components/Hero/Hero.test.tsx --reporter=verbose
```

Expected:
```
✓ Hero > renders the logo image
✓ Hero > renders the tagline
✓ Hero > renders a tel: phone link as CTA
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero/Hero.tsx src/components/Hero/Hero.test.tsx
git commit -m "feat: add Hero section component"
```

---

### Task 11: ServicesSection Component

**Files:**
- Create: `src/components/ServicesSection/ServicesSection.tsx`
- Create: `src/components/ServicesSection/ServicesSection.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/ServicesSection/ServicesSection.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import ServicesSection from './ServicesSection';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('ServicesSection', () => {
  it('renders the section title', () => {
    render(<ServicesSection />, { wrapper });
    expect(screen.getByText('ჩვენი კურსები')).toBeInTheDocument();
  });

  it('renders all 8 subject names', () => {
    render(<ServicesSection />, { wrapper });
    expect(screen.getByText('ისტორია')).toBeInTheDocument();
    expect(screen.getByText('ინგლისური')).toBeInTheDocument();
    expect(screen.getByText('ქართული')).toBeInTheDocument();
    expect(screen.getByText('მათემატიკა')).toBeInTheDocument();
    expect(screen.getByText('სამოქალაქო განათლება')).toBeInTheDocument();
    expect(screen.getByText('გეოგრაფია')).toBeInTheDocument();
    expect(screen.getByText('ფიზიკა')).toBeInTheDocument();
    expect(screen.getByText('ქიმია')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/components/ServicesSection/ServicesSection.test.tsx --reporter=verbose
```

Expected: FAIL — `Cannot find module './ServicesSection'`

- [ ] **Step 3: Create `src/components/ServicesSection/ServicesSection.tsx`**

```typescript
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import SubjectCard from './SubjectCard';
import { subjects } from '../../data/subjects';

export default function ServicesSection() {
  return (
    <Box component="section" sx={{ bgcolor: '#F8F6F2', py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" gutterBottom>
            ჩვენი კურსები
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              bgcolor: 'primary.main',
              mx: 'auto',
              mb: 2,
            }}
          />
          <Typography variant="subtitle1" color="text.secondary">
            აირჩიე შენთვის სასურველი კურსი
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {subjects.map((subject) => (
            <Grid key={subject.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <SubjectCard
                name={subject.name}
                schedule={subject.schedule}
                price={subject.price}
                Icon={subject.Icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/components/ServicesSection/ServicesSection.test.tsx --reporter=verbose
```

Expected:
```
✓ ServicesSection > renders the section title
✓ ServicesSection > renders all 8 subject names
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ServicesSection/ServicesSection.tsx src/components/ServicesSection/ServicesSection.test.tsx
git commit -m "feat: add ServicesSection with subject grid"
```

---

### Task 12: CTAStrip Component

**Files:**
- Create: `src/components/CTAStrip/CTAStrip.tsx`
- Create: `src/components/CTAStrip/CTAStrip.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/CTAStrip/CTAStrip.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import CTAStrip from './CTAStrip';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('CTAStrip', () => {
  it('renders the contact heading', () => {
    render(<CTAStrip />, { wrapper });
    expect(screen.getByText('დაგვიკავშირდი')).toBeInTheDocument();
  });

  it('renders a tel: phone link', () => {
    render(<CTAStrip />, { wrapper });
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toMatch(/^tel:/);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/components/CTAStrip/CTAStrip.test.tsx --reporter=verbose
```

Expected: FAIL — `Cannot find module './CTAStrip'`

- [ ] **Step 3: Create `src/components/CTAStrip/CTAStrip.tsx`**

```typescript
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { PHONE } from '../../config';

export default function CTAStrip() {
  return (
    <Box component="section" sx={{ bgcolor: 'primary.main', py: 8 }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" color="white" gutterBottom>
          დაგვიკავშირდი
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          href={`tel:${PHONE}`}
          sx={{
            borderColor: 'rgba(255,255,255,0.7)',
            color: 'white',
            px: 4,
            py: 1.5,
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          {PHONE}
        </Button>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/components/CTAStrip/CTAStrip.test.tsx --reporter=verbose
```

Expected:
```
✓ CTAStrip > renders the contact heading
✓ CTAStrip > renders a tel: phone link
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/components/CTAStrip/CTAStrip.tsx src/components/CTAStrip/CTAStrip.test.tsx
git commit -m "feat: add CTAStrip component"
```

---

### Task 13: Footer Component

**Files:**
- Create: `src/components/Footer/Footer.tsx`
- Create: `src/components/Footer/Footer.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Footer/Footer.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import Footer from './Footer';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText(/© 2026 ICA/)).toBeInTheDocument();
  });

  it('renders a tel: phone link', () => {
    render(<Footer />, { wrapper });
    const links = screen.getAllByRole('link');
    const phoneLink = links.find((l) => l.getAttribute('href')?.startsWith('tel:'));
    expect(phoneLink).toBeDefined();
  });

  it('renders the logo image', () => {
    render(<Footer />, { wrapper });
    expect(screen.getByAltText('ICA')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/components/Footer/Footer.test.tsx --reporter=verbose
```

Expected: FAIL — `Cannot find module './Footer'`

- [ ] **Step 3: Create `src/components/Footer/Footer.tsx`**

```typescript
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PHONE } from '../../config';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1A1010', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={logo}
              alt="ICA"
              sx={{ height: 40, mb: 2, display: 'block' }}
            />
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              ICA — სასწავლო ცენტრი მოსწავლეებისთვის
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ color: 'grey.300', mb: 1 }}>
              <Box
                component="a"
                href={`tel:${PHONE}`}
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                {PHONE}
              </Box>
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              მისამართი: —
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Typography variant="caption" sx={{ color: 'grey.600' }}>
          © 2026 ICA. ყველა უფლება დაცულია
        </Typography>
      </Container>
    </Box>
  );
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npx vitest run src/components/Footer/Footer.test.tsx --reporter=verbose
```

Expected:
```
✓ Footer > renders the copyright text
✓ Footer > renders a tel: phone link
✓ Footer > renders the logo image
Test Files  1 passed (1)
```

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer/Footer.tsx src/components/Footer/Footer.test.tsx
git commit -m "feat: add Footer component"
```

---

### Task 14: Compose App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx`**

```typescript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ServicesSection from './components/ServicesSection/ServicesSection';
import CTAStrip from './components/CTAStrip/CTAStrip';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <CTAStrip />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Run full test suite — expect all pass**

```bash
npx vitest run --reporter=verbose
```

Expected: every test file passes. Count should be 9 test files (vitest-setup, theme, subjects, SubjectCard, Navbar, Hero, ServicesSection, CTAStrip, Footer).

- [ ] **Step 3: Verify TypeScript build succeeds**

```bash
npm run build
```

Expected: build completes with output in `dist/`. No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: compose landing page in App.tsx"
```

---

### Task 15: Smoke Test and Content Handoff

**Files:** None (verification + notes only)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: dev server starts at `http://localhost:5173` (or port shown in terminal).

- [ ] **Step 2: Verify page visually in browser**

Open the URL. Confirm:
- Sticky crimson navbar with logo image and phone button visible
- Hero section fills ~90% of viewport: crimson background, logo graphic, Georgian tagline, phone CTA button, animated chevron at bottom
- Services section on off-white background: 8 subject cards in a responsive grid, each showing icon + name + schedule + price
- Crimson CTA strip below the grid with "დაგვიკავშირდი" heading and phone button
- Dark footer at bottom with logo, description, phone link, and "© 2026 ICA" copyright line

- [ ] **Step 3: Check mobile layout**

Open browser DevTools → toggle device toolbar → set width to 375px. Confirm:
- Subject cards stack to 1 column
- Navbar logo and phone button fit without overflow
- Hero text is readable at small size

- [ ] **Step 4: Update placeholder content before launch**

When ready to go live, update these files:

| File | What to change |
|---|---|
| `src/config.ts` | Replace `+995599000000` with the real phone number |
| `src/data/subjects.ts` | Replace placeholder schedules and prices with actual values |
| `src/components/Hero/Hero.tsx` | Update tagline and description to final approved copy |
| `src/components/Footer/Footer.tsx` | Replace `მისამართი: —` with actual address |
