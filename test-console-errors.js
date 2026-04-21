const { chromium } = require('playwright');

async function test() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('pageerror', error => {
    errors.push({
      message: error.message,
      stack: error.stack
    });
  });
  
  await page.goto('http://localhost:8767/index.html');
  await page.waitForTimeout(2000);
  
  if (errors.length > 0) {
    console.log('Errors found:');
    errors.forEach(err => {
      console.log('\n---');
      console.log('Message:', err.message);
      console.log('Stack:', err.stack);
    });
  } else {
    console.log('✓ No errors');
  }
  
  await browser.close();
  return errors.length === 0 ? 0 : 1;
}

test().then(code => process.exit(code));
