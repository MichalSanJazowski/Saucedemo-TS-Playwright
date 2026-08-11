import {test, expect} from '../fixtures/testFixtures.ts'
import { users, customers } from '../data/users.ts';
import { products } from '../data/products.ts';


test.describe('Checkout test', () => {

test.beforeEach( async({page, loginPage}) =>{
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
});
test('Happy path -> Checkout to step two', async({inventoryPage, cartPage, checkoutPage, page}) =>{
    await test.step('Add product to cart ', async() => {
    await inventoryPage.addProduct(products.bikeLight.name);
    });
    await test.step('Open cart and proceed to checkout', async() => {
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
    });
    await test.step('Fill customer information', async() => {
    await checkoutPage.fillCustomerData(customers.first_user.firstname, customers.first_user.lastname, customers.first_user.postalcode);
    });
    await test.step('Continue to checkout overview', async() => {
    await checkoutPage.continueCheckout();
    });
    await test.step('Verify checkout overview', async() => {
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });



}


)}
);

