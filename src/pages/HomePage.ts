import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../../configs/env';

export class HomePage {

  // ---------- LOCATORS ----------
  private readonly loginCloseBtn: Locator;
  private readonly searchBox: Locator;

  constructor(protected readonly page: Page) {
    this.loginCloseBtn = page.getByRole('button', { name: '✕' });
    this.searchBox = page.locator("//input[@name='q' and not(@readonly)]");
  }

  // ---------- ACTIONS ----------

  // Flipkart open 
  async open() {
    await this.page.goto(ENV.baseUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
  }

  // Page load validate 
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(/flipkart\.com/);
    await expect(this.page.locator('body')).toBeVisible();
  }

  // Login popup close 
  async closeLoginPopup() {
    if (await this.loginCloseBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.loginCloseBtn.click();
    }
  }

  // Click onGlobal search box 
  async clickSearchBox() {
    await this.searchBox.click();
  }

  // Keyword search 
  async searchFor(keyword: string) {
    await this.searchBox.fill(keyword);
    await this.searchBox.press('Enter');
  }
}