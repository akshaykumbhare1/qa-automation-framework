import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { SearchResultsPage } from '../../src/pages/SearchResultsPage';

test('Flipkart - verify search results message', async ({ page }) => {
  const homePage = new HomePage(page);
  const results = new SearchResultsPage(page);

  await homePage.open();
  await homePage.closeLoginPopup();
  await homePage.clickSearchBox();
  await homePage.searchFor('mobile');

  // mobile search ke baad yaha verify hoga
  await results.verifyResultsMessage('mobile');
});