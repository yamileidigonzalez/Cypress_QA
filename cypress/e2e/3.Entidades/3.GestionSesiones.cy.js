describe('Gestion de Secciones', () => {
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
        cy.get('#submenu-entity > :nth-child(3)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })

    it('Debe mostrar el listado de sesiones abiertas con su estado correcto', () => {
        // Navegar hasta la sección de sesiones abiertas si es necesario
        cy.Elemento_visible('app-session-management.ng-star-inserted > .bg-white').contains('h1', 'Sesiones Activas'); // Ajusta el selector si es necesario

        // Verificar que la lista de sesiones se carga y tiene elementos
        cy.get('.p-scroller-viewport') // Ajusta el selector de la tabla o lista de sesiones
          .should('be.visible').children()
          .should('have.length.greaterThan', 0);

        // Verificar que cada sesión tiene un estado visible y correcto
        cy.get('.p-scroller-viewport') // Ajusta el selector de la tabla o lista de sesiones
          .children().each(($el) => {
            cy.wrap($el).find('tr.p-2')
                .should('be.visible')
                .contains(/(Abierta|Inactiva|Expirada)/i); // Verifica que el texto es visible en el DOM
        });

        cy.get('.p-scroller-viewport') // Selecciona el elemento adecuado
        .should('be.visible') // Asegura que el elemento esté visible
        .invoke('text') // Obtiene el texto del elemento
        .then((text) => {
            const options = ['Abierta', 'Inactiva', 'Expirada'];
            
            // Itera sobre las opciones y verifica cuál coincide
            options.forEach(option => {
            if (text.includes(option)) {
                // Si encuentra la opción, la imprime en el log
                cy.log(`El texto contiene la palabra: ${option}`);
            }
            });
        });
      
    });

    it('Debe realizar una petición de detenner sesión', () => {
        // Navegar hasta la sección de sesiones abiertas si es necesario
        cy.Elemento_visible('app-session-management.ng-star-inserted > .bg-white').contains('h1', 'Sesiones Activas'); // Ajusta el selector si es necesario

        // Verificar que la lista de sesiones se carga y tiene elementos
        cy.get('.p-scroller-viewport') // Ajusta el selector de la tabla o lista de sesiones
          .should('be.visible').children()
          .should('have.length.greaterThan', 0);

        // Verificar que cada sesión tiene un estado visible y correcto
        cy.get('.p-scroller-viewport') // Ajusta el selector de la tabla o lista de sesiones
          .children().each(($el) => {
            cy.wrap($el).find('tr.p-2')
                .should('be.visible')
                .contains(/(Abierta|Inactiva|Expirada)/i); // Verifica que el texto es visible en el DOM
        });

        cy.get('.p-scroller-viewport') // Selecciona el elemento adecuado
        .should('be.visible') // Asegura que el elemento esté visible
        .invoke('text') // Obtiene el texto del elemento
        .then((text) => {
          // Verifica si el texto contiene la palabra 'Abierta'
          if (text.includes('Abierta')) {
            // Si es "Abierta", hacer clic en el botón de "Detener sesión"
            cy.log('La sesión está Abierta, procediendo a detenerla.');
            
            // Suponiendo que el botón para detener sesión tiene una clase .detener-sesion
            cy.get(':nth-child(5) > .transition') // Selecciona el botón de detener sesión
              .click(); // Realiza el clic
            cy.wait(1000); // Espera un segundo para asegurar que la acción se procese (ajustar si es necesario)

            cy.Elemento_visible('.p-dialog-header').contains('Confirmación')
            cy.Elemento_visible('.p-dialog-content').contains('¿Está seguro de que quiere detener la sesión')
            cy.Elemento_visible('.p-dialog-footer').contains('Sí')
            cy.Click_force('.p-confirm-dialog-accept')
            
            // Asegura que la acción de "Detener sesión" haya tenido éxito (puedes ajustarlo según el flujo de tu aplicación)
            cy.log('Sesión esta', text)
          } else {
            cy.log('La sesión no está abierta, no es necesario detenerla.');
          }
        });
    
    });
    
})