import axios from 'axios';
import logger from '@wdio/logger'
import config from '../config.json'


const log = logger(config.projectName)


class BaseApi {
    POST = "post"
    GET = "get"

    async postRequest(url, data, headers= {}) {
        try {
            let config = {
                method: this.POST,
                url: url,
                headers: {
                    ...data.getHeaders(),
                    headers
                },
                data: data
            }
            return await axios(config)
        } catch(err) {
            log.info(err)
        }
    }

}
export default new BaseApi();
