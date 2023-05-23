/// <reference types="Cypress" />

describe('example of http request interception concept', function() {

    it('change response body', function() {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        cy.intercept({method: 'GET', url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'},
        {
            statusCode: 200,
            body: [
                {
                    "book_name": "Learn Appium Automation with Java",
                    "isbn": "RS983",
                    "aisle": "802"
                }
            ]
        }).as('books')
        cy.get('button.btn-primary').click()
        cy.wait('@books')
        cy.get('p').should('contain.text', 'Oops only 1 Book available')
    })

    it('verify number of records in response body', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
        cy.intercept({method: 'GET', url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'}).as('response'),
        cy.get('button.btn-primary').click()
        cy.wait('@response').then(({response}) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })
    })
})