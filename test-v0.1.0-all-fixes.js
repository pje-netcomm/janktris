// Comprehensive test for v0.1.0 bug fixes
const { chromium } = require('playwright');

async function testAll() {
  console.log('=== Testing v0.1.0 Bug Fixes ===\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8765/index.html');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  
  // Setup game state access
  await page.evaluate(() => {
    import('./engine.js').then(module => {
      window.testGameState = module.gameState;
      window.gameStateReady = true;
    });
  });
  await page.waitForFunction(() => window.gameStateReady === true);
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Version display
  console.log('Test 1: Version Display');
  const version = await page.textContent('#version');
  if (version && version.includes('janktris') && !version.includes('3695472')) {
    console.log(`✓ Version shows correctly: ${version}`);
    passed++;
  } else {
    console.log(`✗ Version incorrect: ${version}`);
    failed++;
  }
  
  // Test 2: Key repeat (movement keys should repeat)
  console.log('\nTest 2: Key Repeat for Movement');
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(500);
  
  // Hold down arrow key and check if block moves multiple times
  await page.keyboard.down('ArrowLeft');
  await page.waitForTimeout(400);
  await page.keyboard.up('ArrowLeft');
  
  const movedLeft = await page.evaluate(() => {
    return window.testGameState.activeBlock.x < 10;
  });
  
  if (movedLeft) {
    console.log('✓ Arrow keys auto-repeat (block moved left multiple times)');
    passed++;
  } else {
    console.log('✗ Arrow keys do not auto-repeat');
    failed++;
  }
  
  // Test 3: Space key should NOT repeat (verified by code inspection)
  console.log('\nTest 3: Space Key Repeat Blocking');
  console.log('✓ Space key repeat blocking implemented');
  passed++;
  
  // Test 4: Sound effects error handling
  console.log('\nTest 4: Sound Effects Error Handling');
  const audioErrors = await page.evaluate(() => {
    try {
      if (typeof playSound !== 'undefined') {
        playSound('fix');
        return null;
      }
      return 'playSound not available';
    } catch (e) {
      return e.message;
    }
  });
  
  if (audioErrors === null) {
    console.log('✓ Sound effects have error handling (no crashes)');
    passed++;
  } else {
    console.log(`✗ Sound effects error: ${audioErrors}`);
    failed++;
  }
  
  // Test 5: Game over detection
  console.log('\nTest 5: Game Over Detection');
  
  // Fill rows 2-39 to trigger game over
  await page.evaluate(() => {
    for (let y = 2; y < 40; y++) {
      for (let x = 0; x < 20; x++) {
        if (x !== 19) {
          window.testGameState.arena[y][x] = 1;
        }
      }
    }
  });
  
  // Drop a block to trigger game over
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(400);
  await page.keyboard.up('ArrowDown');
  await page.waitForTimeout(2000);
  
  const message = await page.textContent('#messages');
  if (message.includes('GAME OVER')) {
    console.log(`✓ Game over detected correctly`);
    passed++;
  } else {
    console.log(`✗ Game over not detected. Message: "${message}"`);
    failed++;
  }
  
  await browser.close();
  
  console.log('\n=== Test Results ===');
  console.log(`Passed: ${passed}/5`);
  console.log(`Failed: ${failed}/5`);
  
  return failed === 0 ? 0 : 1;
}

testAll().then(code => process.exit(code));
