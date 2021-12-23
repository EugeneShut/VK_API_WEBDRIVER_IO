const Page = require('./page');


class MainPage extends Page {
    open() {
        return $('#l_pr').click();
    }
}

module.exports = new MainPage();
