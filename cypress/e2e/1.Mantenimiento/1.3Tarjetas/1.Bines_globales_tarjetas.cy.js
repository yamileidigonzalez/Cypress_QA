describe('Bines_globales_tarjetas', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login()
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-maintenance"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('[data-target="submenu-cards"]')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
        
        // Seleccionar la ,confuguracion central
        cy.get('#submenu-cards > :nth-child(1)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic   
    })

    // Añadir un nuevo [Elemento]
    /*
    it('Debería añadir un nuevo [Elemento]', () => {
      cy.fixture('1_Configuracion_Central.json').then((Configuracion_Central) => {
        Configuracion_Central.forEach((config) => {
            let rol = config.rol;
            let propiedad = config.propiedad;
            let valor = config.valor;   
            let tipo = config.tipo
            //Boton añadir
            cy.wait(tiempo)
            cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
            cy.Añadir_Configuracion_Central(rol, propiedad, tipo, valor)
            cy.Guardar_Confirmar_Empresa('[icon="pi pi-save"] > .p-ripple', 'app-add > app-custom-toast > p-toast.p-element > .p-toast', tiempo)
        });
      })
    });   
    */

    // Modificar un [Elemento]    
    /*
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.Busqueda('.gap-x-3 > .inline-flex','SERVER_PORT_LISTEN',tiempo)
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.Editar_Configuracion_Central("0","SERVER_PORT_LISTEN","Entero", "60002")
      cy.Guardar_Confirmar_Empresa('[icon="pi pi-save"] > .p-ripple', 'app-add > app-custom-toast > p-toast.p-element > .p-toast', tiempo)
    }); 
    */

     // Listar todos los elementos
    it('Debería listar todos los [elementos]', () => {
      cy.wait(tiempo)
      cy.get('.p-scroller-viewport').should("be.visible"); // Verificar que el listado de registros se muestra
      cy.get('.p-scroller-viewport').should("have.length.greaterThan", 0); // Validar que hay al menos un registro
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
    /*
    it('Debería eliminar un [Elemento]', () => {
      cy.wait(tiempo)
      cy.get('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple').then(($el) => {
        if ($el.length) {
          cy.Eliminar_Anular(
            '.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple',
            '[icon="pi pi-arrow-left"] > .p-ripple',
            '.p-datatable-tbody > :nth-child(1) > :nth-child(2)'
          );
          cy.wait(tiempo);
          
          // Hacer clic en el primer registro para eliminar si existe
          cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').then(($row) => {
            if ($row.length) {
              cy.Eliminar(
                '.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple',
                '.p-datatable-tbody > :nth-child(1) > :nth-child(2)'
              );
      
              // Validar mensaje de éxito si la eliminación ocurrió
              cy.get('.bg-white > .flex-col').then(($alert) => {
                if ($alert.length && $alert.text().includes('¡El adquiriente se ha eliminado!')) {
                  cy.log('¡El adquiriente se ha eliminado!'); // Log de éxito
                }
              });
            } else {
              cy.log('⚠️ No hay registros para eliminar');
            }
          });
        } else {
          cy.log('⚠️ No se encontró el botón de eliminar');
        }
      });          
    });
    */
})