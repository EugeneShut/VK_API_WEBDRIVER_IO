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
