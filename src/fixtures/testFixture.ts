import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';
import { HomePage } from '@pages/HomePage';
import { SearchResultsPage } from '@pages/SearchResultsPage';
import { ProductPage } from '@pages/ProductPage';
import { CartPage } from '@pages/CartPage';

type Pages = {
    loginPage: LoginPage;
    homePage: HomePage;
    searchResultsPage: SearchResultsPage;
    // Product page naye tab mein khulta hai, isliye fixture ek function deta hai
    // jo us naye tab ke Page se ProductPage bana deta hai.
    productPageFor: (tab: Page) => ProductPage;
    // Cart page bhi usi product tab mein khulta hai, isliye same tareeka.
    cartPageFor: (tab: Page) => CartPage;
};

export const test = base.extend<Pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },

    productPageFor: async ({}, use) => {
        await use((tab: Page) => new ProductPage(tab));
    },

    cartPageFor: async ({}, use) => {
        await use((tab: Page) => new CartPage(tab));
    },
});

export { expect } from '@playwright/test';