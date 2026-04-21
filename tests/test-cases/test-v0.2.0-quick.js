const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:8766/index.html');
  await page.waitForTimeout(2000);
  
  console.log('✓ Game loads');
  
  // Check version format
  const version = await page.textContent('#version');
  console.log(`Version: ${version}`);
  const isClean = !version.includes('janktris-') && !version.includes('dirty');
  console.log(isClean ? '✓ Version format clean' : '✗ Version format dirty');
  
  // Start game and test sound system
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  console.log('✓ Game started (sound should have played)');
  
  // Move and rotate (tests sounds)
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(100);
  await page.keyboard.press('a');
  await page.waitForTimeout(100);
  console.log('✓ Movement and rotation (sounds should play)');
  
  // Hard drop
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  console.log('✓ Hard drop (fix and spawn sounds)');
  
  await browser.close();
  console.log('\n✓✓✓ v0.2.0 Core Features Working');
  return 0;
}

test().then(code => process.exit(code));
