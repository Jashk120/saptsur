# Saptsur

A single-page tribute application dedicated to the legendary Lata Mangeshkar, built with React and Vite. The site features an immersive event landing page with animated starfield, biographical timeline, charitable cause integration, and live countdown functionality.

## Features

- **Animated Hero Section** – Dynamic starfield with twinkling effects and a live countdown timer to the event date
- **Interactive Tribute Timeline** – Three-era biography (Early Years, Golden Voice, Legacy) with scroll-triggered reveal animations
- **Charitable Cause Integration** – Showcase and promote two charitable organizations with bilingual descriptions
- **Responsive Design** – Optimized for all screen sizes with elegant typography and gold-themed aesthetics
- **Scroll Animations** – Smooth fade-in and slide-up effects using custom intersection observer hooks
- **Event Details** – External ticket platform integration with clear call-to-action

## Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Jashk120/saptsur.git

# Navigate to the project directory
cd saptsaur

# Install dependencies
npm install
# or
yarn install
```

### Configuration

The application fetches event configuration from an external JSON file. Ensure network access to:
```
https://raw.githubusercontent.com/Jashk120/config/refs/heads/main/config.json
```

Place required images in the `src/assets/` directory:
- Event organizer logos
- Lata Mangeshkar portraits

## Usage

### Development Server

```bash
npm run dev
# or
yarn dev
```

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Production Build

```bash
npm run build
# or
yarn build
```

Builds the app for production to the `dist` folder.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
saptsur/
├── public/
├── src/
│   ├── assets/           # Static images (logos, portraits)
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles and CSS custom properties
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── package.json
```

## Technical Details

### Custom Hooks

- **`useReveal()`** – Detects when elements enter the viewport for scroll-triggered animations. Returns `[ref, isVisible]` where `isVisible` becomes `true` once the element is within 92% of the viewport height.

- **`useCountdown(dateStr)`** – Provides live countdown timer. Accepts a parseable date string and returns zero-padded `{ d, h, m, s }` values that freeze at `"00"` when the target date passes.

### Key Components

| Component | Description |
|-----------|-------------|
| `PortraitCircle` | Circular portrait with decorative rings and breathing glow animation |
| `Reveal` | Wrapper component for scroll-triggered fade/slide animations |
| `OrganizersBar` | Horizontal display of event organizers with logos and names |
| `SectionTitle` | Styled section heading with serif typography |
| `Divider` | Gold-tinted horizontal line with diamond ornament |

### Styling

- Fonts: Cormorant Garamond, Cinzel, Noto Sans Devanagari (loaded from Google Fonts)
- Color scheme: Gold accents on dark backgrounds
- Animations: CSS keyframes for shimmer, breathe, and spin effects

## Contribution

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Notes

- Maintain single-page architecture – no client-side routing
- Use inline styles or CSS custom properties for consistent theming
- Test scroll animations across different viewport sizes
- Ensure images have fallback emoji (`🎵`) on load errors