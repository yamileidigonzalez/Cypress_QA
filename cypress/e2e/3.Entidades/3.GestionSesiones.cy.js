describe('Gestion de Secciones', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-entity"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-entity > :nth-child(3)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })

    it('Debe mostrar el listado de sesiones abiertas con su estado correcto', () => {
        // Navegar hasta la sección de sesiones abiertas si es necesario
        cy.contains('h1', 'Sesiones Abiertas').should('be.visible'); // Ajusta el selector si es necesario

        // Verificar que la lista de sesiones se carga y tiene elementos
        cy.get('.lista-sesiones') // Ajusta el selector de la tabla o lista de sesiones
          .should('be.visible')
          .find('.sesion-item')
          .should('have.length.greaterThan', 0);

        // Verificar que cada sesión tiene un estado visible y correcto
        cy.get('.sesion-item').each(($el) => {
            cy.wrap($el).find('.estado-sesion')
                .should('be.visible')
                .invoke('text')
                .should('match', /(Activa|Inactiva|Expirada)/); // Ajusta según los estados posibles
        });
    });

    it('Debe realizar una petición de totales y completarse correctamente', () => {
        // Hacer clic en el botón para solicitar los totales
        cy.contains('button', 'Petición de totales').should('be.visible').click();

        // Interceptar la petición a la API si aplica
        cy.intercept('GET', '/api/totales').as('getTotales'); // Ajusta la URL de la API
        cy.wait('@getTotales').its('response.statusCode').should('eq', 200);

        // Verificar que los totales se han cargado correctamente en la UI
        cy.get('.total-resultados').should('be.visible').and('not.have.text', '0');

        // Verificar mensaje de éxito si es aplicable
        cy.contains('Totales calculados correctamente').should('be.visible');
    });
    
})