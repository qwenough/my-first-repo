export class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.totalPriceBox = page.locator('[data-test="total-label"]');
  }

  //метод для получения суммы без "$"
  async getTotalPrice() {
    const textPrice = await this.totalPriceBox.textContent();
    return Number(textPrice.split("$")[1].trim());
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
