import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Bug Reproduction Tests', () => {

  test('BUG-001: locked_out_user must show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    const errorLocator = await loginPage.getErrorMessage();
    const errorText = await errorLocator.textContent();
    console.log('Actual error message:', errorText);

    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Epic sadface');
  });

  test('INTENTIONAL FAIL: Show error log when test fail', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveTitle('Wrong Title That Will Fail');
  });

});