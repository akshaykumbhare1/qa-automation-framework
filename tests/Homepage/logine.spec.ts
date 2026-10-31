import { test, expect } from '@fixtures/testFixture';
import { ENV } from '@configs/env';
import { LoginPage } from '@pages/LoginPage';



test.describe('Flipkart Login', () => {

    test('User should get OTP message on valid mobile number', async ({ loginPage }) => {
      test.setTimeout(120000); // 3 minutes total timeout
        await test.step('Open Flipkart', async () => {
            await loginPage.open();
        });

        await test.step('Click Login and enter mobile number', async () => {
            await loginPage.entermobilenumber(ENV.username);
        });

        await test.step('Click Continue', async () => {
            await loginPage.Clickoncontainuebutton();
        });
        await test.step('Verify OTP message is displayed', async () => {
            await loginPage.Clickonverifybutton();
        });
    });

});






