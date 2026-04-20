# Janktris Implementation Milestones

**Version:** 1.0  
**Created:** Planner Agent  
**Target Release:** v0.0.0

---

## Overview

This document breaks down the Janktris implementation into 12 prioritized milestones. Each milestone builds upon the previous ones, includes specific deliverables, and has a smoke test to verify completion.

**Implementation Order Rationale:**
1. Foundation first (project structure, version management)
2. Core rendering (grid and arena)
3. Game pieces (block definitions and spawning)
4. Physics and interaction (movement, collision, rotation)
5. Game rules (row clearing, scoring)
6. User experience (controls, game states)
7. Polish (audio, storage, final touches)
8. Quality assurance (testing, documentation)

---

## Milestone 1: Foundation

**Goal:** Establish project structure, HTML skeleton, and version management system.

**Dependencies:** None (starting point)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 1.1 | Create basic HTML file with canvas element and UI containers | `index.html` |
| 1.2 | Create CSS file with base styling and layout | `style.css` |
| 1.3 | Create main.js entry point with module initialization structure | `main.js` |
| 1.4 | Create version.js module for git-describe integration | `version.js` |
| 1.5 | Create package.json with project metadata and npm scripts | `package.json` |
| 1.6 | Set up build script for version injection | `build.sh` |
| 1.7 | Create empty stub modules for all planned components | `engine.js`, `renderer.js`, `input.js`, `audio.js`, `storage.js` |
| 1.8 | Add .gitignore for node_modules and build artifacts | `.gitignore` |

### Deliverables
- [ ] Complete file structure in place
- [ ] HTML page loads without errors
- [ ] Version number displays (can be placeholder "dev" initially)
- [ ] All stub modules load without errors

### Smoke Test
1. Open `index.html` in browser
2. Verify page loads without JavaScript errors (check console)
3. Verify "Janktris" title is displayed
4. Verify version placeholder is visible in UI
5. Verify canvas element is present and sized appropriately

### Exit Criteria
- All files created and committed
- `npm install` completes (if dependencies added)
- Browser console shows no errors on page load

---

## Milestone 2: Game Grid

**Goal:** Render the 20×40 arena with visible grid lines and proper styling.

