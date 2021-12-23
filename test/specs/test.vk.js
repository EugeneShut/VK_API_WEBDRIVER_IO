const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
import VkApi from "../API/api";
const expectChai = require('chai').expect;


describe('VK Test', () => {
    let post_id
    it('vk', async () => {
        await LoginPage.open()
        await LoginPage.login('+375291660762', 'PuV6j_.2&$m9h?UYY') // TODO: HIDE CREDENTIALS
        await MainPage.open()
        await browser.call(() => {
            return VkApi.PostRandomWallPost()
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
        await console.log(post_id)
        await browser.pause(4000)
        let last_post = await MainPage.LastPostId()
        await expectChai(post_id).to.equal(last_post)

        let image
        await browser.call(() => {
            return VkApi.PostImageToWall("627657327", "images/image.png") // TODO: change userID and PATH
                .then(data => image = data)
                .catch(err => console.log(err))
        })


        await browser.call(() => {
            return VkApi.EditWallPost(post_id, image,"aqa: edited post")
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
        await browser.pause(4000)

    });
});
