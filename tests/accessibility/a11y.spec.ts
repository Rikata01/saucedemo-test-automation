import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('TC-A11Y-001 - Login page has no accessibility violations', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  if (results.violations.length > 0) {
    console.log('\n🚨 Violations on Login Page:');
    const cleanLogs = results.violations.map(v => ({ Rule_ID: v.id, Impact: v.impact, Elements: v.nodes.length }));
    console.table(cleanLogs);
  }
  expect(results.violations).toHaveLength(0);
});


test.describe('Accessibility Tests (WCAG AA) - SauceDemo After Log-in Pages', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC-A11Y-002 - Product listing page has no accessibility violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
      
    if (results.violations.length > 0) {
      console.log('\n🚨 Violations on Product Listing Page:');
      console.table(results.violations.map(v => ({ Rule_ID: v.id, Impact: v.impact, Elements: v.nodes.length })));
    }
    expect(results.violations).toHaveLength(0);
  });

  test('TC-A11Y-003 - Product detail page has no accessibility violations', async ({ page }) => {
    await inventoryPage.goToProductDetail('backpack');
    await expect(page).toHaveURL(/.*inventory-item.html/);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log('\n🚨 Violations on Product Detail Page:');
      console.table(results.violations.map(v => ({ Rule_ID: v.id, Impact: v.impact, Elements: v.nodes.length })));
    }
    expect(results.violations).toHaveLength(0);
  });

  test('TC-A11Y-004 - Cart page has no accessibility violations', async ({ page }) => {
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log('\n🚨 Violations on Cart Page:');
      console.table(results.violations.map(v => ({ Rule_ID: v.id, Impact: v.impact, Elements: v.nodes.length })));
    }
    expect(results.violations).toHaveLength(0);
  });

});