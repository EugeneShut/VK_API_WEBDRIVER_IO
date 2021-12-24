import axios from 'axios';
const helper = require('../../helpers/helper')
const FormData = require('form-data');
const fs = require('fs');
let config = require('../../config')

const API_BASE_URL = config.API.baseUrl;
const API_TOKEN = config.API.token
const API_VK_VERSION = config.API.v

const ACCESS_TOKEN = "access_token"
const V = "v"
const POST = "post"
const MESSAGE = "message"
const ATTACHMENTS = 'attachments'
const PHOTO = "photo"
const USER_ID = "user_id"
const POST_ID = "post_id"
const ITEM_ID = "item_id"
const TYPE = "type"
const SERVER = "server"
const HASH = "hash"


class VkApi {

    usersGet = "/method/users.get"
    wallPost = "/method/wall.post"
    getWallUploadServer = "/method/photos.getWallUploadServer"
    saveWallPhoto = "/method/photos.saveWallPhoto"
    wallEdit = "/method/wall.edit"
    wallCreateComment = "/method/wall.createComment"
    likesGetList = "/method/likes.getList"
    wallDelete = "/method/wall.delete"

    async GetUserId() {
        try {
            let data_d = new FormData();
            data_d.append(ACCESS_TOKEN, API_TOKEN);
            data_d.append(V, API_VK_VERSION);

            let config = {
                method: POST,
                url: API_BASE_URL + this.usersGet,
                headers: {
                    ...data_d.getHeaders()
                },
                data: data_d
            }
            let response = await axios(config)
            return response.data.response[0].id.toString();
        } catch(err) {
            return err;
        }
    }

    async PostRandomWallPost() {
        try {
            let data_d = new FormData();
            data_d.append(ACCESS_TOKEN, API_TOKEN);
            data_d.append(MESSAGE, helper.generate_string());
            data_d.append(V, API_VK_VERSION);

            let config = {
                method: POST,
                url: API_BASE_URL + this.wallPost,
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
        data_d.append(ACCESS_TOKEN, API_TOKEN);
        data_d.append(V, API_VK_VERSION);

        let config = {
            method: POST,
            url: API_BASE_URL + this.getWallUploadServer,
            headers: {
                ...data_d.getHeaders()
            },
            data: data_d
        }
        let response = await axios(config)
        return  response.data.response.upload_url
    }

    async UploadImage(image_path) {
        try {
            let link = await this.getUploadLink()
            var imageData = new FormData()
            const path = require('path');
            const coolPath = path.join(__dirname, '..', '..', image_path)
            imageData.append(PHOTO, fs.createReadStream(coolPath));
            let push_image_config = {
                method: POST,
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

    async PostImageToWall(user_id, image_path) {
        let push_image = await this.UploadImage(image_path)
        let data_d = new FormData();
        data_d.append(ACCESS_TOKEN, API_TOKEN);
        data_d.append(V, API_VK_VERSION);
        data_d.append(USER_ID, user_id)
        data_d.append(SERVER, push_image.server)
        data_d.append(HASH, push_image.hash)
        data_d.append(PHOTO, push_image.photo)


        let save_image_comfig = {
            method: POST,
            url: API_BASE_URL + this.saveWallPhoto,
            headers: {
                ...data_d.getHeaders()
            },
            data: data_d
        }
        let result = await axios(save_image_comfig)
        return PHOTO + user_id + "_" + result.data.response[0].id
    }

    async EditWallPost(post_id, image="", message="") {
        try {
            let data_d = new FormData();
            data_d.append(ACCESS_TOKEN, API_TOKEN);
            data_d.append(V, API_VK_VERSION);
            data_d.append(POST_ID, post_id);
            data_d.append(ATTACHMENTS, image);
            data_d.append(MESSAGE, message);

            let config = {
                method: POST,
                url: API_BASE_URL + this.wallEdit,
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

    async AddPostComment(post_id, message="") {
        try {
            let data_d = new FormData();
            data_d.append(ACCESS_TOKEN, API_TOKEN);
            data_d.append(V, API_VK_VERSION);
            data_d.append(POST_ID, post_id);
            data_d.append(MESSAGE, message);

            let config = {
                method: POST,
                url: API_BASE_URL + this.wallCreateComment,
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

    async GetPostLikes(post_id) {
        try {
            let data_d = new FormData();
            data_d.append(ACCESS_TOKEN, API_TOKEN);
            data_d.append(V, API_VK_VERSION);
            data_d.append(ITEM_ID, post_id);
            data_d.append(TYPE, POST);

            let config = {
                method: POST,
                url: API_BASE_URL + this.likesGetList,
                headers: {
                    ...data_d.getHeaders()
                },
                data: data_d
            }
            let response = await axios(config)
            return response.data.response.items[0].toString();
        } catch(err) {
            return err;
        }
    }

    async DeletePost(post_id) {
        try {
            let data_d = new FormData();
            data_d.append(ACCESS_TOKEN, API_TOKEN);
            data_d.append(V, API_VK_VERSION);
            data_d.append(POST_ID, post_id);

            let config = {
                method: POST,
                url: API_BASE_URL + this.wallDelete,
                headers: {
                    ...data_d.getHeaders()
                },
                data: data_d
            }
            let response = await axios(config)
            return response.data;
        } catch(err) {
            return err;
        }
    }

}
export default new VkApi();
