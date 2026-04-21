const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('Error') || text.includes('error')) {
      console.log(`[ERROR] ${text}`);
    }
  });
  
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });
  
  await page.goto('http://localhost:8766/index.html');
  await page.waitForTimeout(2000);
  
  const errors = await page.evaluate(() => {
    return window.errors || [];
  });
  
  if (errors.length === 0) {
    console.log('✓ No syntax errors');
  } else {
    console.log('✗ Errors found:', errors);
  }
  
  await browser.close();
  return errors.length === 0 ? 0 : 1;
}

test().then(code => process.exit(code));
