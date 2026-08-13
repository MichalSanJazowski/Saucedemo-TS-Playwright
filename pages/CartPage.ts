import {Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {
    
    private readonly cartBadge: Locator;
    private readonly checkoutButton: Locator;  

    constructor (page: Page){
        super(page);        

        this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
               
    }   
    
    async removeProduct(productName:string): Promise<void>{
        const product =  this.page.locator('[data-test="inventory-item"]').filter({hasText: productName});
        await product.getByRole('button',{name: 'Remove'}).click();
    }
    async shouldBeEmpty(): Promise<void>{
        await expect(this.cartBadge).toBeHidden();
    }
    async shouldContainProduct(name: string): Promise<void>{
        await expect(this.page.getByText(name)).toBeVisible();
    }
    async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
}
}