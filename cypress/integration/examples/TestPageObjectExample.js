/// <reference types="Cypress" />
import HomePage from "../pageObjects/HomePage";
import ShopPage from "../pageObjects/ShopPage";


const homePage = new HomePage();
const shopPage = new ShopPage();

describe('practice using POM framework', function() {
    
    this.beforeEach( () => {
        cy.visit(Cypress.env('url') + '/angularpractice/')
    })

    it('E2E purchase', function() {
        homePage.getShopBtn().click()
        cy.selectProduct('Nokia Edge')
        cy.selectProduct('Blackberry')
        shopPage.getCheckoutBtn().click()
        cy.contains('Checkout').click()
        shopPage.getCountryField().type('Ukr')
        shopPage.getAutoSuggestion().click()
        shopPage.getPurchaseBtn().click()
        shopPage.getSuccessMessage().should('include.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
    })

    it('compare items price and total price', function() {
        homePage.getShopBtn().click()
        cy.selectProduct('Nokia Edge')
        cy.selectProduct('Blackberry')
        cy.selectProduct('iphone X')
        shopPage.getCheckoutBtn().click()

        var sum = 0
        cy.get('table.table-hover tbody tr > :nth-child(4) > strong').each((el, index, list) => {
            const amount = el.text();
            var result = amount.split(' ');
            result = result[1].trim();
            sum = Number(sum) + Number(result);
        })

        cy.get('td.text-right strong').then((el) => {
            const amount = el.text();
            var res = amount.split(' ');
            const total = Number (res[1].trim());
            expect(Number(total)).to.equal(sum)
        })
    })
})