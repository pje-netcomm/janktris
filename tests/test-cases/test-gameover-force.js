// Force game over by directly filling top rows
const { chromium } = require('playwright');

async function test() {
  console.log('Testing game over by filling rows 2-39...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('GameOver') || text.includes('GAME OVER') || text.includes('Filling')) {
      console.log(`[CONSOLE] ${text}`);
    }
  });
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Fill rows 2-39 (leave rows 0-1 empty for now)
  await page.evaluate(() => {
    import('./engine.js').then(module => {
      const { gameState } = module;
      console.log('Filling rows 2-39 with blocks...');
      for (let y = 2; y < 40; y++) {
        for (let x = 0; x < 20; x++) {
          // Leave one gap per row to avoid line clears
          if (x !== 19) {
            gameState.arena[y][x] = 1; // Fill with color 1
          }
        }
      }
      console.log('Arena filled. Rows 0-1 are empty.');
      window.testReady = true;
    });
  });
  
  await page.waitForFunction(() => window.testReady === true);
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  console.log('Starting game - next block should trigger game over...\n');
  
  // Drop one block - it should trigger game over check 2
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(300);
  await page.keyboard.up('ArrowDown');
  await page.waitForTimeout(2000);
  
  const message = await page.textContent('#messages');
  console.log(`\nMessage: "${message}"`);
  
  if (message.includes('GAME OVER')) {
    console.log('\n✓✓✓ GAME OVER WORKS! ✓✓✓');
    await browser.close();
    return 0;
  } else {
    console.log('\n✗✗✗ GAME OVER NOT TRIGGERED ✗✗✗');
    await browser.close();
    return 1;
  }
}

test().then(code => process.exit(code));
