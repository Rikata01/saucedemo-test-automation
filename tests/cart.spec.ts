import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Precondition: Login ด้วย standard_user และอยู่ที่หน้า Inventory
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC-CART-001: Add multiple items to cart', async ({ page }) => {
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.addItemToCart('bikeLight');
    await inventoryPage.addItemToCart('boltTShirt');

    await expect(await inventoryPage.getCartBadgeCount()).toBe(3);

    await inventoryPage.goToCart();
    

    await expect(page).toHaveURL(/cart.html/);
    await expect(await cartPage.getCartItemCount()).toBe(3);
  });

  test('TC-CART-002: Remove item from cart', async ({ page }) => {
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.addItemToCart('bikeLight');
    
    await expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    await cartPage.removeItem('bikeLight');
    await expect(await cartPage.getCartItemCount()).toBe(1);
    await expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });

  test('TC-CART-003: Checkout with empty cart', async ({ page }) => {

    await inventoryPage.goToCart();
    
    await expect(page).toHaveURL(/cart.html/);

    await cartPage.proceedToCheckout();

    // BUG-001: System should prevent checkout with empty cart
    // but currently redirects to checkout-step-one
    await expect(page).not.toHaveURL(/checkout-step-one.html/);
  });

  test('TC-CART-004: Cart Persistence After Navigation', async ({ page }) => {

    await inventoryPage.addItemToCart('backpack');

    await inventoryPage.goToProductDetail('backpack');
    await expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    
    await inventoryPage.BackToInventory();
    await expect(page).toHaveURL(/inventory.html/);

    await expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    await expect(await inventoryPage.isRemoveButtonVisible('backpack')).toBe(true);

    // 4. ไปหน้าตะกร้าแล้วเช็คอีกรอบ
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);
    await expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('TC-CART-005: Add Items and Proceed to Checkout Successfully', async ({ page }) => {
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.addItemToCart('bikeLight');


    await expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);

    await expect(await cartPage.getCartItemCount()).toBe(2);

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);
  });
});