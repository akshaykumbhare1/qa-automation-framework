import { Page, Locator, expect } from '@playwright/test';

export class CartPage {

  constructor(protected readonly page: Page) {}

  async verifyCartPageOpened() {
    await expect(this.page).toHaveURL(/cart/i);
  }

  
  async verifyItemInCart(productName: string) {
    const shortName = productName.split('(')[0].trim();
    const item: Locator = this.page
      .getByText(shortName, { exact: false })
      .locator('visible=true')
      .first();
    await expect(item).toBeVisible({ timeout: 15000 });
  }
}