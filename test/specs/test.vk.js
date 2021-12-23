const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
import VkApi from "../API/api";




describe('VK Test', () => {
    it('vk', async () => {
        await LoginPage.open();
        await browser.pause(2000)
        await LoginPage.login('+375291660762', 'PuV6j_.2&$m9h?UYY');
        await browser.pause(2000)
        await MainPage.open()
        await browser.pause(2000)
        let response;
        await browser.call(() => {
            return VkApi.PostRandomWallMessage()
                .then(data => response = data)
                .catch(err => console.log(err))
        })
        await console.log(response);
        await browser.pause(4000)

    });
});
