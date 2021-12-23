const Page = require('./page');


class MainPage extends Page {
    get lastPost() {
        return $('#page_wall_posts > div').getAttribute("id")
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
