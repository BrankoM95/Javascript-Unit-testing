"use strict";

require('chromedriver');
const webdriver = require('selenium-webdriver');
const { assert,expect } = require('chai');
const {By, Key,until} = require("selenium-webdriver");
const HomePage = require('../pages/home.page');
const RegisterPage = require('../pages/register.page');
const LoginPage = require('../pages/login.page');
const CartPage = require('../pages/cart.page');


describe.only('shop.QA.rs tests',function () {
    let driver;
    let pageHomepage;
    let pageRegister;
    let pageLogin;
    let pageCart;

    const packageToAdd = 'starter';
    const packageQuantity = '2';

    before(async function() {
       driver = new webdriver.Builder().forBrowser('chrome').build();
       pageHomepage = new HomePage(driver);
       pageRegister = new RegisterPage(driver);
       pageLogin = new LoginPage(driver);
       pageCart = new CartPage(driver);

    });

    after( async function (){
        await driver.quit();

    });
    beforeEach( async function () {
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

    it.skip('Goes to registration page' , async function (){
        await pageHomepage.clickOnRegisterLink();
        /*
        await pageRegister.goToPage(); - Moze i ovako da se napisi kod iznad, radi isto
         */
        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
        expect(await pageRegister.getCurrentUrl()).to.be.eq('http://shop.qa.rs/register');

    });

    it.skip('Successfully performs registraction', async function (){
        pageRegister.getInputFirstName().sendKeys('Djuradj');
        pageRegister.getInputLastName().sendKeys('Brankovic');
        pageRegister.getInputEmail().sendKeys('Dj@Brankovic.com');

        await pageRegister.fillInputUsername('Dj.Bran');
        await pageRegister.fillInputPassword('lozinkaNeka123456789');
        await pageRegister.fillInputPasswordConfirm('lozinkaNeka123456789');

        await pageRegister.getRegisterButton().click();

        expect(await pageHomepage.getSuccessAlertText()).to.contain('Uspeh!');

    });

    it('Goes to login page and performs a login', async function(){
        await pageLogin.goToPage();

        await pageLogin.fillInputUsername('Dj.Bran')
        await pageLogin.fillInputPassword('lozinkaNeka123456789')
        await pageLogin.clickLoginButton();

        expect(await pageHomepage.getWelcomeBackText()).to.contain('Welcome back');
        assert.isTrue(await pageHomepage.isLogoutLinkDisplayed());


    });

    it('Adds item(s) to cart ', async function() {
        const packageDiv = await pageHomepage.getPackageDiv(packageToAdd);
        const quantity = await pageHomepage.getQuantityDropdown(packageDiv);
        const options = await pageHomepage.getQuantityOptions(quantity);

        await Promise.all(options.map(async function(option) {
            const text = await option.getText();

            if(text === packageQuantity) {
                await option.click();

                const selectedValue = await quantity.getAttribute('value');
                expect(selectedValue).to.contain(packageQuantity);

                await pageHomepage.getOrderButton(packageDiv).click();

                expect(await driver.getCurrentUrl()).to.contain('http://shop.qa.rs/order');

            }
        }));


    });

    it('Opens shopping cart', async function () {
        await pageHomepage.clickOnViewShoppingCartlink();
        expect(await pageCart.getCurrentUrl()).to.be.eq('http://shop.qa.rs/cart');
        expect(await pageCart.getPageHeaderTitle()).to.contain('Order');

    });

    it('Verifies items is in the cart', async () =>{
        const orderRow = await pageCart.getOrderRow(packageToAdd.toUpperCase());
        const orderQuantity = await pageCart.getOrderQuantity(orderRow);

        expect(await orderQuantity.getText()).to.be.eq(packageQuantity);


    });

    it('Performs a logout', async function () {
        await pageHomepage.clickOnLogoutLink();

        expect(await pageHomepage.isLoginLinkDisplayed()).to.be.true;
    });


});

