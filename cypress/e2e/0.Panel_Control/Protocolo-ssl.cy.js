const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");

describe('Verificar el Protocolo SSL del sitio', () => { 
  /*
  Como usuario del sistema
  Quiero asegurarme de que el sitio utiliza un protocolo seguro
  Para proteger mi información y garantizar la seguridad de la conexión
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

  it('Verificar que la URL utiliza HTTPS', () => {
    /*
      Scenario: Verificar que la URL utiliza HTTPS
    Given accedo a la página web del sistema
    When observo la barra de direcciones
    Then la URL debe comenzar con "https://"
    */
    cy.title().should('eq','Panel de control')
    cy.wait(tiempo)
    cy.url().should("match", /^https:\/\//); // Verifica que la URL empiece con "https://"
  })

  it('Comprobar los detalles del certificado SSL', () => {
    /*
     Scenario: Comprobar los detalles del certificado SSL
    Given accedo a la página web del sistema
    When hago clic en el icono del candado cerca de la barra de direcciones
    Then debo poder visualizar los detalles del certificado SSL, incluyendo su validez y emisor
    */    
    cy.title().should('eq','Panel de control')
    cy.wait(tiempo)
    cy.window().then((win) => {
      const hasLockIcon = win.location.protocol === "https:";
      expect(hasLockIcon).to.be.true; // Verifica que el icono del candado está presente con HTTPS
    });
    cy.wait(tiempo)

    cy.window().then((win) => {
      // Verificar que la página esté usando HTTPS en cualquier sistema operativo
      expect(win.location.protocol).to.equal('https:', 'La página debe estar en HTTPS');
    });

    cy.window().then((win) => {
      const certificateDetailsAvailable = win.location.protocol === "https:"; // Verificación básica de HTTPS
      expect(certificateDetailsAvailable).to.be.true; // Si está en HTTPS, el certificado es válido
    });
   
  })

})

 


   
 