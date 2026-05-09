import { Page } from '@playwright/test'

export class CheckoutPage{
    private page: Page

    private cancelButton = '[data-test="cancel"]'

    //step one specific
    private firstName = '[data-test="firstName"]'
    private lastName = '[data-test="lastName"]'
    private postalCode = '[data-test="postalCode"]'
    private errorMessage = '[data-test="error"]'
    private continueButton = '[data-test="continue"]'
    
    //step two specific
    private itemTotalText = '[data-test="subtotal-label"]'
    private taxText = '[data-test="tax-label"]'
    private totalText = '[data-test="total-label"]'

    
    private finishButton = '[data-test="finish"]'
    private cartList = '[data-test="cart-list"]'
    private cartItem = '[data-test="inventory-item"]'

    //step complete specific
    private completeHeader = '[data-test="complete-header"]'
    private completeText = '[data-test="complete-text"]'
    private backHomeButton = '[data-test="back-to-products"]'

    constructor(page: Page){
        this.page = page
    }

    async proceedToCancel(){
        await this.page.click(this.cancelButton)
    }

    //----step one specific----

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(this.firstName, firstName)
        await this.page.fill(this.lastName, lastName)
        await this.page.fill(this.postalCode, postalCode)
    }

    async proceedToContinue() {
        await this.page.click(this.continueButton)
    }

    async getErrorMessage() {
        return this.page.locator(this.errorMessage)
    }


    //---step two specific----

    async clickFinish() {
        await this.page.click(this.finishButton)
    }

    async getCartItemCount(): Promise<number> {
        return await this.page.locator(this.cartItem).count();
    }

    async getItemTotal(): Promise<string> {
        return await this.page.locator(this.itemTotalText).textContent() || '';
    }
    
    async getTax(): Promise<string> {
        return await this.page.locator(this.taxText).textContent() || '';
    }
    
    async getTotal(): Promise<string> {
        return await this.page.locator(this.totalText).textContent() || '';
    }

    //---step complete specific----
    async isCompleteHeaderVisible(): Promise<boolean> {
        const badge = this.page.locator(this.completeHeader);
        return await badge.isVisible();
    }

    async isCompleteTextVisible(): Promise<boolean> {
        const badge = this.page.locator(this.completeText);
        return await badge.isVisible();
    }

    async getCompleteHeader(): Promise<string> {
        return await this.page.locator(this.completeHeader).textContent() || '';
    }

    async getCompleteText(): Promise<string> {
        return await this.page.locator(this.completeText).textContent() || '';
    }

    async clickBackHome() {
        await this.page.click(this.backHomeButton)
    }
}