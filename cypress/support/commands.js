// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("Elemento_visible", (selector) => { 
    cy.get(selector).should('be.visible')
})

Cypress.Commands.add("Click", (selector,t) => { 
    cy.get(selector).should('be.visible').click()
    cy.wait(t)
})

Cypress.Commands.add("Click_force", (selector,t) => { 
    cy.get(selector).should('be.visible').click({force:true})
    cy.wait(t)
})

Cypress.Commands.add("Validar_campo", (selector,men,nombre_campo,t) => { 
   cy.xpath(selector).should("be.visible").then((val)=>{
      let dato=val.text()
      cy.log("el valor del log es: " + dato)
      cy.log(dato)
      expect(dato).to.equal(men)
      if(dato==men){
        cy.log("########################")
        cy.log("El "+ nombre_campo  +" no es valido")
        cy.log("########################")

      }
    })
})

Cypress.Commands.add("Añadir_Canales_entidad", (entidad,canal,t_desconexion,n_transacciones_simu, host_1,puerto_1, host_2,puerto_2,host_3,puerto_3) => { 
   cy.get('#pn_id_11_header_action').should("be.visible")
   //Datos principales
   cy.get('.p-dropdown-label').click().wait(2000)
   .type(entidad).type("{enter}")
   cy.get('#channelId > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(canal)
   cy.get('#timeDisconnect > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(t_desconexion)
   cy.get('#transactionNumber > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(n_transacciones_simu)
   //Datos de Conexion
   cy.get('#pn_id_12_header_action').should("be.visible").click()

   cy.get('#host1').should("be.visible").clear().type(host_1)
   cy.get('#port1 > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(puerto_1)
   cy.get('#host2').should("be.visible").clear().type(host_2)
   cy.get('#port2 > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(puerto_2)
   cy.get('#host3').should("be.visible").clear().type(host_3)
   cy.get('#port3 > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(puerto_3)
   
})

Cypress.Commands.add("Editar_Canales_entidad", (entidad, canal, t_desconexion, n_transacciones_simu, host_1, puerto_1, host_2, puerto_2, host_3, puerto_3) => { 
   //Puslar boton Modificar
   cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click();
   // Datos principales
   cy.get('.p-dropdown-label').should('not.be.enabled'); // Confirma que no aparece la lista
   cy.log(entidad)

   cy.get('#channelId > .p-inputnumber > .p-inputtext')
     .should("be.visible")
     .clear()
     .type(canal);

   cy.get('#timeDisconnect > .p-inputnumber > .p-inputtext')
     .should("be.visible")
     .clear()
     .type(t_desconexion);

   cy.get('#transactionNumber > .p-inputnumber > .p-inputtext')
     .should("be.visible")
     .clear()
     .type(n_transacciones_simu);

   // Datos de conexión
   cy.get('#pn_id_12_header_action')
     .should("be.visible")
     .click({ force: true }); // Si el botón está cubierto, fuerza el clic

   cy.get('#host1').should("be.visible").clear().type(host_1);
   cy.get('#port1 > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(puerto_1);

   cy.get('#host2').should("be.visible").clear().type(host_2);
   cy.get('#port2 > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(puerto_2);

   cy.get('#host3').should("be.visible").clear().type(host_3);
   cy.get('#port3 > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(puerto_3);
   cy.wait(1000)
});

Cypress.Commands.add("Eliminar_Anular", (boton_borrar, boton_anular, elemento) => { 
   //Sin seleccionar esta desactivada
   cy.get(boton_borrar).should('not.be.enabled');
   //Hacer clic en el primer registro para eliminar
   cy.get(elemento).should("be.visible").wait(1000).click()
   // Seleccionar la papelera la eliminación
   cy.get(boton_borrar).should("be.visible").click(); 
   // Confirmar la eliminación
   cy.Elemento_visible('#confirmModal')
   cy.Elemento_visible(boton_anular).click()

   cy.get(elemento).should("be.visible").click(); 
      
});

Cypress.Commands.add("Eliminar_Confirmar", (boton_borrar, elemento) => { 
   //Sin seleccionar esta desactivada
   cy.get(boton_borrar).should('not.be.enabled');
   //Hacer clic en el primer registro para eliminar
   cy.get(elemento).should("be.visible").wait(1000).click(); 
   // Seleccionar la papelera la eliminación
   cy.get(boton_borrar).should("be.visible").click(); 
   // Confirmar la eliminación
   cy.Elemento_visible('#confirmModal')
   cy.Elemento_visible('[icon="pi pi-check"] > .p-ripple').click()
   // Validar mensaje de éxito
   cy.get('.ng-tns-c3576075022-10 > .bg-white > .flex-col')
   .should('be.visible') 
   .then(($alert) => {
     // Verifica si el texto contiene la alerta esperada
     if ($alert.text().includes('¡El canal de entidad ha sido eliminado!')) {
       cy.log('¡El canal de entidad ha sido eliminado!'); // Log de éxito
     }
   })
   
});

Cypress.Commands.add("login", (username, password) => {
   cy.visit("/logins");
   cy.get("#user").type(username);
   cy.get("#password").type(password);
   cy.get(".mt-2").click();
 });

Cypress.Commands.add('Insertar_Texto', (selector, texto, t) => { 
   cy.get(selector).should('be.visible').type(texto)
   cy.wait(t)    
})

Cypress.Commands.add('Click_Botón', (selector, t) => { 
   cy.get(selector).should('be.visible').click({force:true})
   cy.wait(t)
})

Cypress.Commands.add('Combo', (selector, valor, t) => { 
   cy.get(selector).select(valor,{force:true})
   cy.wait(t)
})

Cypress.Commands.add('Añadir', (selector_añadir, t) => {
   //boton anadir
   cy.get(selector_añadir).should("be.visible").click().wait(t)               
})

Cypress.Commands.add('Guardar_Confirmar_canal_entidad', (selector_guardar, t) => {
   //Pulsar boton guardar 
   cy.get(selector_guardar).should("be.visible").click().wait(t)
   // Espera que el mensaje sea visible
   cy.get('.ng-tns-c3576075022-10 > .bg-white > .flex-col')
   .should('be.visible') 
   .then(($alert) => {
     // Verifica si el texto contiene la alerta esperada
     if ($alert.text().includes('¡El canal de entidad ya existe!')) {
       // Si la alerta está presente, hacer clic en "Cancelar"
       cy.get('.absolute > [icon="pi pi-times"] > .p-ripple').click({ force: true });
       cy.log('¡El canal de entidad ya existe!'); // Log de la alerta
       cy.wait(t)
     } else {
       // Si la alerta no aparece, realizar otra acción (guardar, por ejemplo)
       cy.log('¡El canal de entidad ha sido guardado!'); // Log de éxito
       cy.wait(t)
     }
   });       

})

Cypress.Commands.add('Guardar_Cancelar', (selector_guardar,selector_cancel, t) => {
   //guardar 
   cy.get(selector_guardar).should("be.visible").click().wait(t)
   //cancelar
   cy.get(selector_cancel).click().wait(t)
})

Cypress.Commands.add('Volver', (selector_volver, t) => {
   //volver
   cy.get(selector_volver).should("be.visible").click().wait(t)            
})

Cypress.Commands.add('Validar_campo', (selector, men, nombre_campo, selector_volver, t) => { 
   cy.get(selector).should('be.visible').should("contain",men).then((val)=>{
       cy.log("El valor de" + nombre_campo + "no es valido")
       //volver
       cy.get(selector_volver).click().wait(t) 
   })   
})

Cypress.Commands.add('Busqueda', (selector, valor, t) => { 
   cy.get(selector).should("be.visible").clear().type(valor).wait(t)

})

Cypress.Commands.add("Añadir_Acuerdos_Comisiones", (emisor, adquiriente) => { 
   cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
   //Datos 
   cy.get('#acquirer > .p-dropdown-label').should("be.visible").click().wait(2000)
   cy.get('.p-dropdown-filter').should("be.visible").clear().type(adquiriente).type("{enter}")
   cy.get('#issuer > .p-dropdown-label').should("be.visible").click().wait(2000)
   cy.get('.p-dropdown-filter').type(emisor)
   
})

Cypress.Commands.add("Añadir_Adquirientes_comprobar_Check", (off_internacional, off_EMV, forzado_respaldo) => {
   cy.log(`los valores son ${off_internacional}`);
   cy.log(`los valores son ${off_EMV}`);
   cy.log(`los valores son ${forzado_respaldo}`);

   if (off_internacional === '1' && off_EMV === '1' && forzado_respaldo === '1') {
      //Activa "Permite offline internacional"
      cy.get('#allowOfflineInternational > .p-checkbox > .p-checkbox-box').should("be.visible").click()
      cy.get('#allowOfflineInternational .p-checkbox-icon').should('exist'); 
      // Activa "Permite offline sobre EMV"
      cy.get('#allowOfflineOverEmv > .p-checkbox > .p-checkbox-box').should("be.visible").click()
      cy.get('#allowOfflineOverEmv .p-checkbox-icon').should('exist');
      //No es posible activar Forzado
      cy.log(`No es posible activar Forzado`);
   } else if (off_internacional === '1' && off_EMV === '1' && forzado_respaldo === '0') {
      //Activa "Permite offline internacional"
      cy.get('#allowOfflineInternational > .p-checkbox > .p-checkbox-box').should("be.visible").click()
      cy.get('#allowOfflineInternational .p-checkbox-icon').should('exist'); 
      // Activa "Permite offline sobre EMV"
      cy.get('#allowOfflineOverEmv > .p-checkbox > .p-checkbox-box').should("be.visible").click()
      cy.get('#allowOfflineOverEmv .p-checkbox-icon').should('exist');

   } else if (off_internacional === '0' && off_EMV === '1' && forzado_respaldo === '1') {
      // Activa "Permite offline sobre EMV"
      cy.get('#allowOfflineOverEmv > .p-checkbox > .p-checkbox-box').should("be.visible").click()
      cy.get('#allowOfflineOverEmv .p-checkbox-icon').should('exist');
      //No es posible activar Forzado
      cy.log(`No es posible activar Forzado`);
   } else if (off_internacional === '1' && off_EMV === '0' && forzado_respaldo === '1') {
      //Activa "Permite offline internacional"
      cy.get('#allowOfflineInternational > .p-checkbox > .p-checkbox-box').should("be.visible").click()
      cy.get('#allowOfflineInternational .p-checkbox-icon').should('exist'); 
      //No es posible activar Forzado
      cy.log(`No es posible activar Forzado`);

   } else if (off_internacional === '0' && off_EMV === '0' && forzado_respaldo === '1') {
      // Activa "Forzado de respaldo"
      cy.get('#backupForced > .p-checkbox > .p-checkbox-box').should("be.visible").click()
      cy.get('#backupForced .p-checkbox-icon').should('exist');
   } else {
      cy.log('Valor no reconocido');
   }
      
 });

Cypress.Commands.add("Añadir_Adquirientes", ( ID,numero_cuenta,tipo_cuenta,cuenta_asociada,nombre_cuenta,moneda,entidad,fecha_sesión,numero_secuencia,cuadre,numero_sesión,estado,numero_comercio,numero_terminal,frozado_off,identificacion_adq,CSB,terminal_on,off_internacional, off_EMV, forzado_respaldo) => { 
   cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
   //Datos principales
   cy.get('#pn_id_11_header_action').should("be.visible").click()
   //ID
   cy.get('#acquirerId').should("be.visible").clear().type(ID).type("{enter}")
   //numero de cuenta
   cy.get('#accountNumber').should("be.visible").clear().type(numero_cuenta).type("{enter}") 
   //tipo de adquiriente
   cy.get('#accountType > .p-dropdown-label').should("be.visible").click().wait(2000)
   .type(tipo_cuenta).type("{enter}")
   //adquiriente asociado
   cy.get('#associatedAcquirerId').should("be.visible").clear().type(cuenta_asociada).type("{enter}") 
   //nombre de adquiriente
   cy.get('#accountName').should("be.visible").clear().type(nombre_cuenta).type("{enter}") 
   //moneda
   cy.get('#currency > .p-dropdown-label').should("be.visible").click().wait(2000)
   cy.get('.p-dropdown-filter').type(moneda)
   cy.get('#currency_0').type("{enter}")
   //entidad
   cy.get('#entityId > .p-dropdown-label').should("be.visible").click().wait(2000)
   .type(entidad).type("{enter}")

   //Datos control de sesion
   cy.get('#pn_id_12_header_action').should("be.visible").click()
   //fecha de sesion
   cy.get('.p-calendar > .p-inputtext').should("be.visible").clear().click().type(fecha_sesión).type("{enter}")
   //numero de secuencias
   cy.get('#sequenceNumber > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(numero_secuencia).type("{enter}")
   //cuadre
   cy.get('#matching > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(cuadre).type("{enter}")
   //numero de sesion
   cy.get('#sessionNumber > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(numero_sesión).type("{enter}")
   //estado
   cy.get('#status > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(estado).type("{enter}")

   //Datos detalles del adquiriente
   cy.get('#pn_id_13_header_action').should("be.visible").click()
   //numero de comercio
   cy.get('#merchantNumber').should("be.visible").clear().type(numero_comercio).type("{enter}")
   //numero de terminal
   cy.get('#terminalNumber').should("be.visible").clear().type(numero_terminal).type("{enter}")
   //forzado offline
   cy.get('#offlineForced > .p-dropdown-label')
   .should("be.visible").click().wait(2000)
   .type(frozado_off).type("{enter}")
   //identificacion adquiriente
   cy.get('#acquirerIdentification').should("be.visible").clear().type(identificacion_adq).type("{enter}")
   //CSB adquiriente
   cy.get('#csbAcquirer').should("be.visible").clear().type(CSB).type("{enter}")
   //terminal online
   cy.get('#onlineTerminal').should("be.visible").clear().type(terminal_on).type("{enter}")
   //Checks
   cy.Añadir_Adquirientes_comprobar_Check(off_internacional, off_EMV, forzado_respaldo)
   
})

Cypress.Commands.add("Editar_Adquirientes", ( ID,numero_cuenta,tipo_cuenta,cuenta_asociada,nombre_cuenta,moneda,entidad,fecha_sesión,numero_secuencia,cuadre,numero_sesión,estado,numero_comercio,numero_terminal,frozado_off,identificacion_adq,CSB,terminal_on,off_internacional, off_EMV, forzado_respaldo) => { 
   //Puslar boton Modificar
   cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
   
   //Datos principales
   cy.get('#pn_id_11_header_action').should("be.visible").click()
   //ID
   cy.get('#acquirerId').should('not.be.enabled'); // Confirma que no aparece la lista
   cy.log(ID)
   //numero de cuenta
   cy.get('#accountNumber').should("be.visible").clear().type(numero_cuenta).type("{enter}") 
   //tipo de adquiriente
   cy.get('#accountType > .p-dropdown-label').should("be.visible").click().wait(2000)
   .type(tipo_cuenta).type("{enter}")
   //adquiriente asociado
   cy.get('#associatedAcquirerId').should("be.visible").clear().type(cuenta_asociada).type("{enter}") 
   //nombre de adquiriente
   cy.get('#accountName').should("be.visible").clear().type(nombre_cuenta).type("{enter}") 
   //moneda
   cy.get('#currency > .p-dropdown-label').should("be.visible").click().wait(2000)
   cy.get('.p-dropdown-filter').type(moneda)
   cy.get('#currency_0').type("{enter}")
   //entidad
   cy.get('#entityId > .p-dropdown-label').should("be.visible").click().wait(2000)
   .type(entidad).type("{enter}")

   //Datos control de sesion
   cy.get('#pn_id_12_header_action').should("be.visible").click()
   //fecha de sesion
   cy.get('.p-calendar > .p-inputtext').should("be.visible").clear().click().type(fecha_sesión).type("{enter}")
   //numero de secuencias
   cy.get('#sequenceNumber > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(numero_secuencia).type("{enter}")
   //cuadre
   cy.get('#matching > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(cuadre).type("{enter}")
   //numero de sesion
   cy.get('#sessionNumber > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(numero_sesión).type("{enter}")
   //estado
   cy.get('#status > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(estado).type("{enter}")

   //Datos detalles del adquiriente
   cy.get('#pn_id_13_header_action').should("be.visible").click()
   //numero de comercio
   cy.get('#merchantNumber').should("be.visible").clear().type(numero_comercio).type("{enter}")
   //numero de terminal
   cy.get('#terminalNumber').should("be.visible").clear().type(numero_terminal).type("{enter}")
   //forzado offline
   cy.get('#offlineForced > .p-dropdown-label')
   .should("be.visible").click().wait(2000)
   .type(frozado_off).type("{enter}")
   //identificacion adquiriente
   cy.get('#acquirerIdentification').should("be.visible").clear().type(identificacion_adq).type("{enter}")
   //CSB adquiriente
   cy.get('#csbAcquirer').should("be.visible").clear().type(CSB).type("{enter}")
   //terminal online
   cy.get('#onlineTerminal').should("be.visible").clear().type(terminal_on).type("{enter}")
   //Checks
   cy.Añadir_Adquirientes_comprobar_Check(off_internacional, off_EMV, forzado_respaldo)   
})

Cypress.Commands.add('Guardar_Confirmar_Adquirientes', (selector_guardar, t) => {
   //Pulsar boton guardar 
   cy.get(selector_guardar).should("be.visible").click()
   // Espera que el mensaje sea visible
   cy.get('.bg-white > .flex-col')
   .should('be.visible') 
   .then(($alert) => {
     // Verifica si el texto contiene la alerta esperada
     if ($alert.text().includes('¡El adquirente ya existe!')) {
       // Si la alerta está presente, hacer clic en "Cancelar"
       cy.get('.absolute > [icon="pi pi-times"] > .p-ripple').click({ force: true });
       cy.log('¡El adquirente ya existe!'); // Log de la alerta
       cy.wait(t)
     } else {
       // Si la alerta no aparece, realizar otra acción (guardar, por ejemplo)
       cy.log('¡Ha sido guardado!'); // Log de éxito
       cy.wait(t)
     }
   });   

})

Cypress.Commands.add("Eliminar", (boton_borrar, elemento) => { 
   //Sin seleccionar esta desactivada
   cy.get(boton_borrar).should('not.be.enabled');
   //Hacer clic en el primer registro para eliminar
   cy.get(elemento).should("be.visible").wait(1000).click(); 
   // Seleccionar la papelera la eliminación
   cy.get(boton_borrar).should("be.visible").click(); 
   // Confirmar la eliminación
   cy.Elemento_visible('#confirmModal')
   cy.Elemento_visible('[icon="pi pi-check"] > .p-ripple').click()
   // Validar mensaje de éxito
 
})

Cypress.Commands.add("Añadir_Enrrutaminetos", (tarjeta, Empresa, centro, caja, adquirente) => { 
   cy.get('#card > .p-dropdown-label').should("be.visible").click().wait(2000).type(tarjeta,"{enter}");
   cy.get('#company > .p-dropdown-label').should("be.visible").click().wait(2000).type(Empresa,"{enter}");
   cy.get('#store > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(centro,"{enter}");
   cy.get('#posId > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(caja,"{enter}");
   cy.get('#acquirer > .p-dropdown-label').should("be.visible").click().type(adquirente,"{enter}").click().wait(2000);  
   
})

Cypress.Commands.add('Guardar_Confirmar', (selector_guardar, selector_mensaje, t) => {
   // Interceptar la petición API
   cy.intercept('POST', '**/api/routing/add').as('guardar');

   // Verificar si el botón de guardar es visible
   cy.get(selector_guardar).then(($btn) => {
      if ($btn.is(':visible') && ($btn.is(':enabled')) ){
         cy.get(selector_guardar).click();
         
         // Esperar la respuesta del API antes de continuar
         cy.wait('@guardar').then((interception) => {
            cy.log('📡 Respuesta del API:', interception.response.statusCode);

            if (interception.response.statusCode === 409) {
               cy.log('⚠️ Conflicto detectado en el API (409). Verificando mensaje de error...');
            }   

            // Verificar si el mensaje realmente aparece en el DOM antes de esperar su visibilidad
            cy.get('body').then(($body) => {
               if ($body.find(selector_mensaje).length > 0) {
                  cy.get(selector_mensaje).should('exist').and('be.visible').then(($alert) => {
                     if ($alert.text().includes('ya existe!')) {
                        cy.get('.mt-5 > [icon="pi pi-times"] > .p-ripple').click({ force: true });
                        cy.log('⚠️ ¡Ya existe!');
                        cy.wait(t);
                     } else {
                        cy.log('✅ ¡Ha sido guardado!');
                     }
                  });
               } else {
                  cy.get('.mt-5 > [icon="pi pi-times"] > .p-ripple').click({ force: true });
                  cy.log('⚠️ ¡Ya existe!');
                  cy.wait(t);
                  cy.log('❌ El mensaje de error NO se encontró en el DOM.');
               }
            });
         });
      } else if ($btn.is(':disabled') || $btn.hasClass('p-disabled')) {
           // ⚠ Si el botón está deshabilitado, hacer otra acción
           cy.log('El botón está deshabilitado, ejecutando otra acción...');
           
           // Ejemplo: hacer clic en otro botón, mostrar un mensaje o realizar otra validación
           cy.get('.mt-5 > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true })
           cy.log('✅ ¡No se pudo guardar!')  
           
      } else {
         cy.log('✅ ¡He llegado aqui!');
      }
   })
})

      

