import { test, expect, type Page  } from '@playwright/test';

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

  // Common setup
  test.beforeEach('Open page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/');

    const acceptBtn = page.getByRole('button', { name: 'Consent' });

    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
    }
  });

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

  test('Login User with incorrect email', async ({ page }) => {
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

  test('Login User with incorrect password', async ({ page }) => {
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
   test('Test Case 5: Register User with existing email', async({page}) => {

    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

    const username = "Didi";
 
     // Signup form locators
    const usernameInput = page.locator('[data-qa="signup-name"]');
    const emailInput = page.locator('[data-qa="signup-email"]');
    const signupButton = page.getByRole('button', { name: 'Signup' });

    if (!email) {
      throw new Error('TEST_EMAIL is not defined in the environment variables.');
    }

    await usernameInput.fill(username);
    await emailInput.fill(email);
    await signupButton.click();

    await expect(page.getByText('Email Address already exist!')).toBeVisible();

   })
});
