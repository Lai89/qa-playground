import { test, expect } from '@playwright/test';

test('verificar pagina oficial de Playwright', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});