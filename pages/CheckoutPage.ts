import {Page, Locator, expect } from "@playwright/test";
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage{

private readonly firstNameInput: Locator;
private readonly lastNameInput: Locator;
private readonly postalCodeInput: Locator;
private readonly cancelButton: Locator;
private readonly continueButton: Locator;
private readonly errorMessage: Locator;

constructor(page:Page){
    super(page);
    this.firstNameInput = this.page.getByPlaceholder('First Name');
    this.lastNameInput = this.page.getByPlaceholder('Last Name');
    this.postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
    this.cancelButton = this.page.getByRole('button',{name:'Cancel'});
    this.continueButton = this.page.getByRole('button',{name:'Continue'});
    this.errorMessage = this.page.locator('[data-test="error"]')

}
async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
}

async fillLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
}

async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeInput.fill(postalCode);
}

async continueCheckout(): Promise<void> {
    await this.continueButton.click();
    
}
async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
}
async fillCustomerData(firstName: string, lastName: string, postalCode: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostalCode(postalCode);
}
async shouldShowError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
}

}