import { expect, test } from '@playwright/test';

test('should display welcome message without browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/');

  await expect(page.locator('.highlight-card span')).toHaveText('angularTemplate app is running!');
  expect(errors).toEqual([]);
});

test('should show the command for the selected next step', async ({ page }) => {
  await page.goto('/');
  const terminal = page.locator('.terminal pre');
  await expect(terminal).toHaveText('ng generate component xyz');

  await page.getByText('Angular Material').click();
  await expect(terminal).toHaveText('ng add @angular/material');

  await page.locator('.card', { hasText: 'Build for Production' }).focus();
  await page.keyboard.press('Enter');
  await expect(terminal).toHaveText('ng build');
});
