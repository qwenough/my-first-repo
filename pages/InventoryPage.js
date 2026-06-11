export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItemList = page.locator('[data-test="inventory-item"]');
    this.addToCartButtonList = page.locator('[data-test="inventory-item"] .btn_inventory');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addItemToCart(itemName) {
    const targetItem = this.inventoryItemList.filter({ hasText: itemName });
    await targetItem.locator(".btn_inventory").click();
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async getPageTitle() {
    return await this.title.textContent();
  }

  async addMostExpensiveItem() {
    await this.sortDropdown.selectOption("hilo");
    const firstItem = this.inventoryItemList.first();
    const itemName = await firstItem.locator('[data-test="inventory-item-name"]').textContent();

    await firstItem.locator(".btn_inventory").click();

    return itemName;
  }
}
