const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
const expectChai = require('chai').expect;
var config = require('../../config')

describe('VK Test', () => {

    it('vk', async () => {
        await LoginPage.open()
        await LoginPage.login(config.credentials.login, config.credentials.password) // TODO: HIDE CREDENTIALS
        await MainPage.open()
        const user_id = await MainPage.GetUserId()


        let post_id = await MainPage.wallRandomPost()
        let last_post = await MainPage.LastPostId(user_id, post_id)
        await expectChai(post_id).to.equal(last_post)

        let image = await MainPage.wallPostImage(user_id, config.image)
        await MainPage.wallPostEdit(post_id, image, config.defaultTestMessage)
        let post_message = await MainPage.getEditedPostMessage(user_id, post_id)
        await expectChai(config.defaultTestMessage).to.equal(post_message)
        await MainPage.wallPostAddComment(post_id, config.defaultTestMessage)
        let comment_text = await MainPage.getPostComment(user_id, post_id)
        await expectChai(config.defaultTestMessage).to.equal(comment_text)

        await browser.pause(4000) // TODO: remove
    });
});
