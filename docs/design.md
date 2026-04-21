# Janktris Design

## 1. Game Logic Modules

### 1.1 GameEngine (engine.js)
- Manages arena (20x40 grid), active block, score, and game state.
- Methods: `start()`, `pause()`, `resume()`, `reset()`, `tick()`, `moveBlock(dir)`, `rotateBlock(dir)`, `dropBlock()`, `fixBlock()`, `clearRows()`, `updateScore()`.
- State: `{ arena, activeBlock, score, status }`.

### 1.2 Block Representation
- Each block: `{ shapeId, rotation, color, cells: [ [x, y], ... ] }`.
- Shapes defined as arrays of relative cell positions.
- Rotation: 2D matrix rotation (90° steps), precomputed or via function.

### 1.3 Block Spawning
- Random shape and rotation, centered at (10, 0).
- New block spawns after previous is fixed.

### 1.4 Collision Detection
- Checks if any block cell would overlap filled arena cell or out-of-bounds.
- Used before move/rotate/fix.

### 1.5 Row Clearing
- After fixing, scan for full rows.
- Remove full rows, shift above rows down, update score.

### 1.6 Scoring
- 1 point per block placed.
- 10 points per row cleared, plus multi-row bonus.

### 1.7 Game Over
- Triggered if spawn collides or row 0 is filled after fixing.

## 2. Rendering (renderer.js)
- Uses HTML5 Canvas for arena, blocks, overlays.
- Draws grid, filled cells, active block, score, messages.
- Colors per block shape (see requirements).
- Arena visually dimmed and "PAUSED" overlay when paused.

## 3. Input Handling (input.js)
- Listens for keydown events:
  - Left/Right: rotate
  - Down: accelerate fall
  - Space: pause/resume
- Debounces and prevents default browser actions.
- Handles simultaneous key presses.

## 4. Audio Management (audio.js)
- Uses HTML5 Audio API.
- Plays short sound effects for events (row clear, block place, rotate, game over, etc.).
- Major/minor event volume distinction.
- Ensures no unpleasant overlap.

## 5. Local Storage (storage.js)
- Stub for v0.0.0; future: leaderboard/high scores.
- No persistent state for v0.0.0.

## 6. State Management
- Central state object in GameEngine.
- State transitions: running, paused, game over.
- UI and renderer subscribe to state changes.

## 7. Testing Approach
- Playwright scripts in `tests/` directory.
- Tests cover: arena rendering, block movement, rotation, collision, row clearing, scoring, pause, game over, sound triggers.
- Tests run via npm scripts.

---
