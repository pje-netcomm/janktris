// Test UX improvements for v0.1.0
const { chromium } = require('playwright');

async function testUX() {
  console.log('=== Testing v0.1.0 UX Improvements ===\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Import game state
  await page.evaluate(() => {
    import('./engine.js').then(module => {
      window.testGameState = module.gameState;
      window.ready = true;
    });
  });
  await page.waitForFunction(() => window.ready === true);
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Check control legend is updated
  console.log('Test 1: Control Legend Visual');
  const controlsHTML = await page.innerHTML('#controls');
  const hasGrid = controlsHTML.includes('controls-grid');
  const hasA = controlsHTML.includes('>A<');
  const hasEnter = controlsHTML.includes('Enter');
  const hasUpArrow = controlsHTML.includes('↑');
  
  if (hasGrid && hasA && hasEnter && hasUpArrow) {
    console.log('✓ Control legend updated with grid layout and new controls');
    passed++;
  } else {
    console.log('✗ Control legend missing elements');
    failed++;
  }
  
  // Test 2: Up arrow rotation
  console.log('\nTest 2: Up Arrow Rotation');
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  const rotationBefore = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(200);
  const rotationAfter = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  
  if (rotationAfter !== rotationBefore) {
    console.log('✓ Up arrow rotates block clockwise');
    passed++;
  } else {
    console.log('✗ Up arrow did not rotate block');
    failed++;
  }
  
  // Test 3: A key rotation (was Z)
  console.log('\nTest 3: A Key Rotation (Changed from Z)');
  const rotBefore = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  await page.keyboard.press('a');
  await page.waitForTimeout(200);
  const rotAfter = await page.evaluate(() => window.testGameState.activeBlock.rotation);
  
  if (rotAfter !== rotBefore) {
    console.log('✓ A key rotates block counter-clockwise');
    passed++;
  } else {
    console.log('✗ A key did not rotate block');
    failed++;
  }
  
  // Test 4: Hard drop with Enter
  console.log('\nTest 4: Enter Hard Drop');
  
  // Move block to left side to avoid immediate game over
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(50);
  }
  
  const scoreBefore = await page.evaluate(() => window.testGameState.score);
  console.log(`  Score before hard drop: ${scoreBefore}`);
  
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  
  const scoreAfter = await page.evaluate(() => window.testGameState.score);
  console.log(`  Score after hard drop: ${scoreAfter}`);
  
  // Score should have increased (block was fixed and new one spawned)
  if (scoreAfter > scoreBefore) {
    console.log('✓ Enter key performs hard drop (score increased, block fixed)');
    passed++;
  } else {
    console.log('✗ Enter key did not hard drop properly (score unchanged)');
    failed++;
  }
  
  // Test 5: Visual verification screenshot
  console.log('\nTest 5: Taking screenshot for manual verification');
  await page.screenshot({ path: 'test-results/ux-improvements.png' });
  console.log('✓ Screenshot saved to test-results/ux-improvements.png');
  
  await browser.close();
  
  console.log('\n=== Test Results ===');
  console.log(`Passed: ${passed}/4 functional tests`);
  console.log(`Failed: ${failed}/4`);
  
  return failed === 0 ? 0 : 1;
}

testUX().then(code => process.exit(code));
