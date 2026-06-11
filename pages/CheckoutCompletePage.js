export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completionHeader = page.locator('[data-test="complete-header"]');
    this.completionText = page.locator('[data-test="complete-text"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async getCompletionMessage() {
    return await this.completionText.textContent();
  }
}
