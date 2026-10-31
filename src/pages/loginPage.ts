import { Page ,expect } from '@playwright/test';
import { ENV } from '../../configs/env';

export class LoginPage {
    constructor(private readonly page: Page) {}

    private get clickonlogin() {
        return this.page.getByRole('link', { name: 'Login' }).first();
    }

    private get phoneinput() {
        return this.page.getByRole('spinbutton', { name: 'Phone Number' });
       
    }

    private get clickoncontainuebutton() {
        return this.page.getByRole('button', { name: 'Continue' });
    }

     private get otpMessage() {
        return this.page.getByText(/verification code we ve sent you on/i);
    }

     private get clickonverifybutton() {
        return this.page.getByRole('button', { name: 'Verify' });
    }

    /// Action method 
    async open() {
      await this.page.goto(ENV.baseUrl, {
       waitUntil: 'domcontentloaded',
      timeout: 120000
       });
     }
     //async open() {
        //await this.page.goto(ENV.baseUrl);
    //}

     async entermobilenumber(mobile: string) {
        await this.clickonlogin.click();
        await this.phoneinput.fill(mobile);
    }
     async Clickoncontainuebutton() {
        await this.clickoncontainuebutton.click();
    }

     
    async Clickonverifybutton() {
    // OTP manually add
    await this.page.waitForTimeout(60000);

    // OTP submit karne ke liye Continue click
    await this.clickonverifybutton.click();
   }

}
