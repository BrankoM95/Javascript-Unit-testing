"use strict";

const {By} = require("selenium-webdriver");
module.exports = class LoginPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage () {
        this.#driver.get('http://shop.qa.rs/login');
    }

    getInputUserName () {
        return this.#driver.findElement(By.name('username'));
    }

    getInputPassword () {
        return this.#driver.findElement(By.name('password'));
    }

    getLoginButton () {
        return this.#driver.findElement(By.name('login'));
    }

    fillInputUsername (username) {
        this.getInputUserName().sendKeys(username);
    }

    fillInputPassword(password) {
        this.getInputPassword().sendKeys(password);
    }
    async clickLoginButton () {
       await this.getLoginButton().click();
    }
}