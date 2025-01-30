
/// <reference types="Cypress" />

//https://github.com/4teamwork/cypress-drag-drop

import 'cypress-file-upload';
require('@4tw/cypress-drag-drop')

require('cypress-xpath')
require('cypress-plugin-tab')


describe("Alertas en cypress.", () =>{

    it("Alerta uno", () =>{
        cy.visit("https://www.seleniumeasy.com/test/bootstrap-modal-demo.html")
        cy.title().should("eq","Selenium Easy Demo - Bootstrap Modal Demo to Automate")
        cy.wait(1000)

        cy.xpath("//a[@href='#myModal0']").click()
        cy.wait(1000)
        cy.xpath("(//a[@href='#'][contains(.,'Save changes')])[1]").click({force:true})

        cy.xpath("//a[@href='#myModal0']").click()
        cy.wait(1000)
        cy.xpath("(//a[@href='#'][contains(.,'Close')])[1]").click({force:true})
    })

  
    
   


});