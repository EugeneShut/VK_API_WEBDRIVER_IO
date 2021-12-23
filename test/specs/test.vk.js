const LoginPage = require('../pageobjects/login.page');
const MainPage = require('../pageobjects/main.page');
import VkApi from "../API/api";
const expectChai = require('chai').expect;



describe('VK Test', () => {
    it('vk', async () => {
        // await LoginPage.open();
        // await LoginPage.login('+375291660762', 'PuV6j_.2&$m9h?UYY');
        // await MainPage.open()
        let post_id;
        // await browser.call(() => {
        //     return VkApi.PostRandomWallPost()
        //         .then(data => post_id = data)
        //         .catch(err => console.log(err))
        // })
        // await console.log(post_id);
        // await browser.pause(4000)
        // let posted_id = await MainPage.LastPostId()
        // await expectChai(post_id).to.equal(posted_id)
        // await browser.call(() => {
        //     return VkApi.EditWallPost(post_id, "","edited post")
        //         .then(data => post_id = data)
        //         .catch(err => console.log(err))
        // })
        // await browser.pause(4000)
        let push_data = "________________________________";
        await browser.call(() => {
            return VkApi.UploadImage("images/image.png")
                .then(data => push_data = data)
                .catch(err => console.log(err))
        })
        console.log(push_data)

        // let link;
        // await browser.call(() => {
        //     return VkApi.SaveImage("457245425", push_data)
        //         .then(data => link = data)
        //         .catch(err => console.log(err))
        // })
        // // "457245425"
        // console.log(link)

    });
});
