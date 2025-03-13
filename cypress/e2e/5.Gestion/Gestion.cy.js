
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
        cy.Añadir_text('.grid > :nth-child(1) > .p-inputtext','5*******')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').click();
        //Confirmar
        // Verifica mensaje de éxito
        cy.get('app-management.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra
            if (toastText.includes('El bin introducido no existe')) {
                cy.log("El bin introducido no existe");
            } else if (toastText.includes('Forzado offline activado correctamente')) {
                cy.log("Forzado offline activado correctamente");

                cy.get('.bg-white > tr > :nth-child(2)').should('have.length.lte', 1)
                .should('have.length.greaterThan', 0) // Verificar que hay elementos visibles 
                .contains('5*******') 
            } else {
            cy.log("Otro mensaje: " + toastText);
            }
        }); 
    })

    it('Activar Adquiriente', () => {
        //Añadir adquiriente
        cy.Añadir_Combo('#pn_id_12 > .p-dropdown-label','A01')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('El adquiriente introducido no existe')) {
                            cy.log("⚠️ El adquiriente introducido no existe");
                        } else if (mensaje.includes('Forzado offline activado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                .contains('A01');                      // Contiene "A01"
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
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
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('no existe')) {
                            cy.log("⚠️  no existe");
                        } else if (mensaje.includes('Forzado offline activado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra 
                            cy.get('.bg-white > tr > :nth-child(5)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                //.contains('0013');                     
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Activar Entidad', () => {
        //Añadir Entidad
        cy.Añadir_Combo('#pn_id_10 > .p-dropdown-label','12')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('El adquiriente introducido no existe')) {
                            cy.log("⚠️ El adquiriente introducido no existe");
                        } else if (mensaje.includes('Forzado offline activado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(3)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                .contains('12');                     
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });
    })

    it('Activar Token Movil', () => { 
        //Añadir Token movil 
        cy.Añadir_Combo('#pn_id_14 > .p-dropdown-label','AMBAS')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Activar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('no existe')) {
                            cy.log("⚠️ no existe");
                        } else if (mensaje.includes('Forzado offline activado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                //.contains('AMBAS');                      
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
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
        cy.get('app-management.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast')
        .should('be.visible')
        .then(($toast) => {
            const toastText = $toast.text().trim();  // Obtener el texto del toast y eliminar espacios extra
            if (toastText.includes('El bin introducido no existe')) {
                cy.log("El bin introducido no existe");
            } else if (toastText.includes('Forzado offline desactivado correctamente')) {
                cy.log("Forzado offline desactivado correctamente");
                cy.get('.bg-white > tr > :nth-child(2)').should('have.length.lte', 1)
                .should('have.length.greaterThan', 0) // Verificar que hay elementos visibles 
                .should('not.contain','5*******')                
            } else {
            cy.log("Otro mensaje: " + toastText);
            }
        }); 
    })

    it('Desactivar Adquiriente', () => {
        //Desctivar Adquiriente
        cy.get('.bg-white > tr > :nth-child(4)')
        .should('have.length.greaterThan', 0)  // Al menos una fila
        .should('have.length.lte', 1)          // Máximo una fila
        //.contains('A01');                      // Contiene "A01"                        

        cy.Añadir_Combo('#pn_id_12 > .p-dropdown-label','A01')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes(' no existe')) {
                            cy.log("⚠️ no existe");
                        } else if (mensaje.includes('Forzado offline desactivado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                .should('not.contain','A01');                      // Contiene "A01"
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
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
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes(' no existe')) {
                            cy.log("⚠️  no existe");
                        } else if (mensaje.includes('Forzado offline desactivado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(5)')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','0013'); 
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
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

        cy.Añadir_Combo('#pn_id_10 > .p-dropdown-label','12')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes(' no existe')) {
                            cy.log("⚠️  no existe");
                        } else if (mensaje.includes('Forzado offline desactivado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(3)')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','12'); 
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
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

        cy.Añadir_Combo('#pn_id_14 > .p-dropdown-label','AMBAS')
        .wait(tiempo)
        //boton Activar
        cy.contains('button', 'Desactivar').should('be.visible').then(($boton) => {
            if (Cypress.$($boton).is(':enabled')) {
                cy.wrap($boton).click();
                cy.log('Se logró dar click');
        
                // Confirmar mensaje de éxito
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes(' no existe')) {
                            cy.log("⚠️  no existe");
                        } else if (mensaje.includes('Forzado offline desactivado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','AMBAS'); 
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
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
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes('El adquiriente introducido no existe')) {
                            cy.log("⚠️ El adquiriente introducido no existe");
                        } else if (mensaje.includes('Forzado offline activado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.bg-white > tr > :nth-child(4)')
                                .should('have.length.greaterThan', 0)  // Al menos una fila
                                .should('have.length.lte', 1)          // Máximo una fila
                                .contains('A01');                      // Contiene "A01"
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
                        }
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
                cy.get('app-management.ng-star-inserted app-custom-toast p-toast.p-element .p-toast')
                    .should('be.visible')  // Asegurar que el mensaje se muestre
                    .invoke('text')        // Obtener el texto del toast
                    .then((toastText) => {
                        const mensaje = toastText.trim(); // Eliminar espacios extra
                        
                        if (mensaje.includes(' no existe')) {
                            cy.log("⚠️ no existe");
                        } else if (mensaje.includes('Forzado offline desactivado correctamente')) {
                            cy.log("✅ Forzado offline activado correctamente");
        
                            // Validar que hay filas en la tabla y se muestra "A01"
                            cy.get('.ng-star-inserted > .px-6')
                            .should('have.length.greaterThan', 0)  // Al menos una fila
                            .should('have.length.lte', 1)          // Máximo una fila
                            .should('not.contain','A01');                      // Contiene "A01"
                        } else {
                            cy.log("ℹ️ Otro mensaje recibido: " + mensaje);
                        }
                    });
            } else {
                cy.log('❌ No se logró dar click');
            }
        });    
    })


})