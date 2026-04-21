// Test game over with console logging
const { chromium } = require('playwright');

async function test() {
  console.log('Testing game over with console logging...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('GameOver') || text.includes('GAME OVER') || text.includes('Row')) {
      console.log(`[CONSOLE] ${text}`);
    }
  });
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  console.log('Dropping 30 blocks to the left (should fill arena)...\n');
  
  for (let i = 1; i <= 30; i++) {
    // Move to left
    for (let j = 0; j < 8; j++) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(10);
    }
    
    // Accelerate drop
    await page.keyboard.down('ArrowDown');
    await page.waitForTimeout(150);
    await page.keyboard.up('ArrowDown');
    await page.waitForTimeout(800);
    
    // Check for game over
    const message = await page.textContent('#messages');
    if (message.includes('GAME OVER')) {
      console.log(`\n✓✓✓ GAME OVER AFTER ${i} BLOCKS! ✓✓✓`);
      console.log(`  Message: "${message}"`);
      await browser.close();
      return 0;
    }
    
    if (i % 5 === 0) {
      console.log(`  ${i} blocks dropped, no game over yet...`);
    }
  }
  
  console.log('\n✗✗✗ NO GAME OVER AFTER 30 BLOCKS ✗✗✗');
  await browser.close();
  return 1;
}

test().then(code => process.exit(code));
