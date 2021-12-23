import axios from 'axios';
const helper = require('../../helpers/helper')
const FormData = require('form-data');
const fs = require('fs');

const API_BASE_URL = "https://api.vk.com";
const API_TOKEN = "c2ad3c985319a3660968f2ed11f891e0577740e7356ba1bf793b296c8161fd4fdbe0d951da623335a04f3"
const API_VK_VERSION = '5.131'


class VkApi {

    async PostRandomWallPost() {
        try {
            let data_d = new FormData();
            data_d.append('access_token', API_TOKEN);
            data_d.append('message', "aqa: " + helper.generate_string());
            data_d.append('v', API_VK_VERSION);

            let config = {
                method: 'post',
                url: API_BASE_URL + "/method/wall.post",
                headers: {
                    ...data_d.getHeaders()
                },
                data: data_d
            }
            let response = await axios(config)
            return response.data.response.post_id.toString();
        } catch(err) {
            return err;
        }
    }

    async getUploadLink() {
        let data_d = new FormData();
        data_d.append('access_token', API_TOKEN);
        data_d.append('v', API_VK_VERSION);

        let config = {
            method: 'post',
            url: API_BASE_URL + "/method/photos.getWallUploadServer",
            headers: {
                ...data_d.getHeaders()
            },
            data: data_d
        }
        let response = await axios(config)
        console.log(response.data.response.upload_url)
        return  response.data.response.upload_url
    }

    async UploadImage(image_path) {
        try {
            let link = await this.getUploadLink()
            var imageData = new FormData()
            const path = require('path');
            const coolPath = path.join(__dirname, '..', '..', 'images/image.png')
            // const image_path = fs.createReadStream("image.png")
            // image_path.on('data', function (chunk) {
            //     console.log(chunk.toString())
            // })
            imageData.append('photo', fs.createReadStream('image.png'));
            let push_image_config = {
                method: 'post',
                url: link,
                headers: {
                    'Cookie': 'remixlang=114',
                    ...imageData.getHeaders()
                },
                data: imageData,
            }
            let push_image = await axios(push_image_config)
            return push_image.data

        } catch(err) {
            return err;
        }
    }

    async SaveImage(user_id, push_image) {
        let data_d = new FormData();
        data_d.append('access_token', API_TOKEN);
        data_d.append('v', API_VK_VERSION);
        data_d.append("user_id", user_id)
        data_d.append("photo", push_image.data.photo)
        data_d.append("server", push_image.data.server)
        data_d.append("hash", push_image.data.hash)


        let save_image_comfig = {
            method: 'post',
            url: API_BASE_URL + "/method/photos.saveWallPhoto",
            headers: {
                ...data_d.getHeaders()
            },
            data: data_d
        }
        let result = await axios(save_image_comfig)
        console.log(data_d)
        return result.data.response
    }

    async EditWallPost(post_id, image="", message="") {
        try {
            let data_d = new FormData();
            data_d.append('access_token', API_TOKEN);
            data_d.append('v', API_VK_VERSION);
            data_d.append('post_id', post_id);
            data_d.append('attachments', image);
            data_d.append('message', message);

            let config = {
                method: 'post',
                url: API_BASE_URL + "/method/wall.edit",
                headers: {
                    ...data_d.getHeaders()
                },
                data: data_d
            }
            let response = await axios(config)
            return response.data.response.post_id.toString();
        } catch(err) {
            return err;
        }
    }

}
export default new VkApi();
