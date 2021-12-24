import VkApi from "../API/api";
var config = require('../../config')

const Page = require('./page');


class MainPage extends Page {
    get lastPost() {
        return $('#page_wall_posts > div').getAttribute("id")
    }

    async GetUserId() {
        let user_id
        return browser.call(() => {
            return VkApi.GetUserId()
                .then(data => user_id = data)
                .catch(err => console.log(err))
        })
    }

    async wallRandomPost() {
        let post_id
        return browser.call(() => {
            return VkApi.PostRandomWallPost()
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
    }

    async wallPostImage(user_id, image_path) {
        let image
        return browser.call(() => {
            return VkApi.PostImageToWall(user_id, image_path) // TODO: change userID and PATH
                .then(data => image = data)
                .catch(err => console.log(err))
        })
    }

    async wallPostEdit(post_id, image="", message="") {
        return browser.call(() => {
            return VkApi.EditWallPost(post_id, image, message)
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
    }

    async wallPostAddComment(post_id, message) {
        return browser.call(() => {
            return VkApi.AddPostComment(post_id, message)
        })
    }

    async getPostComment(user_id, post_id) {
        return $('#wpt' + user_id + '_' + post_id).getText()
    }

    async openComments() {

    }

    //post_highlight_updated_content
    async getEditedPostMessage(user_id, post_id) { // TODO: edit
        await browser.waitUntil(
            async () => (await $('#post' + user_id + '_' + post_id + " > div > div.post_content > div > div.wall_text > div.post_highlight_updated_content").getText()), {timeout: config.defaultTimeoutTime})
        return $('#post' + user_id + '_' + post_id + " > div > div.post_content > div > div.wall_text").getText()
    }

    async LastPostId(user_id, post_id) {
        await browser.waitUntil(
            async () => (await $('#post' + user_id + '_' + post_id).getText()), {timeout: config.defaultTimeoutTime})
        let posted_id = await this.lastPost
        return posted_id.split("_")[1]
    }

    open() {
        return $('#l_pr').click();
    }
}

module.exports = new MainPage();
