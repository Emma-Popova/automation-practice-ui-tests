import { test, expect } from '../utils/fixtures';


test.describe(' Register New User', () => {


test('Test Case 5: Register User with existing email', async({page}) => {
    
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

     // Signup form locators
    const usernameInput = page.locator('[data-qa="signup-name"]');
    const emailInput = page.locator('[data-qa="signup-email"]');
    const signupButton = page.getByRole('button', { name: 'Signup' });

    const email = process.env.TEST_EMAIL;
    const username = "Didi";

    if (!email) {
      throw new Error('TEST_EMAIL is not defined in the environment variables.');
    }

    await usernameInput.fill(username);
    await emailInput.fill(email);
    await signupButton.click();

    await expect(page.getByText('Email Address already exist!')).toBeVisible();

        });

    });