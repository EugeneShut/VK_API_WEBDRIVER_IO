const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
import VkApi from "../API/api";
const expectChai = require('chai').expect;



describe('VK Test', () => {
    it('vk', async () => {
        await LoginPage.open();
        await browser.pause(2000)
        await LoginPage.login('+375291660762', 'PuV6j_.2&$m9h?UYY');
        await browser.pause(2000)
        await MainPage.open()
        await browser.pause(2000)
        let post_id;
        await browser.call(() => {
            return VkApi.PostRandomWallMessage()
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
        await console.log(post_id);
        await browser.pause(4000)
        let posted_id = await MainPage.LastPostId()
        await expectChai(post_id).to.equal(posted_id)

    });
});
