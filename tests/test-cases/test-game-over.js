// Test game over behavior
const { chromium } = require('playwright');

async function testGameOver() {
  console.log('Testing game over behavior...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
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
  await page.waitForFunction(() => window.testReady === true);
  
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  console.log('Game started. Filling arena to trigger game over...\n');
  
  // Fill the arena by placing many blocks without clearing rows
  // Move all blocks to the left side to stack up
  for (let i = 1; i <= 25; i++) {
    await page.waitForTimeout(300);
    
    // Move far left
    for (let j = 0; j < 10; j++) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(20);
    }
    
    // Accelerate to drop quickly
    await page.keyboard.down('ArrowDown');
    await page.waitForTimeout(500);
    await page.keyboard.up('ArrowDown');
    await page.waitForTimeout(2000);
    
    // Check for game over
    const message = await page.textContent('#messages');
    if (message.includes('GAME OVER')) {
      console.log(`✓ Game over triggered after ${i} blocks`);
      console.log(`  Message: "${message}"`);
      
      // Take screenshot
      await page.screenshot({ path: 'test-results/game-over-test.png' });
      
      // Test restart
      console.log('\nTesting restart...');
      await page.keyboard.press('Space');
      await page.waitForTimeout(1000);
      
      const messageAfterRestart = await page.textContent('#messages');
      const score = await page.textContent('#score');
      
      if (messageAfterRestart === '' && score === '0') {
        console.log('✓ Restart works - game cleared and restarted');
        await browser.close();
        console.log('\n✓✓✓ GAME OVER TEST PASSED ✓✓✓');
        return 0;
      } else {
        console.log('✗ Restart failed');
        await browser.close();
        return 1;
      }
    }
  }
  
  console.log('✗ Game over not triggered after 25 blocks');
  await browser.close();
  return 1;
}

testGameOver().then(code => process.exit(code));
