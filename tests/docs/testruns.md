==========================================
  Running Janktris Test Suite
==========================================

Running: 20-Block Drop Test
----------------------------------------
Starting 20-block drop test...
Game started, testing 20 blocks...

Block 1:
  Shape: LINE, Pos: (10, 1), Rot: 0°
  ✓ Dropped successfully (Score: 0)
Block 2:
  Shape: LINE, Pos: (12, 6), Rot: 0°
  ✓ Dropped successfully (Score: 0)
Block 3:
  Shape: LINE, Pos: (10, 11), Rot: 0°
  ✓ Dropped successfully (Score: 0)
Block 4:
  Shape: LINE, Pos: (12, 16), Rot: 0°
  ✓ Dropped successfully (Score: 0)
Block 5:
  Shape: LINE, Pos: (10, 21), Rot: 0°
  ✓ Dropped successfully (Score: 0)
Block 6:
  Shape: LINE, Pos: (12, 27), Rot: 0°
  ✓ Dropped successfully (Score: 0)
Block 7:
  Shape: LINE, Pos: (10, 32), Rot: 0°
  ✓ Dropped successfully (Score: 0)
Block 8:
  Shape: LINE, Pos: (12, 37), Rot: 0°
  ✓ Dropped successfully (Score: 5)
Block 9:
  Shape: L, Pos: (10, 2), Rot: 180°
Test error: page.waitForTimeout: Target page, context or browser has been closed
    at test20Blocks (/home/petere/work/copilot-tests/ai-tetris/tests/test-cases/test-20-blocks.js:78:18)
✗ FAILED

Running: Control Verification
----------------------------------------
Starting Playwright test...
Navigating to game...
Initial message: "Press Space to Start"
[BROWSER LOG] Test state exposed, activeBlock: Block
Starting game (pressing Space)...
Message after start: ""

=== Testing Block #1 ===
Score before: 0
Block initial position: x=10, y=2, rotation=90
  Testing ArrowLeft (move left)...
    ✓ Left movement works
  Testing ArrowRight (move right)...
    ✓ Right movement works
  Testing A key (rotate CCW)...
    ✓ Rotate CCW works (90° → 0°)
  Testing D key (rotate CW)...
    ✓ Rotate CW works (0° → 90°)
  Testing ArrowDown (accelerate)...
    ✓ Acceleration tested (down held then released)
  Waiting for block to fall and fix...
Score after: 0
  ⚠ Score did not increase for block #1

=== Testing Block #2 ===
Score before: 0
Block initial position: x=10, y=9, rotation=90
  Testing ArrowLeft (move left)...
    ✓ Left movement works
  Testing ArrowRight (move right)...
    ✓ Right movement works
  Testing A key (rotate CCW)...
    ✓ Rotate CCW works (90° → 0°)
  Testing D key (rotate CW)...
    ✓ Rotate CW works (0° → 90°)
  Testing ArrowDown (accelerate)...
    ✓ Acceleration tested (down held then released)
  Waiting for block to fall and fix...
Score after: 0
  ⚠ Score did not increase for block #2

=== Testing Block #3 ===
Score before: 0
Block initial position: x=10, y=17, rotation=90
  Testing ArrowLeft (move left)...
    ✓ Left movement works
  Testing ArrowRight (move right)...
    ✓ Right movement works
  Testing A key (rotate CCW)...
    ✓ Rotate CCW works (90° → 0°)
  Testing D key (rotate CW)...
    ✓ Rotate CW works (0° → 90°)
  Testing ArrowDown (accelerate)...
    ✓ Acceleration tested (down held then released)
  Waiting for block to fall and fix...
Score after: 0
  ⚠ Score did not increase for block #3

Screenshot saved to test-results/controls-test-final.png

=== TEST SUMMARY ===
Blocks placed: 0/3
Left movements: 3
Right movements: 3
Rotate left (A): 3
Rotate right (D): 3
Acceleration: 3

==================================================
✓✓✓ CONTROLS TEST PASSED ✓✓✓
All control types verified across multiple blocks
✓ PASSED

Running: UX Improvements
----------------------------------------
=== Testing v0.1.0 UX Improvements ===

Test 1: Control Legend Visual
✓ Control legend updated with grid layout and new controls

Test 2: Up Arrow Rotation
✓ Up arrow rotates block clockwise

Test 3: A Key Rotation (Changed from Z)
✓ A key rotates block counter-clockwise

Test 4: Enter Hard Drop
  Score before hard drop: 0
  Score after hard drop: 5
✓ Enter key performs hard drop (score increased, block fixed)

Test 5: Taking screenshot for manual verification
✓ Screenshot saved to test-results/ux-improvements.png

=== Test Results ===
Passed: 4/4 functional tests
Failed: 0/4
✓ PASSED

Running: v0.1.0 Complete Verification
----------------------------------------
=== Complete v0.1.0 Verification ===

Bug Fixes:
----------
✓ Version: v0.2.0-3
✓ Control legend: Modern layout, A key: true, Enter: true

UX Features:
------------
✓ Up arrow rotation: Works
✓ A key rotation: Works
✓ Hard drop (Enter): Works (score: 0 → 3)
✓ Game over detection: Works

=== v0.1.0 Complete and Verified ===
✓ PASSED

==========================================
  Test Summary
==========================================

✗ 20-Block Drop Test
✓ Control Verification
✓ UX Improvements
✓ v0.1.0 Complete Verification

Total: 4 tests
Passed: 3
Failed: 1

✗✗✗ SOME TESTS FAILED ✗✗✗
