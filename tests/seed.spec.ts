import { test, expect } from '@playwright/test';

test.describe('Test start', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://app.closedloop.sh/insights', { waitUntil: "load" });
    // generate code here...
  });
});
