/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'


describe("working with alert pop ups and child windows", function() {

    it("pop-up", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("#alertbtn").click() // cypress automatically accepts invoked event
        cy.on("window:alert", (str) => {
            expect(str).to.equal("Hello , share this practice page and share your knowledge")
        })

        cy.get("#confirmbtn").click()
        cy.on("window:confirm", (strConf) => {
            expect(strConf).to.equal("Hello , Are you sure you want to confirm?")
            return false // simulate cancel event
        })
    })

    it("handling child window", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get("#opentab").should("have.attr", "target", "_blank") // checking that specified attr have specified value
        // cy.get("#opentab").invoke("removeAttr", "target").click() // removing 'target' attr for opening document in the same window
        
        // example how to add condition if 'target' value different form '_blank'
        // cy.get("#opentab").then(() => {
        //     const val = "_blank"
        //     if (cy.get("#opentab").should("have.attr", "target", val)) {
        //         cy.get("#opentab").invoke("removeAttr", "target").click()
        //     } else {cy.get("#opentab").click()}
        // })

        // cy.url().should("include", "qaclickacademy") // checking that proper site was opened
        cy.go("back") // go back to the previous site
    })

    it("web tables", function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => { // using method 'each' for iterating through table 
            const text = $el.text() // create const text and setting text from table
            if (text.includes('Python')) { // checking if word 'Python' is present in table
                cy.get('tr td:nth-child(2)').eq(index).next().then((price) => { // getting sibling element by index
                    const priceText = price.text() // getting text of sibling element
                    expect(priceText).to.equal('25') // verifying selected condition
                })
            }
        })
    })

    it('mouse hovering', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        //cy.get('.mouse-hover-content').invoke('show') // invoke jquery 'show' function for simulating mouse hovering
        cy.contains('Top').click({force:true}) // if we need just click on hidden element, then use click({force:true}) method
        cy.url().should('include', '#top')
    })

    it('handling child window via grabbing href link', function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then((el) => {
            const url = el.prop('href') // use jquery method 'prop' to grab href property and set to 'url' const
            cy.visit(url) // use 'visit' method to open а new site
            cy.origin(url, () => { // 'origin' method needs for doing actions on the new site
                cy.get('#navbarSupportedContent > ul > li:nth-child(4) > a').click()
            })
        })
    })

    it('handling iFrames', function() { // npm install --D cypress-iframe for installing iframe package. Don't forget import package and add reference for autosuggestion
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded('#courses-iframe') // 'frameLoaded' method for get an iFrame
        cy.iframe().find("a[href*='mentorship']").eq(0).click() // 'iframe' method for working with iFrame, 'find' for getting an element
        // cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    })
})  
