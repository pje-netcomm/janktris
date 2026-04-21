// Basic functionality test - quick verification
const { chromium } = require('playwright');

async function testBasic() {
  console.log('=== Basic Functionality Test ===\n');
  
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
  
  let passed = 0;
  let failed = 0;
  
  console.log('Test 1: Game starts');
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  const hasBlock = await page.evaluate(() => !!window.testGameState.activeBlock);
  if (hasBlock) {
    console.log('✓ Game started with active block\n');
    passed++;
  } else {
    console.log('✗ No active block\n');
    failed++;
  }
  
  console.log('Test 2: Movement works');
  const xBefore = await page.evaluate(() => window.testGameState.activeBlock.x);
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(100);
  const xAfter = await page.evaluate(() => window.testGameState.activeBlock.x);
  if (xAfter < xBefore) {
    console.log('✓ Left movement works\n');
    passed++;
  } else {
    console.log('✗ Left movement failed\n');
    failed++;
  }
  
  console.log('Test 3: Rotation works');
  const rotBefore = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  await page.keyboard.press('a');
  await page.waitForTimeout(100);
  const rotAfter = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  if (rotAfter !== rotBefore) {
    console.log('✓ A key rotation works\n');
    passed++;
  } else {
    console.log('✗ A key rotation failed\n');
    failed++;
  }
  
  console.log('Test 4: Hard drop works');
  const yBefore = await page.evaluate(() => window.testGameState.activeBlock.y);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);
  const yAfter = await page.evaluate(() => window.testGameState.activeBlock.y);
  // After hard drop, new block should spawn at top
  if (yAfter <= 5) {
    console.log('✓ Hard drop works (new block spawned)\n');
    passed++;
  } else {
    console.log('✗ Hard drop failed\n');
    failed++;
  }
  
  console.log('Test 5: Multiple blocks drop');
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(30);
  }
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  
  const blockStillExists = await page.evaluate(() => !!window.testGameState.activeBlock);
  if (blockStillExists) {
    console.log('✓ Multiple blocks can drop\n');
    passed++;
  } else {
    console.log('✗ Game stopped after 2 blocks\n');
    failed++;
  }
  
  await browser.close();
  
  console.log('===================');
  console.log(`Passed: ${passed}/5`);
  console.log(`Failed: ${failed}/5`);
  console.log('===================');
  
  return failed === 0 ? 0 : 1;
}

testBasic().then(code => process.exit(code));
