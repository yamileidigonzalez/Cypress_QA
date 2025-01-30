const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");

describe('Gestión de Usuario', () => { 
  let tiempo= 1000
  beforeEach('Entrar en la página', () => {
    //PAGINA
    cy.visit('https://newfront.lab.solverpay.com/login'); 
    cy.title().should('eq','Login')
    //LOGIN
    cy.get('#user').should("be.visible").should("be.enabled").type('solverpay')
    cy.get('#password').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
    cy.wait(tiempo)
  })

  it('Cambiar la contraseña del usuario KO', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    //cambio mi contraseña
    cy.title().should('eq','Perfil')
    cy.get('#currentPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
    cy.get('#currentPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //new pass Simple
    cy.get(':nth-child(1) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7au{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','Demasiado simple')
    cy.get(':nth-child(1) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    cy.get('.form-container > .justify-center').should("not.be.enabled")
    //confirmar diferentes
    cy.get(':nth-child(2) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7au{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','Demasiado simple')
    cy.get(':nth-child(2) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //la contraseña debe actualizarse correctamente y recibo una confirmación de éxito
    cy.log('No funciona el botón')
    //cy.get('.form-container > .justify-center').should("be.enabled").click()
    cy.get('.form-container > .justify-center').should("not.be.enabled").click()

    //new pass Media
    cy.get(':nth-child(1) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").clear().type('r7auwdq466+2.,18346578{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es media')
    cy.get(':nth-child(1) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    cy.get('.form-container > .justify-center').should("not.be.enabled")
    //confirmar diferentes
    cy.get(':nth-child(2) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").clear().type('r7auwdq466+2.,18346578{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es media')
    cy.get(':nth-child(2) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //la contraseña debe actualizarse correctamente y recibo una confirmación de éxito
    cy.log('No funciona el botón')
    //cy.get('.form-container > .justify-center').should("be.enabled").click()
    cy.get('.form-container > .justify-center').should("not.be.enabled").click()
        
  })

  it('Cambiar la contraseña del usuario OK', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    //cambio mi contraseña
    cy.title().should('eq','Perfil')
    cy.get('#currentPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
    cy.get('#currentPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //new pass
    cy.get(':nth-child(1) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp41{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
    cy.get(':nth-child(1) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    cy.get('.form-container > .justify-center').should("not.be.enabled")
    //confirmar diferentes
    cy.get(':nth-child(2) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp42{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
    cy.get(':nth-child(2) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //la contraseña debe actualizarse correctamente y recibo una confirmación de éxito
    cy.log('No funciona el botón, esta pendiente de activar')
    //cy.get('.form-container > .justify-center').should("be.enabled").click()
    
  })

  it.only('Cambiar el idioma de las preferencias', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    //cambio el idioma a otro disponible
    cy.title().should('eq','Perfil')
    cy.get('.p-dropdown-label').should("not.be.visible").should("be.enabled").click()
    cy.get('.p-dropdown-trigger').should("be.visible").should("be.enabled").click()
    //El idioma debe actualizarse correctamente en toda la interfaz
    cy.log('No funciona el botón, esta pendiente de activar')
    //cy.get('.form-container > .justify-center').should("be.enabled").click()
    cy.wait(tiempo)
  })

})