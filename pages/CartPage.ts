import { Page } from '@playwright/test'
import { ProductName, ProductIDs } from './product/productData'
import { ProductDetailLocators } from './product/productData';

export class CartPage{
    private page: Page
    
    private cartList = '[data-test="cart-list"]'
    private cartItem = '[data-test="inventory-item"]'
    private cartCheckout = '[data-test="checkout"]'
    private cartGotoShop = '[data-test="continue-shopping"]'

    constructor(page: Page){
        this.page = page
    }

    async getCartItemCount(): Promise<number> {
        return await this.page.locator(this.cartItem).count();
    }

    async goToProductDetail(item: ProductName) {
        const selector = ProductDetailLocators[item];
        await this.page.click(selector);
    }

    async removeItem(item: ProductName) {
        const locator = this.page.locator(`[data-test="remove-${ProductIDs[item]}"]`);
        await locator.click();
    }

    async isRemoveButtonVisible(item: ProductName): Promise<boolean> {
        const locator = this.page.locator(`[data-test="remove-${ProductIDs[item]}"]`);
        return await locator.isVisible();
    }

    async proceedToCheckout(){
        await this.page.click(this.cartCheckout)
    }

    async proceedBackToShop(){
        await this.page.click(this.cartGotoShop)
    }

}