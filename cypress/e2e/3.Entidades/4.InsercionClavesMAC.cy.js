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

    it.only('Debe insertar una clave MAC correctamente', () => {
        const opcionesFiltro_Combo = [
            '#entity > .p-dropdown-label',
            ':nth-child(2) > .ng-untouched > #macLevel > .p-dropdown-label',
            ':nth-child(3) > .ng-untouched > #macLevel > .p-dropdown-label'
        ];

        const opcionesFiltro_texto = [
            '#macKey1',
            '#macKey2',
            '#macKey3'
        ];

        const opcionesFiltro_texto_1 = [
            '#transportKey1',
            '#transportKey2',
            '#transportKey3',
            '#transportKeyKcv',
            '#macKeyCiphered'
        ];

        // Ingresar una clave MAC válida
        const claveMAC = '00:1A:2B:3C:4D:5E'; // Ejemplo de una MAC válida

        opcionesFiltro_Combo.forEach((selectorc) => {
            cy.Añadir_Combo(selectorc, '44')
            cy.wait(tiempo);
        })   
        cy.get(':nth-child(2) > .ng-valid > #macLevel > .p-dropdown-label').then(($modo) => {
            if($modo === 'Sin Claves de Transporte'){
                cy.Añadir_Combo('.ng-untouched > #macLevel > .p-dropdown-label', '2')
                opcionesFiltro_texto.forEach((selectorc) => {
                    cy.Añadir_Combo(selectorc, claveMAC)
                    cy.wait(tiempo);
                })
            } else if($modo === 'Con Claves de Transporte'){
                cy.Añadir_Combo('.ng-untouched > #macLevel > .p-dropdown-label', '2')
                opcionesFiltro_texto.forEach((selectorc) => {
                    cy.Añadir_Combo(selectorc, claveMAC)
                    cy.wait(tiempo);
                })
                opcionesFiltro_texto_1.forEach((selectort) => {
                    cy.Añadir_Combo(selectort, claveMAC)
                    cy.wait(tiempo);
                })
            } else {
                cy.log("No se encontro nada")
            }
        })

        //Filtro_Texto
        cy.Añadir_text('#vcc', '00') 
        cy.wait(tiempo);
        //bolon aplicar
        cy.contains('button', 'Submit').should('be.visible').click()
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 3);
        cy.get('.p-scroller').should('have.length.greaterThan', 0);  
        
        

        // Verificar que el modal o formulario de inserción esté visible
        cy.get('.modal-insertar-mac, .formulario-clave-mac') // Ajusta el selector si es necesario
            .should('be.visible');

        
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