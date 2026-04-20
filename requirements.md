# Janktris - Requirements Specification

**Version:** 0.0.0  
**Document Version:** 1.0  
**Last Updated:** 2025-01-XX

---

## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements for Janktris v0.0.0, a browser-based Tetris clone. It serves as the authoritative specification for the Refiner, Planner, and Verifier agents.

### 1.2 Scope
Janktris v0.0.0 covers the core gameplay loop, basic UI/UX, and foundational audio feedback. Features such as leaderboards (v1.0.0) and difficulty progression (v2.0.0) are explicitly out of scope.

### 1.3 Definitions
- **Block**: A falling game piece composed of multiple cells in a specific shape
- **Cell**: A single unit space within the arena (one grid square)
- **Arena**: The playable game area where blocks fall and accumulate
- **Row**: A horizontal line of cells in the arena
- **Collision**: When a block cannot move further due to arena boundaries or other blocks

---

## 2. Functional Requirements

### 2.1 Game Arena

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-ARENA-001 | The arena SHALL consist of exactly 20 columns and 40 rows | Must |
| FR-ARENA-002 | Each cell in the arena SHALL be able to hold one block segment or be empty | Must |
| FR-ARENA-003 | The arena SHALL be visually distinct with clear cell boundaries | Must |
| FR-ARENA-004 | The arena SHALL display all currently placed block segments | Must |

### 2.2 Block Shapes

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BLOCK-001 | The game SHALL include exactly 5 block shapes as defined below | Must |

**Block Shape Definitions (where X represents a filled cell):**

```
Shape 1 (S-Block):      Shape 2 (Line):      Shape 3 (T-Block):
  XX                    XXXXXX                 XXX
   XX                                           X

Shape 4 (Z-Block):      Shape 5 (L-Block):
   XX                    XX
  XX                      X
```

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-BLOCK-002 | Shape 1 (S-Block) SHALL occupy cells at relative positions: (0,0), (1,0), (1,1), (2,1) | Must |
| FR-BLOCK-003 | Shape 2 (Line) SHALL occupy cells at relative positions: (0,0), (1,0), (2,0), (3,0), (4,0), (5,0) | Must |
| FR-BLOCK-004 | Shape 3 (T-Block) SHALL occupy cells at relative positions: (0,0), (1,0), (2,0), (1,1) | Must |
| FR-BLOCK-005 | Shape 4 (Z-Block) SHALL occupy cells at relative positions: (1,0), (2,0), (0,1), (1,1) | Must |
| FR-BLOCK-006 | Shape 5 (L-Block) SHALL occupy cells at relative positions: (0,0), (1,0), (0,1) | Must |
| FR-BLOCK-007 | Each block shape SHALL have a visually distinct color | Must |
| FR-BLOCK-008 | Block colors SHALL remain consistent across all instances of the same shape | Must |

### 2.3 Block Spawning

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SPAWN-001 | A new block SHALL appear at the horizontal center of the arena (column 10) | Must |
| FR-SPAWN-002 | A new block SHALL appear at the top of the arena (row 0) | Must |
| FR-SPAWN-003 | Block selection SHALL be random with equal probability for all 5 shapes | Must |
| FR-SPAWN-004 | Initial block rotation SHALL be random (0°, 90°, 180°, or 270°) | Must |
| FR-SPAWN-005 | A new block SHALL spawn immediately after the previous block is fixed in place | Must |

### 2.4 Block Movement - Falling

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-FALL-001 | Blocks SHALL fall at a rate of 1 row per 1000 milliseconds (1 second) by default | Must |
| FR-FALL-002 | When the down-arrow key is pressed, the fall rate SHALL accelerate to 1 row per 100 milliseconds | Must |
| FR-FALL-003 | Accelerated fall mode SHALL persist until the current block is fixed in place | Must |
| FR-FALL-004 | During accelerated fall mode, rotation controls SHALL be disabled | Must |
| FR-FALL-005 | Block fall SHALL be smooth and predictable | Should |

