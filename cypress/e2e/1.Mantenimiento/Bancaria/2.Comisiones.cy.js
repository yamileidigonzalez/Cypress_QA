const { random } = require("lodash");
describe('Comisiones', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
      //PAGINA
      cy.visit('https://newfront.lab.solverpay.com/login'); 
      cy.title().should('eq','Login')
      //LOGIN
      cy.get('#user').should("be.visible").should("be.enabled").type('solverpay')
      cy.get('#password').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
      cy.wait(tiempo)
      
      //Seleccionar Mantenimientos en el Menu
      cy.get('[data-target="submenu-maintenance"]').should("be.visible").click()
      //Seleccionar Bancaria en el Submenu
      cy.get('[data-target="submenu-bancaria"]').should("be.visible").click()  
      
      // Seleccionar Comisiones
      cy.get('#submenu-bancaria > :nth-child(2)').should("be.visible").click()  
    })

    // Añadir un nuevo [Elemento]
    it.only('Debería añadir un nuevo [Elemento]', () => {
      //Verificar que carga ambas pantallas  
      cy.Elemento_visible('.left')
      cy.Elemento_visible('.right')

      // Cargar los dos JSON
      cy.fixture('2_Comisiones.json').then((Comisiones) => {
        cy.fixture('2.1_valoresBusqueda.json').then((valoresBusqueda) => {
          // Iterar sobre los valores de búsqueda
          valoresBusqueda.forEach((valorBusqueda, index) => {
            // Buscar el valor en la pantalla izquierda 
            cy.get('.left > .px-4') // Selecciona el campo de búsqueda
              .should('be.visible') // Asegura que esté visible
              .clear() // Limpia cualquier valor previo
              .type(valorBusqueda.valor) // Escribe el valor de búsqueda
              .should('have.value', valorBusqueda.valor); // Verifica que el valor está en el campo de búsqueda
            
            // Esperar que aparezcan los resultados en la lista
            cy.get('.left .inline-flex').each(($el) => {
              // Itera sobre cada elemento
              const texto = $el.text().trim(); // Extrae el texto del div y lo limpia de espacios extras
              //cy.get('.left .inline-flex').filter(`:contains("${valorBusqueda.valor}")`).then(($filteredEl) => {
              if (texto.includes(valorBusqueda.valor)) {
              //if ($filteredEl.length > 0) {
                cy.log(`Valor ${valorBusqueda.valor} ya registrado en: ${texto}`);
                //cy.log(`Valor ${valorBusqueda.valor} ya registrado en: ${$filteredEl.text().trim()}`);

                // Seleccionar el primer elemento que coincida
                cy.wrap($el).should('be.visible').click(); // Asegura visibilidad y hace clic en el elemento correcto
                //cy.wrap($filteredEl.first()).click();
                
                // Verifica dinámicamente si el modal existe antes de interactuar con él
                cy.get('body').then(($body) => {
                  if ($body.find('#confirmModal').length > 0) { 
                    cy.wait(tiempo)
                    // Comprobar si el modal está visible
                    cy.get('#confirmModal').then(($modal) => {                      
                      if ($modal.is(':visible')) {
                        // Si el modal está visible, hacer clic en el botón de confirmación
                        cy.get('[icon="pi pi-check"] > .p-ripple').click();
                        cy.log('Se detectó el modal y se confirmó.');                           
                      } else {
                        // Si el modal no está visible, continuar con el flujo
                        cy.log('El modal no está visible, continuando...');
                      }
                    });
                  } else {
                    // Si el modal no está presente en el DOM, continuar con el flujo
                    cy.log('El modal no está presente, continuando...');                    
                  }
                });                                                
                
                // Recorrer todas las configuraciones de `Comisiones.json`
                Comisiones.forEach((config) => {          
                  // Llenar los campos en la pantalla derecha con los valores de Comisiones.json
                  cy.Añadir_text('#presentNationalCreditOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_propias_D )   //Nacionales_propias_D
                  cy.Añadir_text('#presentNationalDebitOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_propias_C )   //Nacionales_propias_C
                  cy.Añadir_text('#presentNationalDebitNonOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_ajenas_D )   //Nacionales_ajenas_D
                  cy.Añadir_text('#presentNationalCreditOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_ajenas_C )   //Nacionales_ajenas_C
                  cy.Añadir_text('#presentNeobankDebitPercentage > .p-inputnumber > .p-inputtext',config.Neobancos_D )   //Neobancos_D
                  cy.Añadir_text('#presentNeobankCreditPercentage > .p-inputnumber > .p-inputtext',config.Neobancos_C )   //Neobancos_C
                  cy.Añadir_text('#presentInternationalDebitPercentage > .p-inputnumber > .p-inputtext',config.Internacionales_D )   //Internacionales_D
                  cy.Añadir_text('#presentInternationalCreditPercentage > .p-inputnumber > .p-inputtext',config.Internacionales_C )   //Internacionales_C
                  cy.Añadir_text('#presentInternationalUnknownPercentage > .p-inputnumber > .p-inputtext',config.Internacionales_Desc )   //Internacionales_Desc
                  // Otras acciones como guardar o confirmar
                  cy.Guardar_Confirmar_Comisiones('[icon="pi pi-save"] > .p-ripple', 'app-acquirer-commission.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast', tiempo)
                })
              } else {
                cy.log(`Valor ${valorBusqueda.valor} no encontrado en la pantalla izquierda`);
              }
            })
          })
        })
      })  
    });

    // Modificar un [Elemento]
    it('Debería modificar un [Elemento]', () => {
      
    });

     // Listar todos los elementos
     it('Debería listar todos los [elementos]', () => {
      
    });
    
    // Buscar un [Elemento] por ID
    it('Debería buscar un [Elemento] por ID', () => {
       //combrobar boton de busqueda
       cy.Elemento_visible('.gap-x-3 > .inline-flex')

       //busqueda numeros y signos
       cy.Busqueda('.gap-x-3 > .inline-flex','44',tiempo)
       cy.Busqueda('.gap-x-3 > .inline-flex','F1-',tiempo)
       cy.Busqueda('.gap-x-3 > .inline-flex','1212',tiempo)
       cy.Busqueda('.gap-x-3 > .inline-flex','2323',tiempo)
       
       //busqueda letras y espacios
       cy.Busqueda('.gap-x-3 > .inline-flex','unicaja',tiempo)
       cy.Busqueda('.gap-x-3 > .inline-flex','bank',tiempo)
       cy.Busqueda('.gap-x-3 > .inline-flex','Bank ',tiempo)
       cy.Busqueda('.gap-x-3 > .inline-flex','Cier',tiempo)
       cy.Busqueda('.gap-x-3 > .inline-flex','pay',tiempo)
     
    });

    // Eliminar un [Elemento]
    it('Debería eliminar un [Elemento]', () => {
      cy.wait(tiempo)
      cy.Eliminar_Anular('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple', '[icon="pi pi-arrow-left"] > .p-ripple', '.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      cy.wait(tiempo)
      //Hacer clic en el primer registro para eliminar
      cy.Eliminar('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple','.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Validar mensaje de éxito
      cy.get('.bg-white > .flex-col')
      .should('be.visible') 
      .then(($alert) => {
        // Verifica si el texto contiene la alerta esperada
        if ($alert.text().includes('¡El adquiriente se ha eliminado!')) {
          cy.log('¡El adquiriente se ha eliminado!'); // Log de éxito
        }
      })
    });
    
})
