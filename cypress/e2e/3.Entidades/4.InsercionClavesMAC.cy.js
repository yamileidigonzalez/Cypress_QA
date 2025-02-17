describe('Insercion Claves MAC', () => {
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
        cy.get('#submenu-entity > :nth-child(4)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })

    it('Debe insertar una clave MAC correctamente', () => {
        // Hacer clic en el botón para agregar una nueva clave MAC
        cy.contains('button', 'Agregar Clave MAC').should('be.visible').click();

        // Verificar que el modal o formulario de inserción esté visible
        cy.get('.modal-insertar-mac, .formulario-clave-mac') // Ajusta el selector si es necesario
            .should('be.visible');

        // Ingresar una clave MAC válida
        const claveMAC = '00:1A:2B:3C:4D:5E'; // Ejemplo de una MAC válida
        cy.get('input[name="claveMac"]').type(claveMAC);

        // Confirmar la acción (suponiendo que hay un botón de Guardar o Confirmar)
        cy.contains('button', 'Guardar').click();

        // Esperar respuesta si la inserción es asíncrona (por API)
        cy.intercept('POST', '/api/clave-mac').as('insertarMac'); // Ajusta la URL de la API
        cy.wait('@insertarMac').its('response.statusCode').should('eq', 200);

        // Verificar que la clave MAC se añadió correctamente a la lista
        cy.get('.lista-claves-mac').should('be.visible')
            .contains(claveMAC).should('exist');

        // Confirmar mensaje de éxito si aplica
        cy.contains('Clave MAC añadida correctamente').should('be.visible');
    });
      
    
})