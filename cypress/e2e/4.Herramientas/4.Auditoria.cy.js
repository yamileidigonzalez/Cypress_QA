describe('Auditoria', () => {
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
        cy.get('#submenu-management > :nth-child(4)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })  

    it('Mostrar el listado de registros - Se debe mostrar el listado completo', () => {         // Cambia esto con la URL correcta
    
        cy.get('#btnMostrarListado').click(); // Botón para mostrar el listado
    
        cy.wait(tiempo);
    
        cy.get('.tablaRegistros').should('be.visible'); // Verifica que la tabla se muestra
        cy.get('.tablaRegistros tr').should('have.length.greaterThan', 1); // Asegura que hay registros en la tabla
    });
    
    it('Aplicar filtros - Obtener el listado esperado', () => {        
    
        cy.get('#filtroFecha').type('2024-02-18'); // Aplica filtro por fecha (ajusta el formato según sea necesario)
        cy.get('#filtroEstado').select('Aprobado'); // Aplica filtro por estado
    
        cy.get('#btnAplicarFiltros').click();
    
        cy.wait(tiempo);
    
        cy.get('.tablaRegistros').should('be.visible');
        cy.get('.tablaRegistros tr').should('contain', 'Aprobado'); // Verifica que los resultados filtrados sean correctos
    });
    
    it('Exportación a Excel - Obtener correctamente el archivo', () => {        
    
        cy.get('#btnExportarExcel').click(); // Botón de exportación
    
        cy.wait(tiempo);
    
        // Verifica que el archivo se haya descargado (Cypress no puede validar descargas directamente, pero puedes revisar la respuesta del backend)
        cy.readFile('cypress/downloads/informe.xlsx').should('exist');
    });    
    
});