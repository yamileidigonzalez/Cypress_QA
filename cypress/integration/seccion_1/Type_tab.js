/// <reference types="cypress" />



require('cypress-plugin-tab')

describe("Ejemplo funcion Tab  ", () =>{

    it("Type con Tab ", () =>{
        cy.visit("https://demoqa.com/automation-practice-form") 
        cy.title().should('eq','ToolsQA')
        cy.wait(1000)

        cy.get("#firstName").type("Rodrigo").tab().
        type("Villanueva").tab().
        type("rodrigo@gmail.com")
    })

    


  



})//Cierre de describe