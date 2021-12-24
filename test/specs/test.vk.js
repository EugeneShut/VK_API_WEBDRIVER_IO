const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const expectChai = require('chai').expect;


describe('VK Test', () => {

    it('vk', async () => {
        await LoginPage.open()
        await LoginPage.login('+375291660762', 'PuV6j_.2&$m9h?UYY') // TODO: HIDE CREDENTIALS
        await MainPage.open()
        const user_id = await MainPage.GetUserId()


        let post_id = await MainPage.wallRandomPost()
        let last_post = await MainPage.LastPostId(user_id, post_id)
        await expectChai(post_id).to.equal(last_post)

        let image = await MainPage.wallPostImage(user_id, "images/image.png")
        await MainPage.wallPostEdit(post_id, image)

        await browser.pause(4000) // TODO: remove

    });
});
