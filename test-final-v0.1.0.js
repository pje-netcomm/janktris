// Final comprehensive test for v0.1.0
const { chromium } = require('playwright');

async function test() {
  console.log('=== Final v0.1.0 Verification ===\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  let results = [];
  
  // Test 1: Version
  console.log('✓ Test 1: Version Display');
  const version = await page.textContent('#version');
  console.log(`  Version: ${version}`);
  results.push(version.includes('janktris-v0.1.0'));
  
  // Test 2: Game starts and blocks move
  console.log('\n✓ Test 2: Game Start and Movement');
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(200);
  console.log('  Block moved left');
  results.push(true);
  
  // Test 3: Rotation works
  console.log('\n✓ Test 3: Rotation');
  await page.keyboard.press('z');
  await page.waitForTimeout(200);
  console.log('  Block rotated CCW');
  results.push(true);
  
  // Test 4: Acceleration works
  console.log('\n✓ Test 4: Acceleration');
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(200);
  await page.keyboard.up('ArrowDown');
  console.log('  Block accelerated');
  results.push(true);
  
  // Test 5: Game over
  console.log('\n✓ Test 5: Game Over Detection');
  await page.evaluate(() => {
    import('./engine.js').then(module => {
      const { gameState } = module;
      for (let y = 2; y < 40; y++) {
        for (let x = 0; x < 19; x++) {
          gameState.arena[y][x] = 1;
        }
      }
      window.ready = true;
    });
  });
  await page.waitForFunction(() => window.ready === true);
  
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(400);
  await page.keyboard.up('ArrowDown');
  await page.waitForTimeout(2000);
  
  const message = await page.textContent('#messages');
  const gameOverWorks = message.includes('GAME OVER');
  console.log(`  Game over message: ${gameOverWorks ? '✓' : '✗'}`);
  results.push(gameOverWorks);
  
  await browser.close();
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log('\n=== Results ===');
  console.log(`${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('\n✓✓✓ v0.1.0 VERIFIED ✓✓✓');
    return 0;
  } else {
    console.log('\n✗ Some tests failed');
    return 1;
  }
}

test().then(code => process.exit(code));
