describe('Rangos_bines', () => {
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
        cy.get('#submenu-cards > :nth-child(5)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic   
    })

    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      cy.fixture('5_Bines.json').then((Configuracion) => {
        Configuracion.slice(0, 15).forEach((config) => {
            let bin_desde = config['bin desde'];
            let bin_hasta = config['bin hasta'];
            let tarjeta = config.tarjeta;
            let banco_emisor = config['banco emisor'];
            let credito_debito = config['credito/debito'];
            let internacional = config.internacional;
            let token_movil = config['token movil'];
            let prepago = config.prepago;
            let marca_tarjeta = config['marca tarjeta'];
            let neobanco = config.neobanco;
            let neobanco_activo = config['neobanco activo'];
            let permite_offline = config['permite offline'];
            let importe_limite_off = config['importe limite offline'];
            let forzado_offline = config['forzado offline'];
            //Boton añadir
            cy.wait(tiempo)
            cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
            cy.Añadir_Rango_Bines(bin_desde, bin_hasta, tarjeta, banco_emisor, credito_debito, internacional, token_movil,prepago, marca_tarjeta, neobanco, neobanco_activo, permite_offline, importe_limite_off, forzado_offline )
            cy.Guardar_Confirmar_Empresa('[icon="pi pi-save"] > .p-ripple', 'app-add > app-custom-toast > p-toast.p-element > .p-toast', tiempo)
        });
      })
    });  
    
    // Modificar un [Elemento]    
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.Buscar('.gap-x-3 > .inline-flex','402129',tiempo)
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      // Hacer clic en el primer registro para editar y Modificar el canal   
      cy.Editar_Rango_Bines("402129**", "402129**", "30 - Santander","0049 - BANCO SANTANDER", "Debito", "No","No", "No","0 - SIN ASIGNAR","No", "No","No", "300,00","Si")
      cy.Guardar_Confirmar_Empresa('[icon="pi pi-save"] > .p-ripple', 'app-add > app-custom-toast > p-toast.p-element > .p-toast', tiempo)
    }); 
    
     // Listar todos los elementos
    it('Debería listar todos los [elementos]', () => {
      cy.get('.p-scroller-viewport').should("be.visible"); // Verificar que el listado de registros se muestra
      cy.get('.p-scroller-viewport').should("have.length.greaterThan", 0); // Validar que hay al menos un registro
      // Anulamos busqueda
      cy.Click_force('app-filter > .z-20 > .inline-flex')
      cy.Buscar_Rango_Bines("402129**", "402129**", "30 - Santander","0049 - BANCO SANTANDER", "Debito", "No","No", "No","0 - SIN ASIGNAR","No", "No","No", "300,00","Si")
      //boton anular
      cy.Click_force('[outlined="true"] > .p-ripple').wait(tiempo)
      //Limpiamos Datos
      cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
      // Realizamos busqueda
      cy.Click_force('app-filter > .z-20 > .inline-flex').wait(tiempo)
      cy.Buscar_Rango_Bines("402129**", "402129**", "30 - Santander","0049 - BANCO SANTANDER", "Debito", "Si","Si", "Si","0 - SIN ASIGNAR","Si", "Si","Si", "300,00","No")
      //bolon aplicar
      cy.contains('button', 'Aplicar').should('be.visible').click()
      .scrollIntoView()
      // Verificar que hay un máximo de 15 elementos
      cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
      // Interactuar con un filtro específico (Ejemplo: "Forzado Offline | Activado")
      cy.contains('.gap-2 app-filter-badge', 'Forzado Offline')
      .find('i.ph-x')
      .click();
      // Iterar solo sobre los primeros 15 elementos
      cy.get('.gap-2 app-filter-badge').each(($badge, index) => {
        if (index < 15) {
          cy.wrap($badge).find('i.ph-x').click();
        }
      });
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
      cy.Buscar('.gap-x-3 > .inline-flex','4',tiempo)
      cy.get('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple').then(($el) => {
        if ($el.length) {
          cy.Eliminar_Anular(
            '.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple',
            '[icon="pi pi-arrow-left"] > .p-ripple',
            '.p-datatable-tbody > :nth-child(1) > :nth-child(2)'
          );
          cy.wait(tiempo);
          
          // Hacer clic en el primer registro para eliminar si existe
          cy.Buscar('.gap-x-3 > .inline-flex','4',tiempo)
          cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').then(($row) => {
            if ($row.length) {
                //Sin seleccionar esta desactivada
                cy.get('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple').should('not.be.enabled');
                //Hacer clic en el primer registro para eliminar
                cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').should("be.visible").wait(1000).click({ force: true }); 
                // Seleccionar la papelera la eliminación
                cy.get('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple').should("be.visible").click(); 
                // Confirmar la eliminación
                cy.Elemento_visible('#confirmModal')
                cy.get('#confirmModal > .gap-4 > [icon="pi pi-check"] > .p-ripple').click({ force: true })      
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
})