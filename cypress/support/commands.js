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
   cy.get(elemento).should("be.visible").click(); 
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
   cy.get(elemento).should("be.visible").click(); 
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

Cypress.Commands.add('Guardar_Confirmar', (selector_guardar, t) => {
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
   cy.get(selector_volver).click().wait(t)            
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
