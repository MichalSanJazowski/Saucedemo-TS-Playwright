import { test, expect } from '../fixtures/testFixtures';
import { users } from '../data/users';

test.describe('Login tests', () => {

    test('user can log in with valid credentials', async ({ page, loginPage }) => {

        await test.step('Open login page', async () => {
            await loginPage.open();
        });

        await test.step('Log in with valid credentials', async () => {
            await loginPage.login(
                users.standard.username,
                users.standard.password
            );
        });

        await test.step('Verify successful login', async () => {
            await expect(page).toHaveURL(
                'https://www.saucedemo.com/inventory.html'
            );
        });
    });

    test('user cannot log in with incorrect password', async ({ page, loginPage }) => {

        await test.step('Open login page', async () => {
            await loginPage.open();
        });

        await test.step('Log in with incorrect password', async () => {
            await loginPage.login(
                users.invalidPassword.username,
                users.invalidPassword.password
            );
        });

        await test.step('Verify login error', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/');

            await loginPage.shouldShowError(
                'Epic sadface: Username and password do not match any user in this service'
            );
        });
    });

});