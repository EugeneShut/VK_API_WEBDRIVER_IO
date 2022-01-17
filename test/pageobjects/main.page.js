import VkApi from "../API/api";
import logger from '@wdio/logger'
import config from '../../config'
import Element from "../../BASE/Element"


const log = logger(config.projectName)


class MainPage {

    lastPost = '#page_wall_posts > div'
    wpt = '#wpt'
    likeWall = "div.like_wrap._like_wall"
    post = '#post'
    postText = " > div > div.post_content > div > div.wall_text"
    updatedPostText = "> div.post_highlight_updated_content"
    main_page = "#l_pr"

    async getUserId() { // TODO: api
        let user_id
        return browser.call(() => {
            return VkApi.getUserId()
                .then(data => user_id = data)
                .catch(err => log.info(err))
        })
    }

    async wallRandomPost() { // TODO: api
        let post_id
        return browser.call(() => {
            return VkApi.postRandomWallPost()
                .then(data => post_id = data)
                .catch(err => log.info(err))
        })
    }

    async wallPostImage(user_id, image_path) { // TODO: api
        let image
        return browser.call(() => {
            return VkApi.postImageToWall(user_id, image_path)
                .then(data => image = data)
                .catch(err => log.info(err))
        })
    }

    async wallPostEdit(post_id, image="", message="") { // TODO: api
        return browser.call(() => {
            return VkApi.editWallPost(post_id, image, message)
                .then(data => post_id = data)
                .catch(err => log.info(err))
        })
    }

    async wallPostAddComment(post_id, message) { // TODO: api
        return browser.call(() => {
            return VkApi.addPostComment(post_id, message)
        })
    }

    async getPostLike(post_id) { // TODO: api
        return browser.call(() => {
            return VkApi.getPostLikes(post_id)
        })
    }

    async deleteWallPost(post_id) { // TODO: api
        return browser.call(() => {
            VkApi.deletePost(post_id)
        })

    }

    async getPostComment(user_id, post_id) {
        return await new Element(this.wpt + user_id + '_' + post_id).getText()
    }

    async wallPostLike(user_id, post_id) {
        return await new Element(this.likeWall + user_id + "_" + post_id + " > div > div > div").click()
    }

    async getEditedPostMessage(user_id, post_id) {
        await browser.waitUntil(
            async () => (await new Element(this.post + user_id +
                '_' + post_id + this.postText + this.updatedPostText).getText()), {timeout: config.defaultTimeoutTime})
        return new Element(this.post + user_id + '_' + post_id + this.postText)
    }

    async lastPostId(user_id, post_id) {
        await browser.waitUntil(
            async () => (await new Element(this.post + user_id + '_' + post_id).getText()),
            {timeout: config.defaultTimeoutTime})
        let posted_id = await new Element(this.lastPost).getAttribute("id")
        return posted_id.split("_")[1]
    }

    open() {
        return new Element(this.main_page).click()
    }
}

export default new MainPage();
