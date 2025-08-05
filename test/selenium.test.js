"use strict";

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { assert,expect } = require('chai');
const {By, Key,until} = require("selenium-webdriver");


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

    it('Open google.com', async function () {
        await driver.get('https://google.com');
        const pageTitle = await driver.getTitle();
        expect(pageTitle).to.contain('Google');

    });

    it('Perfroms a search on Google', async function (){
        expect(await driver.getTitle()).to.contain('Google');

        const inputSearch = await driver.findElement(By.name('q'));
        await inputSearch.click();
        await inputSearch.sendKeys("qa.rs",Key.ENTER);


        await driver.wait(until.elementLocated(By.id('search')));
        expect(await driver.getTitle()).to.contain('qa.rs');

    });

    it('Go to next page of google search', async function (){
        expect(await driver.getTitle()).to.contain('qa.rs');

        const navigation = await driver.findElement(By.xpath('(//div[@role="navigation"])[2]'));

        const nextPageLink = navigation.findElement(By.id('pnnext'));
        await nextPageLink.click();

        await driver.wait(until.elementLocated(By.id('search')));
        expect(await driver.getTitle()).to.contain('qa.rs');


    });
});