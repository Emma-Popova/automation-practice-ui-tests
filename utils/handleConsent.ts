import type { Page } from '@playwright/test';
export async function handleConsent(page: Page): Promise<void> {
    
  const consentButton = page.getByRole('button', {
    name: 'Consent',
  });

  try {
    await consentButton.waitFor({
      state: 'visible',
      timeout: 2000,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return;
    }

    throw error;
  }

  await consentButton.click();
}