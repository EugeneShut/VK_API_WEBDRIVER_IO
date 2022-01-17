import LoginPage from '../pageobjects/login.page'
import MainPage from '../pageobjects/main.page'
import * as chai from 'chai';
let expect = chai.expect;
import config from '../../config'
import VkApi from "../API/api";

describe('VK Test', () => {

    it('vk', async () => {
        await LoginPage.open()
        await LoginPage.login(config.credentials.login, config.credentials.password)
        await MainPage.open()
        const user_id = await VkApi.getUserId()


        let post_id = await VkApi.postRandomWallPost()
        let last_post = await MainPage.lastPostId(user_id, post_id)
        await expect(post_id).to.equal(last_post)

        let image = await VkApi.postImageToWall(user_id, config.image)
        await VkApi.editWallPost(post_id, image, config.defaultTestMessage)
        let post_message = await MainPage.getEditedPostMessage(user_id, post_id)
        await expect(config.defaultTestMessage).to.equal(await post_message.getText())
        await VkApi.addPostComment(post_id, config.defaultTestMessage)
        let comment_text = await MainPage.getPostComment(user_id, post_id)
        await expect(config.defaultTestMessage).to.equal(comment_text)

        await MainPage.wallPostLike(user_id, post_id)
        let post_like_id = await VkApi.getPostLikes(post_id)
        await expect(user_id).to.equal(post_like_id)

        await VkApi.deletePost(post_id)
        await expect(post_message).not.toBeDisplayed()
    });
});
