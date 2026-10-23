import { test, expect } from '@playwright/test';

test.describe('Login User with correct email and password', () => {

test.beforeEach('Open page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('https://automationexercise.com/');

    const acceptBtn = page.getByRole('button', { name: 'Consent' });

    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
    }
  });

  test('Test Case 2: Login User with correct email and password', async({page}) => {

    await page.getByRole('link', {name: "Signup / Login"}).click();
    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    if (!email) {
      throw new Error('TEST_EMAIL is not defined in the environment variables.');
    }

    if (!password) {
      throw new Error('TEST_PASSWORD is not defined in the environment variables.');
    }  

 // Login form locators
    const loginEmailInput = page.locator('[data-qa="login-email"]');
    const loginPasswordInput = page.locator('[data-qa="login-password"]');
    const loginButton = page.getByRole('button', { name: 'Login' });

    await loginEmailInput.fill(email);
    await loginPasswordInput.fill(password);
    await loginButton.click();

    
    await expect(page.getByText('Logged in as Emma')).toBeVisible();
    
   
  })


})