import { Page } from '@playwright/test'
import { ProductName,ProductIDs } from './product/productData'
import { ProductDetailLocators } from './product/productData';

export class InventoryPage{
    private page: Page
    
    // private addToCartB_SLBP = '[data-test="add-to-cart-sauce-labs-backpack"]'
    // private addToCartB_SLBL = '[data-test="add-to-cart-sauce-labs-bike-light""]'
    // private addToCartB_SLBtS = '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
    // private addToCartB_SLFJ = '[data-test="add-to-cart-sauce-labs-fleece-jacket"]'
    // private addToCartB_SLO = '[data-test="add-to-cart-sauce-labs-onesie"]'
    // private addToCartB_TAlltS = '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'

    private cartBadge = '[data-test="shopping-cart-badge"]';
    private cartLink = '[data-test="shopping-cart-link"]';
    private inventoryItem = '[data-test="inventory-item"]';
    
    private backProducts = '[data-test="back-to-products"]';

    constructor(page: Page){
        this.page = page;
    }

    async goToProductDetail(item: ProductName) {
        const selector = ProductDetailLocators[item];
        await this.page.click(selector);
    }

    async addItemToCart(item: ProductName) {
        const selector = this.page.locator(`[data-test="add-to-cart-${ProductIDs[item]}"]`);
        await selector.click();
    }

    async removeItemFromCart(item: ProductName) {
        const locator = this.page.locator(`[data-test="remove-${ProductIDs[item]}"]`);
        await locator.click();
    }

    async isRemoveButtonVisible(item: ProductName): Promise<boolean> {
        const locator = this.page.locator(`[data-test="remove-${ProductIDs[item]}"]`);
        return await locator.isVisible();
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = this.page.locator(this.cartBadge);
        if (await badge.isVisible()) {
            const countText = await badge.textContent();
            return countText ? parseInt(countText, 10) : 0;
        }
        return 0;
    }

    async isCartBadgeVisible(): Promise<boolean> {
        const badge = this.page.locator(this.cartBadge);
        return await badge.isVisible();
    }

    async getCartBadge() {
        return this.page.locator(this.cartBadge);
    }

    async getCartIcon() {
        return this.page.locator(this.cartLink);
    }

    async getFirstInventoryItem() {
        return this.page.locator(this.inventoryItem).first();
    }

    async getInventoryItemImgs(): Promise<number> {
        return await this.page.evaluate((selector) => {
            const imgs = Array.from(document.querySelectorAll(`${selector} img`))
            return imgs.filter((img) => (img as HTMLImageElement).naturalWidth === 0).length
        }, this.inventoryItem);
    }

    async getDistortedImageCount(): Promise<number> {
      return await this.page.evaluate((selector) => {
        const imgs = Array.from(document.querySelectorAll(`${selector} img`))
        return imgs.filter((img) => {
          const el = img as HTMLImageElement
          if (el.naturalWidth === 0) return false // ยังไม่ load — ไม่นับ
        
          const naturalRatio = el.naturalWidth / el.naturalHeight
          const displayRatio = el.width / el.height
        
          return Math.abs(naturalRatio - displayRatio) > 0.05 // tolerance 10%
        }).length
      }, this.inventoryItem)
    }
    
    async goToCart() {
        await this.page.click(this.cartLink);
    }

    //inventory-item-PAGE
    async BackToInventory() {
        await this.page.click(this.backProducts);
    }
}