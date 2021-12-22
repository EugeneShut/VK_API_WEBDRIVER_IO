const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');



describe('VK Test', () => {
    it('vk', async () => {
        const z = await MainPage.post_random_message();
        console.log("\n\n\n" + z + "\n\n\n")
        await LoginPage.open();
        await browser.pause(2000)
        await LoginPage.login('+375291660762', 'PuV6j_.2&$m9h?UYY');
        await browser.pause(2000)
        await MainPage.open()
        await browser.pause(2000)
        let x = await MainPage.post_random_message;
        console.log("\n\n\n" + x + "\n\n\n")
        await browser.pause(4000)

    });
});
