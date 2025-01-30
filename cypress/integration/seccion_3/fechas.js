/// <reference types="Cypress" />

//https://github.com/4teamwork/cypress-drag-drop
import 'cypress-file-upload';
require('@4tw/cypress-drag-drop')

require('cypress-xpath')
require('cypress-plugin-tab')


describe("Campos de tipo fecha", () =>{

    it("Fecha uno", () =>{
        let tiempo=1000
        cy.visit("https://www.seleniumeasy.com/test/bootstrap-date-picker-demo.html")
        cy.title("'eq","Selenium Easy - Best Demo website for Bootstrap Date picker")
        cy.wait(tiempo)

        // cy.get("#sandbox-container1 > .input-group > .form-control").should("be.visible").type("09/19/2021").then(()=>{
        //    // cy.get("#sandbox-container1 > .input-group > .form-control").should("be.visible").tab()
        //    //cy.get("[placeholder='Start date']").should("be.visible").focus()
        //    cy.get("#sandbox-container1 > .input-group > .form-control").click(10,20)
        // })
        //cy.get("#sandbox-container1 > .input-group > .form-control").should("be.visible").type("09/19/2021").tab()
        cy.get("#sandbox-container1 > .input-group > .form-control").should("be.visible").click()
        cy.wait(tiempo)
        cy.get(".today").first().click({force:true})

    })


    it("Fecha dos", () =>{
        let tiempo=1000
        cy.visit("https://www.seleniumeasy.com/test/bootstrap-date-picker-demo.html")
        cy.title("'eq","Selenium Easy - Best Demo website for Bootstrap Date picker")
        cy.wait(tiempo)

        cy.get("[placeholder='Start date']").should("be.visible").type("09/19/2021 {esc}")
        cy.wait(tiempo)

        cy.get("[placeholder='End date']").should("be.visible").type("10/19/2021 {esc}")

    })


    it("Fecha tres", () =>{
        let tiempo=1000
        cy.visit("https://www.seleniumeasy.com/test/bootstrap-date-picker-demo.html")
        cy.title("'eq","Selenium Easy - Best Demo website for Bootstrap Date picker")
        cy.wait(tiempo)

        cy.get("[placeholder='Start date']").should("be.visible").type("09/19/2021 {esc}").tab().type("10/19/2021 {esc}")
        

    })


    




});