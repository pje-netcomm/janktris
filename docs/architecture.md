# Janktris Architecture

## 1. Overview
Janktris is a browser-based Tetris clone implemented in vanilla JavaScript (ES6+), HTML, and CSS. The system is organized into clear modules for game logic, rendering, input, audio, and storage, optimized for performance and testability.

## 2. System Structure

### 2.1 Main Components
- **Game Engine**: Manages game state, block logic, scoring, and game loop.
- **Renderer**: Handles drawing the arena, blocks, and UI using the HTML5 Canvas API.
- **Input Handler**: Captures and processes keyboard events for game controls.
- **Audio Manager**: Plays sound effects for game events.
- **Storage Manager**: (Stub for v0.0.0) Prepares for future local storage use.
- **UI Layer**: Displays score, messages, and overlays.

### 2.2 Data Flow & State Management
- The Game Engine maintains the authoritative state (arena, active block, score, game status).
- Input Handler dispatches actions to the Game Engine.
- Renderer queries the Game Engine for current state and draws accordingly.
- Audio Manager listens for game events (row clear, block place, etc.).
- Storage Manager (future) will persist state as needed.

### 2.3 File Organization
- `index.html` – Main HTML file, includes canvas and UI elements.
- `style.css` – Visual styling.
- `main.js` – Entry point, initializes modules and starts the game.
- `engine.js` – Game logic and state management.
- `renderer.js` – Canvas rendering logic.
- `input.js` – Keyboard input handling.
- `audio.js` – Sound effect management.
- `storage.js` – Local storage utilities (stub for v0.0.0).
- `version.js` – Exposes version from git describe.
- `tests/` – Playwright test scripts.

### 2.4 Component Interactions
- **Game Engine** exposes methods for state queries and actions.
- **Renderer** subscribes to state changes or is called each frame.
- **Input Handler** translates key events to engine actions.
- **Audio Manager** is triggered by engine events.
- **UI Layer** updates score and overlays based on engine state.

### 2.5 State Management
- Centralized state object in the Game Engine.
- Immutable updates for arena and block state.
- State transitions: running, paused, game over.

## 3. Module Diagram

```
[Input Handler] → [Game Engine] ← [Renderer]
                        ↓
                [Audio Manager]
                        ↓
                [Storage Manager]
```

## 4. Testing
- Playwright tests interact with the UI and canvas to verify gameplay, scoring, and game over conditions.

---
