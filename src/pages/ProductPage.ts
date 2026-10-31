import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {

  // ---------- LOCATORS ----------
  private readonly productTitle: Locator;
  private readonly cartIcon: Locator;      
  private readonly goToCartBtn: Locator;   

  constructor(protected readonly page: Page) {
    // 
    this.productTitle = page.locator('h1').first();

    // Add to cart: 
    
    this.cartIcon = page
      .locator("xpath=//div[contains(@style,'height: 44px') and contains(@style,'width: 44px') and contains(@style,'border-radius: 12px')]")
      .locator('visible=true')
      .first();

    // Go to cart: 
    this.goToCartBtn = page
      .locator("xpath=//*[name()='svg'][.//*[contains(@clip-path,'AddedToCart')]]")
      .locator('visible=true')
      .first();
  }

  // ---------- ACTIONS ----------

  async verifyProductPageOpened() {
    await expect(this.page).toHaveURL(/\/p\//i);
    await expect(this.cartIcon).toBeVisible({ timeout: 15000 });
  }

  // Product 
  async getProductName(): Promise<string> {
    await expect(this.productTitle).toBeVisible({ timeout: 15000 });
    return (await this.productTitle.innerText()).trim();
  }

  //Add to cart
  async clickAddToCart() {
    await expect(this.cartIcon).toBeVisible({ timeout: 15000 });
    await this.cartIcon.click({ timeout: 15000 });
  }

  
  async verifyButtonChangedToGoToCart() {
    await expect(this.goToCartBtn).toBeVisible({ timeout: 15000 });
  }

  // Go to cart 
  async clickGoToCart() {
    await this.goToCartBtn.click({ timeout: 15000 });
    await this.page.waitForURL(/cart/i, { timeout: 15000 });
  }
}