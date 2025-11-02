// simple draft test without agents

import { test, expect } from '@playwright/test';
test.use({ storageState: 'playwright/.auth/user.json' });

test('assert default page after login', async ({ page }) => {
  await page.goto('https://app.closedloop.sh/insights', { waitUntil: "load" });
  await expect(page.locator('[data-sidebar="sidebar"]')).toBeVisible();
});
