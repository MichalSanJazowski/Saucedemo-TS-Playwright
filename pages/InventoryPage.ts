import {Page, Locator, expect } from "@playwright/test";
import { BasePage } from './BasePage';


export class InventoryPage extends BasePage {

    private readonly productsLocator: Locator;
    private readonly cartBadge: Locator;
    private readonly productNames: Locator;
    private readonly sortDropdown: Locator;
    private readonly productPrices: Locator;
   


   
    
    constructor(page: Page){
        super(page);
        this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
        this.productsLocator = this.page.locator('[data-test="inventory-item"]');
        this.productNames = this.page.locator('[data-test="inventory-item-name"]');
        this.productPrices = this.page.locator('[data-test="inventory-item-price"]');
        this.sortDropdown = this.page.locator('[data-test="product-sort-container"]')
        
        
    }

    async openCart(): Promise<void>{
        await this.cartBadge.click();
    }
    
    async shouldHaveCartItemsCount(items: number): Promise<void>{
        await expect(this.cartBadge).toHaveText(items.toString());
        }
    async openProduct(productName:string): Promise<void>{
        const productNames =  this.productsLocator.filter({hasText: productName});
        await productNames.locator('[data-test="inventory-item-name"]').click()
    }

    async addProduct(productName:string): Promise<void>{
        const product =  this.productsLocator.filter({hasText: productName});
        await product.getByRole('button',{name: 'Add to cart'}).click();


}
async removeProduct(productName:string): Promise<void>{
        const product =  this.productsLocator.filter({hasText: productName});
        await product.getByRole('button',{name: 'Remove'}).click();


}
async shouldHaveHiddenCartBadge(): Promise<void>{
    await expect(this.cartBadge).toBeHidden()
}
async getProductNames(): Promise<string[]>{
    return await this.productNames.allTextContents();

}
async sortBy(option: string): Promise<void>{
    await this.sortDropdown.selectOption(option);
}
async getProductPrices(): Promise<number[]>{
    const prices =  await this.productPrices.allTextContents();
    return prices.map(price => Number(price.replace(`$`,``))
);
    
    
}

        }

            