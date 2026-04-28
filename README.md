```markdown
# Saptsur

A single‑page React application that pays tribute to the legendary Lata Mangeshkar, promotes two charitable organisations, and includes a countdown to a future event. Built with Vite and React 19, the page features a biography timeline, an interactive starry background, scroll‑reveal animations, and an organisers bar.

## Features

- **Countdown Timer** – Real‑time countdown to a target date (e.g., `2026-06-25`), updated every second.
- **Biography Timeline** – Three eras of Lata Mangeshkar’s life, each with an image, years, and a summary.
- **Social‑Cause Section** – Highlights two charities (“I Progress Foundation” and “Aadhar Old Age Home”) with descriptions and a call‑to‑action link.
- **Scroll‑Reveal Animations** – Sections fade in and slide up as they enter the viewport (threshold 92%).
- **Decorative Star Background** – 70 animated stars with random positions and durations.
- **Glowing Portrait** – Circular portrait with rotating rings and a breathing glow effect (fallback emoji on image error).
- **Organisers Bar** – Horizontal row of organiser logos with vertical dividers, responsive via `clamp()`.
- **Custom Typography** – Google Fonts (Cinzel, Cormorant Garamond) and gold gradient text via `GoldEm`.

## Setup

### Prerequisites

- Node.js 18 or newer
- npm, pnpm, or yarn

### Installation

```bash
git clone https://github.com/Jashk120/saptsur.git
cd saptsur
npm install
```

The app requires an internet connection to load Google Fonts (injected via `<link>`).

**Required assets** (place in `src/assets/`):
- `ssv-logo.jpeg`, `saptsur.png`, `lata-hero.png`
- `Lata_Young.jfif`, `Lata_MID.jfif`
- `I_Prog_LOGO.jpeg`, `Adhar_ashram_logo.webp`

A remote JSON configuration URL is defined but not actively used in the provided code.

## Usage

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
saptsur/
├── index.html            # Entry HTML (mounts React app)
├── package.json
├── vite.config.js        # Vite configuration (React plugin)
├── public/               # Static assets (if any)
├── src/
│   ├── main.jsx          # React entry point (StrictMode, <App />)
│   ├── App.jsx           # Single component file (all logic, hooks, data, and UI)
│   └── assets/           # Required images (listed above)
└── .eslintrc.cjs         # ESLint configuration (React hooks & refresh plugins)
```

All components, custom hooks, data constants, and utility functions reside in `src/App.jsx` – no routing or external state management is used.

## Custom Hooks & Components

| Name              | Description |
|-------------------|-------------|
| `useReveal()`     | Returns a ref and a boolean; triggers fade‑in when element enters viewport. |
| `useCountdown(dateStr)` | Returns `{ d, h, m, s }` zero‑padded strings, updated every second. |
| `fmtDate(str)`    | Formats a date string using Indian English locale (`en-IN`). |
| `Reveal`          | Wrapper component for scroll‑reveal animations (opacity + translateY). |
| `Divider`         | Horizontal line with a diamond centre. |
| `SectionLabel`    | Gold uppercase label (Cinzel). |
| `GoldEm`          | Shimmering gold gradient `<em>`. |
| `SectionTitle`    | Large heading (Cormorant Garamond). |
| `PortraitCircle`  | Circular portrait with glowing rings and a fallback. |
| `OrganizersBar`   | Row of organisers (logo + name) with vertical dividers. |

**Data constants** (in `App.jsx`):
- `LATA_LIFE` – array of 3 era objects (`era`, `years`, `img`, `summary`)
- `CAUSE_ORGS` – array of 2 charity objects
- `CAUSE_TEXT_MR` / `CAUSE_TEXT_EN` – cause descriptions
- `CAUSE_CTA_URL` – external link (BookMyShow)
- `STARS` – array of 70 star configuration objects

## Contribution

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Install dependencies: `npm install`
4. Lint your code: `npx eslint src/`
5. Commit changes with a clear message.
6. Open a pull request against the `main` branch.

Please ensure that any new code follows the existing inline‑style patterns and does not introduce external dependencies unless absolutely necessary. For UI changes, test with both desktop and mobile viewports.
```