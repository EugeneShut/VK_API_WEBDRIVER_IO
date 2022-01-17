import config from '../config.json'
import Jimp from "jimp"


const alphabet = "abcdefghijklmnopqrstuvwxyz"


class Helper {
    generate_string(number=config.defaultRandomMessageLength) {
        let result = ""
        for (let step = 1; step < number+1; step++) {
            result = result + alphabet[Math.floor(Math.random() * alphabet.length)]
        }
        return result
    }

    async compare_two_images(path_1, path_2) {
        const edinburgh_original = await Jimp.read(path_1);
        const edinburgh_sharpened = await Jimp.read(path_2);
        return await Jimp.diff(edinburgh_original, edinburgh_sharpened).percent
    }
}

module.exports = new Helper()