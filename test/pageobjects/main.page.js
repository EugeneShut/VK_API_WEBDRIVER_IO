const Page = require('./page');
var request = require('request');
const helper = require('../../helpers/helper')
var unirest = require('unirest');


class MainPage extends Page {
    post_random_message() {
        var options = {
            'method': 'POST',
            'url': 'https://api.vk.com/method/wall.post',
            'headers': {
            },
            formData: {
                'access_token': 'c2ad3c985319a3660968f2ed11f891e0577740e7356ba1bf793b296c8161fd4fdbe0d951da623335a04f3',
                'message': 'test',
                'v': '5.131'
            }
        };
        return new Promise((resolve, reject) => {
            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(typeof response.body);
                return resolve(response.body)
            });
        })

    }
}

module.exports = new MainPage();
