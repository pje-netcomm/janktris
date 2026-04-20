// Diagnostic test to see game state
const { chromium } = require('playwright');

async function diagnose() {
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
  
  // Drop blocks and check game state
  for (let i = 1; i <= 10; i++) {
    console.log(`\nBlock ${i}:`);
    await page.waitForTimeout(300);
    
    const before = await page.evaluate(() => {
      const block = window.testGameState?.activeBlock;
      return {
        y: block?.origin.y,
        shape: block?.shapeId
      };
    });
    console.log(`  Before: y=${before.y}, shape=${before.shape}`);
    
    // Let it fall naturally for 3 seconds
    await page.waitForTimeout(3000);
    
    const after = await page.evaluate(() => {
      const block = window.testGameState?.activeBlock;
      return {
        y: block?.origin.y,
        shape: block?.shapeId,
        score: window.testGameState?.score
      };
    });
    console.log(`  After 3s: y=${after.y}, shape=${after.shape}, score=${after.score}`);
    
    // Check if game is paused or over
    const message = await page.textContent('#messages');
    console.log(`  Message: "${message}"`);
    
    if (after.y === before.y) {
      console.log(`  ⚠ Block didn't move!`);
      
      // Check internal game state
      const state = await page.evaluate(() => {
        // Try to access main.js variables (they're in closures, so this won't work)
        // But we can check DOM
        return {
          score: document.getElementById('score').textContent,
          message: document.getElementById('messages').textContent
        };
      });
      console.log(`  DOM state: score=${state.score}, message="${state.message}"`);
      break;
    }
  }
  
  await browser.close();
}

diagnose();
