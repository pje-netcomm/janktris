const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err));
  
  await page.goto('http://localhost:8888/');
  await page.waitForTimeout(1000);
  
  console.log('=== Test: Game Over Modal Behavior ===');
  
  // Start game
  console.log('Starting game with Space...');
  await page.keyboard.press('Space');
  await page.waitForTimeout(1000);
  
  // Check game state
  const gameStarted = await page.evaluate(() => {
    const msg = document.getElementById('messages').textContent;
    return msg === '';
  });
  console.log('✓ Game started (message cleared):', gameStarted);
  
  // Wait a bit for game to be running
  await page.waitForTimeout(500);
  
  // Force game over by using Escape key
  console.log('Pressing Escape...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  
  // Debug: check if modal appeared
  const escapeModalVisible = await page.evaluate(() => {
    const modal = document.getElementById('modal');
    return modal && !modal.classList.contains('hidden');
  });
  console.log('✓ Escape modal visible:', escapeModalVisible);
  
  if (escapeModalVisible) {
    // Click Yes to end game
    const buttons = await page.$$('#modal-buttons button');
    console.log('✓ Found', buttons.length, 'modal buttons');
    
    if (buttons.length >= 1) {
      console.log('Clicking Yes button...');
      await buttons[0].click();
      await page.waitForTimeout(1500);
    }
  } else {
    console.log('⚠ Escape modal not showing, game may not be in right state');
    console.log('Trying alternative: fill arena and trigger natural game over...');
    
    // Alternative: just wait for a natural game over or force it differently
    // For now, let's just test the modal appearance manually
    await page.evaluate(() => {
      // Simulate game over state directly
      const event = new KeyboardEvent('keydown', { code: 'Escape' });
      window.dispatchEvent(event);
    });
    await page.waitForTimeout(500);
  }
  
  // Check that modal appears
  const isVisible = await page.evaluate(() => {
    return !document.getElementById('modal').classList.contains('hidden');
  });
  console.log('✓ Modal visible after game over:', isVisible);
  if (!isVisible) throw new Error('Modal should be visible');
  
  // Check button label is "Close" not "Restart"
  const buttonText = await page.textContent('#modal-buttons button');
  console.log('✓ Button text:', buttonText);
  if (buttonText !== 'Close') throw new Error(`Button should be "Close", got "${buttonText}"`);
  
  // Check that GAME OVER message is on screen
  const message = await page.textContent('#messages');
  console.log('✓ Message text:', message);
  if (!message.includes('GAME OVER')) throw new Error('Should show GAME OVER message');
  
  // Record initial time display in modal
  const modalBody = await page.textContent('#modal-body');
  console.log('✓ Modal body:', modalBody);
  const initialTime = modalBody.match(/Time: (\d+m \d+s)/)?.[1];
  console.log('✓ Initial time:', initialTime);
  
  // Wait 2 seconds
  await page.waitForTimeout(2000);
  
  // Check time hasn't changed (timer stopped)
  const modalBodyAfter = await page.textContent('#modal-body');
  const timeAfter = modalBodyAfter.match(/Time: (\d+m \d+s)/)?.[1];
  console.log('✓ Time after 2s wait:', timeAfter);
  if (timeAfter !== initialTime) {
    throw new Error(`Timer should be stopped! Initial: ${initialTime}, After: ${timeAfter}`);
  }
  console.log('✓ Timer correctly stopped!');
  
  // Press any key to dismiss
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  
  // Check modal is hidden
  const isHidden = await page.evaluate(() => {
    return document.getElementById('modal').classList.contains('hidden');
  });
  console.log('✓ Modal hidden after keypress:', isHidden);
  if (!isHidden) throw new Error('Modal should be hidden after keypress');
  
  // Check GAME OVER message still visible
  const messageAfter = await page.textContent('#messages');
  console.log('✓ Message after modal close:', messageAfter);
  if (!messageAfter.includes('GAME OVER')) throw new Error('GAME OVER message should still be visible');
  
  console.log('\n=== ✅ All Game Over fixes verified! ===');
  
  await browser.close();
  process.exit(0);
}

test().catch(err => {
  console.error('❌ Test failed:', err.message);
  process.exit(1);
});
