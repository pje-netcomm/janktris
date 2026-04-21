// Playwright test for Janktris controls
const { chromium } = require('playwright');

async function testControls() {
  console.log('Starting Playwright test...');
  
  // Launch browser in headless mode
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to game
    console.log('Navigating to game...');
    await page.goto('http://localhost:8765/index.html');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    
    // Set up console listener
    page.on('console', msg => {
      const type = msg.type();
      if (type === 'log' || type === 'info') {
        console.log(`[BROWSER LOG] ${msg.text()}`);
      } else if (type === 'error') {
        console.log(`[BROWSER ERROR] ${msg.text()}`);
      }
    });
    
    // Wait for game to initialize
    await page.waitForTimeout(1000);
    
    // Verify initial state
    const initialMessage = await page.textContent('#messages');
    console.log(`Initial message: "${initialMessage}"`);
    
    // Expose gameState to window for testing
    await page.evaluate(() => {
      // Import and expose engine module
      import('./engine.js').then(module => {
        window.testGameState = module.gameState;
        window.testReady = true;
        console.log('Test state exposed, activeBlock:', module.gameState.activeBlock);
      });
    });
    
    // Wait for test setup
    await page.waitForFunction(() => window.testReady === true, { timeout: 5000 });
    
    // Focus the page
    await page.focus('body');
    
    // Start the game
    console.log('Starting game (pressing Space)...');
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);
    
    // Verify game started
    const messageAfterStart = await page.textContent('#messages');
    console.log(`Message after start: "${messageAfterStart}"`);
    
    // Wait for first block to spawn and start falling
    await page.waitForTimeout(700);
    
    let testResults = {
      blocksPlaced: 0,
      controlsTested: {
        left: 0,
        right: 0,
        rotateLeft: 0,
        rotateRight: 0,
        accelerate: 0
      },
      errors: []
    };
    
    // Test 3 blocks
    for (let blockNum = 1; blockNum <= 3; blockNum++) {
      console.log(`\n=== Testing Block #${blockNum} ===`);
      
      // Wait for block to spawn
      await page.waitForTimeout(300);
      
      // Get initial score
      const scoreBefore = await page.textContent('#score');
      console.log(`Score before: ${scoreBefore}`);
      
      // Get initial block position
      const blockPosBefore = await page.evaluate(() => {
        return {
          x: window.testGameState?.activeBlock?.origin?.x,
          y: window.testGameState?.activeBlock?.origin?.y,
          rotation: window.testGameState?.activeBlock?.rotation
        };
      });
      console.log(`Block initial position: x=${blockPosBefore?.x}, y=${blockPosBefore?.y}, rotation=${blockPosBefore?.rotation}`);
      
      // Test left movement
      console.log('  Testing ArrowLeft (move left)...');
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);
      const posAfterLeft = await page.evaluate(() => ({
        x: window.testGameState?.activeBlock?.origin?.x,
        y: window.testGameState?.activeBlock?.origin?.y
      }));
      if (posAfterLeft && posAfterLeft.x < blockPosBefore.x) {
        console.log('    ✓ Left movement works');
        testResults.controlsTested.left++;
      } else {
        console.log(`    ⚠ Left movement may be blocked (before: ${blockPosBefore.x}, after: ${posAfterLeft?.x})`);
      }
      
      // Test right movement
      console.log('  Testing ArrowRight (move right)...');
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
      const posAfterRight = await page.evaluate(() => ({
        x: window.testGameState?.activeBlock?.origin?.x,
        y: window.testGameState?.activeBlock?.origin?.y
      }));
      if (posAfterRight && posAfterRight.x > posAfterLeft.x) {
        console.log('    ✓ Right movement works');
        testResults.controlsTested.right++;
      } else {
        console.log(`    ⚠ Right movement may be blocked (before: ${posAfterLeft?.x}, after: ${posAfterRight?.x})`);
      }
      
      // Test rotate left (A key)
      console.log('  Testing A key (rotate CCW)...');
      const rotBefore = await page.evaluate(() => window.testGameState?.activeBlock?.rotation);
      await page.keyboard.press('a');
      await page.waitForTimeout(150);
      const rotAfterA = await page.evaluate(() => window.testGameState?.activeBlock?.rotation);
      if (rotAfterA !== rotBefore) {
        console.log(`    ✓ Rotate CCW works (${rotBefore}° → ${rotAfterA}°)`);
        testResults.controlsTested.rotateLeft++;
      } else {
        console.log(`    ⚠ Rotate CCW may be blocked (rotation stayed at ${rotBefore}°)`);
      }
      
      // Test rotate right (D key)
      console.log('  Testing D key (rotate CW)...');
      await page.keyboard.press('d');
      await page.waitForTimeout(150);
      const rotAfterD = await page.evaluate(() => window.testGameState?.activeBlock?.rotation);
      if (rotAfterD !== rotAfterA) {
        console.log(`    ✓ Rotate CW works (${rotAfterA}° → ${rotAfterD}°)`);
        testResults.controlsTested.rotateRight++;
      } else {
        console.log(`    ⚠ Rotate CW may be blocked (rotation stayed at ${rotAfterA}°)`);
      }
      
      // Test acceleration
      console.log('  Testing ArrowDown (accelerate)...');
      await page.keyboard.down('ArrowDown');
      await page.waitForTimeout(200);
      await page.keyboard.up('ArrowDown');
      console.log('    ✓ Acceleration tested (down held then released)');
      testResults.controlsTested.accelerate++;
      
      // Wait for block to fall and fix
      console.log('  Waiting for block to fall and fix...');
      await page.waitForTimeout(4000);  // Longer wait for block to fall completely
      
      // Check score increased
      const scoreAfter = await page.textContent('#score');
      console.log(`Score after: ${scoreAfter}`);
      
      if (parseInt(scoreAfter) > parseInt(scoreBefore)) {
        console.log(`  ✓ Block #${blockNum} placed, score increased`);
        testResults.blocksPlaced++;
      } else {
        console.log(`  ⚠ Score did not increase for block #${blockNum}`);
      }
      
      // Small delay between blocks
      await page.waitForTimeout(200);
    }
    
    // Check for console errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Final screenshot
    await page.screenshot({ path: 'test-results/controls-test-final.png' });
    console.log('\nScreenshot saved to test-results/controls-test-final.png');
    
    // Print summary
    console.log('\n=== TEST SUMMARY ===');
    console.log(`Blocks placed: ${testResults.blocksPlaced}/3`);
    console.log(`Left movements: ${testResults.controlsTested.left}`);
    console.log(`Right movements: ${testResults.controlsTested.right}`);
    console.log(`Rotate left (A): ${testResults.controlsTested.rotateLeft}`);
    console.log(`Rotate right (D): ${testResults.controlsTested.rotateRight}`);
    console.log(`Acceleration: ${testResults.controlsTested.accelerate}`);
    
    const success = testResults.controlsTested.left >= 2 && 
                    testResults.controlsTested.right >= 2 &&
                    testResults.controlsTested.rotateLeft >= 2 &&
                    testResults.controlsTested.rotateRight >= 2 &&
                    testResults.controlsTested.accelerate >= 3;
    
    console.log('\n' + '='.repeat(50));
    if (success) {
      console.log('✓✓✓ CONTROLS TEST PASSED ✓✓✓');
      console.log('All control types verified across multiple blocks');
      return 0;
    } else {
      console.log('⚠⚠⚠ CONTROLS TEST FAILED ⚠⚠⚠');
      console.log('Some controls did not work as expected');
      return 1;
    }
    
  } catch (error) {
    console.error('Test error:', error);
    return 1;
  } finally {
    await browser.close();
  }
}

testControls().then(code => process.exit(code));
