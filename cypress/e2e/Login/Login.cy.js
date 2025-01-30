const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");

describe('Login', () => {

  let t= 1000
    beforeEach('Entrar en la página', () => {
      //PAGINA
      cy.visit('https://newfront.lab.solverpay.com/login'); 
      cy.title().should('eq','Login')
      //LOGIN
      cy.get('#user').should("be.visible").should("be.enabled").type('solverpay')
      cy.get('#password').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
      cy.wait(t)
    })

    it('Inicio sesion OK', () => {
      //PAGINA
      cy.visit('https://newfront.lab.solverpay.com/login'); 
      cy.title().should('eq','Login')
      //LOGIN
      cy.get('#user').should("be.visible").should("be.enabled").type('solverpay')
      cy.get('#password').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
      cy.wait(t)
    })

    it('Inicio sesion KO-Erroneas', () => {
      //PAGINA
      cy.visit('https://newfront.lab.solverpay.com/login'); 
      cy.title().should('eq','Login')
      //LOGIN
      cy.get('#user').should("be.visible").should("be.enabled").type(' ')
      cy.get('#password').should("be.visible").should("be.enabled").type(' {enter}')
      cy.wait(t)
      //Confirmar error
      cy.get('.text-red-600').should("be.visible").should('contain','Oops!')
    })

    it('Inicio sesion KO-En blanco', () => {
      //PAGINA
      cy.visit('https://newfront.lab.solverpay.com/login'); 
      cy.title().should('eq','Login')
      //LOGIN user
      cy.get('#user').should("be.visible").should("be.enabled").click()
      cy.wait(t) 
      //LOGIN pass
      cy.get('#password').should("be.visible").should("be.enabled").click()
      cy.wait(t) 
      cy.get('.h-screen').should("be.visible").click()
      //Confirmar error
      cy.contains('.flex-1', '¡El usuario es obligatorio!').should('be.visible')
      cy.get('.flex-1 > :nth-child(4)').should('exist').should("be.visible").should('contain','¡El usuario es obligatorio!')
      cy.contains('.flex-1', '¡La contraseña es obligatoria!').should('be.visible')
      cy.get('.flex-1 > :nth-child(6)').should('exist').should("be.visible").should('contain','¡La contraseña es obligatoria!')
      cy.wait(t)     
      //cy.get('.text-red-600').should("be.visible").should('contain','Oops!')
    })

    it('Cierre de sesion', () => {
      cy.title().should('eq','Panel de control')
      cy.wait(1000)
      //Perfil de usuario
      cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
      
      //Cierre de sesion
      cy.get('div.py-2 > .block').should("be.visible").click()
      cy.wait(1000)
      cy.title().should('eq','Login')

    })

  })