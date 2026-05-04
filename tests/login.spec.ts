import { test,expect } from '@playwright/test'

test('login with valid credentials', async ({ page }) => {
    
    await page.goto('https://www.saucedemo.com')
    
    await page.fill('#user-name', 'wrong_user')
    
    await page.fill('#password', 'wrong_sauce')

    await page.click('#login-button')

    await expect(page.locator('[data-test="error"]')).toBeVisible()

    // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})