### 2.5 Block Movement - Rotation

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-ROT-001 | Left arrow key SHALL rotate the current block 90° counter-clockwise | Must |
| FR-ROT-002 | Right arrow key SHALL rotate the current block 90° clockwise | Must |
| FR-ROT-003 | Rotation SHALL be blocked if it would cause collision with arena walls | Must |
| FR-ROT-004 | Rotation SHALL be blocked if it would cause collision with placed blocks | Must |
| FR-ROT-005 | Failed rotation attempts SHALL leave the block in its current orientation | Must |
| FR-ROT-006 | Rotation SHALL be instantaneous (no animation required) | Should |

### 2.6 Collision Detection

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-COLL-001 | Collision SHALL be detected when a block would occupy a cell already containing a block segment | Must |
| FR-COLL-002 | Collision SHALL be detected when a block would move below row 39 (arena bottom) | Must |
| FR-COLL-003 | Collision SHALL be detected when a block would move outside columns 0-19 | Must |
| FR-COLL-004 | When downward collision is detected, the block SHALL be fixed in place at its current position | Must |
| FR-COLL-005 | Collision detection SHALL occur before any block position update | Must |

### 2.7 Row Clearing

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CLEAR-001 | When all 20 cells in a row are filled, that row SHALL be cleared | Must |
| FR-CLEAR-002 | Multiple rows SHALL be clearable simultaneously from a single block placement | Must |
| FR-CLEAR-003 | After row clearing, all filled cells above the cleared row(s) SHALL drop down | Must |
| FR-CLEAR-004 | Row clearing SHALL occur immediately after a block is fixed in place | Must |
| FR-CLEAR-005 | Visual feedback SHALL indicate which rows are being cleared | Should |

### 2.8 Scoring System

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SCORE-001 | Each block placed SHALL award 1 point | Must |
| FR-SCORE-002 | Each single row cleared SHALL award 10 points | Must |
| FR-SCORE-003 | Bonus points SHALL be awarded for clearing multiple rows with one block | Must |
| FR-SCORE-004 | Multi-row bonus SHALL be calculated as: (rows_cleared × 10) + (rows_cleared - 1) × 5 bonus | Must |
| FR-SCORE-005 | Score SHALL be a non-negative integer starting at 0 | Must |
| FR-SCORE-006 | Score SHALL accumulate throughout the game session | Must |

**Scoring Examples:**
- 1 row cleared: 10 points + 1 point (block) = 11 points total
- 2 rows cleared: 20 points + 5 bonus + 1 point (block) = 26 points total
- 3 rows cleared: 30 points + 10 bonus + 1 point (block) = 41 points total
- 4 rows cleared: 40 points + 15 bonus + 1 point (block) = 56 points total

### 2.9 Game Over Conditions

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-END-001 | Game SHALL end when a newly spawned block immediately collides with placed blocks | Must |
| FR-END-002 | Game SHALL end when a block is fixed and any cell in row 0 (top row) contains a block segment | Must |
| FR-END-003 | Upon game over, block falling SHALL stop immediately | Must |
| FR-END-004 | Upon game over, the final score SHALL be displayed prominently | Must |
| FR-END-005 | Upon game over, an option to restart SHALL be available | Must |

### 2.10 Game Controls Summary

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CTRL-001 | Left Arrow: Rotate block counter-clockwise | Must |
| FR-CTRL-002 | Right Arrow: Rotate block clockwise | Must |
| FR-CTRL-003 | Down Arrow: Accelerate block fall | Must |
| FR-CTRL-004 | Space: Pause/unpause game | Must |
| FR-CTRL-005 | Controls SHALL be responsive with no perceptible delay | Must |
| FR-CTRL-006 | Multiple simultaneous key presses SHALL be handled gracefully | Should |

### 2.11 Pause Functionality

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-PAUSE-001 | Pressing Space SHALL toggle pause state | Must |
| FR-PAUSE-002 | When paused, block movement SHALL stop | Must |
| FR-PAUSE-003 | When paused, game timer SHALL stop | Must |
| FR-PAUSE-004 | When paused, the arena SHALL be visually dimmed | Must |
| FR-PAUSE-005 | When paused, a "PAUSED" message SHALL be prominently displayed | Must |
| FR-PAUSE-006 | Pressing Space again SHALL resume gameplay | Must |
| FR-PAUSE-007 | Game state SHALL be preserved exactly during pause | Must |

---

## 3. User Interface Requirements

### 3.1 Layout

