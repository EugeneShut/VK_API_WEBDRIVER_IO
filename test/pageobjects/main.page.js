import VkApi from "../API/api";

const Page = require('./page');


class MainPage extends Page {
    get lastPost() {
        return $('#page_wall_posts > div').getAttribute("id")
    }

    async wallRandomPost() {
        let post_id
        return await browser.call(() => {
            return VkApi.PostRandomWallPost()
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
    }

    async wallPostImage(user_id, image_path) {
        let image
        return await browser.call(() => {
            return VkApi.PostImageToWall(user_id, image_path) // TODO: change userID and PATH
                .then(data => image = data)
                .catch(err => console.log(err))
        })
    }

    async wallPostEdit(post_id, image="") {
        return await browser.call(() => {
            return VkApi.EditWallPost(post_id, image,"aqa: edited post")
                .then(data => post_id = data)
                .catch(err => console.log(err))
        })
    }

    async LastPostId() {
        let posted_id = await this.lastPost
        return posted_id.split("_")[1]
    }

    open() {
        return $('#l_pr').click();
    }
}

module.exports = new MainPage();
