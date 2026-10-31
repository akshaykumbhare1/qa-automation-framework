import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
    path: path.resolve(
        __dirname,
        `./environments/${process.env.TEST_ENV || 'uat'}.env`
    )
});

export const ENV = {
    baseUrl: process.env.BASE_URL || '',
    username: process.env.FLIPKART_MOBILE || '',
    
    timeout: Number(process.env.TIMEOUT || 30000),
    environment: process.env.ENV || ''
};