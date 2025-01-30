
/// <reference types="Cypress" />

//https://github.com/4teamwork/cypress-drag-drop

import 'cypress-file-upload';
require('@4tw/cypress-drag-drop')

require('cypress-xpath')
require('cypress-plugin-tab')


describe("Manejo de los Alias.", () =>{

    it("Alias uno", () =>{
        cy.visit("https://testpages.herokuapp.com/styled/validation/input-validation.html")
        cy.title().should("eq","Input Validation")
        cy.wait(1000)

        cy.get("#firstname").should("be.visible").as("nom")

        cy.get("@nom").type("Pedro")

        cy.get("#surname").should("be.visible").as("ap")
        cy.get("@ap").type("Perez Chavez")

        cy.get("#age").should("be.visible").as("edad")
        cy.get("#country").should("be.visible").as("pais")
        cy.get("#notes").should("be.visible").as("notas")

        cy.get("@edad").type("40")
        cy.get("@pais").select("Bulgaria").should("have.value","Bulgaria")
        cy.get("@notas").type("Demo del contenido")

        cy.xpath("//input[contains(@type,'submit')]").click({force:true})
       
    })


    it.only("Invoke", () =>{
        let tiempo=600

        cy.visit("https://testpages.herokuapp.com/styled/validation/input-validation.html") 
        cy.title().should('eq','Input Validation')
        cy.wait(tiempo)

        cy.get(".page-body > :nth-child(5)").invoke("text").as("informacion")

        cy.get("@informacion").should("contain","The information will be submitted to the server if it passes client side validation.")

        cy.get("[for='firstname']").invoke("text").as("tn")

        cy.get("@tn").should("contain","First name:").then(()=>{
            cy.get("#firstname").should("be.visible").as("nom")
            cy.get("@nom").type("Pedro")
        })
      

    });



    



  
    
   


});