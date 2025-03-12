const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");

describe(' Botón de búsqueda', () => { 
  /*  
  Como usuario del sistema bancario
  Quiero usar el botón de búsqueda para encontrar información relevante
  Para obtener resultados rápidamente según mis criterios
  */
  let tiempo= 1000
  beforeEach('Entrar en la página', () => {
    //PAGINA
    cy.visit('https://newfront.lab.solverpay.com/login'); 
    cy.title().should('eq','Login')
    //LOGIN
    cy.get('#email').should("be.visible").should("be.enabled").type('solverpay@prueba.qa.com')
    cy.get('#password').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
    cy.wait(tiempo)
  })
  it('El botón de búsqueda es visible y clicable', () => {
    /*
    Scenario: El botón de búsqueda es visible y clicable
    Given que estoy en la página principal 
    Then el botón de búsqueda debería estar visible
    And el botón de búsqueda debería ser clicable
    */
    cy.title().should('eq','Panel de control')
    cy.wait(tiempo)
    cy.get('.gap-x-6 > .gap-2').should("be.visible").should("be.enabled").click()

    cy.log('No funciona el botón, para salir de la busqueda')
    //cy.get("boton de cerrar").should("be.enabled").should("be.enabled").click()  
  })
  it('Buscar un término inexistente', () => {
    /*
    Scenario: Buscar un término inexistente
    Given que estoy en la página principal 
    When ingreso el término "inexistente" en el campo de búsqueda
    And presiono el botón búsqueda
    Then debería ver un mensaje indicando que no hay resultados
    */
    cy.title().should('eq','Panel de control')
    cy.wait(tiempo)
    cy.get('.gap-x-6 > .gap-2').should("be.visible").should("be.enabled").type('inexistente')
    
    cy.log('No funciona el botón, para salir de la busqueda')
    //cy.get("boton de cerrar").should("be.enabled").should("be.enabled").click()  
    cy.wait(tiempo)
    cy.get('.fixed > .w-full > .flex').type('{esc}')
    cy.wait(tiempo)
  })
  it('Realizar una búsqueda con resultados válidos', () => {
    /*
    Scenario: Realizar una búsqueda con resultados válidos
    Given que estoy en la página principal 
    When ingreso el término "transacciones" en el campo de búsqueda
    And presiono el botón de búsqueda
    Then deberían mostrarse los resultados relacionados con "transacciones"
    */
    cy.title().should('eq','Panel de control')
    cy.wait(tiempo)
    cy.get('.gap-x-6 > .gap-2').should("be.visible").should("be.enabled").type('transacciones')
    
    cy.log('No funciona el botón, para salir de la busqueda')
    //cy.get("boton de cerrar").should("be.enabled").should("be.enabled").click()  
    cy.wait(tiempo)

    // Número total de elementos a recorrer
    const totalElementos = 5; 
    // Recorrer los elementos usando un ciclo for
    for (let i = 1; i <= totalElementos; i++) {
      // Construir el selector dinámicamente para cada elemento      
      cy.get(`.max-h-\\[60vh\\] > :nth-child(${i})`).then((elemento) => {
        // Aquí puedes cambiar el nombre o hacer alguna acción
        // Por ejemplo, cambiar el texto de un campo si es un elemento editable
        //cy.wrap(elemento).invoke('text', `Nuevo nombre para el elemento ${i}`);
        //cy.wait(tiempo)
        // O si necesitas cambiar el atributo de algún otro tipo, como un "title"
        //cy.wrap(elemento).invoke('attr', 'title', `Elemento número ${i}`);
        cy.get(`:nth-child(${i}) > .gap-1 > .flex-col > .font-medium`).invoke('text').then((textoItem1) => {
          cy.get(`.max-h-\\[60vh\\] > :nth-child(${i})`).should("be.visible").click()
          cy.wait(tiempo)
          cy.get(`.gap-x-4 > .text-lg`).invoke('text').then((textoItem2) => {
            // Comparar los textos
            //expect(textoItem1.trim()).to.equal(textoItem2.trim());
            // Comparar los textos
            if (textoItem1.trim() === textoItem2.trim()) {
              cy.log('Los textos son iguales:', textoItem1.trim()); // Log en Cypress
            } else {
              cy.log('Los textos no son iguales.');
            }
            // Aserción con Cypress
            expect(textoItem1.trim()).to.equal(textoItem2.trim());
          });          
        });
      });            
      cy.get('.gap-x-6 > .gap-2').should("be.visible").should("be.enabled").type('transacciones')
    }
    //cy.get(':nth-child(2) > .gap-1 > .flex-col > .font-medium').should("be.visible").click()
    cy.get('.fixed > .w-full > .flex').type('{esc}')
    cy.wait(tiempo)
  })
  it('Realizar una búsqueda sin resultados', () => {
    /*
    Scenario: Realizar una búsqueda sin resultados
    Given que estoy en la página principal 
    When ingreso "noexistente" en el campo de búsqueda
    And presiono el botón de búsqueda
    Then debería mostrarse un mensaje indicando "No se encontraron resultados"
    */
    cy.title().should('eq','Panel de control')
    cy.wait(tiempo)
    cy.get('.gap-x-6 > .gap-2').should("be.visible").should("be.enabled").type('noexistente')
    
    cy.log('No funciona el botón, para salir de la busqueda')
    //cy.get("boton de cerrar").should("be.enabled").should("be.enabled").click()  
    cy.wait(tiempo)

    //Comprobar resultado correcto
    cy.get('.fixed > .w-full > .text-center').should("be.visible").should('have.text',' No se encontraron resultados ')
    cy.get('.fixed > .w-full > .flex').type('{esc}')
    cy.wait(tiempo)
  })
  it('Manejo de entradas inválidas', () => {
    /*
    Scenario: Manejo de entradas inválidas
    Given que estoy en la página principal 
    When ingreso caracteres especiales "@#$%^" en el campo de búsqueda
    And presiono el botón de búsqueda
    Then debería mostrarse un mensaje indicando "Entrada no válida"
    */
    cy.title().should('eq','Panel de control')
    cy.wait(tiempo)
    cy.get('.gap-x-6 > .gap-2').should("be.visible").should("be.enabled").type('@#$%^')
    
    cy.log('No funciona el botón, para salir de la busqueda')
    //cy.get("boton de cerrar").should("be.enabled").should("be.enabled").click()  
    cy.wait(tiempo)

    //Comprobar resultado correcto
    cy.get('.fixed > .w-full > .text-center').should("be.visible").should('have.text',' No se encontraron resultados ')
    cy.get('.fixed > .w-full > .flex').type('{esc}')
    cy.wait(tiempo)
  })
})









