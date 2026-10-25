import type { Page } from '@playwright/test';
import { test, expect } from '../utils/fixtures';

test.describe('Automation Exercise Authentication', () => {
  // Environment variables
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  // Login form locators
  const loginEmailInput = (page: Page) => 
    page.locator('[data-qa="login-email"]');

  const loginPasswordInput = (page: Page) =>
    page.locator('[data-qa="login-password"]');

  const loginButton = (page: Page) =>
    page.getByRole('button', { name: 'Login' });


  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    if (!email) {
      throw new Error('TEST_EMAIL is not defined in the environment variables.');
    }

    if (!password) {
      throw new Error('TEST_PASSWORD is not defined in the environment variables.');
    }

    await loginEmailInput(page).fill(email);
    await loginPasswordInput(page).fill(password);
    await loginButton(page).click();

    await expect(page.getByText('Logged in as Emma')).toBeVisible();
  });

  test('Test Case 3-A: Login User with incorrect email', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    const incorrectEmail = "Test_test@123.com";

    if (!password) {
      throw new Error('TEST_PASSWORD is not defined in the environment variables.');
    }

    await loginEmailInput(page).fill(incorrectEmail);
    await loginPasswordInput(page).fill(password);
    await loginButton(page).click();

    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();   

  });

  test('Test Case 3-B: Login User with incorrect password', async ({ page }) => {
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

     const incorrectPassword = "Test-01";

    if (!email) {
      throw new Error('TEST_EMAIL is not defined in the environment variables.');
    }

    await loginEmailInput(page).fill(email);
    await loginPasswordInput(page).fill(incorrectPassword);
    await loginButton(page).click();

        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();  

   }); 

   test('Test Case 4: Logout User', async ({ page }) => {
    
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

    if (!email) {
      throw new Error('TEST_EMAIL is not defined in the environment variables.');
    }

    if (!password) {
      throw new Error('TEST_PASSWORD is not defined in the environment variables.');
    }

    await loginEmailInput(page).fill(email);
    await loginPasswordInput(page).fill(password);
    await loginButton(page).click();

    await expect(page.getByText('Logged in as Emma')).toBeVisible();

    await page.getByRole('link', {name: "Logout"}).click();

    await expect(page).toHaveURL('/login')

    });

});
