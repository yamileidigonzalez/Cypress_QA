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

Cypress.Commands.add("Click_force", (selector) => { 
    cy.get(selector).should('be.visible').click({force:true})   
})

Cypress.Commands.add('Click_Botón', (selector, t) => { 
   cy.get(selector).should('be.visible').click({force:true})
   cy.wait(t)
})


Cypress.Commands.add("login", (username, password) => {
      cy.get('#user').should("be.visible").should("be.enabled").type(username)
      cy.get('#password').should("be.visible").should("be.enabled").type(password).type('{enter}')
 });

Cypress.Commands.add('Check', (selector, valor) => { 
   cy.get(selector).then(($checkbox) => {
      const isChecked = $checkbox.attr('data-p-highlight') === 'true'; 
      // Verifica si el checkbox está marcado
         if (!isChecked && (valor === "Si" )) {
         // Si el checkbox no está seleccionado y el valor es "Si", seleccionamos el checkbox
         cy.wrap($checkbox).click();
         cy.log('✅ Checkbox seleccionado');
      } else if (isChecked && (valor === "No")){
         // Si el checkbox está seleccionado y el valor es "No", seleccionamos el checkbox
         cy.wrap($checkbox).click();
         cy.log('Checkbox deshabilitado');
      } else {
         // Si ya está seleccionado, no hacemos nada
         cy.log('⚠️ El checkbox ya estaba seleccionado, no se hizo clic.');
      }
   });  
})

Cypress.Commands.add('Combo', (selector, valor,t) => { 
   cy.get(selector).select(valor,{force:true})
   cy.wait(t)
})

Cypress.Commands.add('Volver', (selector_volver, t) => {
   //volver
   cy.get(selector_volver).should("be.visible").click().wait(t)            
})

Cypress.Commands.add('Busqueda', (selector, valor, t) => { 
   cy.get(selector).should("be.visible").clear().type(valor).wait(t)

})

Cypress.Commands.add('Insertar_Texto', (selector, texto, t) => { 
   cy.get(selector).should('be.visible').type(texto)
   cy.wait(t)    
})

Cypress.Commands.add('Añadir_Combo_Buscar_caja', (selector, sector_buscar, valor) => { 
   cy.get(selector).should("be.visible").click().wait(100);
   cy.get(sector_buscar).clear().wait(1000)
   cy.log('Buscaremos el valor');
         // Aquí puedes agregar más acciones si el valor sí existe
         cy.get(selector).should("be.visible").type(valor, "{enter}");
          // Verificamos que los resultados se han cargado
   cy.get('#store_list', { timeout: 10000 })  // Esperamos hasta 10 segundos si es necesario
   .should('be.visible')  // Verificar que el dropdown se ha mostrado
   .click() 
  
})

Cypress.Commands.add('Añadir_Combo_Buscar', (selector, sector_buscar, valor) => { 
   cy.get(selector).should("be.visible").click().wait(100);
   cy.get(sector_buscar).clear().type(valor,"{enter}")

   // Verificar si el mensaje "No results found" existe antes de interactuar con él
   cy.get('body').then($body => {
      if ($body.find('.p-dropdown-empty-message').length > 0) {
         cy.get('.p-dropdown-empty-message').should('contain', 'No results found');
         cy.log('El mensaje "No encontrado" está presente');
         cy.get(selector).should("be.visible").click().wait(100); // Cerrar el dropdown si es necesario
      } else {
         cy.log('El valor ha sido encontrado');
         // Aquí puedes agregar más acciones si el valor sí existe
         cy.get(selector).should("be.visible").type(valor, "{enter}");
      }
   });
})

Cypress.Commands.add('Añadir_Combo', (selector, valor) => { 
   cy.get(selector).should("be.visible").then(($element) => {   
      if ($element.length > 0) {  // Si el elemento está presente en el DOM
         cy.wrap($element)    // Aseguramos que sea un elemento Cypress
         .click()           // Hacemos clic en el elemento
         .wait(100)         // Esperamos 100ms antes de escribir
         .type(valor).click().wait(1000)  // Escribimos el valor y presionamos Enter
         cy.log('El valor ha sido encontrado');
      } else {
         cy.log('El valor no ha sido encontrado');
         // Aquí puedes agregar más acciones si el valor sí existe
         cy.get(selector).should("be.visible").click().wait(1000)
      }
   })/*
   .catch((error) => {
      cy.log("El elemento no está visible o no se encontró.");  // Si no se encontró el elemento o no es visible
      cy.wrap(error).as("catchError");  // Puedes guardar el error si lo deseas para debug
   });*/
})

