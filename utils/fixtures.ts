import { test as base, expect } from '@playwright/test';
import { handleConsent } from './handleConsent';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.context().route('**/*', async (route) => {
      const url = new URL(route.request().url());
      const hostname = url.hostname;

      const isAdRequest =
        hostname.endsWith('doubleclick.net') ||
        hostname.endsWith('googlesyndication.com') ||
        hostname.endsWith('googleadservices.com') ||
        (hostname === 'google.com' &&
          url.pathname.startsWith('/pagead/'));

      if (isAdRequest) {
        await route.abort();
      } else {
        await route.continue();
      }
    });

    await page.goto('/');
    await expect(page).toHaveURL('/');
    await handleConsent(page);

    await use(page);
  },
});

export { expect };