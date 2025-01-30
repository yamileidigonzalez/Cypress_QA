/// <reference types="Cypress" />



//https://docs.cypress.io/guides/references/assertions#Chai

require('cypress-xpath')
import 'cypress-file-upload'

describe("Upload Imagenes  ", () =>{

    it("Cargando imagenes", () =>{
        cy.visit("https://demoqa.com/automation-practice-form") 
        cy.title().should('eq','ToolsQA')
        cy.wait(1000)

        const ruta='img1.jpg'
        cy.get('[type="file"]').attachFile(ruta)
        cy.wait(2000)

       

    })




})//Cierre de describe