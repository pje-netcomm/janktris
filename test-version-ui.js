// test-version-ui.js: Playwright test for version number display
const { test, expect } = require('@playwright/test');

test('Version number display is correct', async ({ page }) => {
  await page.goto('http://localhost:8000');
  // Wait for version element to be populated
  const versionText = await page.locator('#version').innerText();
  // Should match vA.B.C-D (e.g. v0.2.0-3)
  expect(versionText).toMatch(/^v\d+\.\d+\.\d+-\d+$/);
});
