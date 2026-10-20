
import { test, expect } from '@playwright/test';

test.describe('Automation Exercise Authentication', () => {

  test.beforeEach('Open page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('https://automationexercise.com/');

    const acceptBtn = page.getByRole('button', { name: 'Consent' });

    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
    }
  });

  test('Test Case 1: Register user', async ({ page }) => {

    await page.getByRole('link', { name: ' Signup / Login' }).click();

    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

    const uniqueEmail = `emma${Date.now()}@example.com`;

    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    if (!username) {
      throw new Error('TEST_USERNAME is not defined in the environment variables.');
    }

    if (!password) {
      throw new Error('TEST_PASSWORD is not defined in the environment variables.');
    }

    // Signup form locators
    const usernameInput = page.locator('[data-qa="signup-name"]');
    const emailInput = page.locator('[data-qa="signup-email"]');
    const signupButton = page.getByRole('button', { name: 'Signup' });

    // Enter signup details
    await usernameInput.fill(username);
    await emailInput.fill(uniqueEmail);
    await signupButton.click();

    // Verify account information page
    await expect(page).toHaveURL('https://automationexercise.com/signup');
    await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

    // Account information locators
    const titleRadio = page.getByRole('radio', { name: 'Mrs.' });
    const nameInput = page.getByRole('textbox', { name: 'Name *', exact: true });
    const passwordInput = page.locator('#password');
    const accountEmailInput = page.locator('[data-qa="email"]');

    const daysSelect = page.locator('#days');
    const monthsSelect = page.locator('#months');
    const yearsSelect = page.locator('#years');

    await titleRadio.check();
    await nameInput.fill(username);
    await passwordInput.fill(password);

    await daysSelect.selectOption('19');
    await monthsSelect.selectOption('October');
    await yearsSelect.selectOption('2000');

    const newsletterCheckbox = page.locator('#newsletter');
    const offersCheckbox = page.locator('#optin');
 
    // Set preferences
    await newsletterCheckbox.check();
    await offersCheckbox.check();

    const firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    const lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    const companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
    const addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    const countrySelect = page.getByLabel('Country');
    const stateInput = page.getByRole('textbox', { name: 'State *' });
    const cityInput = page.locator('[data-qa="city"]');
    const zipcodeInput = page.locator('[data-qa="zipcode"]');
    const mobileInput = page.locator('[data-qa="mobile_number"]');

    await firstNameInput.fill('Pipilota');
    await lastNameInput.fill('Transparansa');
    await companyInput.fill('Forrest');
    await addressInput.fill('Raynbow str.#0');
    await countrySelect.selectOption('India');
    await stateInput.fill('AAA');
    await cityInput.fill('Sofia');
    await zipcodeInput.fill('1000');
    await mobileInput.fill('35933344567');

    // Verify account information
    await expect(nameInput).toHaveValue(username);
    await expect(accountEmailInput).toHaveValue(uniqueEmail);
    await expect(accountEmailInput).toBeDisabled();
    await expect(passwordInput).toHaveValue(password);

    await expect(daysSelect).toHaveValue('19');
    await expect(monthsSelect).toHaveValue('10');
    await expect(yearsSelect).toHaveValue('2000');

    await expect(newsletterCheckbox).toBeChecked();
    await expect(offersCheckbox).toBeChecked();

    // Verify address information
    await expect(firstNameInput).toHaveValue('Pipilota');
    await expect(lastNameInput).toHaveValue('Transparansa');
    await expect(cityInput).toHaveValue('Sofia');
    await expect(zipcodeInput).toHaveValue('1000');

    // Next step: Create Account and verify successful registration
    // await page.getByRole('button', { name: 'Create Account' }).click();
  });
});
