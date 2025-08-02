"use strict";

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { assert,expect } = require('chai');

describe.only('Selenium tests', function () {
    let driver;

    before(function () {
       driver = new webdriver.Builder().forBrowser('chrome').build();

    });

    after(async function (){
       await driver.quit();
    });

    it('Opens qa.rs website', async function () {
        await driver.get('https://qa.rs');
        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.contain('QA.rs');
        assert.equal(pageTitle,'Edukacija za QA testere - QA.rs');

    });
});