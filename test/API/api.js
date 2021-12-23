import axios from 'axios';
const helper = require('../../helpers/helper')
const FormData = require('form-data');
let data_d = new FormData();

const API_BASE_URL = "https://api.vk.com";
const API_TOKEN = "c2ad3c985319a3660968f2ed11f891e0577740e7356ba1bf793b296c8161fd4fdbe0d951da623335a04f3"
const API_VK_VERSION = '5.131'


class VkApi {

    async PostRandomWallMessage() {
        try {
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
            return response.data.response.post_id;
        } catch(err) {
            return err;
        }
    }

}
export default new VkApi();
