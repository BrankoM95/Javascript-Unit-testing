"use strict";

const { By } = require('selenium-webdriver');

module.exports = class BasePage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    driver () {
        return this.#driver
    }

    getCurrentUrl() {
        return this.#driver.getCurrentUrl();
    }

    getPageHeaderTitle () {
        return this.driver().findElement(By.tagName('h1')).getText();
    }
}