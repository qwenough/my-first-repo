export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItemsList = page.locator('[data-test="inventory-item"]');
    this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
