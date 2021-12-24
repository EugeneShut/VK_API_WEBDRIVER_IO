const Page = require('./page');

class LoginPage extends Page {
    get inputUsername() {
        return $('#index_email');
    }

    get inputPassword() {
        return $('#index_pass');
    }

    get btnSubmit() {
        return $('#index_login_button');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('');
    }
}

module.exports = new LoginPage();
