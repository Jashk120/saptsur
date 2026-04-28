# CONTEXT.md

## Architecture

This repository contains a single-page React application built with Vite. The entire user interface is rendered within `src/App.jsx`, which includes:

- Hero section with animated stars and a countdown timer
- Tribute section featuring Lata Mangeshkar’s biography broken into three eras
- Social cause callout with two charitable organisations
- Footer / call-to-action linking to an external ticket platform

The app uses **no client-side routing**; all content is organised vertically on one page. Styling is applied via inline styles and CSS custom properties defined in `src/index.css` (not shown in the provided files but referenced). Custom hooks (`useReveal`, `useCountdown`) handle scroll-triggered animations and a live countdown respectively.

## Modules

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite configuration with the official React plugin |
| `eslint.config.js` | ESLint configuration using `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` |
| `src/main.jsx` | Application entry point – mounts `<App />` inside `StrictMode` |
| `src/App.jsx` | Main component containing all UI, state, custom hooks, data, and styling |
| `src/index.css` | Global styles and CSS custom properties (referenced but not shown) |
| `src/assets/` | Static images (logos, Lata Mangeshkar portraits) |

## Setup Assumptions

- **Node.js** (v18+ recommended) and a package manager (`npm` or `yarn`) are installed.
- After cloning, run `npm install` (or `yarn install`) to install dependencies.
- Development server is started with `npm run dev` (Vite default). Production build via `npm run build`.
- The app expects a `config.json` to be fetched from `https://raw.githubusercontent.com/Jashk120/config/refs/heads/main/config.json` (only the URL is referenced; actual usage may populate event date / details).
- Images in `src/assets/` must be present for portrait renders; fallback is an emoji `🎵` on error.
- Google Fonts stylesheet (`Cormorant Garamond`, `Cinzel`, `Noto Sans Devanagari`) is loaded dynamically in the component.

## Key Flows

1. **Page load** → `main.jsx` renders `<App />` inside `<StrictMode>`.
2. **Hero section** → Displays event name, date, logos, and a live countdown (`useCountdown` hook).
3. **Scroll-triggered reveals** → Each biography block and section uses the `useReveal` hook. Elements fade and slide up when their top reaches 92% of the viewport.
4. **Tribute timeline** → Three eras (Early Years, Golden Voice, Legacy) are rendered with a portrait circle (`PortraitCircle`), era label, and summary text.
5. **Cause callout** → Two organisations are shown with logos and bilingual (Marathi / English) descriptions. "Book Tickets" button links to `CAUSE_CTA_URL`.
6. **Animations** → CSS `@keyframes` (`shimmer`, `breathe`, `spin`) are defined inline in `App.jsx`? (not shown but referenced via `animation` properties). Stars twinkle with random delays and sizes.

## Notable Interfaces

### Custom Hooks

- **`useReveal()`** → returns `[ref, isVisible]`. Attach `ref` to a DOM element; `isVisible` becomes `true` once the element enters the viewport (within 92% of window height). Cleanup removes scroll/resize listeners upon reveal.

- **`useCountdown(dateStr)`** → returns `{ d, h, m, s }` (zero-padded strings). Accepts a parseable date string (e.g., `"2026-01-01"`). Ticks every second; freezes at `"00"` when target is past.

### Utility Function

- **`fmtDate(str)`** → formats a date string to `"Weekday, Day Month Year"` locale (`en-IN`). Returns empty string on invalid input.

### Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Reveal` | `children`, `delay` (number, default 0), `style` (object) | Wraps content with fade/slide animation triggered by viewport entry |
| `Divider` | (none) | Horizontal gold-tinted line with a diamond ornament |
| `SectionLabel` | `children` | Gold uppercase label with `Cinzel` font |
| `GoldEm` | `children` | Italic text with a shimmering gold gradient effect |
| `SectionTitle` | `children` | Large serif section heading (`Cormorant Garamond`) |
| `PortraitCircle` | `src`, `alt`, `size` (CSS string), `glowColor` (CSS color) | Circular portrait with decorative rings and breathing glow; fallback `🎵` on image error |
| `OrganizersBar` | `organizers` (array of `{name, logoUrl}`) | Horizontal bar of organizer logos and names with gold dividers (responsive) |