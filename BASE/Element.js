import logger from '@wdio/logger'
import config from '../config.json'


const log = logger(config.projectName)


export default class Element {

    constructor(locator) {
        this.locator = locator;
    }

    async click() {
        log.info(`Click at "${this.locator}"`);
        return (await $(this.locator)).click();
    }

    async setValue(value) {
        log.info(`Trying to set value of "${this.locator}"`)
        return (await  $(this.locator)).setValue(value);
    }

    async getAttribute(attribute) {
        log.info(`Trying to get attribute "${attribute}"`);
        const attr = await (await $(this.locator)).getAttribute(attribute);
        log.info(`Got attribute "${attr}"`);
        return attr;
    }

    async getText() {
        log.info(`Trying to get text from element "${this.locator}"`);
        const text = await (await $(this.locator)).getText();
        log.info(`Got text "${text}"`);
        return text;
    }

}

