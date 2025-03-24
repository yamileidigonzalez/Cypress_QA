
describe('GESTION', () => {
    
    const tiempo = 1000;
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login()
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('.main-item.ng-star-inserted').should("be.visible").click()
        cy.wait(tiempo)

    }) 

    it('Activar offline - Se activa y muestra correctamente', () => {
        cy.Elemento_visible('.ng-invalid > .mb-6'); // Verifica mensaje de éxito
        cy.contains('.p-highlight > .p-button-label', 'Operativa Offline').click( {force: true}); //Desactivo
        cy.contains('[tabindex="0"] > .p-button-label', 'Operativa Offline').click( {force: true}); //Activo          
        cy.wait(tiempo);
        cy.Elemento_visible('.grid')
        cy.Elemento_visible('.p-6 > :nth-child(2)')

    });
        
    it('Activar backup - Se activa y muestra correctamente', () => {
        cy.Elemento_visible('.ng-invalid > .mb-6'); // Verifica mensaje de éxito
        cy.contains('[tabindex="-1"] > .p-button-label', 'Operativa Backup').click( {force: true}); //Activo
        cy.Elemento_visible('.grid')
        cy.Elemento_visible('.p-6 > :nth-child(3)')
        cy.contains('[tabindex="0"] > .p-button-label', 'Operativa Backup').click( {force: true}); //Desactivo          
        cy.wait(tiempo);        
    });

    it('Desaparecer fichero', () => {
        cy.get('.p-highlight').click(); // Botón para activar offline
    })
    //Operativa-offline
    it('Activar Bin', () => { 
        //Añadir BIN
        //479265**
        //401814**
        //8*******
        cy.Añadir_text('.grid > :nth-child(1) > .p-inputtext','5*******')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').click(); //Confirmar
        // Verifica mensaje de éxito
        cy.get('.bg-white > tr > :nth-child(2)')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra
            if (toastText.includes('5*******')) {
                cy.log("El bin introducido esta activado");
                cy.get('.bg-white > tr > :nth-child(2)').should('have.length.lte', 1)
                .should('have.length.greaterThan', 0) // Verificar que hay elementos visibles 
                .contains('5*******') 
            } else {
            cy.log('El bin introducido no se activo');
            }
        }); 
    })

    it('Activar Adquiriente', () => {
        //Añadir adquiriente
        cy.Añadir_Combo('#pn_id_10 > .p-dropdown-label','A01')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.bg-white > tr > :nth-child(4)')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('A01')) {
                            cy.log("✅ Forzado offline activado correctamente");        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                .contains('A01');                      // Contiene "A01"
                        } else {
                            cy.log("ℹ️ No se activo");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Activar Emisor', () => {
        //Añadir adquiriente
        cy.Añadir_Combo_Buscar('#issuer > .p-dropdown-label','.p-dropdown-filter','0013')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.bg-white > tr > :nth-child(5)')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('0013')) {
                             cy.log("✅ Forzado offline activado correctamente");        
                            // Validar que hay filas en la tabla y se muestra 
                            cy.get('.bg-white > tr > :nth-child(5)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                //.contains('0013');                     
                        } else {
                            cy.log("⚠️ No se añadio");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Activar Entidad', () => {
        //Añadir Entidad
        cy.Añadir_Combo('#pn_id_8 > .p-dropdown-label','12')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.bg-white > tr > :nth-child(3)')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('12')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(3)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                .contains('12');                     
                        } else {
                            ("⚠️ El adquiriente no fue introducido");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Activar Token Movil', () => { 
        //Añadir Token movil 
        cy.Añadir_Combo('#pn_id_12 > .p-dropdown-label','AMBAS')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.whitespace-nowrap')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('AMBAS')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                //.contains('AMBAS');                      
                        } else {
                            cy.log("⚠️ no existe");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Desactivar Bin', () => {
        //Desctivar Bin
        cy.get('.bg-white > tr > :nth-child(2)').should('have.length.lte', 1)
        .should('have.length.greaterThan', 0) // Verificar que hay elementos visibles 
        .contains('5*******') 

        cy.Añadir_text('.grid > :nth-child(1) > .p-inputtext','5*******')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').click();
        //Confirmar
        // Verifica mensaje de éxito
        cy.get('.bg-white > tr > :nth-child(2)')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra
            if (toastText.includes('5*******')) {
                cy.log("Forzado offline desactivado correctamente");
                cy.get('.bg-white > tr > :nth-child(2)').should('have.length.lte', 1)
                .should('have.length.greaterThan', 0) // Verificar que hay elementos visibles 
                .should('not.contain','5*******')                
            } else {
                cy.log("⚠️ no existe");
            }
        }); 
    })

    it('Desactivar Adquiriente', () => {
        //Desctivar Adquiriente
        cy.get('.bg-white > tr > :nth-child(4)')
        .should('have.length.greaterThan', 0)  // Al menos una fila
        .should('have.length.lte', 1)          // Máximo una fila
        //.contains('A01');                      // Contiene "A01"                        

        cy.Añadir_Combo('#pn_id_10 > .p-dropdown-label','A01')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.bg-white > tr > :nth-child(4)')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('A01')) {
                           
                        } else if (mensaje.includes('Forzado offline desactivado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                .should('not.contain','A01');                      // Contiene "A01"
                        } else {
                            cy.log("⚠️ no existe");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Desactivar Emisor', () => {        
        //Desctivar Emisor
        // Validar que hay filas en la tabla y se muestra 
        cy.get('.bg-white > tr > :nth-child(5)')
        .should('have.length.greaterThan', 0)  // Al menos una fila
        .should('have.length.lte', 1)          // Máximo una fila
        //.contains('0013');                         

        cy.Añadir_Combo_Buscar('#issuer > .p-dropdown-label','.p-dropdown-filter','0013')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.bg-white > tr > :nth-child(5)')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('0013')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(5)')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','0013'); 
                        } else {
                            cy.log("⚠️ no existe");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Desactivar Entidad', () => {
        //Desactivar Entidad
        // Validar que hay filas en la tabla y se muestra "A01"
        cy.get('.bg-white > tr > :nth-child(3)')
        .should('have.length.greaterThan', 0)  // Al menos una fila
        .should('have.length.lte', 1)          // Máximo una fila
        .contains('12');

        cy.Añadir_Combo('#pn_id_8 > .p-dropdown-label','12')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.bg-white > tr > :nth-child(3)')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('12')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(3)')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','12'); 
                        } else {
                            cy.log("⚠️ no existe");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Desactivar Token movil', () => {       
        //Añadir Token movil //Desctivar Emisor
        // Validar que hay filas en la tabla y se muestra 
        cy.get('.bg-white > tr > :nth-child(4)')
        .should('have.length.greaterThan', 0)  // Al menos una fila
        .should('have.length.lte', 1)          // Máximo una fila
        //.contains('AMBAS');                         

        cy.Añadir_Combo('#pn_id_12 > .p-dropdown-label','AMBAS')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('.whitespace-nowrap')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('AMBAS')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','AMBAS'); 
                        } else {
                            cy.log("⚠️ no existe");
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });   
    })

    //Operativa-backup
    it('Activar adquirinete Operativa-backup', () => {
        //Añadir adquiriente 
        cy.Click_force('[tabindex="-1"] > .p-button-label')
        cy.Añadir_Combo('.p-dropdown-label','A01')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('tr.ng-star-inserted > .px-6')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('A01')) {
                            cy.log("✅ El adquiriente es introducido");
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('tr.ng-star-inserted > .px-6')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila

                        } else 
                            cy.log( "⚠️ El adquiriente no es introducido");
                        
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Desactivar adquirinete Operativa-backup', () => {
        //Desctivar Adquiriente
        cy.Click_force('[tabindex="-1"] > .p-button-label')

        cy.get('.ng-star-inserted > .px-6')
        .should('have.length.greaterThan', 0)  // Al menos una fila
        .should('have.length.lte', 1)          // Máximo una fila
        //.contains('A01');                      // Contiene "A01"                        

        cy.Añadir_Combo('.p-dropdown-label','A01')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('tr.ng-star-inserted > .px-6')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('A01')) {
                            cy.log("✅ Desactivado correctanete");

                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.ng-star-inserted > .px-6')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','A01');                      // Contiene "A01"
                        } else {
                            cy.log( "⚠️ El adquiriente no es desactivado");
    
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });    
    })


})