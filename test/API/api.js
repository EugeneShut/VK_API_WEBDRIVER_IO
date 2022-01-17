import BaseApi from "../../BASE/baseApi";
import helper from '../../helpers/helper'
import FormData from 'form-data'
import fs from 'fs'
import logger from '@wdio/logger'
import config from '../../config.json'


const log = logger(config.projectName)


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


    async getUserId() {
        return browser.call(async () => {
            try {
                let data_d = new FormData();
                data_d.append(ACCESS_TOKEN, API_TOKEN);
                data_d.append(V, API_VK_VERSION);

                let response = await BaseApi.postRequest(API_BASE_URL + this.usersGet, data_d)
                return response.data.response[0].id.toString();
            } catch (err) {
                log.info(err)
            }
        })
    }


    async postWallPost(text) {
        return browser.call(async () => {
            try {
                let data_d = new FormData();
                data_d.append(ACCESS_TOKEN, API_TOKEN);
                data_d.append(MESSAGE, text);
                data_d.append(V, API_VK_VERSION);

                let response = await BaseApi.postRequest(API_BASE_URL + this.wallPost, data_d)
                return response.data.response.post_id.toString();
            } catch (err) {
                log.info(err)
            }
        })
    }

    async getUploadLink() {
        let data_d = new FormData();
        data_d.append(ACCESS_TOKEN, API_TOKEN);
        data_d.append(V, API_VK_VERSION);

        let response = await BaseApi.postRequest(API_BASE_URL + this.getWallUploadServer, data_d)
        return  response.data.response.upload_url
    }

    async uploadImage(image_path) { // todo: debug!!
        try {
            let link = await this.getUploadLink()
            let imageData = new FormData()
            const path = require('path');
            const coolPath = path.join(__dirname, '..', '..', image_path)
            imageData.append(PHOTO, fs.createReadStream(coolPath));

            let push_image = await BaseApi.postRequest(link, imageData, {'Cookie': 'remixlang=114'})
            return push_image.data

        } catch(err) {
            log.info(err)
        }
    }

    async postImageToWall(user_id, image_path) {
        return browser.call(async () => {
            let push_image = await this.uploadImage(image_path)
            let data_d = new FormData();
            data_d.append(ACCESS_TOKEN, API_TOKEN);
            data_d.append(V, API_VK_VERSION);
            data_d.append(USER_ID, user_id)
            data_d.append(SERVER, push_image.server)
            data_d.append(HASH, push_image.hash)
            data_d.append(PHOTO, push_image.photo)

            let result = await BaseApi.postRequest(API_BASE_URL + this.saveWallPhoto, data_d)
            return PHOTO + user_id + "_" + result.data.response[0].id
        })
    }

    async editWallPost(post_id, image="", message="") {
        return browser.call(async () => {
            try {
                let data_d = new FormData();
                data_d.append(ACCESS_TOKEN, API_TOKEN);
                data_d.append(V, API_VK_VERSION);
                data_d.append(POST_ID, post_id);
                data_d.append(ATTACHMENTS, image);
                data_d.append(MESSAGE, message);

                let response = await BaseApi.postRequest(API_BASE_URL + this.wallEdit, data_d)
                return response.data.response.post_id.toString();
            } catch (err) {
                log.info(err)
            }
        })
    }

    async addPostComment(post_id, message="") {
        return browser.call(async () => {
            try {
                let data_d = new FormData();
                data_d.append(ACCESS_TOKEN, API_TOKEN);
                data_d.append(V, API_VK_VERSION);
                data_d.append(POST_ID, post_id);
                data_d.append(MESSAGE, message);

                let response = await BaseApi.postRequest(API_BASE_URL + this.wallCreateComment, data_d)
                return response.data.response.post_id.toString();
            } catch (err) {
                log.info(err)
            }
        })
    }

    async getPostLikes(post_id) {
        return browser.call(async () => {
            try {
                let data_d = new FormData();
                data_d.append(ACCESS_TOKEN, API_TOKEN);
                data_d.append(V, API_VK_VERSION);
                data_d.append(ITEM_ID, post_id);
                data_d.append(TYPE, POST);

                let response = await BaseApi.postRequest(API_BASE_URL + this.likesGetList, data_d)
                return response.data.response.items[0].toString();
            } catch (err) {
                log.info(err)
            }
        })
    }

    async deletePost(post_id) {
        return browser.call(async () => {
            try {
                let data_d = new FormData();
                data_d.append(ACCESS_TOKEN, API_TOKEN);
                data_d.append(V, API_VK_VERSION);
                data_d.append(POST_ID, post_id);

                let response = await BaseApi.postRequest(API_BASE_URL + this.wallDelete, data_d)
                return response.data;
            } catch (err) {
                log.info(err)
            }
        })
    }

}
module.exports = new VkApi();
