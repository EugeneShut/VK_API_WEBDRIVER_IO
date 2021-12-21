const Page = require('./page');
var request = require('request');


class MainPage extends Page {
    get post() {
        var options = {
            'method': 'POST',
            'url': 'https://api.vk.com/method/wall.post',
            'headers': {
            },
            formData: {
                'access_token': 'b7322768e78e375e4e9a4fd623c852b7efb4435072abea51d7fa8798181b80d0cb31fe57a259052be8d14',
                'message': 'teist',
                'v': '5.131'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });
    }

    get inputPassword() {
        return $('#index_pass');
    }

    open() {
        return $('#l_pr').click();
    }
}

module.exports = new MainPage();
