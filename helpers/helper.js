import config from '../config.json'


const alphabet = "abcdefghijklmnopqrstuvwxyz"


class Helper {
    generate_string(number=config.defaultRandomMessageLength) {
        let result = ""
        for (let step = 1; step < number+1; step++) {
            result = result + alphabet[Math.floor(Math.random() * alphabet.length)]
        }
        return result
    }
}

module.exports = new Helper()