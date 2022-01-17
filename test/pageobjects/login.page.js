import Element from "../../BASE/Element"


class LoginPage {
    email_field = '#index_email'
    password_field = '#index_pass'
    submit_button = '#index_login_button'

    async login (data) {
        await new Element(this.email_field).setValue(data.username)
        await new Element(this.password_field).setValue(data.password)
        await new Element(this.submit_button).click()
    }

    open() {
        return browser.url(browser.options.baseUrl)
    }
}

export default new LoginPage();
