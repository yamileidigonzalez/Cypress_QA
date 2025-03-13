describe('Transacciones Manuales', () => {
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
        cy.get('#submenu-management > :nth-child(3)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })  

    it('Venta aceptada - Se completa la transacción correctamente', () => {
        //Añadir datos ok
        cy.Añadir_Transaccion_Manual('9311111111111111', '10', '11','11','1','1', '02/2026','Venta')
        //boton Aplicar
        cy.contains('button', 'Añadir transacción').should('be.visible').click()   
        cy.wait(tiempo);

        //boton Cancelar
        cy.Click_force('[icon="pi pi-arrow-left"] > .p-ripple')
        cy.wait(tiempo);

        //Añadir datos ok
        cy.Añadir_Transaccion_Manual('4918019000000201', '10', '11','11','1','1', '02/2026','Venta')
        //boton Aplicar
        cy.contains('button', 'Añadir transacción').should('be.visible').click()   
        cy.wait(tiempo);

        //boton Confirmar
        cy.Click_force('[icon="pi pi-check"] > .p-ripple')
        cy.wait(tiempo);

        // Verifica mensaje de éxito
        cy.get('.ng-tns-c3576075022-9 > .bg-white > .flex-col')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra

            if (toastText.includes('Venta aceptada')) {
            cy.log("OK");
            } else if (toastText.includes('Operación rechazada')) {
            cy.log("KO");
            } else {
            cy.log("Otro mensaje: " + toastText);
            }
        });        
    });

    it('Devolucion aceptada - Se completa la transacción correctamente', () => {
        //Añadir datos ok
        cy.Añadir_Transaccion_Manual('9311111111111111', '10', '11','11','1','1', '02/2026','Devolucion')
        //boton Aplicar
        cy.contains('button', 'Añadir transacción').should('be.visible').click()   
        cy.wait(tiempo);

        //boton Cancelar
        cy.Click_force('[icon="pi pi-arrow-left"] > .p-ripple')
        cy.wait(tiempo);

        //Añadir datos ok
        cy.Añadir_Transaccion_Manual('9311111111111111', '10', '11','11','1','1', '02/2026','Devolucion')
        //boton Aplicar
        cy.contains('button', 'Añadir transacción').should('be.visible').click()   
        cy.wait(tiempo);

        //boton Confirmar
        cy.Click_force('[icon="pi pi-check"] > .p-ripple')
        cy.wait(tiempo);

        // Verifica mensaje de éxito
        cy.get('.ng-tns-c3576075022-9 > .bg-white > .flex-col')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra

            if (toastText.includes('Venta aceptada')) {
            cy.log("OK");
            } else if (toastText.includes('Operación rechazada')) {
            cy.log("KO");
            } else {
            cy.log("Otro mensaje: " + toastText);
            }
        });        
    });
    
    it('Venta denegada - No se completa la transacción', () => {
        cy.Click_force('.m-4 > [severity="secondary"] > .p-ripple')
        //Añadir datos ok
        cy.Añadir_Transaccion_Manual('11111111111', '1', '1','1','1','1', '02/2026','Venta')
         //boton Aplicar
         //Comprobar parametros
         cy.contains('button', 'Añadir transacción').should('not.be.enabled').then(() => {
            // Verificar si el mensaje de error está visible
            cy.get('.text-red-600').then(($element) => {
                if ($element.is(':visible')) {
                    cy.log('boton desactivado, arregla valores');
                    // Escribir el número de tarjeta en el campo
                    cy.get('#card').clear().type('1122334455667788');
                } else {
                    cy.log('No hay problemas');
                }
            });
        });
        //boton Confirmar
        cy.Click_force('[severity="primary"] > .p-ripple')
        cy.Click_force('[icon="pi pi-check"] > .p-ripple')
        cy.wait(tiempo);

        // Verifica mensaje de éxito
        cy.get('.ng-tns-c3576075022-9 > .bg-white > .flex-col')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra

            if (toastText.includes('Venta aceptada')) {
            cy.log("OK");
            } else if (toastText.includes('Operación rechazada')) {
            cy.log("KO");
            } else {
            cy.log("Otro mensaje: " + toastText);
            }
        });
    });

    it('Devolucion denegada - No se completa la transacción', () => {
        cy.Click_force('.m-4 > [severity="secondary"] > .p-ripple')
        //Añadir datos ok
        cy.Añadir_Transaccion_Manual('1111111', '1', '1','1','1','1', '02/2026','Devolucion')
        //boton Aplicar
         //Comprobar parametros
         cy.contains('button', 'Añadir transacción').should('not.be.enabled').then(() => {
            // Verificar si el mensaje de error está visible
            cy.get('.text-red-600').then(($element) => {
                if ($element.is(':visible')) {
                    cy.log('boton desactivado, arregla valores');
                    // Escribir el número de tarjeta en el campo
                    cy.get('#card').clear().type('1122334455667788');
                } else {
                    cy.log('No hay problemas');
                }
            });
        });
        //boton Confirmar
        cy.Click_force('[severity="primary"] > .p-ripple')
        cy.Click_force('[icon="pi pi-check"] > .p-ripple')
        cy.wait(tiempo);

        // Verifica mensaje de éxito
        cy.get('.ng-tns-c3576075022-9 > .bg-white > .flex-col')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra

            if (toastText.includes('Venta aceptada')) {
            cy.log("OK");
            } else if (toastText.includes('Operación rechazada')) {
            cy.log("KO");
            } else {
            cy.log("Otro mensaje: " + toastText);
            }
        });
    });
    
    it('Visualización de detalle de operaciones - Se visualiza correctamente y se genera ticket', () => {
            
        cy.Elemento_visible('.flex.flex-col.w-\\[300px\\].h-\\[400px\\]')
        // Clic en botón para ver detalle    
        cy.wait(tiempo);
        cy.contains('p', 'Ticket no disponible').should('be.visible');

        cy.get('.flex.flex-col.w-\\[300px\\].h-\\[400px\\]')
        .should('be.visible')
        .contains('Ticket no disponible');

        //boton Imprimir
        cy.contains('button', 'Imprimir ticket').should('be.visible')
        cy.contains('button', 'Imprimir ticket').should('be.disabled');
  
        cy.wait(tiempo);

        cy.log('No existe ticket "KO"')

        /*    
        cy.get('.detalleOperacion').should('be.visible'); // Verifica que se muestra el detalle
        cy.get('.detalleOperacion').should('contain', 'Detalles de la operación'); // Valida contenido
    
        cy.get('#btnGenerarTicket').click(); // Genera ticket
        cy.get('.mensajeExito').should('contain', 'Ticket generado correctamente'); // Valida ticket generado
        */
    });   
    
});