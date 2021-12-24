import VkApi from "../API/api";

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

    async wallPostEdit(post_id, image="") {
        return browser.call(() => {
            return VkApi.EditWallPost(post_id, image,"aqa: edited post")
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
    }

    async LastPostId(user_id, post_id) {
        await browser.waitUntil(
            async () => (await $('#post' + user_id + '_' + post_id).getText()), {timeout: 5000})
        let posted_id = await this.lastPost
        return posted_id.split("_")[1]
    }

    open() {
        return $('#l_pr').click();
    }
}

module.exports = new MainPage();
