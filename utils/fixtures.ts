import { test as base, expect } from '@playwright/test';
import { handleConsent } from './handleConsent';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await handleConsent(page);

    await use(page);
  },
});

export { expect };
