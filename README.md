# Janktris

A browser-based block drop game built with vanilla JavaScript.

## Features
- Keyboard controls with auto-repeat support
- Score tracking with high score persistence
- Sound effects for game events
- Pause/resume functionality
- Time tracking

## Getting Started

### Play Locally

1. Clone the repository
2. Open `index.html` in a web browser

Or use a local server:

```bash
npm install
npm start
```

### Controls

| Key | Action |
|-----|--------|
| ← / → | Move block left/right |
| ↑ | Rotate clockwise |
| ↓ | Drop faster (hold) |
| A | Rotate counter-clockwise |
| D | Rotate clockwise |
| Enter | Hard drop (instant) |
| Space | Pause/Resume |

## Development

### Building

```bash
npm run build
```

This updates the version number from git tags.

### Testing

Tests use Playwright to validate the game:

```bash
npx playwright test
```

## Tech Stack

- HTML5 Canvas for rendering
- Web Audio API for sound effects
- LocalStorage for persistence
- Playwright for E2E testing

## License

MIT
