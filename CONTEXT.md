```markdown
# CONTEXT.md – Saptsur

## Overview

`Jashk120/saptsur` is a single-page React application built with Vite. It serves as a tribute page honouring Lata Mangeshkar’s life and legacy, while promoting two charitable organisations. The page features a countdown to an event, a biography timeline, a social‑cause section, and an organisers bar.

---

## Architecture

- **Build Tool**: Vite 6+ (config via `vite.config.js`, React plugin).
- **Framework**: React 19 (JSX, no TypeScript).
- **Styling**: Inline styles + CSS custom properties (defined in `index.css` – not shown but used in `App.jsx`). A Google Fonts link is injected.
- **Linting**: ESLint with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.

No routing or state management library is used; the app is a single component with multiple sections.

---

## Modules / Components

All components are defined in a single file (`src/App.jsx`) alongside data and utility functions.

| Module / Component      | Description |
|-------------------------|-------------|
| `useReveal()`           | Custom hook – returns a ref and a boolean `vis`. Triggers fade‑in when element enters viewport (threshold 92%). |
| `useCountdown(dateStr)` | Custom hook – updates every second, returns `{ d, h, m, s }` as zero‑padded strings. |
| `fmtDate(str)`          | Formats a date string into Indian English locale (`en-IN`). |
| `STARS`                 | Array of 70 star objects for a decorative background (positions, animation durations). |
| `Reveal`                | Wrapper component that animates children (opacity + translateY) on scroll. |
| `Divider`               | Decorative horizontal line with a diamond in the centre. |
| `SectionLabel`          | Gold, uppercase, Cinzel‑font label for section headings. |
| `GoldEm`                | Shimmering gold gradient text (`<em>`). |
| `SectionTitle`          | Cormorant Garamond large heading. |
| `PortraitCircle`        | Circular portrait with multiple glowing rings and error fallback (🎵 emoji). |
| `OrganizersBar`         | Horizontal list of organisers (logo + name) with vertical dividers. |
| *Data constants*        | `LATA_LIFE` (3 eras), `CAUSE_ORGS` (2 orgs), `CAUSE_TEXT_MR`/`CAUSE_TEXT_EN`, `CAUSE_CTA_URL`, logo/image paths. |

---

## Setup Assumptions

- Node.js 18+ and npm/pnpm/yarn.
- Run `npm install` (or equivalent) to install dependencies (React, Vite, ESLint plugins).
- Google Fonts are loaded from the injected `FONT_LINK` – requires internet access.
- Image assets (`./src/assets/*`) are expected at the following paths:
  - `ssv-logo.jpeg`
  - `saptsur.png`
  - `lata-hero.png`
  - `Lata_Young.jfif`
  - `Lata_MID.jfif`
  - `I_Prog_LOGO.jpeg`
  - `Adhar_ashram_logo.webp`
- A remote JSON config is fetched from `GITHUB_CONFIG_URL` (not used in the provided snippet, but the URL is defined – may be used elsewhere in the file).
- The app is served over HTTPS when deployed (countdown uses `Date.now()` which works locally).
- Browser support: modern (ES2020, CSS `clamp()`, `gap`, `filter`, etc.).

---

## Key Flows

1. **Initialisation**  
   Vite serves `index.html` → `main.jsx` mounts `<App />` inside `<StrictMode>`.

2. **Countdown Timer**  
   `useCountdown` hook (called with a target date string) starts an interval that recalculates time difference every second. The timer is displayed in the UI.

3. **Scroll‑Reveal Animations**  
   Each `Reveal` component attaches a scroll/resize listener. When the element’s top is within 92% of the viewport height, it sets `vis=true` and removes listeners. The element transitions from `opacity:0`/`translateY(40px)` to visible.

4. **Portrait Glow**  
   `PortraitCircle` renders concentric rotating rings (`spin` animations) and a radial gradient glow that breathes (`breathe` animation). An `onError` handler on the image switches to a fallback emoji.

5. **Organisers Bar**  
   `OrganizersBar` receives an array of organisers (each with `name`, `logoUrl`, `short`). It renders a row of logos with vertical dividers. Widths are responsive via `clamp()`.

6. **Event Call‑to‑Action**  
   A link button (`CAUSE_CTA_URL`) directs users to BookMyShow.

---

## Notable Interfaces

### Custom Hooks

```jsx
const [ref, visible] = useReveal();
const countdown = useCountdown("2026-06-25"); // returns { d, h, m, s }
```

### Components

```jsx
<Reveal delay={0.3} style={{}}>…</Reveal>

<Divider />

<SectionLabel>Biography</SectionLabel>

<GoldEm>legend</GoldEm>

<SectionTitle>The Voice that Defined an Era</SectionTitle>

<PortraitCircle
  src={LATA_HERO}
  alt="Lata Mangeshkar"
  size="min(300px, 72vw)"
  glowColor="rgba(201,168,76,.18)"
/>

<OrganizersBar organizers={[
  { name: "I Progress Foundation", logoUrl: IPROG_LOGO, short: "IPROG" },
  { name: "Aadhar Old Age Home", logoUrl: WRI_LOGO, short: "AAH" },
]} />
```

### Data Structures

```js
LATA_LIFE = [{ era, years, img, summary }, …]         // 3 objects
CAUSE_ORGS = [{ name, logo, desc, emoji }, …]         // 2 objects
STARS = [{ id, left, top, dur, delay, big }, …]       // 70 objects
```
```