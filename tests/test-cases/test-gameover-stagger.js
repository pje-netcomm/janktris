// Test game over by staggering blocks to avoid line clears
const { chromium } = require('playwright');

async function test() {
  console.log('Testing game over with staggered placement...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('GameOver') || text.includes('GAME OVER')) {
      console.log(`[CONSOLE] ${text}`);
    }
  });
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  console.log('Dropping blocks in zigzag pattern to avoid line clears...\n');
  
  for (let i = 1; i <= 60; i++) {
    // Alternate between left and right sides, with gaps
    const moveCount = (i % 4 === 0) ? 0 : (i % 2 === 0) ? 2 : 6;
    
    for (let j = 0; j < moveCount; j++) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(10);
    }
    
    // Accelerate drop
    await page.keyboard.down('ArrowDown');
    await page.waitForTimeout(120);
    await page.keyboard.up('ArrowDown');
    await page.waitForTimeout(600);
    
    // Check for game over
    const message = await page.textContent('#messages');
    if (message.includes('GAME OVER')) {
      console.log(`\n✓✓✓ GAME OVER AFTER ${i} BLOCKS! ✓✓✓`);
      console.log(`  Message: "${message}"`);
      await browser.close();
      return 0;
    }
    
    if (i % 10 === 0) {
      console.log(`  ${i} blocks dropped, no game over yet...`);
    }
  }
  
  console.log('\n✗ No game over after 60 blocks');
  await browser.close();
  return 1;
}

test().then(code => process.exit(code));
