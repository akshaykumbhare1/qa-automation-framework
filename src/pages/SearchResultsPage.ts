import { Page, Locator, expect } from '@playwright/test';

export class SearchResultsPage {

  // ---------- LOCATORS ----------
  private readonly firstCheckbox: Locator;
  private readonly secondCheckbox: Locator;
  private readonly compareBtn: Locator;
  private readonly compareHeading: Locator;
  private readonly itemsCount: Locator;
  private readonly resultsMessage: Locator;
  private readonly tenthPhoneName: Locator;

  constructor(protected readonly page: Page) {
    // click on 10th phone checkbox
    this.firstCheckbox = page.locator("(//label[@class='BMOCJ3'])[10]");

    // click on 11th phone checkbox
    this.secondCheckbox = page.locator("(//label[@class='BMOCJ3'])[11]");

    // COMPARE button (tray)
    this.compareBtn = page
      .locator("a[href*='/compare']")
      .filter({ hasText: 'COMPARE' })
      .last();

    // Compare page: heading "Compare ... vs others"
    this.compareHeading = page.getByText(/vs others/i).first();

    // Compare page: "2 items" 
    this.itemsCount = page
      .getByText(/^\s*2 items\s*$/i)
      .locator('visible=true')
      .first();

    // Search results message
    this.resultsMessage = page.getByText(/results for/i).first();

    
    this.tenthPhoneName = page
      .locator("a[href*='/p/']")
      .filter({ hasText: /GB/ })
      .nth(9);
  }

  // ---------- ACTIONS ----------

  async verifyResultsMessage(keyword: string) {
    await expect(this.resultsMessage).toBeVisible();
    await expect(this.resultsMessage).toContainText(keyword);
  }

  async clickFirstCheckbox() {
    await expect(this.firstCheckbox).toBeVisible({ timeout: 15000 });
    await this.firstCheckbox.click({ timeout: 15000 });
  }

  async clickSecondCheckbox() {
    await expect(this.secondCheckbox).toBeVisible({ timeout: 15000 });
    await this.secondCheckbox.click({ timeout: 15000 });
  }

  async clickCompareButton() {
    await expect(this.compareBtn).toBeVisible({ timeout: 15000 });
    await this.compareBtn.click({ timeout: 15000 });
  }

  async verifyComparePage() {
    await expect(this.page).toHaveURL(/compare/i);
    await this.page.waitForLoadState('domcontentloaded');

    await expect(this.compareHeading).toBeVisible({ timeout: 15000 });
    await expect(this.itemsCount).toBeVisible({ timeout: 10000 });
  }

  
  async clickTenthPhoneName(): Promise<Page> {
    await expect(this.tenthPhoneName).toBeVisible({ timeout: 15000 });

    const [productTab] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 15000 }),
      this.tenthPhoneName.click({ timeout: 15000 }),
    ]);

    await productTab.waitForLoadState('domcontentloaded');
    return productTab;
  }
}