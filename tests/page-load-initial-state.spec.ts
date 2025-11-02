// test generated using newly addded Playwrite agenets: planner, generator and healer
import { test, expect } from '@playwright/test';

test.describe('Page Load and Initial State', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Basic Page Load', async ({ page }) => {
    // Navigate to insights page
    await page.goto('https://app.closedloop.sh/insights', { waitUntil: 'load' });

    // Verify header and navigation elements are visible
    await expect(page.locator('img[alt="ClosedLoop AI"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle Sidebar' })).toBeVisible();

    // Verify main content area is displayed
    await expect(page.getByRole('main')).toBeVisible();

    // Verify no error messages are present
    const errorMessages = page.getByText(/error|failed|expired/i);
    await expect(errorMessages).toHaveCount(0);

    // Verify URL remains as /insights
    await expect(page).toHaveURL('https://app.closedloop.sh/insights');
  });

  test('Authentication State Verification', async ({ page }) => {
    // Load the Insights page
    await page.goto('https://app.closedloop.sh/insights', { waitUntil: 'load' });

    // Check navigation items are present and accessible
    await expect(page.getByRole('link', { name: 'Insights' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Integrations' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API Keys' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Billing' })).toBeVisible();

    // Verify section headings
    await expect(page.getByText('Overview')).toBeVisible();
    await expect(page.getByText('Automation')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();

    // Verify main content elements
    await expect(page.getByRole('heading', {
      name: 'Turn customer conversations into product insights in 15 seconds'
    })).toBeVisible();
  });
});