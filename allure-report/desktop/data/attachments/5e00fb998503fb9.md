# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart.spec.ts >> Shopping Cart Tests >> TC-CART-003: Checkout with empty cart
- Location: tests\cart.spec.ts:50:7

# Error details

```
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /checkout-step-one.html/
Received string: "https://www.saucedemo.com/checkout-step-one.html"
Timeout: 5000ms

Call log:
  - Expect "not toHaveURL" with timeout 5000ms
    9 × unexpected value "https://www.saucedemo.com/checkout-step-one.html"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
      - generic [ref=e15]: "Checkout: Your Information"
    - generic [ref=e18]:
      - generic [ref=e19]:
        - textbox "First Name" [ref=e21]
        - textbox "Last Name" [ref=e23]
        - textbox "Zip/Postal Code" [ref=e25]
      - generic [ref=e27]:
        - button "Go back Cancel" [ref=e28] [cursor=pointer]:
          - img "Go back" [ref=e29]
          - text: Cancel
        - button "Continue" [ref=e30] [cursor=pointer]
  - contentinfo [ref=e31]:
    - list [ref=e32]:
      - listitem [ref=e33]:
        - link "Twitter" [ref=e34]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e35]:
        - link "Facebook" [ref=e36]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e37]:
        - link "LinkedIn" [ref=e38]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e39]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { InventoryPage } from '../pages/InventoryPage';
  4  | import { CartPage } from '../pages/CartPage';
  5  | 
  6  | test.describe('Shopping Cart Tests', () => {
  7  |   let loginPage: LoginPage;
  8  |   let inventoryPage: InventoryPage;
  9  |   let cartPage: CartPage;
  10 | 
  11 |   test.beforeEach(async ({ page }) => {
  12 |     loginPage = new LoginPage(page);
  13 |     inventoryPage = new InventoryPage(page);
  14 |     cartPage = new CartPage(page);
  15 | 
  16 |     // Precondition: Login ด้วย standard_user และอยู่ที่หน้า Inventory
  17 |     await loginPage.goto();
  18 |     await loginPage.login('standard_user', 'secret_sauce');
  19 |     await expect(page).toHaveURL(/inventory.html/);
  20 |   });
  21 | 
  22 |   test('TC-CART-001: Add multiple items to cart', async ({ page }) => {
  23 |     await inventoryPage.addItemToCart('backpack');
  24 |     await inventoryPage.addItemToCart('bikeLight');
  25 |     await inventoryPage.addItemToCart('boltTShirt');
  26 | 
  27 |     await expect(await inventoryPage.getCartBadgeCount()).toBe(3);
  28 | 
  29 |     await inventoryPage.goToCart();
  30 |     
  31 | 
  32 |     await expect(page).toHaveURL(/cart.html/);
  33 |     await expect(await cartPage.getCartItemCount()).toBe(3);
  34 |   });
  35 | 
  36 |   test('TC-CART-002: Remove item from cart', async ({ page }) => {
  37 |     await inventoryPage.addItemToCart('backpack');
  38 |     await inventoryPage.addItemToCart('bikeLight');
  39 |     
  40 |     await expect(await inventoryPage.getCartBadgeCount()).toBe(2);
  41 | 
  42 |     await inventoryPage.goToCart();
  43 |     await expect(page).toHaveURL(/cart.html/);
  44 | 
  45 |     await cartPage.removeItem('bikeLight');
  46 |     await expect(await cartPage.getCartItemCount()).toBe(1);
  47 |     await expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  48 |   });
  49 | 
  50 |   test('TC-CART-003: Checkout with empty cart', async ({ page }) => {
  51 | 
  52 |     await inventoryPage.goToCart();
  53 |     
  54 |     await expect(page).toHaveURL(/cart.html/);
  55 | 
  56 |     await cartPage.proceedToCheckout();
  57 | 
  58 |     // BUG-001: System should prevent checkout with empty cart
  59 |     // but currently redirects to checkout-step-one
> 60 |     await expect(page).not.toHaveURL(/checkout-step-one.html/);
     |                            ^ Error: expect(page).not.toHaveURL(expected) failed
  61 |   });
  62 | 
  63 |   test('TC-CART-004: Cart Persistence After Navigation', async ({ page }) => {
  64 | 
  65 |     await inventoryPage.addItemToCart('backpack');
  66 | 
  67 |     await inventoryPage.goToProductDetail('backpack');
  68 |     await expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  69 |     
  70 |     await inventoryPage.BackToInventory();
  71 |     await expect(page).toHaveURL(/inventory.html/);
  72 | 
  73 |     await expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  74 |     await expect(await inventoryPage.isRemoveButtonVisible('backpack')).toBe(true);
  75 | 
  76 |     // 4. ไปหน้าตะกร้าแล้วเช็คอีกรอบ
  77 |     await inventoryPage.goToCart();
  78 |     await expect(page).toHaveURL(/cart.html/);
  79 |     await expect(await cartPage.getCartItemCount()).toBe(1);
  80 |   });
  81 | 
  82 |   test('TC-CART-005: Add Items and Proceed to Checkout Successfully', async ({ page }) => {
  83 |     await inventoryPage.addItemToCart('backpack');
  84 |     await inventoryPage.addItemToCart('bikeLight');
  85 | 
  86 | 
  87 |     await expect(await inventoryPage.getCartBadgeCount()).toBe(2);
  88 | 
  89 |     await inventoryPage.goToCart();
  90 |     await expect(page).toHaveURL(/cart.html/);
  91 | 
  92 |     await expect(await cartPage.getCartItemCount()).toBe(2);
  93 | 
  94 |     await cartPage.proceedToCheckout();
  95 | 
  96 |     await expect(page).toHaveURL(/checkout-step-one.html/);
  97 |   });
  98 | });
```