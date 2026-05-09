import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);
    
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('TC-CHK-001: Valid Checkout Information', async ({ page }) => {
    await checkoutPage.fillCheckoutForm('John', 'Doe', '10110');
    
    await checkoutPage.proceedToContinue();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    
    const totalLabel = await checkoutPage.getTotal();
    expect(totalLabel).toContain('Total:');
  });

  test('TC-CHK-002: Empty First Name Field', async ({ page }) => {
    await checkoutPage.fillCheckoutForm('', 'Doe', '10110');
    
    await checkoutPage.proceedToContinue();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    const errorMsg = await checkoutPage.getErrorMessage();
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Error: First Name is required');
    
  });

  test('TC-CHK-003: Special Characters in Form Fields', async ({ page }) => {
    const specialFirstName = '@#$%!';
    const xssLastName = '<<test>>';
    const specialZip = '!!@@##';

    await checkoutPage.fillCheckoutForm(specialFirstName, xssLastName, specialZip);
    await checkoutPage.proceedToContinue();

    await expect(page).toHaveURL(/checkout-step-two.html/);
    

    // const summaryInfo = page.locator('.summary_info');
    // await expect(summaryInfo).toContainText(specialFirstName);

    const totalLabel = await checkoutPage.getTotal();
    expect(totalLabel).toContain('Total:');
  });
});