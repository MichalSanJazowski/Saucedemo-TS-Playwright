import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CheckoutPage } from '../pages/CheckoutPage';
export { expect } from '@playwright/test';

type AppFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    productDetailPage: ProductDetailPage; 
    checkoutPage: CheckoutPage; 

};
export const test = base.extend<AppFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage); 
    },
    productDetailPage: async ({ page }, use) => {
        const productDetailPage = new ProductDetailPage(page);
        await use(productDetailPage);  
     },
     checkoutPage: async ({page},use) =>{
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
     } 
        
});

