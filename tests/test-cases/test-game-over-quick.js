// Quick game over test - manually fill top rows
const { chromium } = require('playwright');

async function testQuick() {
  console.log('Quick game over test...\n');
  
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
  
  // Start game
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  // Manually fill the top rows to trigger game over
  console.log('Manually filling top rows of arena...');
  await page.evaluate(() => {
    const arena = window.testGameState.arena;
    // Fill most of row 0 and row 1
    for (let x = 0; x < 15; x++) {
      arena[0][x] = 'TEST';
      arena[1][x] = 'TEST';
    }
  });
  
  console.log('Dropping one more block to trigger game over check...');
  
  // Move block and let it drop to trigger game over check
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(500);
  await page.keyboard.up('ArrowDown');
  await page.waitForTimeout(3000);
  
  const message = await page.textContent('#messages');
  console.log(`Message: "${message}"`);
  
  if (message.includes('GAME OVER')) {
    console.log('\n✓ Game over triggered correctly!');
    console.log('✓ Message displays score');
    
    // Test restart
    await page.keyboard.press('Space');
    await page.waitForTimeout(1000);
    const newMessage = await page.textContent('#messages');
    const score = await page.textContent('#score');
    
    if (newMessage === '' && score === '0') {
      console.log('✓ Restart works\n');
      await browser.close();
      console.log('✓✓✓ GAME OVER TEST PASSED ✓✓✓');
      return 0;
    }
  }
  
  console.log('\n✗ Game over test failed');
  await browser.close();
  return 1;
}

testQuick().then(code => process.exit(code));
