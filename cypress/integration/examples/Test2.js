/// <reference types="Cypress" />


describe('Learning checkboxes, dropdowns, radiobtns etc', function() {

    it('checkboxes', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("#checkBoxOption1").check().should("be.checked").and("have.value", "option1") // check specific box and verify result
        cy.get("#checkBoxOption1").uncheck().should("not.be.checked") // uncheck box and verify
        cy.get("input[type='checkbox']").check(["option2", "option3"]) // check multiple specified boxes
    })

    it("static dropdown", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("#dropdown-class-example").select("option1").should("have.value", "option1") // selecting by value
        cy.get("#dropdown-class-example").select("Select") // selecting by text
        cy.get("#dropdown-class-example").select(3).should("have.value", "option3") // selecting by index
    })

    it("dynamic dropdown", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("#autocomplete").type("ne") // typing text in input field
        cy.get(".ui-menu-item").each(($el, index, $list) => { // using "each" method for iterating every element in dropdown list
            if ($el.text() === "Ukraine") { // comparing with specified value and click on it
                cy.wrap($el).click()
            }
        })
        cy.get("#autocomplete").should("have.value", "Ukraine")
    })

    it("check visibility of elements", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("#displayed-text").should("be.visible") // check if element is visible
        cy.get("#hide-textbox").click()
        cy.get("#displayed-text").should("not.be.visible") // check if element isn't visible
        cy.get("#show-textbox").click()
        cy.get("#displayed-text").should("be.visible") // check if element is visible
    })
})