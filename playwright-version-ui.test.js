// playwright-version-ui.test.js: Playwright test for version number display
const { test, expect } = require('@playwright/test');

test('Version number display is correct', async ({ page }) => {
  await page.goto('http://localhost:8769');
  // Wait for version element to be populated
  // Wait for #version to be non-empty
  await page.waitForFunction(() => document.getElementById('version').textContent.trim() !== '', null, { timeout: 5000 });
  const versionText = await page.locator('#version').innerText();
  // Should match vA.B.C-D (e.g. v0.2.0-3)
  expect(versionText).toMatch(/^v\d+\.\d+\.\d+-\d+$/);
});
