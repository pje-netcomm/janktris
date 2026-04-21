const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Disable cache
  await context.route('**/*', route => {
    route.continue({
      headers: {
        ...route.request().headers(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  });
  
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  await page.goto('http://localhost:8768/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Try to interact
  await page.focus('body');
  await page.keyboard.press('Space');
  await page.waitForTimeout(1000);
  
  if (errors.length > 0) {
    console.log('✗ Errors:', errors);
    await browser.close();
    return 1;
  } else {
    console.log('✓ No errors - syntax fixed!');
    await browser.close();
    return 0;
  }
}

test().then(code => process.exit(code));
