const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");

describe('Visualización de gráficos', () => { 
  /*
  Como usuario del sistema bancario
  Quiero visualizar gráficos en tiempo real
  Para comprender el estado actual de los datos financieros
  */
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

  it.only('Visualización del gráfico de ventas últimas horas', () => {
    /*
        Given que estoy en la página principal
    Then el gráfico "Ventas últimas horas" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })

  it('Visualización del gráfico de denegadas última hora', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Denegadas última hora" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })

  it('Visualización del gráfico de diferidos última hora', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Diferidos última hora" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })
  
  it('Visualización del gráfico de estado del offline forzado', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Estado del offline forzado" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })

  it('Visualización del gráfico de estado del backup forzado', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Estado del backup forzado" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })
   
  it('Visualización del gráfico de estado de las comisiones', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Estado de las comisiones" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })
   
  it('Visualización del gráfico de transacciones por tipo', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Transacciones por tipo" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })

  it('Visualización del gráfico de transacciones por entidad', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Transacciones por entidad" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })
   
  it('Visualización del gráfico de transacciones por fechas diario', () => {
    /*
       Given que estoy en la página principal
    Then el gráfico "Transacciones por fechas diario" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })

  it('Visualización del gráfico de transacciones por fechas mensual', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Transacciones por fechas mensual" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })
    
  it('Visualización del gráfico de importe por fechas diario', () => {
    /*
     Given que estoy en la página principal
    Then el gráfico "Importe por fechas diario" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })
       
  it('Visualización del gráfico de importe por fechas mensual', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Importe por fechas mensual" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.visit('[url]')
    cy.title().should('eq','[titulo]')
    cy.wait(tiempo)
  })
  
})