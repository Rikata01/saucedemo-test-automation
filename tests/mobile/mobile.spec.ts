import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'

//  Constants ───

const CREDENTIALS = {
  username: 'standard_user',
  password: 'secret_sauce',
}

const URLS = {
  login: 'https://www.saucedemo.com/',
  inventory: 'https://www.saucedemo.com/inventory.html',
  cart: 'https://www.saucedemo.com/cart.html',
}

//  Helpers ───

async function loginAs(page: Page, username = CREDENTIALS.username, password = CREDENTIALS.password) {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(username, password)
}

//  TC-M01 ───

test('TC-M01: Login successful on mobile', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)

  await loginPage.goto()
  await loginPage.login(CREDENTIALS.username, CREDENTIALS.password)

  // Expected: redirects to inventory page
  await expect(page).toHaveURL(URLS.inventory)

  // Products should be visible
  const firstItem = await inventoryPage.getFirstInventoryItem()
  await expect(firstItem).toBeVisible()
})

//  TC-M02 ───

test('TC-M02: Important elements can be seen in the mobile viewport', async ({ page }) => {
  const inventoryPage = new InventoryPage(page)

  await loginAs(page)
  await expect(page).toHaveURL(URLS.inventory)

  // 1. App logo visible
  const appLogo = page.locator('.app_logo')
  await expect(appLogo).toBeVisible()

  // 2. Hamburger menu visible
  const hamburgerMenu = page.locator('#react-burger-menu-btn')
  await expect(hamburgerMenu).toBeVisible()

  // 3. Cart icon visible
  const cartIcon = await inventoryPage.getCartIcon()
  await expect(cartIcon).toBeVisible()

  // 4. No horizontal scrollbar (scrollWidth should not exceed clientWidth)
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth
  })
  await expect(hasHorizontalScroll).toBe(false)
})

//  TC-M03 ───

test('TC-M03: Added to cart, badge updated', async ({ page }) => {
  await loginAs(page)
  await expect(page).toHaveURL(URLS.inventory)

  const inventoryPage = new InventoryPage(page)

  // Precondition: cart is empty — badge should not be visible
  expect(await inventoryPage.isCartBadgeVisible()).toBe(false)

  // Step 1: Add Sauce Labs Backpack
  await inventoryPage.addItemToCart('backpack')

  // Expected: badge appears and shows '1'
  const badge = await inventoryPage.getCartBadge()
  await expect(badge).toBeVisible()
  await expect(badge).toHaveText('1')

  // Postcondition: verify cart page has 1 item
  await inventoryPage.goToCart()
  await expect(page).toHaveURL(URLS.cart)

  const cartPage = new CartPage(page)
  const itemCount = await cartPage.getCartItemCount()
  expect(itemCount).toBe(1)
})

//  TC-M04 ───

test('TC-M04: Hamburger menu can be turned on/off', async ({ page }) => {
  await loginAs(page)
  await expect(page).toHaveURL(URLS.inventory)

  const hamburgerBtn = page.locator('#react-burger-menu-btn')
  const closeBtn = page.locator('#react-burger-cross-btn')
  const menuWrapper = page.locator('.bm-menu-wrap')

  // Step 1: Open menu
  await hamburgerBtn.tap()

  // Menu should overlay screen
  await expect(menuWrapper).toBeVisible()

  // Step 2: Verify all menu options visible
  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible()  // All Items
  await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible()      // About
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible()     // Logout
  await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible()      // Reset App State

  // Step 3: Close menu
  await closeBtn.tap()

  // Menu should be hidden
  await expect(menuWrapper).toHaveAttribute('aria-hidden', 'true')

  // User remains on inventory page
  await expect(page).toHaveURL(URLS.inventory)
})

//  TC-M05 ───

test('TC-M05: Rotating screen from Portrait to Landscape does not break layout', async ({ page }) => {
  // Playwright doesn't rotate device; simulate by resizing viewport
  // Portrait: 390x844 (iPhone 12), Landscape: 844x390

  await loginAs(page)
  await expect(page).toHaveURL(URLS.inventory)

  const inventoryPage = new InventoryPage(page)

  // Step 1: Confirm portrait layout — first product card visible
  const firstItem = await inventoryPage.getFirstInventoryItem()
  await expect(firstItem).toBeVisible()

  // Step 2: Switch to Landscape (swap width/height)
  await page.setViewportSize({ width: 844, height: 390 })

  // Step 3: Verify layout is intact — key elements still visible
  await expect(firstItem).toBeVisible()

  const appLogo = page.locator('.app_logo')
  await expect(appLogo).toBeVisible()

  const cartIcon = await inventoryPage.getCartIcon();
  await expect(cartIcon).toBeVisible()

  // No horizontal scrollbar in landscape either
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth
  })
  expect(hasHorizontalScroll).toBe(false)

  // Check product images are rendered (not broken) via POM
  await page.waitForFunction(() => {
    const imgs = Array.from(document.querySelectorAll('.inventory_item img'))
    return imgs.every((img) => (img as HTMLImageElement).naturalWidth > 0)
  })

  const brokenImageCount = await inventoryPage.getInventoryItemImgs()
  expect(brokenImageCount).toBe(0)

  const distortedCount = await inventoryPage.getDistortedImageCount()
  expect(distortedCount).toBe(0)
})

//  TC-M06 ───

test('TC-M06: Slow 3G Network — page is still usable', async ({ page, context, browserName }) => {
  // Simulate Slow 3G: ~400kbps down, ~400kbps up, 200ms latency
  test.skip(browserName === 'webkit', 'CDP not supported on WebKit/Safari')

  const cdpSession = await context.newCDPSession(page)
  await cdpSession.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: (400 * 1024) / 8, // 400 kbps in bytes/s
    uploadThroughput: (400 * 1024) / 8,
    latency: 200,
  })

  const loginPage = new LoginPage(page)
  const inventoryPage = new InventoryPage(page)
  const cartPage = new CartPage(page)

  // Step 1-3: Login (extend timeout for slow network)
  await loginPage.goto()
  await loginPage.login(CREDENTIALS.username, CREDENTIALS.password)
  await expect(page).toHaveURL(URLS.inventory, { timeout: 30_000 })

  // Verify products load despite slow network
  const firstItem = await inventoryPage.getFirstInventoryItem()
  await expect(firstItem).toBeVisible({ timeout: 30_000 })

  // Step 4: Add Sauce Labs Backpack to cart
  await inventoryPage.addItemToCart('backpack')

  const badge = await inventoryPage.getCartBadge()
  await expect(badge).toHaveText('1', { timeout: 15_000 })

  // Step 5: Go to cart
  await inventoryPage.goToCart()
  await expect(page).toHaveURL(URLS.cart, { timeout: 30_000 })

  // Cart should load with 1 item and UI must not break
  const itemCount = await cartPage.getCartItemCount()
  expect(itemCount).toBe(1)

  // Checkout button must still be present
  await expect(page.locator('[data-test="checkout"]')).toBeVisible({ timeout: 15_000 })

  // Disable throttle after test
  await cdpSession.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: -1,
    uploadThroughput: -1,
    latency: 0,
  })
})