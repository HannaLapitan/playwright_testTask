import { test as setup, expect } from '@playwright/test';


const userFile = 'playwright/.auth/user.json';

setup('login as test user', async ({ page }) => {
  await page.goto('https://app.closedloop.sh/auth');
  await page.locator('#email').fill(`${process.env.USER_EMAIL}`);
  await page.locator('#password').fill(`${process.env.USER_PASSWORD}`);
  const signInBtn = page.getByRole('button', {
    name: 'Sign In',
    exact: true
  })

  // Create a promise to wait for the login API request
  const loginRequestIntercept = page.waitForResponse(response =>
    response.url().includes('https://api.closedloop.sh/api/auth/login') &&
    response.request().method() === 'POST'
  );

  await signInBtn.click();

  // Wait for the response and verify its status and body
  const loginResponse = await loginRequestIntercept;
  expect(loginResponse.status()).toBe(200);
  const responseBody = await loginResponse.json();
  expect(responseBody.message).toBe('Login successful');

  await page.waitForURL('https://app.closedloop.sh/insights');
  await page.context().storageState({ path: userFile });
});