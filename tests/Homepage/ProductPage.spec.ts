import { test } from '@fixtures/testFixture';

test('Flipkart - add 10th phone to cart, verify button and cart item',
  async ({ homePage, searchResultsPage, productPageFor, cartPageFor }) => {
    test.setTimeout(90000);

    await homePage.open();
    await homePage.closeLoginPopup();
    await homePage.clickSearchBox();
    await homePage.searchFor('mobile');
    await searchResultsPage.verifyResultsMessage('mobile');

    
    const productTab = await searchResultsPage.clickTenthPhoneName();
    const productPage = productPageFor(productTab);

    await productPage.verifyProductPageOpened();
    const productName = await productPage.getProductName();

    // Add to cart 
    await productPage.clickAddToCart();
    await productPage.verifyButtonChangedToGoToCart();

    // Go to cart
    await productPage.clickGoToCart();
    const cartPage = cartPageFor(productTab);
    await cartPage.verifyCartPageOpened();
    await cartPage.verifyItemInCart(productName);
  });