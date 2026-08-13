import {test, expect} from '../fixtures/testFixtures.ts'
import { users } from '../data/users.ts';
import { products } from '../data/products.ts';

test.describe('Cart tests', () => {
    


test.beforeEach( async({page, loginPage}) =>{
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
});



test('user can delete 1 product from cart', async({inventoryPage, cartPage}) => {
    
    await inventoryPage.addProduct(products.labsBackpack.name);
    await inventoryPage.shouldHaveCartItemsCount(1);
    await inventoryPage.openCart();
    await cartPage.shouldContainProduct(products.labsBackpack.name);
    await cartPage.removeProduct(products.labsBackpack.name);
    await cartPage.shouldBeEmpty();


});

test('user can add and delete 2 products from cart @smoke', async({inventoryPage, cartPage}) => {
    await inventoryPage.addProduct(products.labsBackpack.name);
    await inventoryPage.addProduct(products.bikeLight.name);
    await inventoryPage.shouldHaveCartItemsCount(2);
    await inventoryPage.openCart();
    await cartPage.shouldContainProduct(products.labsBackpack.name);
    await cartPage.shouldContainProduct(products.bikeLight.name);
    await cartPage.removeProduct(products.labsBackpack.name);
    await cartPage.removeProduct(products.bikeLight.name);
    await cartPage.shouldBeEmpty();

});
    });
