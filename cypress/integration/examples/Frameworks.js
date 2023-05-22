/// <reference types="Cypress" />


describe('example of cy hooks and data from external feature file', function() {

    this.beforeEach(function() {
        // hooks(similar to Java annotations) needs to do something before or after test cases
        cy.fixture('example').then((data) => { // getting access to 'fixture' folder and 'example' file with test data
            this.data = data // some kind of contractor. creating a global variable which gives us access to external data
        })
    })

    it('test example with hook and data driven framework', function() {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get(':nth-child(1) > .form-control').type(this.data.name) // using 'this' keyword to get access to global variable
        cy.get('#exampleFormControlSelect1').select(this.data.gender)
        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name)
    })

    it('negative test example with hook and data driven framework', function() {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get(':nth-child(1) > .form-control').type(this.data.invalidName).blur() // use 'blur' method to unfocus element
        cy.get('div .alert-danger').should('have.text', 'Name should be at least 2 characters')
    })

    it('test example with custom command', function() {
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        cy.get(':nth-child(2) > .nav-link').click()
        cy.selectProduct('Nokia Edge') // using created function
        cy.get('a.btn-primary').should('include.text', '1')
    })
})