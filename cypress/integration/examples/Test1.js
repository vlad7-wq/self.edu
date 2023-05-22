/// <reference types="Cypress" />


describe('My first test suite', function() {

    it('it my firs test case', function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('[class=search-keyword]').type("ca")
        cy.wait(2000)
        cy.get(".product:visible").should("have.length", 4)

        // assaign an alias (cypress variable for later use)
        cy.get(".products").as("productsLocator")

        cy.get("@productsLocator").find(".product").should("have.length", 4)

        // Parent child chaining, grab an element by index
        cy.get("@productsLocator").find(".product").eq(2).contains("ADD TO CART").click()

        // dynamically finding an element, iterating each element
        cy.get("@productsLocator").find(".product").each(($el, index, $list) => {

            const itemText = $el.find("h4.product-name").text()
            if(itemText.includes("Cashews")) {
                cy.wrap($el).find("button").click()
            }
        })

        cy.get(".brand").then(function(logoElement) {
            cy.log(logoElement.text())
            cy.get(".brand").should("have.text", "GREENKART")
        })

        // click on cart button
        cy.get(".cart-icon > img").click()

        // proceed to checkout
        cy.contains("PROCEED TO CHECKOUT").click()

        // click on place order
        cy.get(".products > div > button").click()
    })
})