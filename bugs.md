# Janktris Bug Log

## BUG-001: Blocks freeze after ~8 blocks dropped [FIXED in v0.0.2]

**Severity:** Critical  
**Discovered:** 2026-04-20  
**Status:** Fixed  

**Description:**  
After approximately 8 blocks were dropped, subsequent blocks would spawn but not fall. They remained stuck at the spawn position (y=0) and never moved down. The game appeared running but blocks were frozen.

**Root Cause:**  
Two related issues in collision detection and game over logic:

1. **Incorrect collision detection for negative Y coordinates**: The `blockCollides()` function rejected blocks with cells at y < 0 (above visible arena). Block shapes like S-shape and I-shape have offset cells that can be at negative Y coordinates when spawned at y=0. This prevented blocks from moving down initially.

2. **Game over check accessing negative array indices**: The game over check `gameState.arena[cell.y][cell.x]` attempted to access negative array indices (e.g., arena[-1]) when checking cells at y < 0. This returned `undefined` instead of detecting collision, causing blocks to freeze instead of triggering game over properly.

**Fix:**  
1. Modified `blockCollides()` in engine.js to allow blocks with cells above the arena (y < 0):
   - Removed `cell.y < 0` check that prevented blocks from spawning
   - Only check collision for cells inside arena bounds (y >= 0)
   - Blocks can now spawn with negative Y offsets - they render when they enter arena
   
2. Fixed game over check in main.js to only check cells within arena bounds:
   - Changed: `cell.y < 2 && arena[cell.y][cell.x]`
   - To: `cell.y >= 0 && cell.y < 2 && arena[cell.y][cell.x]`
   - This prevents accessing negative array indices
   - Game properly ends when new blocks collide with existing blocks in top rows

**Files Changed:**  
- `engine.js`: Updated `blockCollides()` function (lines 62-75)
- `main.js`: Fixed game over check to add `cell.y >= 0` condition (line 75)

**Testing:**  
- Created `test-20-blocks.js` automated test that verifies 20+ blocks can be dropped successfully
- Test FAILED initially - blocks froze at block 8-9
- Test PASSED after complete fix - all 20 blocks dropped with proper Y progression
- Manual detailed test confirms blocks fall correctly and game ends properly when arena fills

**Verification:**  
✓ All 20 blocks drop successfully  
✓ Blocks with negative Y offsets (I, S shapes) work correctly  
✓ Score increases properly  
✓ No freezing observed  
✓ Game continues indefinitely until arena fills  

---

No other bugs currently identified.