Cypress.Commands.add('Añadir_text', (selector_añadir, valor) => {
   //boton anadir
   cy.get(selector_añadir).should("be.visible").clear().type(valor,"{enter}")             
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

Cypress.Commands.add("Añadir_Enrrutaminetos", (tarjeta, Empresa, centro, caja, adquirente) => { 
   cy.get('#card > .p-dropdown-label').should("be.visible").click().wait(2000).type(tarjeta,"{enter}");
   cy.get('#company > .p-dropdown-label').should("be.visible").click().wait(2000).type(Empresa,"{enter}");
   cy.get('#store > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(centro,"{enter}");
   cy.get('#posId > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(caja,"{enter}");
   cy.get('#acquirer > .p-dropdown-label').should("be.visible").click().type(adquirente,"{enter}").click().wait(2000);  
   
})

Cypress.Commands.add("Añadir_Entidad", (id, nombre ,eodRequerido, puntoServicio ,infoSeguridad ,identificacionAdquirente, permitirOffline ,host1 , puerto1, host2 , puerto2 , host3 ,puerto3 ,redEntidad ) => { 
   let frozado_off= " "
   let id_protocolo= " "
   let tipo_red = " "

   let Intentos_max= "0"
   let T_conexion= "0"
   let T_error = "0"
   let T_espera = "0"
   let T_off = "0"
   let T_transaccion = "0"

   let indidentif = " "
   let Identidad = " "
   let Cajón_claves = " "
   let Mac = " "
   let Mac_EMV_1 = " "
   let Mac_EMV_2 = " "

   let máximo_procesos = " "
   let Características_1 = " "
   let Características_2 = " "
   let Características_3 = " "
   let Tipo_cir  = " "

   let ID_TCP_IP  = " "
   let Versión_TCP_IP  = " "
   let Longitud_cabecera  = " "
   let ID_conexión  = " "
   let Dirección_IP_actualizada  = " "
   let EOD_total_requerido  = "0"
   let Requiere_autentificación  = "0"
   let Requiere_proceso_recuperación  = "0"
   let Bloqueado  = "0"
         
   // Validaciones en la UI basadas en los datos del JSON
   cy.Click_force('#pn_id_11_header_action')
   //Datos Principales
   cy.get('#entityId > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(id,"{enter}");//ID
   cy.get('#entityName').should("be.visible").clear().type(nombre,"{enter}");//Nombre de entidad
   //Forzado Offline
   if(permitirOffline == "Si"){
      cy.get('#allowOffline > .p-checkbox > .p-checkbox-box').click().wait(2000) 
      cy.Añadir_Combo('#offlineForced > .p-dropdown-label',frozado_off) 
   }
   cy.Añadir_Combo('#entityProtocol > .p-dropdown-label',id_protocolo)  //ID protocolo
   cy.Añadir_Combo('#networkType > .p-dropdown-label',tipo_red)   //Tipo de red
   cy.get('#entityNetwork > .p-dropdown-label').should("not.be.visible").click().wait(100).type(redEntidad,"{enter}") //Red entidad

   //Datos de tiempo e intentos
   cy.Click_force('#pn_id_12_header_action')
   cy.get('#triesMax > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(Intentos_max,"{enter}")  //Intentos máximos
   cy.get('#timeWait > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_espera,"{enter}")   //Tiempo de espera
   cy.get('#timeError > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_error,"{enter}")   //Tiempo de error 
   cy.get('#timeConnect > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_conexion,"{enter}")   //Tiempo de conexión
   cy.get('#timeOffline > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_off,"{enter}")   //Tiempo offline 
   cy.get('#timeTransaction > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_transaccion,"{enter}")   //Tiempo de transacción

   //Datos de conexion
   cy.Click_force('#pn_id_13_header_action')
   cy.Añadir_text('#host1',host1 )
   cy.Añadir_text('#port1 > .p-inputnumber > .p-inputtext',puerto1 )
   cy.Añadir_text('#host2',host2 )
   cy.Añadir_text('#port2 > .p-inputnumber > .p-inputtext',puerto2 )
   cy.Añadir_text('#host3',host3 )
   cy.Añadir_text('#port3 > .p-inputnumber > .p-inputtext',puerto3 )
  
   //Conf.de autorizador
   cy.Click_force('#pn_id_14_header_action')
   cy.Añadir_text('#indidentif', indidentif)  //Indicador identificación
   cy.Añadir_text('#identity', Identidad)   //Identidad
   cy.Añadir_text('#acquirerIdentification', identificacionAdquirente);//Identificación adquirente
   cy.Añadir_text('#slotKey > .p-inputnumber > .p-inputtext', Cajón_claves)  //Cajón de claves
   cy.Añadir_text('#macLevel > .p-inputnumber > .p-inputtext', Mac)   //Nivel mac
   cy.Añadir_text('#macEmv1', Mac_EMV_1)   //Mac EMV 1
   cy.Añadir_text('#macEmv2', Mac_EMV_2)   //Mac EMV 2

   //Parametrizacion interna
   cy.Click_force('#pn_id_15_header_action')
   cy.Añadir_text('#processMaxNumber > .p-inputnumber > .p-inputtext',máximo_procesos )   //Número máximo de procesos
   cy.Añadir_text('#requireEod > .p-inputnumber > .p-inputtext', eodRequerido);//EOD Requerido
   cy.Añadir_text('#servicePoint', puntoServicio);//Punto de servicio
   cy.Añadir_text('#features1', Características_1)   //Características 1
   cy.Añadir_text('#features2', Características_2)   //Características 2
   cy.Añadir_text('#features3', Características_3)   //Características 3
   cy.Añadir_text('#incont', infoSeguridad);//Información Seguridad y Control
   cy.Añadir_text('#cirType', Tipo_cir)   //Tipo cir

   //P. Interna II
   cy.Click_force('#pn_id_16_header_action')
   cy.Añadir_text('#tcpIpConfigurationId', ID_TCP_IP)  //ID configuración TCP/IP
   cy.Añadir_text('#tcpIpConfigurationVersion', Versión_TCP_IP)   //Versión configuración TCP/IP
   cy.Añadir_text('#lengthMessageHeader > .p-inputnumber > .p-inputtext', Longitud_cabecera)   //Longitud cabecera mensaje
   cy.Añadir_text('#connectionId > .p-inputnumber > .p-inputtext', ID_conexión)   //ID conexión
   //Dirección IP actualizada
   if (Dirección_IP_actualizada = " ") {
      cy.log('Se deja igual, sin seleccionar')
   } else if (Dirección_IP_actualizada = "Desactivado"){
      cy.Click_force('.p-selectbutton > .p-highlight')
   } else if (Dirección_IP_actualizada = "Activado"){
      cy.get('.p-selectbutton > [tabindex="-1"]')
   }

   if (EOD_total_requerido  = "1"){
      cy.Click_Botón('#requireTotalEod > .p-checkbox > .p-checkbox-box', 100)  //EOD total requerido
   }
   if (Requiere_autentificación  = "1"){
      cy.Click_Botón('#requireAuthentication > .p-checkbox > .p-checkbox-box', 100)   //Requiere autentificación
   }
   if (Requiere_proceso_recuperación  = "1"){
      cy.Click_Botón('#requireRecoveryThread > .p-checkbox > .p-checkbox-box', 100)   //Requiere proceso de recuperación
   }
   if (Bloqueado  = "1"){
      cy.Click_Botón('#blocked > .p-checkbox > .p-checkbox-box', 100)   //Bloqueado 
   }
   
})

Cypress.Commands.add("Añadir_Protocolos", ( id ,descripción, versión) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_text('.p-inputnumber > .p-inputtext',id ) //id
   cy.Añadir_text('#protocolName',descripción )
   cy.Añadir_text('#protocolVersion',versión )   
})

Cypress.Commands.add("Añadir_Redes_Entidad", ( id ,nombre_red) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_text('.p-inputnumber > .p-inputtext',id ) //id
   cy.Añadir_text('#entityNetworkName',nombre_red )   
})

Cypress.Commands.add("Añadir_Respaldo_Enrrutamiento", (cuenta, cuenta_respaldo, prioridad) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_Combo('#account > .p-dropdown-label',cuenta ) //Adquiriente 
   cy.Añadir_Combo('#bkpAccount > .p-dropdown-label',cuenta_respaldo ) //Adquiriente respaldo
   cy.Añadir_text('.p-inputnumber > .p-inputtext',prioridad )   //Prioridad
})

Cypress.Commands.add("Añadir_Entidades_Emisoras", (csb_emisor, nombre_emisor) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_text('#csbIssuer',csb_emisor )   //csb_emisor
   cy.Añadir_text('#nameIssuer',nombre_emisor )   //nombre_emisor
})

Cypress.Commands.add("Añadir_Enrrutamientos_PIN_Online", (empresa, centro, caja, cajon_claves, cuenta) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_Combo('#company > .p-dropdown-label',empresa ) //empresa
   cy.Añadir_text('#store > .p-inputnumber > .p-inputtext',centro )   //centro
   cy.Añadir_text('#posId > .p-inputnumber > .p-inputtext',caja )   //caja
   cy.Añadir_text('#slotKey > .p-inputnumber > .p-inputtext',cajon_claves )   //cajon_claves
   cy.Añadir_Combo('#account > .p-dropdown-label',cuenta ) //cuenta
})

Cypress.Commands.add("Añadir_Test_adquirientes", (cuenta, tarjeta, expiracion) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_Combo('.p-dropdown-label',cuenta ).type(cuenta).type("{enter}") //cuenta
   cy.Añadir_text('#pan',tarjeta )   //tarjeta
   cy.Añadir_text('#expiration > .p-inputtext',expiracion )   //expiracion
})

Cypress.Commands.add("Añadir_Empresas", (ID, descripcion, direccion, municipio, ciudad, codigo_postal, permite_off) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_text('.p-inputnumber > .p-inputtext',ID)
   cy.Añadir_text('#companyName',descripcion)
   cy.Añadir_text('#address',direccion)
   cy.Añadir_text('#town',municipio)
   cy.Añadir_text('#city',ciudad)
   cy.Añadir_text('#zipCode',codigo_postal)
   cy.Check('.p-checkbox-box',permite_off)
   //cy.Añadir_text('#pan',codigo_financiero)
   
})

Cypress.Commands.add("Añadir_Canales_entidad", (entidad,canal,t_desconexion,n_transacciones_simu, host_1,puerto_1, host_2,puerto_2,host_3,puerto_3) => { 
   cy.get('#pn_id_11_header_action').should("be.visible").click().wait(100)
   //Datos principales
   cy.get('.p-dropdown-label').click().wait(100)
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

Cypress.Commands.add("Añadir_Acuerdos_Comision", (csb_emisor, csb_adquiriente) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_Combo_Buscar('#acquirer > .p-dropdown-label','.p-dropdown-filter', csb_emisor ) //csb_emisor
   cy.Añadir_Combo_Buscar('#issuer > .p-dropdown-label','.p-dropdown-filter', csb_adquiriente ) //csb_adquiriente

})

Cypress.Commands.add("Añadir_Monedas", (ID, moneda, descripcion, simbolo, pais, decimales) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_text('#currencyId > .p-inputnumber > .p-inputtext',ID)
   cy.Añadir_text('#description',descripcion)
   cy.Añadir_text('#currency',moneda)
   cy.Añadir_text('#symbol',simbolo)
   cy.Añadir_text('#country',pais)
   cy.Añadir_text('#decimalPlaces > .p-inputnumber > .p-inputtext',decimales)
   
})

Cypress.Commands.add("Añadir_Tiendas", (ID, FUC, descripcion, provincia, permite_off) => { 
   let empresa = " ";
   let direccion = " ";
   let ciudad = " ";
   let codigo_postal = " ";
   // Validaciones en la UI basadas en los datos del JSON
   cy.Añadir_text('#storeId > .p-inputnumber > .p-inputtext',ID)
   cy.get('#storeName').clear().type(descripcion).click() 
   //FUC
   cy.Añadir_text('#merchantTerminal > .p-inputnumber > .p-inputtext',FUC)
   cy.Añadir_text('#town',provincia)
   cy.Check('.p-checkbox-box',permite_off) 
   //Empresa
   cy.Añadir_Combo('.p-dropdown-label', empresa).click()
   cy.Añadir_text('#address',direccion) //direccion
   cy.Añadir_text('#city',ciudad) //ciudad
   cy.Añadir_text('#zipCode',codigo_postal) //codigo postal      
})

Cypress.Commands.add("Añadir_Cajas", (caja, centro, tipo_punto_servicio) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.wait(1000)  
   cy.Añadir_Combo_Buscar_caja('#store > .p-dropdown-label', '.p-dropdown-filter', centro)     
   cy.Añadir_Combo('#servicePointType > .p-dropdown-label', tipo_punto_servicio)
   cy.Añadir_text('.p-inputnumber > .p-inputtext', caja)     
})




Cypress.Commands.add("Editar_Acuerdos_Comision", (csb_emisor, csb_adquiriente) => { 
   // Validaciones en la UI basadas en los datos del JSON   
   cy.get('.p-dropdown-label').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",csb_emisor ) //csb_emisor
   cy.get('.p-dropdown-label').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",csb_adquiriente ) //csb_adquiriente
})

Cypress.Commands.add("Editar_Adquirientes", ( ID,numero_cuenta,tipo_cuenta,cuenta_asociada,nombre_cuenta,moneda,entidad,fecha_sesión,numero_secuencia,cuadre,numero_sesión,estado,numero_comercio,numero_terminal,frozado_off,identificacion_adq,CSB,terminal_on,off_internacional, off_EMV, forzado_respaldo) => { 
   //Puslar boton Modificar
   cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
   
   //Datos principales
   cy.get('#pn_id_11_header_action').should("be.visible").click()
   //ID
   cy.get('#acquirerId').should('not.be.enabled'); // Confirma que no aparece la lista
   cy.log("⚠️ No esta permitido editar",ID)
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

Cypress.Commands.add("Editar_Entidad", (id, nombre ,permitirOffline, frozado_off,id_protocolo,tipo_red, redEntidad, Intentos_max,T_espera, T_error, T_conexion, T_off, T_transaccion,host1 , puerto1, host2 , puerto2 , host3 ,puerto3, indidentif,Identidad, identificacionAdquirente,  Cajón_claves, Mac, Mac_EMV_1, Mac_EMV_2,máximo_procesos, eodRequerido, puntoServicio ,Características_1, Características_2, Características_3, infoSeguridad ,Tipo_cir, ID_TCP_IP,Versión_TCP_IP, Longitud_cabecera,ID_conexión , Dirección_IP_actualizada, EOD_total_requerido, Requiere_autentificación ,Requiere_proceso_recuperación, Bloqueado) => {     
   // Validaciones en la UI basadas en los datos del JSON
   cy.Click_force('#pn_id_11_header_action')
   //Datos Principales
   cy.get('#entityId > .p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",id);//ID
   cy.get('#entityName').should("be.visible").clear().type(nombre,"{enter}");//Nombre de entidad
   //Forzado Offline
   cy.get('#allowOffline > .p-checkbox > .p-checkbox-box').then(($checkbox) => {
      const isChecked = $checkbox.attr('data-p-highlight') === 'true'; // Verifica si el checkbox está marcado
   
      if (!isChecked && (permitirOffline === "Si" )) {
         // Si el checkbox no está seleccionado y el valor es "Si", seleccionamos el checkbox
         cy.wrap($checkbox).click();
         cy.Añadir_Combo('#offlineForced > .p-dropdown-label', frozado_off);
         cy.log('✅ Checkbox seleccionado');
      } else if (isChecked && (permitirOffline === "No")){
         // Si el checkbox está seleccionado y el valor es "No", seleccionamos el checkbox
         cy.wrap($checkbox).click();
         cy.log('Checkbox deshabilitado');
      } else {
         // Si ya está seleccionado, no hacemos nada
         cy.log('⚠️ El checkbox ya estaba seleccionado, no se hizo clic.');
      }
   });   

   cy.Añadir_Combo('#entityProtocol > .p-dropdown-label',id_protocolo)  //ID protocolo
   cy.Añadir_Combo('#networkType > .p-dropdown-label',tipo_red)   //Tipo de red
   cy.get('#entityNetwork > .p-dropdown-label').should("not.be.visible").click().wait(100).type(redEntidad,"{enter}") //Red entidad

   //Datos de tiempo e intentos
   cy.Click_force('#pn_id_12_header_action')
   cy.get('#triesMax > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(Intentos_max,"{enter}")  //Intentos máximos
   cy.get('#timeWait > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_espera,"{enter}")   //Tiempo de espera
   cy.get('#timeError > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_error,"{enter}")   //Tiempo de error 
   cy.get('#timeConnect > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_conexion,"{enter}")   //Tiempo de conexión
   cy.get('#timeOffline > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_off,"{enter}")   //Tiempo offline 
   cy.get('#timeTransaction > .p-inputnumber > .p-inputtext').should("be.visible").clear().type(T_transaccion,"{enter}")   //Tiempo de transacción

   //Datos de conexion
   cy.Click_force('#pn_id_13_header_action')
   cy.Añadir_text('#host1',host1 )
   cy.Añadir_text('#port1 > .p-inputnumber > .p-inputtext',puerto1 )
   cy.Añadir_text('#host2',host2 )
   cy.Añadir_text('#port2 > .p-inputnumber > .p-inputtext',puerto2 )
   cy.Añadir_text('#host3',host3 )
   cy.Añadir_text('#port3 > .p-inputnumber > .p-inputtext',puerto3 )
  
   //Conf.de autorizador
   cy.Click_force('#pn_id_14_header_action')
   cy.Añadir_text('#indidentif', indidentif)  //Indicador identificación
   cy.Añadir_text('#identity', Identidad)   //Identidad
   cy.Añadir_text('#acquirerIdentification', identificacionAdquirente);//Identificación adquirente
   cy.Añadir_text('#slotKey > .p-inputnumber > .p-inputtext', Cajón_claves)  //Cajón de claves
   cy.Añadir_text('#macLevel > .p-inputnumber > .p-inputtext', Mac)   //Nivel mac
   cy.Añadir_text('#macEmv1', Mac_EMV_1)   //Mac EMV 1
   cy.Añadir_text('#macEmv2', Mac_EMV_2)   //Mac EMV 2

   //Parametrizacion interna
   cy.Click_force('#pn_id_15_header_action')
   cy.Añadir_text('#processMaxNumber > .p-inputnumber > .p-inputtext',máximo_procesos )   //Número máximo de procesos
   cy.Añadir_text('#requireEod > .p-inputnumber > .p-inputtext', eodRequerido);//EOD Requerido
   cy.Añadir_text('#servicePoint', puntoServicio);//Punto de servicio
   cy.Añadir_text('#features1', Características_1)   //Características 1
   cy.Añadir_text('#features2', Características_2)   //Características 2
   cy.Añadir_text('#features3', Características_3)   //Características 3
   cy.Añadir_text('#incont', infoSeguridad);//Información Seguridad y Control
   cy.Añadir_text('#cirType', Tipo_cir)   //Tipo cir

   //P. Interna II
   cy.Click_force('#pn_id_16_header_action')
   cy.Añadir_text('#tcpIpConfigurationId', ID_TCP_IP)  //ID configuración TCP/IP
   cy.Añadir_text('#tcpIpConfigurationVersion', Versión_TCP_IP)   //Versión configuración TCP/IP
   cy.Añadir_text('#lengthMessageHeader > .p-inputnumber > .p-inputtext', Longitud_cabecera)   //Longitud cabecera mensaje
   cy.Añadir_text('#connectionId > .p-inputnumber > .p-inputtext', ID_conexión)   //ID conexión
   //Dirección IP actualizada
   if (Dirección_IP_actualizada = " ") {
      cy.log('Se deja igual, sin seleccionar')
   } else if (Dirección_IP_actualizada = "Desactivado"){
      cy.Click_force('.p-selectbutton > .p-highlight')
   } else if (Dirección_IP_actualizada = "Activado"){
      cy.get('.p-selectbutton > [tabindex="-1"]')
   }

   if (EOD_total_requerido  = "1"){
      cy.Click_Botón('#requireTotalEod > .p-checkbox > .p-checkbox-box', 100)  //EOD total requerido
   }
   if (Requiere_autentificación  = "1"){
      cy.Click_Botón('#requireAuthentication > .p-checkbox > .p-checkbox-box', 100)   //Requiere autentificación
   }
   if (Requiere_proceso_recuperación  = "1"){
      cy.Click_Botón('#requireRecoveryThread > .p-checkbox > .p-checkbox-box', 100)   //Requiere proceso de recuperación
   }
   if (Bloqueado  = "1"){
      cy.Click_Botón('#blocked > .p-checkbox > .p-checkbox-box', 100)   //Bloqueado 
   }
   
})

Cypress.Commands.add("Editar_Protocolos", ( id ,descripción, versión) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get(".p-inputnumber > .p-inputtext").should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar", id);//ID
   cy.get('#protocolName').should('not.be.enabled')//Descripcion
   cy.log("⚠️ No esta permitido editar",descripción)
   cy.get('#protocolVersion').should('not.be.enabled')//Version
   cy.log("⚠️ No esta permitido editar",versión)   
})

Cypress.Commands.add("Editar_Redes_Entidad", ( id ,nombre_red) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get('.p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar", id);//ID
   cy.Añadir_text('#entityNetworkName',nombre_red )   
})

Cypress.Commands.add("Editar_Respaldo_Enrrutamiento", (cuenta, cuenta_respaldo, prioridad) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get('#account > .p-dropdown-label').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar", cuenta);// //Adquiriente 
   cy.get('#bkpAccount > .p-dropdown-label').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar", cuenta_respaldo);//Adquiriente respaldo
   cy.Añadir_text('.p-inputnumber > .p-inputtext',prioridad )    //Prioridad
})

Cypress.Commands.add("Editar_Entidades_Emisoras", (csb_emisor, nombre_emisor) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get('#csbIssuer').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",csb_emisor )   //csb_emisor
   cy.Añadir_text('#nameIssuer',nombre_emisor )   //nombre_emisor
})

Cypress.Commands.add("Editar_Canales_entidad", (entidad, canal, t_desconexion, n_transacciones_simu, host_1, puerto_1, host_2, puerto_2, host_3, puerto_3) => { 
   //Puslar boton Modificar
   cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click();
   // Datos principales
   cy.get('.p-dropdown-label').should('not.be.enabled'); // Confirma que no aparece la lista
   cy.log("⚠️ No esta permitido editar",entidad)

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

Cypress.Commands.add("Editar_Test_adquirientes", (cuenta, tarjeta, expiracion) => { 
   // Validaciones en la UI basadas en los datos del JSON   
   cy.get('.p-dropdown-label').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",cuenta ) //cuenta
   cy.Añadir_text('#pan',tarjeta )   //tarjeta
   cy.Añadir_text('#expiration > .p-inputtext',expiracion )   //expiracion
})

Cypress.Commands.add("Editar_Enrrutamientos_PIN_Online", (empresa, centro, caja, cajon_claves, cuenta) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get(':nth-child(1) > :nth-child(1) > .ng-untouched').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",empresa ) //empresa
   cy.get('#store > .p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",centro )   //centro
   cy.get('#posId > .p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",caja )   //caja
   cy.get('#slotKey > .p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",cajon_claves )   //cajon_claves
   cy.Añadir_Combo('#account > .p-dropdown-label',cuenta ) //cuenta
})

Cypress.Commands.add("Editar_Empresas", (ID, descripcion, direccion, municipio, ciudad, codigo_postal, permite_off) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get('.p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",ID) //ID
   cy.Añadir_text('#companyName',descripcion)
   cy.Añadir_text('#address',direccion)
   cy.Añadir_text('#town',municipio)
   cy.Añadir_text('#city',ciudad)
   cy.Añadir_text('#zipCode',codigo_postal)
   cy.Check('.p-checkbox-box',permite_off)
   //cy.Añadir_text('#pan',codigo_financiero)
   
})

Cypress.Commands.add("Editar_Monedas", (ID, moneda, descripcion, simbolo, pais, decimales) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get('#currencyId > .p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",ID) //ID
   cy.Añadir_text('#currency',moneda)
   cy.Añadir_text('#description',descripcion)
   cy.Añadir_text('#symbol',simbolo)
   cy.Añadir_text('#country',pais)
   cy.Añadir_text('#decimalPlaces > .p-inputnumber > .p-inputtext',decimales)   
})

Cypress.Commands.add("Editar_Tiendas", (ID, descripcion, empresa, FUC, direccion, provincia, ciudad, codigo_postal, permite_off) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.get('#storeId > .p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar",ID) //ID
   cy.get('#storeName').clear().type(descripcion).click() 
   //FUC
   cy.Añadir_text('#merchantTerminal > .p-inputnumber > .p-inputtext',FUC)
   cy.Añadir_text('#town',provincia)
   cy.Check('.p-checkbox-box',permite_off) 
   //Empresa
   cy.Añadir_Combo('.p-dropdown-label', empresa).click()
   cy.Añadir_text('#address',direccion) //direccion
   cy.Añadir_text('#city',ciudad) //ciudad
   cy.Añadir_text('#zipCode',codigo_postal) //codigo postal      
})

Cypress.Commands.add("Editar_Cajas", (caja, centro, tipo_punto_servicio) => { 
   // Validaciones en la UI basadas en los datos del JSON
   cy.wait(1000)  
   cy.get('#store > .p-dropdown-label').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar", centro)
   cy.Añadir_Combo('#servicePointType > .p-dropdown-label', tipo_punto_servicio)
   cy.get('.p-inputnumber > .p-inputtext').should('not.be.enabled')
   cy.log("⚠️ No esta permitido editar", caja)     
})



Cypress.Commands.add('Guardar_Confirmar_canal_entidad', (selector_guardar, t) => {
   //Pulsar boton guardar 
   cy.get(selector_guardar).should("be.visible").click()
   // Espera que el mensaje sea visible
   cy.get('app-add > app-custom-toast > p-toast.p-element > .p-toast')
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

Cypress.Commands.add('Guardar_Confirmar_Acuerdo_Comision', (selector_guardar, selector_mensaje) => {
   // Interceptar la petición API
   cy.intercept('POST', '**/api/routing/add').as('guardar');
   // Verificar si el botón de guardar es visible
   cy.get(selector_guardar).then(($btn) => {
      if ($btn.is(':visible') && ($btn.is(':enabled')) ){
         cy.get(selector_guardar).click()
         cy.get(selector_mensaje).should('exist').and('be.visible').then(($alert) => {
            if ($alert.text().includes('ya existe!')){
               cy.get('.absolute > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true });
               cy.log('⚠️ ¡Ya existe!');
            } else {
               cy.log('✅ ¡Ha sido guardado!');
            }
         })   
      } else if ($btn.is(':disabled') || $btn.hasClass('p-disabled')) {
         // ⚠ Si el botón está deshabilitado, hacer otra acción
         cy.log('El botón está deshabilitado, ejecutando otra acción...');           
         // Ejemplo: hacer clic en otro botón, mostrar un mensaje o realizar otra validación
         cy.get('.absolute > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true })
         cy.log('⚠️ ¡No se pudo guardar!')
           
      } else {
         cy.log('✅ ¡He llegado aqui!');
      }
   })
})

Cypress.Commands.add('Guardar_Confirmar_Comisiones', (selector_guardar, selector_mensaje) => {
   // Interceptar la petición API
   cy.intercept('POST', '**/api/routing/add').as('guardar');
   // Verificar si el botón de guardar es visible
   cy.get(selector_guardar).then(($btn) => {
      if ($btn.is(':visible') && ($btn.is(':enabled')) ){
         cy.get(selector_guardar).click()
         cy.get(selector_mensaje).should('exist').and('be.visible').then(($alert) => {
            if ($alert.text().includes('ya existe!')){
               cy.get('.absolute > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true });
               cy.log('⚠️ ¡Ya existe!');
            } else if ($alert.text().includes('¡Ha ocurrido un error ')){
               cy.log('⚠️ ¡Ha ocurrido un error :( !');
            } else {
               cy.log('✅ ¡Ha sido guardado!');
            }
         })   
      } else if ($btn.is(':disabled') || $btn.hasClass('p-disabled')) {
         // ⚠ Si el botón está deshabilitado, hacer otra acción
         cy.log('El botón está deshabilitado, ejecutando otra acción...');           
         // Ejemplo: hacer clic en otro botón, mostrar un mensaje o realizar otra validación
         cy.log('⚠️ ¡No se pudo guardar!')
           
      } else {
         cy.log('✅ ¡He llegado aqui!');
      }
   })
})

Cypress.Commands.add('Guardar_Confirmar_Empresa', (selector_guardar, selector_mensaje) => {
   // Interceptar la petición API
   cy.intercept('POST', '**/api/routing/add').as('guardar');
   // Verificar si el botón de guardar es visible
   cy.get(selector_guardar).then(($btn) => {
      if ($btn.is(':visible') && ($btn.is(':enabled')) ){
         cy.get(selector_guardar).click()
         cy.get(selector_mensaje).should('exist').and('be.visible').then(($alert) => {
            if ($alert.text().includes('ya existe!')){
               cy.get('.mt-5 > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true });
               cy.log('⚠️ ¡Ya existe!');
            } else if ($alert.text().includes('¡Ha ocurrido un error ')){
               cy.log('⚠️ ¡Ha ocurrido un error :( !');
            } else {
               cy.log('✅ ¡Ha sido guardado!');
            }
         })   
      } else if ($btn.is(':disabled') || $btn.hasClass('p-disabled')) {
         // ⚠ Si el botón está deshabilitado, hacer otra acción
         cy.log('El botón está deshabilitado, ejecutando otra acción...');           
         // Ejemplo: hacer clic en otro botón, mostrar un mensaje o realizar otra validación
         cy.log('⚠️ ¡No se pudo guardar!')

         cy.get('.mt-5 > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true });
           
      } else {
         cy.log('✅ ¡He llegado aqui!');
      }
   })
})

Cypress.Commands.add('Guardar_Confirmar_Protocolo', (selector_guardar, selector_mensaje, t) => {
   // Interceptar la petición API
   cy.intercept('POST', '**/api/routing/add').as('guardar');
   // Verificar si el botón de guardar es visible
   cy.get(selector_guardar).then(($btn) => {
      if ($btn.is(':visible') && ($btn.is(':enabled')) ){
         cy.get(selector_guardar).click()
         cy.get(selector_mensaje).should('exist').and('be.visible').then(($alert) => {
            if ($alert.text().includes('ya existe!')){
               cy.get('.mt-5 > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true });
               cy.log('⚠️ ¡Ya existe!');
               cy.wait(t);
            } else {
               cy.log('✅ ¡Ha sido guardado!');
               cy.wait(t);
            }
         })   
      } else if ($btn.is(':disabled') || $btn.hasClass('p-disabled')) {
         // ⚠ Si el botón está deshabilitado, hacer otra acción
         cy.log('El botón está deshabilitado, ejecutando otra acción...');           
         // Ejemplo: hacer clic en otro botón, mostrar un mensaje o realizar otra validación
         cy.get('.mt-5 > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true })
         cy.log('⚠️ ¡No se pudo guardar!')  
         cy.wait(t);
           
      } else {
         cy.log('✅ ¡He llegado aqui!');
         cy.wait(t);
      }
   })
})

Cypress.Commands.add('Guardar_Confirmar_Entidad', (selector_guardar, selector_mensaje, t) => {
   // Verificar si el botón de guardar es visible
   cy.get(selector_guardar).then(($btn) => {
      if ($btn.is(':visible') && ($btn.is(':enabled')) ){
         cy.get(selector_guardar).click(); 
         cy.wait(100)
         // Verificar si el mensaje realmente aparece en el DOM antes de esperar su visibilidad
         cy.get(selector_mensaje).should('exist').and('be.visible').then(($alert) => {
            if ($alert.text().includes('ya existe!')){
               cy.get('.absolute > [icon="pi pi-times"] > .p-ripple').should('be.visible').click({ force: true });
               cy.log('⚠️ ¡Ya existe!');
               cy.wait(t);
            } else {
               cy.log('✅ ¡Ha sido guardado!');
            }
         })                 
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
});

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
       cy.log('⚠️ ¡El adquirente ya existe!'); // Log de la alerta
       cy.wait(t)
     } else {
       // Si la alerta no aparece, realizar otra acción (guardar, por ejemplo)
       cy.log('¡Ha sido guardado!'); // Log de éxito
       cy.wait(t)
     }
   });   

})

Cypress.Commands.add('Guardar_Confirmar_Caja', (selector_guardar, selector_mensaje, t) => {
   // Interceptar la petición API
   cy.intercept('POST', '**/api/routing/add').as('guardar');

   // Verificar si el botón de guardar es visible
   cy.get(selector_guardar).then(($btn) => {
      if ($btn.is(':visible') && ($btn.is(':enabled')) ){
         cy.get(selector_guardar).click();
                  
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
         })  
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



Cypress.Commands.add("Eliminar_Anular", (boton_borrar, boton_anular, elemento) => { 
   //Sin seleccionar esta desactivada
   cy.get(boton_borrar).should('not.be.enabled').wait(1000);
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

Cypress.Commands.add('Validar_campo', (selector, men, nombre_campo, selector_volver, t) => { 
   cy.get(selector).should('be.visible').should("contain",men).then((val)=>{
       cy.log("El valor de" + nombre_campo + "no es valido")
       //volver
       cy.get(selector_volver).click().wait(t) 
   })   
})

