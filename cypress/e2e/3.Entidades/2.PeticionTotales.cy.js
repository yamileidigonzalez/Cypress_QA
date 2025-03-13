describe('Peticiones Totales', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login()
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-entity"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-entity > :nth-child(2)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })

    it('Debe realizar una petición de totales y completarse correctamente', () => {
        // Hacer clic en el botón para solicitar los totales
        cy.contains('button', 'Petición de totales').should('be.visible').click();

        // Esperar la respuesta de la petición (si se hace por API, interceptar la solicitud)
        cy.intercept('GET', '/api/totales').as('getTotales'); // Ajusta la URL según la API real
        cy.wait('@getTotales').its('response.statusCode').should('eq', 200);

        // Verificar que los totales se han cargado correctamente en la UI
        cy.get('.total-resultados').should('be.visible').and('not.have.text', '0');

        // Mensaje de éxito si aplica
        cy.contains('Totales calculados correctamente').should('be.visible');
    });

})