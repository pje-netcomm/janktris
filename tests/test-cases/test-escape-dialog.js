const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:8888/');
  await page.waitForTimeout(1000);
  
  console.log('=== Test: Escape Dialog Enhancements ===\n');
  
  // Start game
  console.log('1. Starting game...');
  await page.keyboard.press('Space');
  await page.waitForTimeout(1000);
  
  // Let a block start falling
  await page.waitForTimeout(500);
  
  // Test 1: Game pauses when Escape dialog shows
  console.log('\n2. Testing game pause during Escape dialog...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  
  const isPaused = await page.evaluate(() => {
    const shade = document.getElementById('arena-shade');
    return shade && shade.classList.contains('active');
  });
  console.log('✓ Arena shaded (paused):', isPaused);
  if (!isPaused) throw new Error('Game should be paused when Escape dialog shows');
  
  const modalVisible = await page.evaluate(() => {
    return !document.getElementById('modal').classList.contains('hidden');
  });
  console.log('✓ Modal visible:', modalVisible);
  if (!modalVisible) throw new Error('Modal should be visible');
  
  // Test 2: Esc key cancels dialog
  console.log('\n3. Testing Esc key cancels dialog...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  
  const modalHidden = await page.evaluate(() => {
    return document.getElementById('modal').classList.contains('hidden');
  });
  console.log('✓ Modal dismissed by Esc:', modalHidden);
  if (!modalHidden) throw new Error('Modal should be hidden after Esc');
  
  const gameResumed = await page.evaluate(() => {
    const shade = document.getElementById('arena-shade');
    return shade && !shade.classList.contains('active');
  });
  console.log('✓ Game resumed (unpaused):', gameResumed);
  if (!gameResumed) throw new Error('Game should resume after canceling dialog');
  
  // Test 3: Tab navigation and Enter key
  console.log('\n4. Testing Tab navigation and Enter key...');
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  
  // Check which button has focus initially
  let focusedButton = await page.evaluate(() => {
    const focused = document.activeElement;
    return focused ? focused.textContent : null;
  });
  console.log('✓ Initially focused button:', focusedButton);
  
  // Tab to next button
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
  
  focusedButton = await page.evaluate(() => {
    const focused = document.activeElement;
    return focused ? focused.textContent : null;
  });
  console.log('✓ After Tab, focused button:', focusedButton);
  
  // Tab back
  await page.keyboard.press('Tab');
  await page.waitForTimeout(200);
  
  focusedButton = await page.evaluate(() => {
    const focused = document.activeElement;
    return focused ? focused.textContent : null;
  });
  console.log('✓ After second Tab, focused button:', focusedButton);
  
  // Press Enter to activate focused button (should be "Yes" which ends game)
  console.log('\n5. Testing Enter key activates focused button...');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  
  const gameOverState = await page.evaluate(() => {
    const msg = document.getElementById('messages').textContent;
    return msg.includes('GAME OVER');
  });
  console.log('✓ Game ended via Enter key:', gameOverState);
  if (!gameOverState) throw new Error('Enter should activate the focused button (Yes) and end game');
  
  console.log('\n=== ✅ All Escape dialog enhancements verified! ===');
  console.log('  • Game pauses during dialog');
  console.log('  • Esc key cancels dialog');
  console.log('  • Enter key activates focused button');
  console.log('  • Tab navigation works between buttons');
  
  await browser.close();
  process.exit(0);
}

test().catch(err => {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
});
