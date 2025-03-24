const { random } = require("lodash");
describe('Comisiones', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
      //PAGINA
      cy.visit('https://newfront.lab.solverpay.com/login'); 
      cy.title().should('eq','Login')
      //LOGIN
      cy.login()
      cy.wait(tiempo)
      
      //Seleccionar Mantenimientos en el Menu
      cy.get('[data-target="submenu-maintenance"]').scrollIntoView().should("be.visible").click()
      //Seleccionar Bancaria en el Submenu
      cy.get('[data-target="submenu-bancaria"]').scrollIntoView().should("be.visible").click()  
      
      // Seleccionar Comisiones
      cy.get('#submenu-bancaria > :nth-child(2)').scrollIntoView().should("be.visible").click()  
    })

    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      //Verificar que carga ambas pantallas  
      cy.Elemento_visible('div.flex.flex-col.max-h-\\[1000px\\].min-w-\\[15rem\\].w-\\[15rem\\]')      
      cy.Elemento_visible('div.max-h-\\[1000px\\] h1.text-base.font-bold')       
      cy.Elemento_visible('.right')

      // Cargar los dos JSON
      cy.fixture('2_Comisiones.json').then((Comisiones) => {
        cy.fixture('2.1_valoresBusqueda.json').then((valoresBusqueda) => {
           // Iterar sobre los valores de búsqueda
           valoresBusqueda.forEach((valorBusqueda, index) => {
            // Buscar el valor en la pantalla izquierda 
            cy.Elemento_visible('div.max-h-\\[1000px\\] input[placeholder="Buscar"]')
            cy.get('input[placeholder="Buscar"]').scrollIntoView() // Selecciona el campo de búsqueda
              .should('be.visible') // Asegura que esté visible
              .clear() // Limpia cualquier valor previo
              .type(valorBusqueda.valor) // Escribe el valor de búsqueda
              .should('have.value', valorBusqueda.valor); // Verifica que el valor está en el campo de búsqueda
            
            // Esperar que aparezcan los resultados en la lista
            cy.Elemento_visible('div.max-h-\\[1000px\\]').scrollIntoView().each(($el) => {
              // Itera sobre cada elemento
              const texto = $el.text().trim(); // Extrae el texto del div y lo limpia de espacios extras
              if (texto.includes(valorBusqueda.valor)) {
                cy.log(`Valor ${valorBusqueda.valor} ya registrado en: ${texto}`);

               
                // Recorrer todas las configuraciones de `Comisiones.json`
                Comisiones.forEach((config) => {    

                  // Seleccionar el primer elemento que coincida
                  cy.Elemento_visible('div.inline-flex.rounded-xl.cursor-pointer').click(); // Asegura visibilidad y hace clic en el elemento correcto
                  
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
                  // Llenar los campos en la pantalla derecha con los valores de Comisiones.json
                  cy.Añadir_text('#presentNationalCreditOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_propias_D )   //Nacionales_propias_D
                  cy.Añadir_text('#presentNationalDebitOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_propias_C )   //Nacionales_propias_C
                  cy.Añadir_text('#presentNationalDebitNonOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_ajenas_D )   //Nacionales_ajenas_D
                  cy.Añadir_text('#presentNationalCreditNonOwnPercentage > .p-inputnumber > .p-inputtext',config.Nacionales_ajenas_C )   //Nacionales_ajenas_C
                  cy.Añadir_text('#presentNeobankDebitPercentage > .p-inputnumber > .p-inputtext',config.Neobancos_D )   //Neobancos_D
                  cy.Añadir_text('#presentNeobankCreditPercentage > .p-inputnumber > .p-inputtext',config.Neobancos_C )   //Neobancos_C
                  cy.Añadir_text('#presentInternationalDebitPercentage > .p-inputnumber > .p-inputtext',config.Internacionales_D )   //Internacionales_D
                  cy.Añadir_text('#presentInternationalCreditPercentage > .p-inputnumber > .p-inputtext',config.Internacionales_C )   //Internacionales_C
                  cy.Añadir_text('#presentInternationalUnknownPercentage > .p-inputnumber > .p-inputtext',config.Internacionales_Desc )   //Internacionales_Desc
                  // Otras acciones como guardar o confirmar
                  cy.Guardar_Confirmar_Comisiones('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
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
      //Verificar que carga ambas pantallas  
      cy.Elemento_visible('div.flex.flex-col.max-h-\\[1000px\\].min-w-\\[15rem\\].w-\\[15rem\\]')
      cy.Elemento_visible('.right') 
      
      let contador = 1; // Valor inicial que quieres asignar
      // Iterar sobre una lista de selectores para los campos de entrada
      const inputs = [
        '#presentNationalCreditOwnPercentage > .p-inputnumber > .p-inputtext',
        '#presentNationalDebitOwnPercentage > .p-inputnumber > .p-inputtext',
        '#presentNationalDebitNonOwnPercentage > .p-inputnumber > .p-inputtext',
        '#presentNationalCreditNonOwnPercentage > .p-inputnumber > .p-inputtext',
        '#presentNeobankDebitPercentage > .p-inputnumber > .p-inputtext',
        '#presentNeobankCreditPercentage > .p-inputnumber > .p-inputtext',
        '#presentInternationalDebitPercentage > .p-inputnumber > .p-inputtext',
        '#presentInternationalCreditPercentage > .p-inputnumber > .p-inputtext',
        '#presentInternationalUnknownPercentage > .p-inputnumber > .p-inputtext'
      ];       
      
      cy.fixture('2.1_valoresBusqueda.json').then((valoresBusqueda) => {
        valoresBusqueda.forEach((valorBusqueda) => {
          // Buscar el valor en la pantalla izquierda 
          cy.get('input[placeholder="Buscar"]').should('be.visible').clear().type(valorBusqueda.valor) // Escribe el valor de búsqueda
          // Esperar que aparezcan los resultados en la lista
          cy.get('div.flex.flex-col.max-h-\\[1000px\\].min-w-\\[15rem\\].w-\\[15rem\\]').each(($el) => {
            // Itera sobre cada elemento
            const texto = $el.text().trim(); // Extrae el texto del div y lo limpia de espacios extras
            if (texto.includes(valorBusqueda.valor)) {
              cy.log(`Valor ${valorBusqueda.valor} ya registrado en: ${texto}`);
              // Seleccionar el primer elemento que coincida
              cy.Elemento_visible('div.inline-flex.rounded-xl.cursor-pointer').click(); // Asegura visibilidad y hace clic en el elemento correcto
               // Asegura visibilidad y hace clic en el elemento correcto
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
                // Iterar sobre los selectores
                inputs.forEach((selector) => {
                  cy.get(selector) // Obtener cada uno de los elementos
                    .should('be.visible') // Verificar que el campo sea visible
                    .clear() // Limpiar cualquier valor previo
                    .type(contador) // Asignar el valor del contador
                    .should('contain.value', contador.toString()); // Verificar que el valor haya sido asignado correctamente
                });
                
                // Incrementar el contador después de que se haya asignado a todos los campos
                contador++; 

                cy.Guardar_Confirmar_Comisiones('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)      
              });
            } else {
              cy.log(`Valor ${valorBusqueda.valor} no encontrado en la pantalla izquierda`);
            }
          }) 
        })
      })
    });

    // Eliminar un [Elemento]
    it('Debería eliminar un [Elemento]', () => {
      //Verificar que carga ambas pantallas  
      cy.Elemento_visible('div.flex.flex-col.max-h-\\[1000px\\].min-w-\\[15rem\\].w-\\[15rem\\]')      
      cy.Elemento_visible('div.max-h-\\[1000px\\] h1.text-base.font-bold')       
      cy.Elemento_visible('.right')   
      
      cy.fixture('2.1_valoresBusqueda.json').then((valoresBusqueda) => {
        valoresBusqueda.forEach((valorBusqueda, index) => {
          // Buscar el valor en la pantalla izquierda 
          cy.get('input[placeholder="Buscar"]').should('be.visible').clear().type(valorBusqueda.valor) // Escribe el valor de búsqueda
          // Esperar que aparezcan los resultados en la lista
          cy.get('div.flex.flex-col.max-h-\\[1000px\\].min-w-\\[15rem\\].w-\\[15rem\\]').each(($el) => {
            // Itera sobre cada elemento
            const texto = $el.text().trim(); // Extrae el texto del div y lo limpia de espacios extras
            if (texto.includes(valorBusqueda.valor)) {
              cy.log(`Valor ${valorBusqueda.valor} ya registrado en: ${texto}`);
              // Seleccionar el primer elemento que coincida
              cy.Elemento_visible('div.inline-flex.rounded-xl.cursor-pointer').click();// Asegura visibilidad y hace clic en el elemento correcto
              // Verifica dinámicamente si el modal existe antes de interactuar con él
              cy.get('body').then(($body) => {
                if ($body.find('#confirmModal').length > 0) { 
                  cy.wait(tiempo)
                  // Comprobar si el modal está visible
                  cy.get('#confirmModal').then(($modal) => {                      
                    if ($modal.is(':visible')) {
                      // Si el modal está visible, hacer clic en el botón de confirmación
                      cy.get('[icon="pi pi-arrow-left"] > .p-ripple').click();
                      cy.log('Se detectó el modal y se canceló.'); 
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
              cy.get('[icon="pi pi-trash"] > .p-ripple').then(($btn) => {
                if (!$btn.is(':enabled')) {
                  cy.wait(tiempo);
                  cy.log('El boton eliminar esta desactivado.');
                } else {
                  cy.Elemento_visible($btn).click();
                  cy.get('.bg-white > .flex-col')
                  .should('be.visible') 
                  .then(($alert) => {
                    // Verifica si el texto contiene la alerta esperada
                    if ($alert.text().includes('¡El adquiriente se ha eliminado!')) {
                      cy.log('Se ha eliminado correctamente'); // Log de éxito
                    }
                  })
                }
              });
            } else {
              cy.log(`Valor ${valorBusqueda.valor} no encontrado en la pantalla izquierda`);
            }
          }) 
        })
      })
    });
    
})
