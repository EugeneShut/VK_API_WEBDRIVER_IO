import config from '../../config'
import Element from "../../BASE/Element"


class MainPage {

    lastPost = '#page_wall_posts > div'
    wpt = '#wpt'
    likeWall = "div.like_wrap._like_wall"
    wallPostText = "div.wall_post_text"
    post = '#post'
    postText = " > div > div.post_content > div > div.wall_text"
    updatedPostText = "> div.post_highlight_updated_content"
    main_page = "#l_pr"

    async getPostComment(data) {
        return await new Element(`${this.wpt}${data.user_id}_${data.post_id}`).getText()
    }

    async wallPostLike(data) {
        return await new Element(`${this.likeWall}${data.user_id}_${data.post_id} > div > div > div`).click()
    }

    async getEditedPostMessage(data) {
        await browser.waitUntil(
            async () => (await new Element
            (`${this.post}${data.user_id}_${data.post_id}${this.postText}${this.updatedPostText}`).getText()),
            {timeout: config.defaultTimeoutTime})
        return new Element(`${this.post}${data.user_id}_${data.post_id}${this.postText}`)
    }

    async lastPostId(data) {
        await browser.waitUntil(
            async () => (await new Element(`${this.post}${data.user_id}_${data.post_id}`).getText()),
            {timeout: config.defaultTimeoutTime})
        let posted_id = await new Element(this.lastPost).getAttribute("id")
        return posted_id.split("_")[1]
    }

    async PostTextByUserId(data) {
        return await browser.waitUntil(
            async () => (await new Element(`${this.wpt}${data.user_id}_${data.post_id} > ${this.wallPostText}`).getText()),
            {timeout: config.defaultTimeoutTime})
    }

    open() {
        return new Element(this.main_page).click()
    }
}

export default new MainPage();
