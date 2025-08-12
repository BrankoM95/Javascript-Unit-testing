"use strict";

const BasePage = require("./base.page");
const {By} = require("selenium-webdriver");

module.exports = class CartPage extends BasePage {

    getOrderRow(packageName) {
        const xpathOrderRow = `//td[constains(., "${packageName}")]/parent::tr`;
        return this.driver().findElement(By.xpath(xpathOrderRow));
    }

    getOrderQuantity (orderRow) {
        return orderRow.findElement(By.xpath('/td[2]'));
    }

}