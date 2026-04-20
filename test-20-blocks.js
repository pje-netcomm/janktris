// Test for 20+ block drops - verify game continues correctly
const { chromium } = require('playwright');

async function test20Blocks() {
  console.log('Starting 20-block drop test...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate and setup
    await page.goto('http://localhost:8765/index.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Expose game state
    await page.evaluate(() => {
      import('./engine.js').then(module => {
        window.testGameState = module.gameState;
        window.testReady = true;
      });
    });
    await page.waitForFunction(() => window.testReady === true, { timeout: 5000 });
    
    // Start game
    await page.focus('body');
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);
    
    console.log('Game started, testing 20 blocks...\n');
    
    let blocksDropped = 0;
    let failures = [];
    
    for (let i = 1; i <= 20; i++) {
      console.log(`Block ${i}:`);
      
      // Wait for block to spawn
      await page.waitForTimeout(200);
      
      // Get block position
      const blockInfo = await page.evaluate(() => {
        const block = window.testGameState?.activeBlock;
        if (!block) return null;
        return {
          x: block.origin.x,
          y: block.origin.y,
          rotation: block.rotation,
          shapeId: block.shapeId
        };
      });
      
      if (!blockInfo) {
        failures.push(`Block ${i}: No active block found`);
        console.log(`  ✗ FAIL: No active block`);
        break;
      }
      
      console.log(`  Shape: ${blockInfo.shapeId}, Pos: (${blockInfo.x}, ${blockInfo.y}), Rot: ${blockInfo.rotation}°`);
      
      // Move block left to avoid building up in center
      if (i % 2 === 0) {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowLeft');
      } else {
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      
      // Accelerate drop
      await page.keyboard.down('ArrowDown');
      await page.waitForTimeout(300);
      await page.keyboard.up('ArrowDown');
      
      // Wait for block to fall and fix
      await page.waitForTimeout(2500);
      
      // Check if game is still running
      const gameStatus = await page.evaluate(() => {
        return {
          score: window.testGameState?.score || 0,
          hasBlock: !!window.testGameState?.activeBlock
        };
      });
      
      if (!gameStatus.hasBlock) {
        failures.push(`Block ${i}: Game stopped (no active block after drop)`);
        console.log(`  ✗ FAIL: Game stopped`);
        break;
      }
      
      console.log(`  ✓ Dropped successfully (Score: ${gameStatus.score})`);
      blocksDropped++;
    }
    
    // Final screenshot
    await page.screenshot({ path: 'test-results/20-blocks-test.png' });
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`RESULTS: ${blocksDropped}/20 blocks dropped successfully`);
    
    if (failures.length > 0) {
      console.log('\nFailures:');
      failures.forEach(f => console.log(`  - ${f}`));
    }
    
    if (blocksDropped >= 20) {
      console.log('\n✓✓✓ TEST PASSED ✓✓✓');
      return 0;
    } else {
      console.log(`\n✗✗✗ TEST FAILED: Only ${blocksDropped} blocks dropped ✗✗✗`);
      return 1;
    }
    
  } catch (error) {
    console.error('Test error:', error);
    return 1;
  } finally {
    await browser.close();
  }
}

test20Blocks().then(code => process.exit(code));
