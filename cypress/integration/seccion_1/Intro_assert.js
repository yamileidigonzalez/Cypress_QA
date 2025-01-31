/// <reference types="cypress" />

describe("Introducción a los assert  ", () =>{

    it("Demo de los Asserts ", () =>{
        cy.visit("https://demoqa.com/automation-practice-form") 
        cy.title().should('eq','ToolsQA')
        cy.wait(1000)

        cy.get("#firstName").should("be.visible").type("Juan")
        cy.wait(1000)
        cy.get("#lastName").should("be.visible").type("Perez")
        cy.wait(1000)
        cy.get("#userEmail").should("be.visible").should("be.enabled").type("juan@gmail.com")
    })


    it.only("Click", () =>{

        cy.visit("https://orangehrm-demo-6x.orangehrmlive.com/auth/login") 
        cy.title().should('eq','OrangeHRM')
        cy.wait(1000)
        cy.get("#btnLogin").should("be.visible").click()
        cy.get('#menu_admin_viewAdminModule > :nth-child(1)').click()
        cy.get('#menu_admin_Job > .collapsible-header > .left-menu-title').should("be.visible").click()
        

    });



})//Cierre de describe