// Manual check - drop blocks one by one slowly and watch what happens
const { chromium } = require('playwright');

async function manualCheck() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    import('./engine.js').then(module => {
      window.testGameState = module.gameState;
      window.testReady = true;
    });
  });
  await page.waitForFunction(() => window.testReady === true);
  
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  console.log('Game started. Dropping blocks naturally (no acceleration)...\n');
  
  for (let i = 1; i <= 15; i++) {
    console.log(`\n=== Block ${i} ===`);
    await page.waitForTimeout(500);
    
    // Get initial state
    const initial = await page.evaluate(() => {
      const block = window.testGameState?.activeBlock;
      return {
        y: block?.origin.y,
        shape: block?.shapeId,
        score: window.testGameState?.score,
        cells: block?.getCells().map(c => ({x: c.x, y: c.y}))
      };
    });
    console.log(`Initial: y=${initial.y}, shape=${initial.shape}, score=${initial.score}`);
    console.log(`Cells:`, initial.cells);
    
    // Move left/right alternately to avoid building up in center
    if (i % 2 === 0) {
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
    } else {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
    }
    await page.waitForTimeout(200);
    
    // Wait and watch it fall for several seconds
    for (let tick = 1; tick <= 5; tick++) {
      await page.waitForTimeout(1000);
      const state = await page.evaluate(() => {
        const block = window.testGameState?.activeBlock;
        return {
          y: block?.origin.y,
          shape: block?.shapeId
        };
      });
      console.log(`  After ${tick}s: y=${state.y}, shape=${state.shape}`);
      
      if (state.shape !== initial.shape) {
        console.log(`  → New block spawned!`);
        break;
      }
    }
    
    const final = await page.evaluate(() => ({
      score: window.testGameState?.score,
      activeShape: window.testGameState?.activeBlock?.shapeId
    }));
    console.log(`Final: score=${final.score}, next shape=${final.activeShape}`);
  }
  
  await page.screenshot({ path: 'test-results/manual-check.png' });
  await browser.close();
}

manualCheck();
