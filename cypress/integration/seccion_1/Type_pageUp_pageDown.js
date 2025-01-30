/// <reference types="Cypress" />

describe("Ejemplo de Type pageUp, pageDown  ", () =>{

    it.only("Type primero ", () =>{
        cy.visit("https://demoqa.com/text-box")
        cy.title().should('eq','ToolsQA') 
        cy.wait(1000)

        cy.get("#userName").type('{pageup}')
        cy.wait(2000)
    })


    it("Type pageDown ", () =>{
        cy.visit("https://demoqa.com/text-box")
        cy.title().should('eq','ToolsQA') 
        cy.wait(1000)

        cy.get("#userName").type('{pagedown}')
        cy.wait(2000)
    })

    it("Type pageDown ", () =>{
        cy.visit("https://demoqa.com/text-box")
        cy.title().should('eq','ToolsQA') 
        cy.wait(1000)

        cy.get("#userName").type('{pagedown}')
        cy.wait(2000)
    })

    it("Type pageDown ", () =>{
        cy.visit("https://demoqa.com/text-box")
        cy.title().should('eq','ToolsQA') 
        cy.wait(1000)

        cy.get("#userName").type('{pagedown}')
        cy.wait(2000)
    })

    it("Type pageDown ", () =>{
        cy.visit("https://demoqa.com/text-box")
        cy.title().should('eq','ToolsQA') 
        cy.wait(1000)

        cy.get("#userName").type('{pagedown}')
        cy.wait(2000)
    })

    it("Type pageDown ", () =>{
        cy.visit("https://demoqa.com/text-box")
        cy.title().should('eq','ToolsQA') 
        cy.wait(1000)

        cy.get("#userName").type('{pagedown}')
        cy.wait(2000)
    })

    it.only("Type ultimo ", () =>{
        cy.visit("https://demoqa.com/text-box")
        cy.title().should('eq','ToolsQA') 
        cy.wait(1000)

        cy.get("#userName").type('{pagedown}')
        cy.wait(2000)
    })



})//Cierre de describe