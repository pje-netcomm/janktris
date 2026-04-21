// Test natural game over by filling arena
const { chromium } = require('playwright');

async function testNatural() {
  console.log('Testing natural game over (this will take a while)...\n');
  
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
  
  console.log('Dropping blocks to left side (no row clears)...');
  
  // Drop many blocks, accelerating each one
  for (let i = 1; i <= 100; i++) {
    // Move to left
    for (let j = 0; j < 8; j++) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(10);
    }
    
    // Accelerate drop
    await page.keyboard.down('ArrowDown');
    await page.waitForTimeout(200);
    await page.keyboard.up('ArrowDown');
    await page.waitForTimeout(1500);
    
    // Check for game over every 10 blocks
    if (i % 10 === 0) {
      const message = await page.textContent('#messages');
      if (message.includes('GAME OVER')) {
        console.log(`\n✓ Game over after ${i} blocks!`);
        console.log(`  Message: "${message}"`);
        await page.screenshot({ path: 'test-results/natural-gameover.png' });
        await browser.close();
        console.log('\n✓✓✓ GAME OVER WORKS ✓✓✓');
        return 0;
      }
      console.log(`  ${i} blocks dropped...`);
    }
  }
  
  console.log('\n✗ Game over not triggered after 100 blocks');
  await browser.close();
  return 1;
}

testNatural().then(code => process.exit(code));
