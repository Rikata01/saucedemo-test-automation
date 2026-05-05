import { test,expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test('login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

test('login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('wrong_user', 'wrong_pass')

    await expect(await loginPage.getErrorMessage()).toBeVisible()
})

test('login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('', '')

    await expect(await loginPage.getErrorMessage()).toBeVisible()
})