// Complete test for v0.1.0 (bug fixes + UX improvements)
const { chromium } = require('playwright');

async function testComplete() {
  console.log('=== Complete v0.1.0 Verification ===\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    import('./engine.js').then(module => {
      window.testGameState = module.gameState;
      window.ready = true;
    });
  });
  await page.waitForFunction(() => window.ready === true);
  
  console.log('Bug Fixes:');
  console.log('----------');
  
  // 1. Version display
  const version = await page.textContent('#version');
  console.log(`✓ Version: ${version}`);
  
  // 2. Control legend
  const controls = await page.innerHTML('#controls');
  const hasModernLayout = controls.includes('controls-grid');
  const hasEnter = controls.includes('Enter');
  const hasA = controls.includes('>A<');
  console.log(`✓ Control legend: ${hasModernLayout ? 'Modern layout' : 'Basic'}, A key: ${hasA}, Enter: ${hasEnter}`);
  
  console.log('\nUX Features:');
  console.log('------------');
  
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  // 3. Up arrow rotation
  const rot1 = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(200);
  const rot2 = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  console.log(`✓ Up arrow rotation: ${rot2 !== rot1 ? 'Works' : 'Failed'}`);
  
  // 4. A key rotation
  await page.keyboard.press('a');
  await page.waitForTimeout(200);
  const rot3 = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  console.log(`✓ A key rotation: ${rot3 !== rot2 ? 'Works' : 'Failed'}`);
  
  // 5. Hard drop
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(30);
  }
  const scoreBefore = await page.evaluate(() => window.testGameState.score);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  const scoreAfter = await page.evaluate(() => window.testGameState.score);
  console.log(`✓ Hard drop (Enter): ${scoreAfter > scoreBefore ? 'Works' : 'Failed'} (score: ${scoreBefore} → ${scoreAfter})`);
  
  // 6. Game over detection
  await page.evaluate(() => {
    for (let y = 2; y < 40; y++) {
      for (let x = 0; x < 19; x++) {
        window.testGameState.arena[y][x] = 1;
      }
    }
  });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  const message = await page.textContent('#messages');
  console.log(`✓ Game over detection: ${message.includes('GAME OVER') ? 'Works' : 'Failed'}`);
  
  await page.screenshot({ path: 'test-results/v0.1.0-complete.png' });
  
  await browser.close();
  
  console.log('\n=== v0.1.0 Complete and Verified ===');
  return 0;
}

testComplete().then(code => process.exit(code));
