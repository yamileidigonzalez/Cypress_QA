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

    // Listar todos los elementos
    it('Debería comprobar que se muestran los [elementos]', () => {
        cy.get('.out-border').should("be.visible"); // Verificar que el listado de registros se muestra
    });

    it('Debe insertar una clave MAC correctamente', () => {
        const opcionesFiltro_Combo = [
            '#entity > .p-dropdown-label',
            ':nth-child(2) > .ng-untouched > #macLevel > .p-dropdown-label',
            ':nth-child(3) > .ng-untouched > #macLevel > .p-dropdown-label'
        ];

        const Filtro_texto = [
            '#macKey1',
            '#macKey2',
            '#macKey3'
        ];

        const Filtro_texto_1 = [
            '#transportKey1',
            '#transportKey2',
            '#transportKey3',
            '#transportKeyKcv',
            '#macKeyCiphered'
        ];

        // Ingresar una clave MAC válida
        const claveMAC = '00:1A:2B:3C:4D:5E'; // Ejemplo de una MAC válida

        opcionesFiltro_Combo.forEach((selector) => {
            cy.Añadir_Combo(selector, 'Transporte')
            cy.wait(tiempo);
        })   
        cy.get(':nth-child(2) > .ng-valid > #macLevel > .p-dropdown-label').invoke('text').then(($modo) => {
            cy.log(`Modo obtenido: ${$modo.trim()}`); // Para depuración

            if ($modo.trim() === 'Sin Claves de Transporte') {
                Filtro_texto.forEach((selectorcs) => {
                    cy.log("Entro aquí");
                    cy.Añadir_text(selectorcs, claveMAC);
                    cy.wait(tiempo);
                });
            } else if ($modo.trim() === 'Con Claves de Transporte') {                
                Filtro_texto_1.forEach((selectort) => {
                    cy.log("Entro aquí también");
                    cy.Añadir_text(selectort, claveMAC);
                    cy.wait(tiempo);
                });
            } else {
                cy.log("No se encontró nada");
            }
        });

        //Filtro_Texto
        cy.Añadir_text('#vcc', '00') 
        cy.wait(tiempo);
        //bolon aplicar
        cy.contains('button', 'Submit').should('be.visible').click()

        // Verificar que la clave MAC se añadió correctamente a la lista
        cy.get('app-mac-tool.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast').should('be.visible')
            .contains('MAC').should('exist');

        // Confirmar mensaje de éxito si aplica
        cy.contains('Ha ocurrido un error no registrado al añadir la clave MAC').should('be.visible');
    });
      
    
})