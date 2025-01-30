/// <reference types="Cypress" />  
//para que función los comandos

describe("Seccion 1 Validando el título  ", () =>{

    it("Test Validar el título ", () =>{
        cy.visit("https://demoqa.com/text-box") 
        cy.title().should('eq','ToolsQA')

        cy.log("Ok la función title función bien")
    })




})//Cierre de describe