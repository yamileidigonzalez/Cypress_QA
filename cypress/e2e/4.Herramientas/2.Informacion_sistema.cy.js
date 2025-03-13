describe('Informacion del Sistema', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login()
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-management"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-management > :nth-child(2)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })  
    
    it('Consulta de estado de CPU - Ejecutar la consulta correctamente', () => {  
        cy.Elemento_visible_varios('.grid > :nth-child(1)') // Selector del botón de consulta de CPU
        cy.wait(tiempo);
    
        cy.Elemento_visible(':nth-child(1) > .space-y-2') // Verifica que la tabla de CPU es visible
        cy.Elemento_visible(':nth-child(1) > .space-y-2 > .text-5xl') //%
        cy.Elemento_visible(':nth-child(1) > .space-y-2 > .text-gray-600').should('contain', 'Uso actual de CPU');
        cy.Elemento_visible('.bg-blue-500') //barra
        cy.get('.grid > :nth-child(1) > .flex > .text-lg').should('contain', 'CPU'); // Validación de contenido
    });
    
    it('Consulta de estado de Disco - Ejecutar la consulta correctamente', () => {            
        cy.Elemento_visible('.grid > :nth-child(2)').click({ multiple: true }); // Selector del botón de consulta de disco
        cy.wait(tiempo);
    
        cy.Elemento_visible(':nth-child(2) > .space-y-2') // Verifica que la tabla de CPU es visible
        cy.Elemento_visible(':nth-child(2) > .space-y-2 > .text-5xl') //%
        cy.Elemento_visible(':nth-child(2) > .space-y-2 > .text-gray-600').should('contain', 'Uso actual de disco');
        cy.Elemento_visible('.bg-green-500') //barra
        cy.get('.grid > :nth-child(2) > .flex > .text-lg').should('contain', 'Disco'); // Validación de contenido
    });

    it('Consulta Sistema de Archivos', () => {  
        cy.Elemento_visible_varios('.border-b-2').click({ multiple: true }); // Selector del botón de consulta de CPU
        cy.wait(tiempo);
    
        cy.Elemento_visible('.space-y-6 > .ng-star-inserted > .p-6').should('contain', 'Sistema de Archivos'); 
        // Validación de contenido
        cy.Elemento_visible('.text-left > :nth-child(1)').should('contain', 'Sistema de Archivos');
        cy.Elemento_visible('.text-left > :nth-child(2)').should('contain', 'Tamaño');
        cy.Elemento_visible('.text-left > :nth-child(3)').should('contain', 'Disponible');
        cy.Elemento_visible('.text-left > :nth-child(4)').should('contain', 'Uso');
        cy.Elemento_visible('.text-left > :nth-child(5)').should('contain', 'Estado');

    });

    it('Consulta Procesos', () => {  
        cy.Elemento_visible('.-mb-px').contains('Procesos').click({ multiple: true })
        cy.wait(tiempo);
    
        cy.Elemento_visible('.space-y-6 > .ng-star-inserted > .p-6').should('contain', 'Procesos activos'); // Verifica que la tabla de CPU es visible
        // Validación de contenido
        cy.Elemento_visible('.text-left > :nth-child(1)').should('contain', 'PID'); 
        cy.Elemento_visible('.text-left > :nth-child(2)').should('contain', 'Uso');
        cy.Elemento_visible('.text-left > :nth-child(3)').should('contain', 'Comando');
    });

});
  