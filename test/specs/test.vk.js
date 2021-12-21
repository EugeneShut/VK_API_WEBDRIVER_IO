const LoginPage = require('../pageobjects/login.page');


describe('VK Test', () => {
    it('vk', async () => {
        await LoginPage.open();
        await browser.pause(2000)
        await LoginPage.login('+375291660762', 'PuV6j_.2&$m9h?UYY');
        await browser.pause(10000)
        //await expect(SecurePage.flashAlert).toBeExisting();
        //await expect(SecurePage.flashAlert).toHaveTextContaining(
        //    'You logged into a secure area!');
    });
});
