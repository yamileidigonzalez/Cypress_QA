describe('Gestion de Procesos', () => {
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
        cy.get('#submenu-management > :nth-child(1)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })
  
    it('Relanzar procesos - Ejecutar el relanzado de procesos', () => { 
        cy.get('.bg-neutral-950').click(); // Selector del botón de relanzar procesos
        cy.wait(tiempo);  // Espera de tiempo para que se procese
    
        // Verifica que el spinner aparece mientras se actualiza
        cy.Elemento_visible('.animate-spin'); // Espera a que el spinner esté visible
    
        // Espera a que el spinner desaparezca, lo que indica que la actualización terminó
        cy.get('.animate-spin', { timeout: 10000 }).should('not.exist'); // Espera 10 segundos
    
        // Opcional: Verificar que el mensaje de éxito aparezca después del proceso
        cy.get('.mensajeExito').should('contain', 'Proceso relanzado correctamente'); // Validación de éxito
    });
    
    it('Actualizar procesos - Ejecutar el actualizar procesos', () => {
        cy.get('.w-full > .gap-4 > .text-center').click(); // Selector del botón de relanzar procesos
        cy.wait(tiempo);  // Espera de tiempo para que se procese
    
        // Verifica que el spinner aparece mientras se actualiza
        cy.Elemento_visible('.animate-spin') // Espera a que el spinner esté visible
    
        // Espera a que el spinner desaparezca, lo que indica que la actualización terminó
        cy.get('.animate-spin', { timeout: 10000 }).should('not.exist'); // Espera 10 segundos
    
        // Opcional: Verificar que el mensaje de éxito aparezca después del proceso
        cy.get('.mensajeExito').should('contain', 'Proceso relanzado correctamente'); // Validación de éxito
    });
    /*
    it('Consulta de estado de procesos - Ejecutar la consulta de estado de procesos', () => {        
      cy.get('#btnConsultarEstado').click(); // Selector del botón de consulta
      cy.wait(tiempo);  
      cy.get('.tablaProcesos').should('be.visible'); // Verifica que la tabla de procesos se muestra
      cy.get('.tablaProcesos').should('contain', 'Proceso en ejecución'); // Validación de contenido
    });
    */
});
  