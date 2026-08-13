import {test, expect} from '../fixtures/testFixtures.ts'
import { users } from '../data/users.ts';
import { products } from '../data/products.ts';

    
test.describe('Inventory tests', () => {

test.beforeEach( async({page, loginPage}) =>{
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
});

for(const product of Object.values(products)){
    test(`User can add ${product.name} to cart`, async({inventoryPage}) => {
        await inventoryPage.addProduct(product.name);
        await inventoryPage.shouldHaveCartItemsCount(1);
    });
}

test('user can remove all products', async({inventoryPage}) => {
    for(const product of Object.values(products)){
        await inventoryPage.addProduct(product.name);
    }
    await inventoryPage.shouldHaveCartItemsCount(Object.values(products).length);
    for(const product of Object.values(products)){
        await inventoryPage.removeProduct(product.name);        
    }
    await inventoryPage.shouldHaveHiddenCartBadge();
});

test('user can sort products by name from Z to A and then back to A to Z', async({inventoryPage}) =>{
    await inventoryPage.sortBy('za');
    const nameDescending = await inventoryPage.getProductNames();
    const expectedDescending = [...nameDescending].sort().reverse();
    expect(nameDescending).toEqual(expectedDescending);
    await inventoryPage.sortBy('az');
    const nameAscending = await inventoryPage.getProductNames();
    const expectedAscending = [...nameAscending].sort();
    expect(nameAscending).toEqual(expectedAscending);
    expect(nameDescending).not.toEqual(nameAscending);
    


});
test('user can sort products by price from High to Low and then back to Low to High', async({inventoryPage}) =>{
    await inventoryPage.sortBy('hilo');
    const priceDescending = await inventoryPage.getProductPrices();
    const expectedDescendingPrice = [...priceDescending].sort((a, b) => b - a);
    expect(priceDescending).toEqual(expectedDescendingPrice);
    await inventoryPage.sortBy('lohi');
    const priceAscending = await inventoryPage.getProductPrices();
    const expectedAscendingPrice = [...priceAscending].sort((a, b) => a - b);
    expect(priceAscending).toEqual(expectedAscendingPrice);
    expect(priceDescending).not.toEqual(priceAscending);
    


});
for (const product of Object.values(products)){
    test(`product details navigation for ${product.name} @smoke`, async({inventoryPage, productDetailPage, page}) =>{
        await inventoryPage.openProduct(product.name);
        await productDetailPage.shouldHaveName(product.name);
        await productDetailPage.shouldHaveDescription(product.description);
        await productDetailPage.shouldHavePrice(product.price);
        await productDetailPage.shouldShowImage();
        await productDetailPage.addToCart();
        await productDetailPage.shouldHaveCartItemsCount(1);
        await productDetailPage.backToProducts();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');



})};

});
