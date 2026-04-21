// Trace game over with console logs
const { chromium } = require('playwright');

async function trace() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log(`[BROWSER] ${msg.text()}`));
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Inject logging into game code
  await page.evaluate(() => {
    // Override console.log globally
    const originalLog = console.log;
    console.log = (...args) => {
      originalLog.apply(console, args);
    };
    
    import('./engine.js').then(module => {
      window.testGameState = module.gameState;
      window.testReady = true;
      console.log('Game state exposed');
    });
  });
  
  await page.waitForFunction(() => window.testReady === true);
  
  await page.focus('body');
  await page.keyboard.press('Space');
  console.log('Game started');
  await page.waitForTimeout(1000);
  
  // Fill top rows
  await page.evaluate(() => {
    const arena = window.testGameState.arena;
    for (let x = 0; x < 18; x++) {
      arena[0][x] = 'FILL';
      arena[1][x] = 'FILL';
    }
    console.log(`Row 0 filled: ${arena[0].filter(c => c).length}/20`);
    console.log(`Row 1 filled: ${arena[1].filter(c => c).length}/20`);
  });
  
  // Accelerate to trigger fix and game over check
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(1000);
  await page.keyboard.up('ArrowDown');
  
  console.log('\nWaiting for game over...');
  await page.waitForTimeout(5000);
  
  const message = await page.textContent('#messages');
  console.log(`\nFinal message: "${message}"`);
  
  await browser.close();
}

trace();
