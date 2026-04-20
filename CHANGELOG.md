# CHANGELOG

## [v0.0.1] - 2026-04-20
### Changed
- **BREAKING**: Updated control scheme for improved usability
  - Arrow Left/Right now move blocks horizontally (previously rotated)
  - Z key rotates block counter-clockwise (CCW)
  - D key rotates block clockwise (CW)
  - Down arrow accelerates fall while held, returns to normal when released
  - Space key starts game, pauses/resumes, and restarts after game over

### Added
- New "I" block shape (vertical 3-cell line) with purple color
- Updated block shapes to match refined specifications:
  - LINE: 5 cells (was 6)
  - T, Z, L: Simplified shapes
- Improved game over message displays final score and restart instructions
- Updated on-screen controls legend to reflect new key mappings

### Testing
- Created comprehensive Playwright E2E test suite (test-controls.js)
- Verified all controls across 3 block falls (15 total verifications)
- All control tests passed: movement, rotation, and acceleration
- Test results documented in testruns.md (E2E-CONTROLS-001)

## [v0.0.0] - Initial foundation
- Project initialized
- Milestone 1: Foundation files and structure created
\n## Milestone 2: Game Grid\n- Implemented 20x40 arena grid rendering on canvas\n- Added grid lines, border, and background\n- Render loop established\n
\n## Milestone 3: Block System\n- Defined S, Line, T, Z, L block shapes\n- Added color mapping\n- Implemented Block class and rendering\n- Test render of all shapes at fixed positions\n
\n## Milestone 4: Block Spawning\n- Implemented random block spawning at top-center\n- Random rotation\n- Arena data structure and active block state\n- Block appears at correct position\n
\n## Milestone 5: Movement & Physics\n- Implemented falling blocks at 1 row/sec\n- Collision with arena and fixed blocks\n- Blocks fix and new block spawns\n- Arena rendering of fixed blocks\n
## Milestone 6: Rotation
- Implemented 90° rotation (CW/CCW) for all block shapes
- Added rotateBlock(direction) with collision checks
- Block rotation fails gracefully if blocked
- All shapes rotate correctly through 4 orientations
- Manual test: T-block, Line, wall collision, stacked blocks

## Milestone 7: Input Controls
- Added keyboard handling for rotation (left/right arrows)
- Down arrow accelerates fall to 0.1s/row, disables rotation
- Space toggles pause (with state variable)
- A/D keys for left/right movement
- Prevents page scroll on arrow keys

## Milestone 8: Row Clearing
- Implemented row clearing logic (clearFullRows)
- When a row is full, it is removed and all above rows shift down
- Row clearing is triggered after block is fixed
- Returns number of rows cleared for scoring

## Milestone 9: Scoring System
- Added score and line tracking to gameState
- 1pt per block placed, 10pt per row cleared
- Bonus: 2 rows=20, 3 rows=40, 4 rows=100
- Score and lines update after each block fix

## Milestone 10: Game States
- Added start screen, pause, and game over states
- UI messages update for each state
- Arena dims and message box styled for pause/game over
- Space toggles pause, starts game, or restarts after game over