**Dependencies:** Milestone 1 (Foundation)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 2.1 | Implement canvas initialization in renderer.js | `renderer.js` |
| 2.2 | Create arena drawing function with grid lines | `renderer.js` |
| 2.3 | Define arena constants (20 cols × 40 rows, cell size) | `engine.js` |
| 2.4 | Implement arena background color (dark grey #1a1a2e) | `renderer.js`, `style.css` |
| 2.5 | Add arena border styling (bright blue #0066FF) | `renderer.js`, `style.css` |
| 2.6 | Create render loop (requestAnimationFrame) | `renderer.js`, `main.js` |
| 2.7 | Style score display area outside arena | `style.css`, `index.html` |

### Deliverables
- [ ] Arena renders at correct dimensions
- [ ] Grid lines visible but subtle
- [ ] Cell boundaries clearly defined
- [ ] Score area positioned correctly
- [ ] Smooth 60 FPS render loop running

### Smoke Test
1. Open `index.html` in browser
2. Verify arena displays with 20×40 grid (count cells visually or measure)
3. Verify grid lines are visible against dark background
4. Verify arena border is bright blue
5. Verify score area is visible outside arena
6. Check DevTools Performance tab shows ~60 FPS

### Exit Criteria
- FR-ARENA-001, FR-ARENA-003 satisfied
- UI-LAYOUT-001, UI-LAYOUT-002, UI-VIS-004 satisfied
- Render loop stable at 60 FPS

---

## Milestone 3: Block System

**Goal:** Define all 5 block shapes with colors and implement basic block rendering.

**Dependencies:** Milestone 2 (Game Grid)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 3.1 | Define block shapes as cell position arrays | `engine.js` |
| 3.2 | Define color mapping for each shape | `engine.js` |
| 3.3 | Create Block class/object structure with shapeId, rotation, cells | `engine.js` |
| 3.4 | Implement block cell position calculator (based on origin + rotation) | `engine.js` |
| 3.5 | Create block rendering function in renderer | `renderer.js` |
| 3.6 | Implement cell fill with shape-specific colors | `renderer.js` |
| 3.7 | Test render each block shape at fixed position | `main.js` (temporary) |

### Block Shape Definitions
```javascript
// S-Block (Green): (0,0), (1,0), (1,1), (2,1)
// Line (Cyan): (0,0), (1,0), (2,0), (3,0), (4,0), (5,0)
// T-Block (Purple): (0,0), (1,0), (2,0), (1,1)
// Z-Block (Red): (1,0), (2,0), (0,1), (1,1)
// L-Block (Orange): (0,0), (1,0), (0,1)
```

### Deliverables
- [ ] All 5 block shapes defined with correct cells
- [ ] Each shape has distinct assigned color
- [ ] Blocks render correctly on the grid
- [ ] Block cells align properly with grid cells

### Smoke Test
1. Add temporary code to render each block shape on the arena
2. Verify S-Block (green) renders with correct shape
3. Verify Line (cyan) renders with 6 horizontal cells
4. Verify T-Block (purple) renders with T shape
5. Verify Z-Block (red) renders with correct shape
6. Verify L-Block (orange) renders with L shape
7. Verify all colors match specification

### Exit Criteria
- FR-BLOCK-001 through FR-BLOCK-008 satisfied
- UI-VIS-002, UI-VIS-003, UI-VIS-005 satisfied

---

## Milestone 4: Block Spawning

**Goal:** Implement random block spawning at correct position with random rotation.

**Dependencies:** Milestone 3 (Block System)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 4.1 | Create game state object with activeBlock property | `engine.js` |
| 4.2 | Implement spawnBlock() function with random shape selection | `engine.js` |
| 4.3 | Implement random rotation (0°, 90°, 180°, 270°) at spawn | `engine.js` |
| 4.4 | Set spawn position to column 10, row 0 | `engine.js` |
| 4.5 | Connect spawning to render loop to display active block | `renderer.js`, `main.js` |
| 4.6 | Implement arena data structure (20×40 2D array) | `engine.js` |

### Deliverables
- [ ] spawnBlock() creates random block
- [ ] Block appears at center-top (col 10, row 0)
- [ ] Rotation is randomized
- [ ] Active block renders on arena

### Smoke Test
1. Refresh page multiple times
2. Verify a block appears near top-center each time
3. Verify different shapes appear (may need multiple refreshes)
4. Verify same shape appears in different rotations

### Exit Criteria
- FR-SPAWN-001 through FR-SPAWN-004 satisfied
- Block visually appears at correct spawn point

---

## Milestone 5: Movement & Physics

**Goal:** Implement block falling at correct speed with collision detection.

**Dependencies:** Milestone 4 (Block Spawning)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 5.1 | Implement game tick timer (1000ms interval) | `engine.js` |
| 5.2 | Implement moveBlock('down') function | `engine.js` |
| 5.3 | Create collision detection for arena boundaries | `engine.js` |
| 5.4 | Create collision detection for placed blocks | `engine.js` |
| 5.5 | Implement fixBlock() to commit block cells to arena | `engine.js` |
| 5.6 | Trigger new block spawn after fixing | `engine.js` |
| 5.7 | Update renderer to draw both active block and fixed cells | `renderer.js` |
| 5.8 | Implement game state start() method | `engine.js` |

### Collision Rules
- Block cannot move below row 39
- Block cannot move outside columns 0-19
- Block cannot overlap cells already filled in arena

### Deliverables
- [ ] Block falls automatically at 1 row/second
- [ ] Block stops at arena bottom
- [ ] Block stops when hitting placed blocks
- [ ] Fixed blocks remain visible
- [ ] New block spawns after previous block fixes

### Smoke Test
1. Load page and observe block falling
2. Verify block moves down approximately every 1 second
3. Let block reach bottom - verify it stops and stays visible
4. Verify new block spawns at top
5. Let multiple blocks stack - verify collision detection works
6. Verify no blocks escape arena boundaries

### Exit Criteria
- FR-FALL-001, FR-FALL-005 satisfied
- FR-COLL-001 through FR-COLL-005 satisfied
- FR-SPAWN-005 satisfied

---

## Milestone 6: Rotation

**Goal:** Implement 90° rotation in both directions with collision checking.

**Dependencies:** Milestone 5 (Movement & Physics)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 6.1 | Implement 2D rotation matrix for 90° CW rotation | `engine.js` |
| 6.2 | Implement 2D rotation matrix for 90° CCW rotation | `engine.js` |
| 6.3 | Create rotateBlock(direction) function | `engine.js` |
| 6.4 | Add collision check before applying rotation | `engine.js` |
| 6.5 | Ensure rotation fails gracefully (block stays in place) | `engine.js` |
| 6.6 | Test rotation for all 5 block shapes | Manual testing |

### Rotation Logic
```javascript
// 90° clockwise: (x, y) → (y, -x) relative to center
// 90° counter-clockwise: (x, y) → (-y, x) relative to center
```

### Deliverables
- [ ] rotateBlock('cw') rotates 90° clockwise
- [ ] rotateBlock('ccw') rotates 90° counter-clockwise
- [ ] Rotation blocked if would cause collision
- [ ] All shapes rotate correctly through 4 orientations

### Smoke Test
1. Temporarily add keyboard handlers for testing rotation
2. Spawn a T-Block and rotate CW 4 times - verify returns to original
3. Spawn a Line and rotate - verify dramatic shape change
4. Move block near wall, attempt rotation - verify blocked if would collide
5. Stack blocks, try to rotate into them - verify blocked

### Exit Criteria
- FR-ROT-001 through FR-ROT-006 satisfied
- Rotation works correctly for all 5 shapes

---

## Milestone 7: Input Controls

**Goal:** Implement keyboard handling for all game controls.

**Dependencies:** Milestone 6 (Rotation)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 7.1 | Create input handler module | `input.js` |
| 7.2 | Implement keydown event listener | `input.js` |
| 7.3 | Map Left Arrow → rotate CCW | `input.js` |
| 7.4 | Map Right Arrow → rotate CW | `input.js` |
| 7.5 | Map Down Arrow → accelerate fall (100ms) | `input.js`, `engine.js` |
| 7.6 | Implement accelerated fall state tracking | `engine.js` |
| 7.7 | Disable rotation during accelerated fall | `engine.js` |
| 7.8 | Reset accelerated fall when block fixes | `engine.js` |
| 7.9 | Prevent default browser actions for game keys | `input.js` |
| 7.10 | Handle simultaneous key presses | `input.js` |

### Control Mapping
- **Left Arrow**: Rotate counter-clockwise
- **Right Arrow**: Rotate clockwise
- **Down Arrow**: Fast fall (10× speed until block fixes)
- **Space**: Reserved for pause (Milestone 9)

### Deliverables
- [ ] Left/Right arrows rotate blocks
- [ ] Down arrow accelerates fall to 100ms/row
- [ ] Rotation disabled during fast fall
- [ ] Controls responsive (<50ms latency)
- [ ] Browser scroll/default actions prevented

### Smoke Test
1. Press Left Arrow - block rotates CCW
2. Press Right Arrow - block rotates CW
3. Press Down Arrow - block falls rapidly
4. During fast fall, try Left/Right - rotation should be blocked
5. Release Down, let next block spawn - normal speed resumes
6. Verify page doesn't scroll on arrow keys

### Exit Criteria
- FR-FALL-002, FR-FALL-003, FR-FALL-004 satisfied
- FR-CTRL-001 through FR-CTRL-006 satisfied
- NFR-PERF-002 satisfied (input latency <50ms)

---

## Milestone 8: Row Clearing

**Goal:** Detect and clear completed rows with proper cell shifting.

**Dependencies:** Milestone 7 (Input Controls)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 8.1 | Implement row completion check (all 20 cells filled) | `engine.js` |
| 8.2 | Create clearRows() function | `engine.js` |
| 8.3 | Handle multiple row clearing simultaneously | `engine.js` |
| 8.4 | Implement row shifting (cells above drop down) | `engine.js` |
| 8.5 | Call clearRows() after each block is fixed | `engine.js` |
| 8.6 | Add visual feedback for row clearing (optional flash) | `renderer.js` |
| 8.7 | Return number of rows cleared (for scoring) | `engine.js` |

### Row Clearing Logic
1. After fixBlock(), scan arena from bottom to top
2. Identify all complete rows
3. Remove complete rows
4. Shift all rows above downward
5. Fill new top rows with empty cells

### Deliverables
- [ ] Complete rows detected correctly
- [ ] Complete rows removed from arena
- [ ] Rows above shift down to fill gaps
- [ ] Multiple rows can clear simultaneously
- [ ] Visual feedback on row clear (if implemented)

### Smoke Test
1. Manually fill a row (may need to play or modify code temporarily)
2. Complete the row with a block placement
3. Verify the row disappears
4. Verify rows above shift down
5. Test clearing 2+ rows at once
6. Verify no gaps remain after clearing

### Exit Criteria
- FR-CLEAR-001 through FR-CLEAR-004 satisfied
- FR-CLEAR-005 (visual feedback) - Should priority

---

## Milestone 9: Scoring System

**Goal:** Implement score calculation and display.

**Dependencies:** Milestone 8 (Row Clearing)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 9.1 | Add score property to game state (initialize to 0) | `engine.js` |
| 9.2 | Implement updateScore() function | `engine.js` |
| 9.3 | Award 1 point when block is placed | `engine.js` |
| 9.4 | Award 10 points per row cleared | `engine.js` |
| 9.5 | Calculate multi-row bonus: (rows - 1) × 5 | `engine.js` |
| 9.6 | Update score display in HTML | `renderer.js` or DOM update |
| 9.7 | Style score display (clear, readable) | `style.css` |

### Scoring Formula
```
score += 1                           // block placed
score += rows_cleared × 10           // base row points
score += (rows_cleared - 1) × 5      // multi-row bonus (if > 1 row)
```

### Scoring Examples
- 1 row: 10 + 1 = 11 points
- 2 rows: 20 + 5 + 1 = 26 points
- 3 rows: 30 + 10 + 1 = 41 points
- 4 rows: 40 + 15 + 1 = 56 points

### Deliverables
- [ ] Score starts at 0
- [ ] +1 point per block placed
- [ ] +10 points per row cleared
- [ ] Multi-row bonus calculated correctly
- [ ] Score updates immediately in UI

### Smoke Test
1. Start game, place first block - score should be 1
2. Place second block - score should be 2
3. Clear 1 row - score increases by 11 (10 + 1 for block)
4. Clear 2 rows - score increases by 26
5. Verify score display updates in real-time

### Exit Criteria
- FR-SCORE-001 through FR-SCORE-006 satisfied
- UI-SCORE-001 through UI-SCORE-004 satisfied

---

## Milestone 10: Game States

**Goal:** Implement start, pause, and game over states with appropriate UI.

**Dependencies:** Milestone 9 (Scoring System)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 10.1 | Add game status to state (idle, running, paused, gameover) | `engine.js` |
| 10.2 | Implement pause() method - stop tick timer | `engine.js` |
| 10.3 | Implement resume() method - restart tick timer | `engine.js` |
| 10.4 | Map Space key to toggle pause | `input.js` |
| 10.5 | Create dimmed overlay for paused state | `renderer.js` |
| 10.6 | Display "PAUSED" message overlay | `renderer.js` |
| 10.7 | Implement game over detection (spawn collision) | `engine.js` |
| 10.8 | Implement game over detection (row 0 filled after fix) | `engine.js` |
| 10.9 | Display game over overlay with final score | `renderer.js` |
| 10.10 | Implement reset() for restart functionality | `engine.js` |
| 10.11 | Add restart button/key on game over | `input.js`, `renderer.js` |
| 10.12 | Create start screen with instructions | `renderer.js` |

### Game State Transitions
```
idle → (start) → running
running → (space) → paused
paused → (space) → running
running → (collision at spawn) → gameover
gameover → (restart) → running
```

### Deliverables
- [ ] Game starts in idle/start state
- [ ] Space pauses/resumes game
- [ ] Paused: arena dimmed, "PAUSED" displayed
- [ ] Game over: triggers on spawn collision or row 0 filled
- [ ] Game over: shows final score
- [ ] Restart available after game over

### Smoke Test
1. Load page - verify start/idle state
2. Press Space - verify game starts
3. Press Space again - verify game pauses
4. Verify arena dims and "PAUSED" appears
5. Press Space - verify game resumes
6. Play until game over (stack to top)
7. Verify game over screen with final score
8. Verify restart option works

### Exit Criteria
- FR-END-001 through FR-END-005 satisfied
- FR-PAUSE-001 through FR-PAUSE-007 satisfied
- FR-CTRL-004 satisfied

---

## Milestone 11: Audio System

**Goal:** Implement sound effects for all game events.

**Dependencies:** Milestone 10 (Game States)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 11.1 | Set up Audio Manager module | `audio.js` |
| 11.2 | Create/source sound files for events | `sounds/` directory |
| 11.3 | Implement playSound() function | `audio.js` |
| 11.4 | Add major event sounds (exciting, louder): | `audio.js` |
| 11.4a | - Row clear sound | |
| 11.4b | - Multi-row clear (variant) | |
| 11.4c | - Game over sound | |
| 11.4d | - Game start sound | |
| 11.5 | Add minor event sounds (subtle, quieter): | `audio.js` |
| 11.5a | - Block spawn sound | |
| 11.5b | - Rotation sound | |
| 11.5c | - Block land/fix sound | |
| 11.6 | Set volume levels (minor < major) | `audio.js` |
| 11.7 | Prevent overlapping sounds | `audio.js` |
| 11.8 | Connect audio triggers to game events | `engine.js`, `audio.js` |

### Sound Event Mapping
| Event | Sound Type | Volume |
|-------|-----------|--------|
| Game start | Major | 100% |
| Block spawn | Minor | 30% |
| Rotation | Minor | 30% |
| Block fix | Minor | 40% |
| Row clear (1) | Major | 80% |
| Row clear (2+) | Major | 100% |
| Game over | Major | 100% |

### Deliverables
- [ ] All required sounds implemented
- [ ] Major events play louder than minor events
- [ ] Sounds don't overlap unpleasantly
- [ ] Audio works in modern browsers
- [ ] Sound effects are short (< 2-3 seconds)

### Smoke Test
1. Start game - hear start sound
2. Block spawns - hear subtle spawn sound
3. Rotate block - hear soft rotation sound
4. Block lands - hear landing sound
5. Clear row - hear exciting clear sound
6. Clear multiple rows - hear more impressive sound
7. Reach game over - hear game over sound
8. Verify no jarring overlaps during rapid events

### Exit Criteria
- AUD-MAJOR-001 through AUD-MAJOR-004 satisfied
- AUD-MINOR-001 through AUD-MINOR-004 satisfied
- AUD-CTRL-001 through AUD-CTRL-003 satisfied

---

## Milestone 12: Polish & Storage

**Goal:** Final polish, local storage stub, version display, and UI refinements.

**Dependencies:** Milestone 11 (Audio System)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 12.1 | Finalize version.js with git-describe integration | `version.js`, `build.sh` |
| 12.2 | Display version in UI corner | `index.html`, `style.css` |
| 12.3 | Create storage.js stub module | `storage.js` |
| 12.4 | Add control instructions to UI | `index.html`, `style.css` |
| 12.5 | Final color and styling polish | `style.css` |
| 12.6 | Performance optimization if needed | All files |
| 12.7 | Cross-browser testing and fixes | All files |
| 12.8 | Code cleanup and organization | All files |

### Version Display
- Version from `git describe --tags --always`
- Displayed in UI footer or corner
- Format: "v0.0.0" or "v0.0.0-X-gYYYYYY"

### Deliverables
- [ ] Version number displayed correctly
- [ ] Control instructions visible
- [ ] UI polished and visually appealing
- [ ] Works in Chrome, Firefox, Edge, Safari
- [ ] Code clean and well-organized
- [ ] Storage module ready for future use

### Smoke Test
1. Verify version number displays correctly
2. Run `git describe` and compare to displayed version
3. Verify control instructions are clear
4. Test in Chrome - all features work
5. Test in Firefox - all features work
6. Test in Edge - all features work
7. Verify no console errors or warnings

### Exit Criteria
- NFR-CODE-003, NFR-CODE-004 satisfied
- UI-LAYOUT-004, UI-LAYOUT-005 satisfied
- NFR-COMPAT-001 through NFR-COMPAT-004 satisfied
- DATA-001 through DATA-003 satisfied

---

## Milestone 13: Testing & Documentation

**Goal:** Create Playwright tests and finalize documentation.

**Dependencies:** Milestone 12 (Polish & Storage)

### Implementation Items

| Item | Description | Files |
|------|-------------|-------|
| 13.1 | Set up Playwright test environment | `package.json`, test config |
| 13.2 | Create test for arena rendering | `tests/arena.spec.js` |
| 13.3 | Create tests for block spawning | `tests/blocks.spec.js` |
| 13.4 | Create tests for movement and collision | `tests/movement.spec.js` |
| 13.5 | Create tests for rotation | `tests/rotation.spec.js` |
| 13.6 | Create tests for row clearing | `tests/clearing.spec.js` |
| 13.7 | Create tests for scoring | `tests/scoring.spec.js` |
| 13.8 | Create tests for game states | `tests/states.spec.js` |
| 13.9 | Create tests for game over conditions | `tests/gameover.spec.js` |
| 13.10 | Add npm test scripts | `package.json` |
| 13.11 | Create CHANGELOG.md | `CHANGELOG.md` |
| 13.12 | Update README with play instructions | `README.md` |

### Test Coverage Goals
| Area | Tests |
|------|-------|
| Arena | Grid dimensions, cell rendering |
| Blocks | All 5 shapes render correctly |
| Movement | Fall speed, collision at bottom |
| Rotation | CW/CCW, collision blocking |
| Clearing | Single row, multi-row, shifting |
| Scoring | Block points, row points, bonus |
| States | Start, pause, resume, game over |
| Game Over | Spawn collision, top row trigger |

### Deliverables
- [ ] Playwright tests for all core mechanics
- [ ] All tests passing
- [ ] npm test script works
- [ ] CHANGELOG.md created
- [ ] README.md complete

### Smoke Test
1. Run `npm test` - all tests pass
2. Review CHANGELOG.md - includes all features
3. Follow README.md to run game - successful
4. Tests run in under 60 seconds

### Exit Criteria
- NFR-TEST-001 through NFR-TEST-005 satisfied
- All v0.0.0 Success Criteria met
- Ready for release tag

---

## Summary: Milestone Dependencies

```
M1: Foundation
    ↓
M2: Game Grid
    ↓
M3: Block System
    ↓
M4: Block Spawning
    ↓
M5: Movement & Physics
    ↓
M6: Rotation
    ↓
M7: Input Controls
    ↓
M8: Row Clearing
    ↓
M9: Scoring System
    ↓
M10: Game States
    ↓
M11: Audio System
    ↓
M12: Polish & Storage
    ↓
M13: Testing & Documentation
    ↓
[v0.0.0 Release]
```

---

## Estimated Effort

| Milestone | Complexity | Est. Time |
|-----------|-----------|-----------|
| M1: Foundation | Low | 1-2 hours |
| M2: Game Grid | Low | 1-2 hours |
| M3: Block System | Medium | 2-3 hours |
| M4: Block Spawning | Low | 1-2 hours |
| M5: Movement & Physics | High | 3-4 hours |
| M6: Rotation | Medium | 2-3 hours |
| M7: Input Controls | Medium | 2-3 hours |
| M8: Row Clearing | Medium | 2-3 hours |
| M9: Scoring System | Low | 1-2 hours |
| M10: Game States | Medium | 2-3 hours |
| M11: Audio System | Medium | 2-3 hours |
| M12: Polish & Storage | Medium | 2-3 hours |
| M13: Testing & Documentation | High | 4-6 hours |

**Total Estimated: 25-40 hours**

---

## Requirement Traceability Matrix

| Requirement Category | Milestone(s) |
|---------------------|--------------|
| FR-ARENA-* | M2 |
| FR-BLOCK-* | M3 |
| FR-SPAWN-* | M4 |
| FR-FALL-* | M5, M7 |
| FR-ROT-* | M6 |
| FR-COLL-* | M5, M6 |
| FR-CLEAR-* | M8 |
| FR-SCORE-* | M9 |
| FR-END-* | M10 |
| FR-CTRL-* | M7, M10 |
| FR-PAUSE-* | M10 |
| UI-* | M1, M2, M9, M12 |
| AUD-* | M11 |
| NFR-PERF-* | M2, M7 |
| NFR-COMPAT-* | M12 |
| NFR-TECH-* | M1 |
| NFR-TEST-* | M13 |
| NFR-CODE-* | M1, M12, M13 |
| DATA-* | M12 |

---

## Approval

Before implementation begins, this milestone plan must be approved.

- [ ] Approved by User
- [ ] Date: ____________

---
