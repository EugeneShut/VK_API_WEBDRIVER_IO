const Page = require('./page');
var request = require('request');
const helper = require('../../helpers/helper')
var unirest = require('unirest');


class MainPage extends Page {
    post_random_message() {
        return new Promise((resolve, reject) => {
            unirest('POST', 'https://api.vk.com/method/wall.post')
                .field('access_token', 'c2ad3c985319a3660968f2ed11f891e0577740e7356ba1bf793b296c8161fd4fdbe0d951da623335a04f3')
                .field('message', 'test1')
                .field('v', '5.131')
                .end(function (res) {
                    if (res.error) {
                        throw new Error(res.error);
                    }
                    return resolve(res.raw_body);
                })
        })

    }

    open() {
        return $('#l_pr').click();
    }
}

module.exports = new MainPage();
