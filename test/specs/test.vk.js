import LoginPage from '../pageobjects/login.page'
import MainPage from '../pageobjects/main.page'
import * as chai from 'chai';
let expectChai = chai.expect;
import config from '../../config'
import VkApi from "../API/api";
import helper from "../../helpers/helper";


describe('VK Test', () => {

    it('vk', async () => {
        await LoginPage.open()
        await LoginPage.login({"username": config.credentials.login, "password": config.credentials.password})
        await MainPage.open()
        const user_id = await VkApi.getUserId()

        let generated_text = helper.generate_string()
        let post_id = await VkApi.postWallPost(generated_text)
        let user_data = {"user_id": user_id, "post_id": post_id, "test_image": config.image, "message": config.defaultTestMessage}
        let last_post = await MainPage.lastPostId(user_data)
        let last_post_text = await MainPage.PostTextByUserId(user_data)
        await expectChai(last_post_text).to.equal(generated_text, "Post text is not equal to sent")
        await expectChai(post_id).to.equal(last_post, "returned post_id is not equal to the UI one")

        let image = await VkApi.postImageToWall(user_data)
        await VkApi.editWallPost(user_data, image)

        await MainPage.clickOnImageSaveAndClose(user_data)
        let resultOfImages = await helper.compare_two_images(config.image, config.iamgeToSave)
        await expectChai(resultOfImages).to.be.at.most(1)

        let post_message = await MainPage.getEditedPostMessage(user_data)
        await expectChai(config.defaultTestMessage).to.equal(await post_message.getText(),
            "returned post message is not equal to UI one")
        await VkApi.addPostComment(user_data)
        let comment_text = await MainPage.getPostComment(user_data)
        await expectChai(config.defaultTestMessage).to.equal(comment_text,
            "returned post comment message is not equal ti UI one")

        await MainPage.wallPostLike(user_data)
        let post_like_id = await VkApi.getPostLikes(user_data)
        await expectChai(user_data.user_id).to.equal(post_like_id, "post liked user id is not equal to expected")

        await VkApi.deletePost(user_data.post_id)
        await expectChai(post_message).not.toBeDisplayed() // todo: change
    });
});
