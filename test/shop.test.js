"use strict";

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { assert,expect } = require('chai');
const {By, Key,until} = require("selenium-webdriver");
const HomePage = require('../pages/home.page');
const RegisterPage = require('../pages/register.page');


describe.only('shop.QA.rs tests',function () {
    let driver;
    let pageHomepage;
    let pageRegister;

    before(function() {
       driver = new webdriver.Builder().forBrowser('chrome').build();
       pageHomepage = new HomePage(driver);
       pageRegister = new RegisterPage(driver);
    });

    after( async function (){
        await driver.quit();

    });
    beforeEach( function () {
       //Pokrece se pre svakog testa
    });

    afterEach( function () {
       //Pokrece se nakon svakog testa
    });

    it('Verifies homepage is open', async function (){
       await pageHomepage.goToPage();
       const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain('(QA) Shop');
        expect(await pageHomepage.isBugListDivDisplayed()).to.be.true;

    });

    it('Goes to registration page' , async function (){
        await pageHomepage.clickOnRegisterLink();
        /*
        await pageRegister.goToPage(); - Moze i ovako da se napisi kod iznad, radi isto
         */
        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
        expect(await pageRegister.getCurrentUrl()).to.be.eq('http://shop.qa.rs/register');

    });

    it('Successfully performs registraction', async function (){
        pageRegister.getInputFirstName().sendKeys('Tom');
        pageRegister.getInputLastName().sendKeys('Aspinall');
        pageRegister.getInputEmail().sendKeys('Tom@Aspinall.com');

        await pageRegister.fillInputUsername('Tom.Aspinall');
        await pageRegister.fillInputPassword('lozinkaNeka1234');
        await pageRegister.fillInputPasswordConfirm('lozinkaNeka1234');

        await pageRegister.getRegisterButton().click();

        expect(await pageHomepage.getSuccessAlertText()).to.contain('Uspeh!');


    });
});
