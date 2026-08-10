import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';




export class ProductDetailPage extends BasePage {

    private readonly productName: Locator;
    private readonly productDescription: Locator;
    private readonly productPrice: Locator;
    private readonly productImage: Locator;
    private readonly backToProductsButton: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartBadge: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = this.page.locator('[data-test="inventory-item-name"]');
        this.productDescription = this.page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = this.page.locator('[data-test="inventory-item-price"]');
        this.productImage = this.page.locator('.inventory_details_img_container img')
        this.backToProductsButton = this.page.getByRole('button',{name:'Back to products'});
        this.addToCartButton = this.page.getByRole('button',{name:'Add to cart'});
        this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]')

    }

async shouldHaveName(name: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
}

async shouldHaveDescription(description: string): Promise<void> {
    await expect(this.productDescription).toHaveText(description);
}

async shouldHavePrice(price: number): Promise<void> {
    await expect(this.productPrice).toHaveText(`$${price}`);
}

async shouldShowImage(): Promise<void> {
    await expect(this.productImage).toBeVisible();
}
async shouldHaveCartItemsCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(count.toString());
}
async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
}

async addToCart(): Promise<void>{
    await this.addToCartButton.click()
}
};