| ID | Requirement | Priority |
|----|-------------|----------|
| UI-LAYOUT-001 | The game SHALL be playable in a standard browser window | Must |
| UI-LAYOUT-002 | The arena SHALL be the primary visual element | Must |
| UI-LAYOUT-003 | Current score SHALL be displayed outside the arena, clearly visible | Must |
| UI-LAYOUT-004 | Game title "Janktris" SHALL be displayed | Should |
| UI-LAYOUT-005 | Control instructions SHALL be visible or easily accessible | Should |

### 3.2 Visual Design

| ID | Requirement | Priority |
|----|-------------|----------|
| UI-VIS-001 | Color scheme SHALL be "fun and interesting" (bright, engaging colors) | Must |
| UI-VIS-002 | Block colors SHALL have good contrast against the arena background | Must |
| UI-VIS-003 | Different block shapes SHALL have distinctly different colors | Must |
| UI-VIS-004 | Arena grid lines SHALL be visible but subtle | Should |
| UI-VIS-005 | Filled cells SHALL be visually distinct from empty cells | Must |

**Suggested Color Palette (implementation guidance):**
- S-Block: Bright Green (#00FF00)
- Line: Cyan (#00FFFF)
- T-Block: Purple (#9900FF)
- Z-Block: Red (#FF0000)
- L-Block: Orange (#FF9900)
- Arena background: Dark grey (#1a1a2e)
- Arena border: Bright blue (#0066FF)

### 3.3 Score Display

| ID | Requirement | Priority |
|----|-------------|----------|
| UI-SCORE-001 | Score SHALL be displayed as a numeric value | Must |
| UI-SCORE-002 | Score label SHALL be clear (e.g., "Score:") | Must |
| UI-SCORE-003 | Score SHALL update immediately when points are earned | Must |
| UI-SCORE-004 | Score text SHALL be large enough to read easily | Must |

---

## 4. Audio Requirements

### 4.1 Major Event Sounds (Exciting)

| ID | Requirement | Priority |
|----|-------------|----------|
| AUD-MAJOR-001 | Row completion SHALL trigger an exciting/satisfying sound | Must |
| AUD-MAJOR-002 | Multi-row completion SHALL trigger a more impressive sound variant | Should |
| AUD-MAJOR-003 | Game over SHALL trigger a distinctive end sound | Must |
| AUD-MAJOR-004 | Game start SHALL trigger an engaging startup sound | Must |

### 4.2 Minor Event Sounds (Muted)

| ID | Requirement | Priority |
|----|-------------|----------|
| AUD-MINOR-001 | New block appearing SHALL trigger a subtle sound | Must |
| AUD-MINOR-002 | Block rotation SHALL trigger a soft sound | Must |
| AUD-MINOR-003 | Block fixing in place (landing) SHALL trigger a subtle sound | Should |
| AUD-MINOR-004 | All minor sounds SHALL be noticeably quieter than major sounds | Must |

### 4.3 Audio Control

| ID | Requirement | Priority |
|----|-------------|----------|
| AUD-CTRL-001 | Sounds SHALL not overlap unpleasantly | Should |
| AUD-CTRL-002 | Sound effects SHALL be short (< 2 seconds for minor, < 3 seconds for major) | Should |
| AUD-CTRL-003 | Audio SHALL work in modern browsers without user plugins | Must |

---

## 5. Non-Functional Requirements

### 5.1 Performance

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-PERF-001 | Game SHALL maintain 60 FPS on modern hardware | Should |
| NFR-PERF-002 | Input response latency SHALL be < 50ms | Must |
| NFR-PERF-003 | Game SHALL not cause browser freezing or hanging | Must |
| NFR-PERF-004 | Memory usage SHALL remain stable during extended play | Must |

### 5.2 Browser Compatibility

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-COMPAT-001 | Game SHALL work in Google Chrome (latest 2 versions) | Must |
| NFR-COMPAT-002 | Game SHALL work in Mozilla Firefox (latest 2 versions) | Must |
| NFR-COMPAT-003 | Game SHALL work in Microsoft Edge (latest 2 versions) | Should |
| NFR-COMPAT-004 | Game SHALL work in Safari (latest 2 versions) | Should |
| NFR-COMPAT-005 | Game SHALL function without server-side components | Must |

### 5.3 Technology Constraints

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-TECH-001 | Implementation SHALL use only HTML, CSS, and JavaScript | Must |
| NFR-TECH-002 | Third-party libraries MAY be used if publicly available | May |
| NFR-TECH-003 | Data persistence SHALL use browser local storage only | Must |
| NFR-TECH-004 | No backend/server SHALL be required | Must |
| NFR-TECH-005 | Game SHALL be playable from a single HTML file or simple static hosting | Must |

### 5.4 Testing Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-TEST-001 | Automated tests SHALL be implemented using Playwright | Must |
| NFR-TEST-002 | Tests SHALL verify core gameplay mechanics | Must |
| NFR-TEST-003 | Tests SHALL verify scoring accuracy | Must |
| NFR-TEST-004 | Tests SHALL verify game over conditions | Must |
| NFR-TEST-005 | Tests SHALL be runnable via npm/node scripts | Should |

### 5.5 Code Quality

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-CODE-001 | Code SHALL be well-organized and readable | Should |
| NFR-CODE-002 | Game logic SHALL be separated from rendering logic | Should |
| NFR-CODE-003 | Version SHALL be displayed on the UI | Must |
| NFR-CODE-004 | Version SHALL be generated from "git describe" | Must |

---

## 6. Data Persistence Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| DATA-001 | Game state need NOT persist across browser sessions for v0.0.0 | N/A |
| DATA-002 | Local storage MAY be used for future features (leaderboard in v1.0.0) | Future |
| DATA-003 | No user data collection SHALL occur | Must |

---

## 7. Success Criteria for v0.0.0 Release

### 7.1 Minimum Viable Product (MVP) Checklist

- [ ] Arena renders with correct 20×40 grid
- [ ] All 5 block shapes spawn correctly
- [ ] Blocks fall at correct default speed (1 row/second)
- [ ] Down-arrow accelerates fall correctly (1 row/100ms)
- [ ] Left/right arrows rotate blocks correctly
- [ ] Collision detection works for walls and placed blocks
- [ ] Blocks fix in place on collision
- [ ] Complete rows clear correctly
- [ ] Rows above cleared rows drop correctly
- [ ] Scoring works correctly (block placement + row clearing + bonus)
- [ ] Score displays and updates in real-time
- [ ] Pause functionality works (Space key)
- [ ] Game over triggers correctly
- [ ] Game restart works
- [ ] Sound effects play for major/minor events
- [ ] Version number displays
- [ ] Playwright tests pass

### 7.2 Quality Gates

1. **Functional Gate**: All "Must" priority functional requirements pass testing
2. **Performance Gate**: Game runs smoothly without lag or freezing
3. **Usability Gate**: Controls are responsive and intuitive
4. **Test Gate**: All Playwright automated tests pass

---

## 8. Out of Scope for v0.0.0

The following features are explicitly NOT included in v0.0.0:

| Feature | Target Version |
|---------|----------------|
| Leaderboard / High Scores | v1.0.0 |
| Persistent high score storage | v1.0.0 |
| Difficulty levels | v2.0.0 |
| Speed progression (faster blocks over time) | v2.0.0 |
| Level-based score multiplier | v2.0.0 |
| Mobile/touch controls | Future |
| Multiplayer | Future |
| Custom themes | Future |
| Music/background audio | Future |

---

## 9. Requirement Traceability

| Requirement Category | Count (Must) | Count (Should) | Count (May) |
|---------------------|--------------|----------------|-------------|
| Arena | 4 | 0 | 0 |
| Block Shapes | 8 | 0 | 0 |
| Block Spawning | 5 | 0 | 0 |
| Block Movement | 11 | 2 | 0 |
| Collision | 5 | 0 | 0 |
| Row Clearing | 4 | 1 | 0 |
| Scoring | 6 | 0 | 0 |
| Game Over | 5 | 0 | 0 |
| Controls | 5 | 1 | 0 |
| Pause | 7 | 0 | 0 |
| UI | 9 | 3 | 0 |
| Audio | 8 | 4 | 0 |
| Non-Functional | 15 | 5 | 1 |

**Total Requirements: 92 (Must: 77, Should: 16, May: 1)**

---

## Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2025-01-XX | Definer Agent | Initial requirements specification |
