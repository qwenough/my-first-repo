import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('Покупка самого дорогого товара', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOne = new CheckoutStepOnePage(page);
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.title).toHaveText('Products');
    const addedItemName = await inventoryPage.addMostExpensiveItem();
    await inventoryPage.openCart();

    await expect(cartPage.cartItemNames).toHaveText([addedItemName]);  
    await cartPage.goToCheckout();

    await checkoutStepOne.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOne.confirmAndContinue();

    await checkoutStepTwo.finishCheckout();

    await expect(checkoutComplete.completionHeader).toHaveText('Thank you for your order!');
});