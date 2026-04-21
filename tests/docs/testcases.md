# Janktris - Test Cases Specification

**Version:** 1.0  
**Document Version:** 1.0  
**Last Updated:** 2025-01-XX  
**Related Requirements:** requirements.md v1.0

---

## Table of Contents

1. [Unit Test Cases](#1-unit-test-cases)
2. [Integration Test Cases](#2-integration-test-cases)
3. [Playwright E2E Test Cases](#3-playwright-e2e-test-cases)
4. [Test Coverage Matrix](#4-test-coverage-matrix)
5. [Test Execution Summary](#5-test-execution-summary)

---

## 1. Unit Test Cases

### 1.1 Block Shape Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-BLOCK-001 | S-Block shape cell positions | Block module loaded | 1. Create S-Block instance<br>2. Get cell positions | Cells at (0,0), (1,0), (1,1), (2,1) | Critical | FR-BLOCK-002 |
| UT-BLOCK-002 | Line shape cell positions | Block module loaded | 1. Create Line instance<br>2. Get cell positions | Cells at (0,0), (1,0), (2,0), (3,0), (4,0), (5,0) | Critical | FR-BLOCK-003 |
| UT-BLOCK-003 | T-Block shape cell positions | Block module loaded | 1. Create T-Block instance<br>2. Get cell positions | Cells at (0,0), (1,0), (2,0), (1,1) | Critical | FR-BLOCK-004 |
| UT-BLOCK-004 | Z-Block shape cell positions | Block module loaded | 1. Create Z-Block instance<br>2. Get cell positions | Cells at (1,0), (2,0), (0,1), (1,1) | Critical | FR-BLOCK-005 |
| UT-BLOCK-005 | L-Block shape cell positions | Block module loaded | 1. Create L-Block instance<br>2. Get cell positions | Cells at (0,0), (1,0), (0,1) | Critical | FR-BLOCK-006 |
| UT-BLOCK-006 | Each block type has unique color | Block module loaded | 1. Create all 5 block types<br>2. Compare colors | All 5 colors are distinct | High | FR-BLOCK-007 |
| UT-BLOCK-007 | Block color consistency | Block module loaded | 1. Create same block type multiple times<br>2. Compare colors | Same block type always has same color | High | FR-BLOCK-008 |

### 1.2 Block Rotation Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-ROT-001 | S-Block 90° clockwise rotation | S-Block at rotation 0° | 1. Apply clockwise rotation<br>2. Get new cell positions | Cell positions correct for 90° state | Critical | FR-ROT-002 |
| UT-ROT-002 | S-Block 90° counter-clockwise rotation | S-Block at rotation 0° | 1. Apply counter-clockwise rotation<br>2. Get new cell positions | Cell positions correct for 270° state | Critical | FR-ROT-001 |
| UT-ROT-003 | S-Block full rotation cycle | S-Block at rotation 0° | 1. Apply 4 clockwise rotations<br>2. Get final positions | Returns to original position (0°) | High | FR-ROT-001/002 |
| UT-ROT-004 | Line 90° clockwise rotation | Line at rotation 0° | 1. Apply clockwise rotation<br>2. Get new cell positions | Cell positions correct for vertical state | Critical | FR-ROT-002 |
| UT-ROT-005 | Line 90° counter-clockwise rotation | Line at rotation 0° | 1. Apply counter-clockwise rotation<br>2. Get new cell positions | Cell positions correct for vertical state | Critical | FR-ROT-001 |
| UT-ROT-006 | T-Block all 4 rotation states | T-Block created | 1. Rotate 4 times clockwise<br>2. Verify each state | All 4 orientations geometrically correct | Critical | FR-ROT-001/002 |
| UT-ROT-007 | Z-Block all 4 rotation states | Z-Block created | 1. Rotate 4 times clockwise<br>2. Verify each state | All 4 orientations geometrically correct | Critical | FR-ROT-001/002 |
| UT-ROT-008 | L-Block all 4 rotation states | L-Block created | 1. Rotate 4 times clockwise<br>2. Verify each state | All 4 orientations geometrically correct | Critical | FR-ROT-001/002 |

### 1.3 Arena Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-ARENA-001 | Arena dimensions | Arena module loaded | 1. Create arena<br>2. Check dimensions | Arena has 20 columns × 40 rows | Critical | FR-ARENA-001 |
| UT-ARENA-002 | Cell initial state | Arena created | 1. Check all cells | All cells initially empty | Critical | FR-ARENA-002 |
| UT-ARENA-003 | Cell can hold block segment | Arena created | 1. Place segment in cell (5,5)<br>2. Check cell state | Cell (5,5) contains block segment | Critical | FR-ARENA-002 |
| UT-ARENA-004 | Get row contents | Arena with some filled cells | 1. Fill row 10 partially<br>2. Get row 10 contents | Returns correct cell states for row 10 | High | FR-ARENA-004 |
| UT-ARENA-005 | Check row complete | Arena created | 1. Fill all 20 cells in row 5<br>2. Check if row 5 complete | Returns true for row 5 | Critical | FR-CLEAR-001 |
| UT-ARENA-006 | Check row incomplete | Arena created | 1. Fill 19 cells in row 5<br>2. Check if row 5 complete | Returns false for row 5 | Critical | FR-CLEAR-001 |

### 1.4 Collision Detection Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-COLL-001 | Detect collision with left wall | Block near left edge | 1. Move block left past column 0 | Collision detected | Critical | FR-COLL-003 |
| UT-COLL-002 | Detect collision with right wall | Block near right edge | 1. Move block right past column 19 | Collision detected | Critical | FR-COLL-003 |
| UT-COLL-003 | Detect collision with floor | Block at bottom | 1. Move block below row 39 | Collision detected | Critical | FR-COLL-002 |
| UT-COLL-004 | Detect collision with placed block | Block above placed segment | 1. Move block into occupied cell | Collision detected | Critical | FR-COLL-001 |
| UT-COLL-005 | No collision in empty space | Block in clear area | 1. Move block in empty area | No collision detected | High | FR-COLL-001 |
| UT-COLL-006 | Rotation collision with wall | Line block near left wall | 1. Attempt rotation that exceeds wall | Collision detected, rotation blocked | Critical | FR-ROT-003 |
| UT-COLL-007 | Rotation collision with placed block | Block adjacent to placed blocks | 1. Attempt rotation into occupied cells | Collision detected, rotation blocked | Critical | FR-ROT-004 |
| UT-COLL-008 | Collision detection before position update | Block module loaded | 1. Check collision before move<br>2. Only move if clear | Position update only occurs if no collision | High | FR-COLL-005 |

### 1.5 Row Clearing Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-CLEAR-001 | Clear single complete row | Arena with row 39 complete | 1. Trigger row clear check<br>2. Check row 39 | Row 39 cleared (all cells empty) | Critical | FR-CLEAR-001 |
| UT-CLEAR-002 | Clear multiple rows simultaneously | Arena with rows 38,39 complete | 1. Trigger row clear check<br>2. Check rows 38,39 | Both rows cleared | Critical | FR-CLEAR-002 |
| UT-CLEAR-003 | Rows drop after clear | Arena with blocks above cleared row | 1. Clear row 39<br>2. Check row positions | Blocks above drop by 1 row | Critical | FR-CLEAR-003 |
| UT-CLEAR-004 | Multiple row drop calculation | Arena with 2 rows cleared | 1. Clear rows 38,39<br>2. Check positions | Blocks above drop by 2 rows | Critical | FR-CLEAR-003 |
| UT-CLEAR-005 | Non-complete row not cleared | Arena with row 39 at 19 cells | 1. Trigger row clear check | Row 39 unchanged | High | FR-CLEAR-001 |
| UT-CLEAR-006 | Clear occurs after block fixed | Block about to land | 1. Block lands<br>2. Check row clear timing | Row check happens immediately after fix | High | FR-CLEAR-004 |

### 1.6 Scoring Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-SCORE-001 | Initial score is zero | Game module loaded | 1. Start new game<br>2. Get score | Score equals 0 | Critical | FR-SCORE-005 |
| UT-SCORE-002 | Block placement awards 1 point | Score at 0 | 1. Place a block<br>2. Get score | Score equals 1 | Critical | FR-SCORE-001 |
| UT-SCORE-003 | Single row clear awards 10 points | Score at 0 | 1. Clear 1 row<br>2. Get score | Score equals 10 | Critical | FR-SCORE-002 |
| UT-SCORE-004 | Two row clear with bonus | Score at 0 | 1. Clear 2 rows with one block | Score equals 25 (20 + 5 bonus) | Critical | FR-SCORE-003/004 |
| UT-SCORE-005 | Three row clear with bonus | Score at 0 | 1. Clear 3 rows with one block | Score equals 40 (30 + 10 bonus) | Critical | FR-SCORE-003/004 |
| UT-SCORE-006 | Four row clear with bonus | Score at 0 | 1. Clear 4 rows with one block | Score equals 55 (40 + 15 bonus) | Critical | FR-SCORE-003/004 |
| UT-SCORE-007 | Combined block + row score | Score at 0 | 1. Place block that clears 1 row | Score equals 11 (1 + 10) | Critical | FR-SCORE-001/002 |
| UT-SCORE-008 | Score accumulates | Score at 50 | 1. Place block<br>2. Get score | Score equals 51 | Critical | FR-SCORE-006 |
| UT-SCORE-009 | Score never negative | Score at 0 | 1. Verify no operation decreases score | Score remains >= 0 | High | FR-SCORE-005 |

### 1.7 Spawning Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-SPAWN-001 | Block spawns at center column | Game running | 1. Spawn new block<br>2. Get block position | Block center at column 10 | Critical | FR-SPAWN-001 |
| UT-SPAWN-002 | Block spawns at top row | Game running | 1. Spawn new block<br>2. Get block position | Block at row 0 | Critical | FR-SPAWN-002 |
| UT-SPAWN-003 | Random shape distribution | Game module loaded | 1. Spawn 1000 blocks<br>2. Count each shape | Each shape appears 15-25% (within variance) | High | FR-SPAWN-003 |
| UT-SPAWN-004 | Random initial rotation | Game module loaded | 1. Spawn 100 blocks of same type<br>2. Check initial rotations | Multiple rotation states observed | High | FR-SPAWN-004 |
| UT-SPAWN-005 | Spawn after previous block fixed | Block just fixed | 1. Fix current block<br>2. Check new block | New block spawned immediately | Critical | FR-SPAWN-005 |

### 1.8 Fall Mechanics Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-FALL-001 | Default fall rate | Game running | 1. Measure time between row changes | Approximately 1000ms per row | Critical | FR-FALL-001 |
| UT-FALL-002 | Accelerated fall rate | Down arrow pressed | 1. Measure time between row changes | Approximately 100ms per row | Critical | FR-FALL-002 |
| UT-FALL-003 | Acceleration persists | Down arrow pressed | 1. Release down arrow<br>2. Check fall rate | Acceleration continues until block fixed | High | FR-FALL-003 |
| UT-FALL-004 | Rotation disabled during acceleration | Down arrow pressed, block falling fast | 1. Press left/right arrow<br>2. Check rotation | No rotation occurs | Critical | FR-FALL-004 |

### 1.9 Game State Unit Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| UT-STATE-001 | Pause stops block movement | Game running | 1. Press Space<br>2. Wait 2 seconds | Block position unchanged | Critical | FR-PAUSE-002 |
| UT-STATE-002 | Pause stops game timer | Game running | 1. Record timer<br>2. Pause<br>3. Wait 2 seconds | Timer unchanged | Critical | FR-PAUSE-003 |
| UT-STATE-003 | Pause toggle on/off | Game running | 1. Press Space twice | Game paused then resumed | Critical | FR-PAUSE-001/006 |
| UT-STATE-004 | State preserved during pause | Game with active block | 1. Record all state<br>2. Pause/unpause | All state matches original | Critical | FR-PAUSE-007 |

---

## 2. Integration Test Cases

### 2.1 Block-Arena Integration

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| IT-BA-001 | Block falls within arena bounds | Game started | 1. Let block fall naturally<br>2. Monitor position | Block stays within columns 0-19 | Critical | FR-COLL-003 |
| IT-BA-002 | Block fixes on floor contact | Block at row 38 | 1. Block falls to row 39<br>2. Check arena state | Block segments now part of arena | Critical | FR-COLL-004 |
| IT-BA-003 | Block fixes on placed block contact | Placed block in arena | 1. Drop new block above it | Block fixes on contact | Critical | FR-COLL-004 |
| IT-BA-004 | Arena updates after block fix | Block about to fix | 1. Block fixes<br>2. Check arena display | Arena shows new fixed segments | High | FR-ARENA-004 |

### 2.2 Block-Scoring Integration

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| IT-BS-001 | Score updates on block placement | Game at score 0 | 1. Place one block | Score shows 1 | Critical | FR-SCORE-001 |
| IT-BS-002 | Score updates on row clear | Near-complete row | 1. Place completing block | Score shows block + row points | Critical | FR-SCORE-002 |
| IT-BS-003 | Score shows bonus on multi-row | Two near-complete rows | 1. Place completing block | Score shows correct bonus | Critical | FR-SCORE-004 |

### 2.3 Row Clear-Arena Integration

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| IT-RA-001 | Arena updates after row clear | Complete row in arena | 1. Trigger clear<br>2. Check arena display | Cleared row empty, cells dropped | Critical | FR-CLEAR-003 |
| IT-RA-002 | Multiple clear updates arena | Two complete rows | 1. Trigger clear<br>2. Check arena display | Both rows cleared, correct drop | Critical | FR-CLEAR-002/003 |
| IT-RA-003 | Partial rows unaffected | Complete + incomplete rows | 1. Trigger clear | Incomplete row unchanged | High | FR-CLEAR-001 |

### 2.4 Controls-Game Integration

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| IT-CG-001 | Left arrow rotates block CCW | Block at rotation 0° | 1. Press left arrow<br>2. Check rotation | Block at rotation 270° | Critical | FR-CTRL-001 |
| IT-CG-002 | Right arrow rotates block CW | Block at rotation 0° | 1. Press right arrow<br>2. Check rotation | Block at rotation 90° | Critical | FR-CTRL-002 |
| IT-CG-003 | Down arrow accelerates fall | Block falling normally | 1. Press down arrow<br>2. Measure fall rate | Fall rate 10x faster | Critical | FR-CTRL-003 |
| IT-CG-004 | Space pauses game | Game running | 1. Press space<br>2. Check game state | Game paused | Critical | FR-CTRL-004 |
| IT-CG-005 | Controls responsive | Game running | 1. Time key-to-action delay | Delay < 50ms | Critical | FR-CTRL-005 |
| IT-CG-006 | Simultaneous keys handled | Game running | 1. Press multiple keys at once | No crash, graceful handling | High | FR-CTRL-006 |

### 2.5 Game Over Integration

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| IT-GO-001 | Game over on spawn collision | Blocks stacked to top | 1. Trigger new spawn<br>2. Check game state | Game over triggered | Critical | FR-END-001 |
| IT-GO-002 | Game over on top row fill | Block fixes in row 0 | 1. Block fixes<br>2. Check game state | Game over triggered | Critical | FR-END-002 |
| IT-GO-003 | Movement stops on game over | Game over state | 1. Wait 2 seconds | No block movement | Critical | FR-END-003 |
| IT-GO-004 | Final score displayed | Game over state | 1. Check display | Score prominently visible | Critical | FR-END-004 |
| IT-GO-005 | Restart option available | Game over state | 1. Check UI | Restart option visible | Critical | FR-END-005 |

### 2.6 Audio Integration

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| IT-AUD-001 | Sound on row clear | Complete row about to clear | 1. Place completing block | Exciting sound plays | Critical | AUD-MAJOR-001 |
| IT-AUD-002 | Sound on multi-row clear | Two rows about to clear | 1. Place completing block | More impressive sound plays | High | AUD-MAJOR-002 |
| IT-AUD-003 | Sound on game over | Game about to end | 1. Trigger game over | Distinctive end sound plays | Critical | AUD-MAJOR-003 |
| IT-AUD-004 | Sound on game start | Game not started | 1. Start game | Startup sound plays | Critical | AUD-MAJOR-004 |
| IT-AUD-005 | Sound on block spawn | New block appearing | 1. Place a block (trigger spawn) | Subtle sound plays | Critical | AUD-MINOR-001 |
| IT-AUD-006 | Sound on rotation | Block rotating | 1. Press rotation key | Soft rotation sound plays | Critical | AUD-MINOR-002 |
| IT-AUD-007 | Sound on block landing | Block fixing | 1. Let block land | Landing sound plays | High | AUD-MINOR-003 |
| IT-AUD-008 | Minor sounds quieter than major | Game running | 1. Compare volume levels | Minor sounds noticeably quieter | Critical | AUD-MINOR-004 |

---

## 3. Playwright E2E Test Cases

### 3.1 Game Initialization Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-INIT-001 | Game loads in browser | Browser opened | 1. Navigate to game URL<br>2. Wait for load | Game UI visible | Critical | UI-LAYOUT-001 |
| E2E-INIT-002 | Arena renders correctly | Game loaded | 1. Check arena element<br>2. Verify dimensions | Arena visible with 20×40 grid | Critical | FR-ARENA-001/003 |
| E2E-INIT-003 | Score display visible | Game loaded | 1. Locate score element | Score display visible with "0" | Critical | UI-SCORE-001/002 |
| E2E-INIT-004 | Title displayed | Game loaded | 1. Check for title | "Janktris" visible | High | UI-LAYOUT-004 |
| E2E-INIT-005 | Version displayed | Game loaded | 1. Check for version number | Version number visible on UI | Critical | NFR-CODE-003 |
| E2E-INIT-006 | Initial block appears | Game started | 1. Start game<br>2. Check for block | Block visible at top-center | Critical | FR-SPAWN-001/002 |
| E2E-INIT-007 | Controls instructions visible | Game loaded | 1. Check for instructions | Control hints visible/accessible | High | UI-LAYOUT-005 |

### 3.2 Block Spawning E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-SPAWN-001 | Block spawns at correct position | Game started | 1. Capture first block position | Block at column ~10, row 0 | Critical | FR-SPAWN-001/002 |
| E2E-SPAWN-002 | All 5 block shapes appear | Game running long | 1. Play until all shapes seen<br>2. Screenshot each | All 5 shapes observed | Critical | FR-BLOCK-001 |
| E2E-SPAWN-003 | New block after placement | Block about to land | 1. Let block land<br>2. Wait for spawn | New block appears at top | Critical | FR-SPAWN-005 |
| E2E-SPAWN-004 | Block colors are distinct | Game running | 1. Screenshot different blocks<br>2. Compare colors | Each shape has unique color | High | FR-BLOCK-007 |

### 3.3 Block Falling E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-FALL-001 | Block falls at default speed | Game started | 1. Record block position at t=0<br>2. Record at t=5s | Block moved ~5 rows | Critical | FR-FALL-001 |
| E2E-FALL-002 | Down arrow accelerates fall | Block at top | 1. Press and hold down arrow<br>2. Measure time to bottom | Block reaches bottom in ~4s | Critical | FR-FALL-002 |
| E2E-FALL-003 | Acceleration persists until fixed | Down pressed then released | 1. Press down briefly<br>2. Release<br>3. Observe | Block continues fast fall | High | FR-FALL-003 |
| E2E-FALL-004 | Block stops at arena floor | Block falling | 1. Let block fall completely | Block stops at row 39 | Critical | FR-COLL-002 |

### 3.4 Block Rotation E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-ROT-001 | Left arrow rotates CCW | Block visible | 1. Press left arrow<br>2. Compare shape | Block rotated 90° CCW | Critical | FR-ROT-001 |
| E2E-ROT-002 | Right arrow rotates CW | Block visible | 1. Press right arrow<br>2. Compare shape | Block rotated 90° CW | Critical | FR-ROT-002 |
| E2E-ROT-003 | S-Block all rotations | S-Block spawned | 1. Rotate 4 times CW<br>2. Screenshot each | All 4 states correct | Critical | FR-ROT-001/002 |
| E2E-ROT-004 | Line all rotations | Line spawned | 1. Rotate 4 times CW<br>2. Screenshot each | All 4 states correct (2 unique) | Critical | FR-ROT-001/002 |
| E2E-ROT-005 | T-Block all rotations | T-Block spawned | 1. Rotate 4 times CW<br>2. Screenshot each | All 4 states correct | Critical | FR-ROT-001/002 |
| E2E-ROT-006 | Z-Block all rotations | Z-Block spawned | 1. Rotate 4 times CW<br>2. Screenshot each | All 4 states correct | Critical | FR-ROT-001/002 |
| E2E-ROT-007 | L-Block all rotations | L-Block spawned | 1. Rotate 4 times CW<br>2. Screenshot each | All 4 states correct | Critical | FR-ROT-001/002 |
| E2E-ROT-008 | Rotation blocked by wall | Block at edge | 1. Move block to wall<br>2. Attempt rotation | Block unchanged | Critical | FR-ROT-003 |
| E2E-ROT-009 | Rotation blocked by placed blocks | Block near placed | 1. Position near blocks<br>2. Attempt rotation | Block unchanged | Critical | FR-ROT-004 |
| E2E-ROT-010 | Failed rotation preserves state | Block at wall | 1. Attempt blocked rotation<br>2. Check orientation | Original orientation preserved | High | FR-ROT-005 |
| E2E-ROT-011 | No rotation during fast fall | Block accelerating | 1. Press down<br>2. Press left/right | No rotation occurs | Critical | FR-FALL-004 |

### 3.5 Collision Detection E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-COLL-001 | Block stops at left wall | Block moving left | 1. Press left repeatedly<br>2. Observe boundary | Block stops at column 0 | Critical | FR-COLL-003 |
| E2E-COLL-002 | Block stops at right wall | Block moving right | 1. Press right repeatedly<br>2. Observe boundary | Block stops at column 19 | Critical | FR-COLL-003 |
| E2E-COLL-003 | Block stops on floor | Block falling | 1. Let block fall | Block stops at row 39 | Critical | FR-COLL-002 |
| E2E-COLL-004 | Block stops on placed block | Placed blocks in arena | 1. Drop block above<br>2. Observe landing | Block stops on contact | Critical | FR-COLL-001 |
| E2E-COLL-005 | Block fixes on collision | Block landing | 1. Observe block landing | Block becomes part of arena | Critical | FR-COLL-004 |

### 3.6 Row Completion E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-CLEAR-001 | Complete row clears | Row with 19 cells filled | 1. Place completing block<br>2. Observe row | Row disappears/clears | Critical | FR-CLEAR-001 |
| E2E-CLEAR-002 | Multiple rows clear simultaneously | Two rows near complete | 1. Place completing block | Both rows clear together | Critical | FR-CLEAR-002 |
| E2E-CLEAR-003 | Rows above drop down | Blocks above cleared row | 1. Clear a row<br>2. Observe above | Upper blocks drop down | Critical | FR-CLEAR-003 |
| E2E-CLEAR-004 | Visual feedback on clear | Row clearing | 1. Clear a row<br>2. Observe visual | Clear animation/highlight visible | High | FR-CLEAR-005 |
| E2E-CLEAR-005 | Three rows clear simultaneously | Three rows near complete | 1. Place completing block | All three rows clear | High | FR-CLEAR-002 |
| E2E-CLEAR-006 | Four rows clear (maximum) | Four rows near complete | 1. Place completing block | All four rows clear | High | FR-CLEAR-002 |

### 3.7 Score Calculation E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-SCORE-001 | Score starts at zero | Game loaded | 1. Check initial score | Score displays "0" | Critical | FR-SCORE-005 |
| E2E-SCORE-002 | Score increments on block place | Score at 0 | 1. Place one block<br>2. Check score | Score shows "1" | Critical | FR-SCORE-001 |
| E2E-SCORE-003 | Single row score | Near-complete row | 1. Complete row<br>2. Check score | Score increases by 11 (10+1) | Critical | FR-SCORE-002 |
| E2E-SCORE-004 | Double row score with bonus | Two near-complete rows | 1. Complete both<br>2. Check score | Score increases by 26 (20+5+1) | Critical | FR-SCORE-004 |
| E2E-SCORE-005 | Triple row score with bonus | Three near-complete rows | 1. Complete all three<br>2. Check score | Score increases by 41 (30+10+1) | Critical | FR-SCORE-004 |
| E2E-SCORE-006 | Quadruple row score with bonus | Four near-complete rows | 1. Complete all four<br>2. Check score | Score increases by 56 (40+15+1) | Critical | FR-SCORE-004 |
| E2E-SCORE-007 | Score updates immediately | Block placing | 1. Place block<br>2. Check timing | Score updates instantly | High | UI-SCORE-003 |
| E2E-SCORE-008 | Score accumulates correctly | Multiple placements | 1. Place 5 blocks<br>2. Clear 2 rows | Score equals cumulative total | Critical | FR-SCORE-006 |

### 3.8 Keyboard Controls E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-CTRL-001 | Left arrow input | Block at center | 1. Press left arrow key | Block rotates CCW | Critical | FR-CTRL-001 |
| E2E-CTRL-002 | Right arrow input | Block at center | 1. Press right arrow key | Block rotates CW | Critical | FR-CTRL-002 |
| E2E-CTRL-003 | Down arrow input | Block at top | 1. Press down arrow key | Block falls faster | Critical | FR-CTRL-003 |
| E2E-CTRL-004 | Space key input | Game running | 1. Press space key | Game pauses | Critical | FR-CTRL-004 |
| E2E-CTRL-005 | Response latency | Game running | 1. Measure key-to-visual time | Response < 50ms | Critical | FR-CTRL-005 |
| E2E-CTRL-006 | Rapid key presses | Game running | 1. Press keys rapidly | All inputs processed correctly | High | FR-CTRL-006 |
| E2E-CTRL-007 | Multiple simultaneous keys | Game running | 1. Press down + left together | Handled gracefully (no crash) | High | FR-CTRL-006 |

### 3.9 Pause Functionality E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-PAUSE-001 | Space toggles pause | Game running | 1. Press space | Game enters paused state | Critical | FR-PAUSE-001 |
| E2E-PAUSE-002 | Block stops when paused | Game paused | 1. Wait 3 seconds<br>2. Check block position | Block unmoved | Critical | FR-PAUSE-002 |
| E2E-PAUSE-003 | Timer stops when paused | Game paused | 1. Wait 3 seconds<br>2. Check timer | Timer unchanged | Critical | FR-PAUSE-003 |
| E2E-PAUSE-004 | Arena dimmed when paused | Game paused | 1. Check visual appearance | Arena visually dimmed | Critical | FR-PAUSE-004 |
| E2E-PAUSE-005 | PAUSED message displayed | Game paused | 1. Check for message | "PAUSED" text visible | Critical | FR-PAUSE-005 |
| E2E-PAUSE-006 | Space resumes game | Game paused | 1. Press space again | Game resumes | Critical | FR-PAUSE-006 |
| E2E-PAUSE-007 | State preserved during pause | Game with state | 1. Note block position<br>2. Pause/unpause | Block in same position | Critical | FR-PAUSE-007 |
| E2E-PAUSE-008 | Controls ignored when paused | Game paused | 1. Press arrow keys | No block movement/rotation | High | FR-PAUSE-002 |

### 3.10 Game Over E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-END-001 | Game over on spawn collision | Arena filled to top | 1. Force block at top<br>2. Spawn new block | Game over triggered | Critical | FR-END-001 |
| E2E-END-002 | Game over on top row fill | Block at top | 1. Place block touching row 0 | Game over triggered | Critical | FR-END-002 |
| E2E-END-003 | Falling stops on game over | Game over state | 1. Check for movement | No blocks moving | Critical | FR-END-003 |
| E2E-END-004 | Final score displayed | Game over state | 1. Check display | Final score prominently shown | Critical | FR-END-004 |
| E2E-END-005 | Restart option available | Game over state | 1. Look for restart UI | Restart button/key visible | Critical | FR-END-005 |
| E2E-END-006 | Restart works | Game over state | 1. Click restart | New game begins, score = 0 | Critical | FR-END-005 |
| E2E-END-007 | Game over sound plays | Game ending | 1. Trigger game over | Distinctive sound plays | Critical | AUD-MAJOR-003 |

### 3.11 Sound Playback E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-SND-001 | Game start sound | Game not started | 1. Start game<br>2. Check audio API | Startup sound triggered | Critical | AUD-MAJOR-004 |
| E2E-SND-002 | Row clear sound | Row about to clear | 1. Complete row<br>2. Check audio API | Clear sound triggered | Critical | AUD-MAJOR-001 |
| E2E-SND-003 | Multi-row clear sound | Multiple rows clearing | 1. Clear 2+ rows<br>2. Check audio API | Enhanced sound triggered | High | AUD-MAJOR-002 |
| E2E-SND-004 | Game over sound | Game ending | 1. Trigger game over<br>2. Check audio API | End sound triggered | Critical | AUD-MAJOR-003 |
| E2E-SND-005 | Block spawn sound | Block spawning | 1. Place block (spawn next)<br>2. Check audio API | Subtle sound triggered | Critical | AUD-MINOR-001 |
| E2E-SND-006 | Rotation sound | Block rotating | 1. Press rotation key<br>2. Check audio API | Rotation sound triggered | Critical | AUD-MINOR-002 |
| E2E-SND-007 | Landing sound | Block landing | 1. Let block land<br>2. Check audio API | Landing sound triggered | High | AUD-MINOR-003 |
| E2E-SND-008 | Audio works without plugins | Modern browser | 1. Check audio playback | Audio plays via Web Audio API | Critical | AUD-CTRL-003 |

### 3.12 Visual Design E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-VIS-001 | Arena is primary element | Game loaded | 1. Analyze page layout | Arena is largest/central element | Critical | UI-LAYOUT-002 |
| E2E-VIS-002 | Score visible outside arena | Game loaded | 1. Locate score element | Score not overlapping arena | Critical | UI-LAYOUT-003 |
| E2E-VIS-003 | Block colors have contrast | Game with blocks | 1. Compare block to background | Sufficient color contrast | Critical | UI-VIS-002 |
| E2E-VIS-004 | Different shapes different colors | Multiple shapes visible | 1. Compare block colors | Each shape has unique color | Critical | UI-VIS-003 |
| E2E-VIS-005 | Grid lines visible | Game loaded | 1. Inspect arena | Grid lines visible but subtle | High | UI-VIS-004 |
| E2E-VIS-006 | Filled vs empty cells distinct | Arena with blocks | 1. Compare cell types | Clear visual difference | Critical | UI-VIS-005 |
| E2E-VIS-007 | Bright engaging colors | Game loaded | 1. Check color scheme | Fun, bright color scheme | Critical | UI-VIS-001 |

### 3.13 Browser Compatibility E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-COMPAT-001 | Chrome compatibility | Chrome latest | 1. Run full test suite in Chrome | All tests pass | Critical | NFR-COMPAT-001 |
| E2E-COMPAT-002 | Firefox compatibility | Firefox latest | 1. Run full test suite in Firefox | All tests pass | Critical | NFR-COMPAT-002 |
| E2E-COMPAT-003 | Edge compatibility | Edge latest | 1. Run full test suite in Edge | All tests pass | High | NFR-COMPAT-003 |
| E2E-COMPAT-004 | Safari compatibility | Safari latest | 1. Run full test suite in Safari | All tests pass | High | NFR-COMPAT-004 |
| E2E-COMPAT-005 | No server required | Static file serving | 1. Open index.html directly<br>2. Test gameplay | Game fully functional | Critical | NFR-COMPAT-005 |

### 3.14 Performance E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-PERF-001 | 60 FPS maintained | Game running | 1. Monitor frame rate | Frame rate ≥ 60 FPS | High | NFR-PERF-001 |
| E2E-PERF-002 | Input latency acceptable | Game running | 1. Measure input response time | Latency < 50ms | Critical | NFR-PERF-002 |
| E2E-PERF-003 | No browser freezing | Extended play | 1. Play for 10 minutes | No freezing or hanging | Critical | NFR-PERF-003 |
| E2E-PERF-004 | Memory stability | Extended play | 1. Monitor memory usage<br>2. Play 10 minutes | Memory usage stable | Critical | NFR-PERF-004 |

### 3.15 Local Storage E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-STORE-001 | No user data collection | Game running | 1. Monitor network requests<br>2. Check localStorage | No personal data stored/sent | Critical | DATA-003 |
| E2E-STORE-002 | Game works without localStorage | localStorage disabled | 1. Disable localStorage<br>2. Play game | Game functions normally | High | NFR-TECH-003 |

### 3.16 Edge Cases E2E Tests

| Test ID | Description | Preconditions | Test Steps | Expected Results | Priority | Req ID |
|---------|-------------|---------------|------------|------------------|----------|--------|
| E2E-EDGE-001 | Rapid rotation at wall | Block at wall | 1. Rapidly press rotation keys | No crash, correct behavior | High | FR-ROT-003 |
| E2E-EDGE-002 | Spam down arrow | Block at top | 1. Rapidly spam down key | Block falls fast, no crash | High | FR-FALL-002 |
| E2E-EDGE-003 | Pause during row clear | Row clearing | 1. Press pause during clear | Graceful handling | Medium | FR-PAUSE-002 |
| E2E-EDGE-004 | Pause immediately after spawn | Block just spawned | 1. Press pause immediately | Game pauses correctly | Medium | FR-PAUSE-001 |
| E2E-EDGE-005 | Very long game session | Game running | 1. Play for 30+ minutes | Game remains responsive | High | NFR-PERF-004 |
| E2E-EDGE-006 | Maximum score boundary | High score game | 1. Achieve very high score | Score displays correctly | Medium | FR-SCORE-005 |
| E2E-EDGE-007 | Restart during gameplay | Game in progress | 1. Trigger restart mid-game | Clean restart, score = 0 | High | FR-END-005 |
| E2E-EDGE-008 | Arena full except one cell | Nearly full arena | 1. Place final block | Correct game over handling | High | FR-END-002 |

---

## 4. Test Coverage Matrix

### 4.1 Requirements to Test Mapping

| Requirement ID | Unit Tests | Integration Tests | E2E Tests |
|----------------|------------|-------------------|-----------|
| FR-ARENA-001 | UT-ARENA-001 | - | E2E-INIT-002 |
| FR-ARENA-002 | UT-ARENA-002, UT-ARENA-003 | - | - |
| FR-ARENA-003 | - | - | E2E-INIT-002 |
| FR-ARENA-004 | UT-ARENA-004 | IT-BA-004 | - |
| FR-BLOCK-001 | - | - | E2E-SPAWN-002 |
| FR-BLOCK-002 | UT-BLOCK-001 | - | - |
| FR-BLOCK-003 | UT-BLOCK-002 | - | - |
| FR-BLOCK-004 | UT-BLOCK-003 | - | - |
| FR-BLOCK-005 | UT-BLOCK-004 | - | - |
| FR-BLOCK-006 | UT-BLOCK-005 | - | - |
| FR-BLOCK-007 | UT-BLOCK-006 | - | E2E-SPAWN-004 |
| FR-BLOCK-008 | UT-BLOCK-007 | - | - |
| FR-SPAWN-001 | UT-SPAWN-001 | - | E2E-SPAWN-001 |
| FR-SPAWN-002 | UT-SPAWN-002 | - | E2E-SPAWN-001 |
| FR-SPAWN-003 | UT-SPAWN-003 | - | - |
| FR-SPAWN-004 | UT-SPAWN-004 | - | - |
| FR-SPAWN-005 | UT-SPAWN-005 | - | E2E-SPAWN-003 |
| FR-FALL-001 | UT-FALL-001 | - | E2E-FALL-001 |
| FR-FALL-002 | UT-FALL-002 | IT-CG-003 | E2E-FALL-002 |
| FR-FALL-003 | UT-FALL-003 | - | E2E-FALL-003 |
| FR-FALL-004 | UT-FALL-004 | - | E2E-ROT-011 |
| FR-ROT-001 | UT-ROT-001-008 | IT-CG-001 | E2E-ROT-001, E2E-ROT-003-007 |
| FR-ROT-002 | UT-ROT-001-008 | IT-CG-002 | E2E-ROT-002, E2E-ROT-003-007 |
| FR-ROT-003 | UT-COLL-006 | - | E2E-ROT-008 |
| FR-ROT-004 | UT-COLL-007 | - | E2E-ROT-009 |
| FR-ROT-005 | - | - | E2E-ROT-010 |
| FR-COLL-001 | UT-COLL-004, UT-COLL-005 | IT-BA-003 | E2E-COLL-004 |
| FR-COLL-002 | UT-COLL-003 | IT-BA-002 | E2E-FALL-004, E2E-COLL-003 |
| FR-COLL-003 | UT-COLL-001, UT-COLL-002 | IT-BA-001 | E2E-COLL-001, E2E-COLL-002 |
| FR-COLL-004 | - | IT-BA-002, IT-BA-003 | E2E-COLL-005 |
| FR-COLL-005 | UT-COLL-008 | - | - |
| FR-CLEAR-001 | UT-CLEAR-001, UT-CLEAR-005, UT-ARENA-005/006 | IT-RA-003 | E2E-CLEAR-001 |
| FR-CLEAR-002 | UT-CLEAR-002 | IT-RA-002 | E2E-CLEAR-002, E2E-CLEAR-005/006 |
| FR-CLEAR-003 | UT-CLEAR-003, UT-CLEAR-004 | IT-RA-001, IT-RA-002 | E2E-CLEAR-003 |
| FR-CLEAR-004 | UT-CLEAR-006 | - | - |
| FR-SCORE-001 | UT-SCORE-002 | IT-BS-001 | E2E-SCORE-002 |
| FR-SCORE-002 | UT-SCORE-003 | IT-BS-002 | E2E-SCORE-003 |
| FR-SCORE-003 | UT-SCORE-004-006 | IT-BS-003 | E2E-SCORE-004-006 |
| FR-SCORE-004 | UT-SCORE-004-006 | IT-BS-003 | E2E-SCORE-004-006 |
| FR-SCORE-005 | UT-SCORE-001, UT-SCORE-009 | - | E2E-SCORE-001 |
| FR-SCORE-006 | UT-SCORE-008 | - | E2E-SCORE-008 |
| FR-END-001 | - | IT-GO-001 | E2E-END-001 |
| FR-END-002 | - | IT-GO-002 | E2E-END-002 |
| FR-END-003 | - | IT-GO-003 | E2E-END-003 |
| FR-END-004 | - | IT-GO-004 | E2E-END-004 |
| FR-END-005 | - | IT-GO-005 | E2E-END-005, E2E-END-006 |
| FR-CTRL-001-006 | - | IT-CG-001-006 | E2E-CTRL-001-007 |
| FR-PAUSE-001-007 | UT-STATE-001-004 | - | E2E-PAUSE-001-008 |
| UI-LAYOUT-001-005 | - | - | E2E-INIT-001,003,004,007, E2E-VIS-001/002 |
| UI-VIS-001-005 | - | - | E2E-VIS-003-007 |
| UI-SCORE-001-004 | - | - | E2E-INIT-003, E2E-SCORE-007 |
| AUD-MAJOR-001-004 | - | IT-AUD-001-004 | E2E-SND-001-004, E2E-END-007 |
| AUD-MINOR-001-004 | - | IT-AUD-005-008 | E2E-SND-005-007 |
| AUD-CTRL-001-003 | - | - | E2E-SND-008 |
| NFR-PERF-001-004 | - | - | E2E-PERF-001-004 |
| NFR-COMPAT-001-005 | - | - | E2E-COMPAT-001-005 |
| NFR-CODE-003 | - | - | E2E-INIT-005 |
| DATA-003 | - | - | E2E-STORE-001 |

### 4.2 Block Shape Test Coverage

| Shape | Unit Tests | Rotation Tests | Collision Tests | E2E Tests |
|-------|------------|----------------|-----------------|-----------|
| S-Block | UT-BLOCK-001 | UT-ROT-001-003 | UT-COLL-* | E2E-ROT-003 |
| Line | UT-BLOCK-002 | UT-ROT-004-005 | UT-COLL-* | E2E-ROT-004 |
| T-Block | UT-BLOCK-003 | UT-ROT-006 | UT-COLL-* | E2E-ROT-005 |
| Z-Block | UT-BLOCK-004 | UT-ROT-007 | UT-COLL-* | E2E-ROT-006 |
| L-Block | UT-BLOCK-005 | UT-ROT-008 | UT-COLL-* | E2E-ROT-007 |

---

## 5. Test Execution Summary

### 5.1 Test Count Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Unit Tests | 39 | 14 | 0 | 0 | 53 |
| Integration Tests | 21 | 5 | 0 | 0 | 26 |
| E2E Tests | 63 | 22 | 4 | 0 | 89 |
| **TOTAL** | **123** | **41** | **4** | **0** | **168** |

### 5.2 Priority Definitions

- **Critical**: Must pass for release. Blocks release if failing.
- **High**: Should pass for release. May release with known issues if justified.
- **Medium**: Desirable. Document if not passing.
- **Low**: Nice to have. May defer.

### 5.3 Test Execution Order

1. **Phase 1 - Unit Tests**: Run all unit tests first (fastest feedback)
2. **Phase 2 - Integration Tests**: Run after unit tests pass
3. **Phase 3 - E2E Tests (Critical)**: Run all critical priority E2E tests
4. **Phase 4 - E2E Tests (High)**: Run high priority tests
5. **Phase 5 - E2E Tests (Medium)**: Run medium priority tests
6. **Phase 6 - Cross-Browser**: Run critical E2E tests in all browsers

### 5.4 Smoke Test Suite

Quick validation subset for milestone completion:

| Test ID | Description |
|---------|-------------|
| E2E-INIT-001 | Game loads |
| E2E-INIT-002 | Arena renders |
| E2E-SPAWN-001 | Block spawns correctly |
| E2E-FALL-001 | Block falls |
| E2E-ROT-001 | Rotation works |
| E2E-COLL-003 | Floor collision |
| E2E-CLEAR-001 | Row clears |
| E2E-SCORE-002 | Score updates |
| E2E-PAUSE-001 | Pause works |
| E2E-END-002 | Game over triggers |
| E2E-END-006 | Restart works |

**Smoke Test Count: 11 tests**

### 5.5 Playwright Test File Structure

```
tests/
├── unit/
│   ├── block.test.js
│   ├── arena.test.js
│   ├── collision.test.js
│   ├── scoring.test.js
│   ├── spawning.test.js
│   ├── falling.test.js
│   └── gamestate.test.js
├── integration/
│   ├── block-arena.test.js
│   ├── block-scoring.test.js
│   ├── row-clear.test.js
│   ├── controls.test.js
│   ├── game-over.test.js
│   └── audio.test.js
└── e2e/
    ├── init.spec.ts
    ├── spawning.spec.ts
    ├── falling.spec.ts
    ├── rotation.spec.ts
    ├── collision.spec.ts
    ├── row-clear.spec.ts
    ├── scoring.spec.ts
    ├── controls.spec.ts
    ├── pause.spec.ts
    ├── game-over.spec.ts
    ├── sound.spec.ts
    ├── visual.spec.ts
    ├── compatibility.spec.ts
    ├── performance.spec.ts
    ├── storage.spec.ts
    └── edge-cases.spec.ts
```

---

## Revision History

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2025-01-XX | Verifier Agent | Initial test cases specification |
