describe('Transacciones Manuales', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-management"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-management > :nth-child(3)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })  

    it('Venta aceptada - Se completa la transacción correctamente', () => {
            
        cy.get('#inputMonto').type('100'); // Simula ingresar monto
        cy.get('#btnProcesarVenta').click(); // Clic en botón de procesar venta
    
        cy.wait(tiempo);
    
        cy.get('.mensajeExito').should('be.visible'); // Verifica mensaje de éxito
        cy.get('.mensajeExito').should('contain', 'Venta aceptada'); // Valida el texto
    });
    
    it('Venta denegada - No se completa la transacción', () => {
            
        cy.get('#inputMonto').type('99999'); // Simula ingresar un monto que cause rechazo
        cy.get('#btnProcesarVenta').click();
    
        cy.wait(tiempo);
    
        cy.get('.mensajeError').should('be.visible'); // Verifica mensaje de error
        cy.get('.mensajeError').should('contain', 'Venta denegada'); // Valida el texto
    });
    
    it('Visualización de detalle de operaciones - Se visualiza correctamente y se genera ticket', () => {
            
        cy.get('#btnVerDetalle').click(); // Clic en botón para ver detalle
    
        cy.wait(tiempo);
    
        cy.get('.detalleOperacion').should('be.visible'); // Verifica que se muestra el detalle
        cy.get('.detalleOperacion').should('contain', 'Detalles de la operación'); // Valida contenido
    
        cy.get('#btnGenerarTicket').click(); // Genera ticket
        cy.get('.mensajeExito').should('contain', 'Ticket generado correctamente'); // Valida ticket generado
    });    
    

});