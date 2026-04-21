// Debug game over
const { chromium } = require('playwright');

async function debug() {
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
  
  // Drop 15 blocks to left side
  for (let i = 1; i <= 15; i++) {
    await page.waitForTimeout(200);
    for (let j = 0; j < 10; j++) await page.keyboard.press('ArrowLeft');
    await page.keyboard.down('ArrowDown');
    await page.waitForTimeout(400);
    await page.keyboard.up('ArrowDown');
    await page.waitForTimeout(2000);
  }
  
  // Check arena state
  const arenaState = await page.evaluate(() => {
    const state = [];
    for (let y = 0; y < 5; y++) {
      const row = window.testGameState.arena[y];
      const filled = row.filter(c => c).length;
      state.push(`Row ${y}: ${filled}/20 filled`);
    }
    return state;
  });
  
  console.log('\nArena state (top 5 rows):');
  arenaState.forEach(s => console.log('  ' + s));
  
  const message = await page.textContent('#messages');
  console.log(`\nGame message: "${message}"`);
  
  await page.screenshot({ path: 'test-results/debug-gameover.png' });
  await browser.close();
}

debug();
