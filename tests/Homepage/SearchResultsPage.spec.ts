import { test } from '@fixtures/testFixture';

test('Flipkart - search results: verify message and compare phones', async ({ homePage, searchResultsPage }) => {
  test.setTimeout(60000);

  await homePage.open();
  await homePage.closeLoginPopup();
  await homePage.clickSearchBox();
  await homePage.searchFor('mobile');

  await searchResultsPage.verifyResultsMessage('mobile');

  await searchResultsPage.clickFirstCheckbox();    // 10th phone
  await searchResultsPage.clickSecondCheckbox();   // 11th phone
  await searchResultsPage.clickCompareButton();    // COMPARE button

  await searchResultsPage.verifyComparePage();
});