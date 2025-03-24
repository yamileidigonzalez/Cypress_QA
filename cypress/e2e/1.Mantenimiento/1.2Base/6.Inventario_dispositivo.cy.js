describe('Inventario_dispositivos', () => {
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
      //Seleccionar en el Submenu
      cy.get('[data-target="submenu-base"]').scrollIntoView().should("be.visible").click()  
      
      // Seleccionar la entidad
      cy.get('#submenu-base > :nth-child(6)').scrollIntoView().should("be.visible").click()  
    })

    // Añadir un nuevo [Elemento]
    /*
    it('Debería añadir un nuevo [Elemento]', () => {
      cy.fixture('6_Inventariado_Pinpad.json').then((Inventariado_Pinpad) => {
        Inventariado_Pinpad.forEach((config) => {
          let pos = config.pos;
          let store = config.store;
          let company = config.company;
          let serialNumber = config.serialNumber;
          let manufacturer = config.manufacturer;
          let model = config.model;
          let updateDate = config.updateDate;          
             
          //Boton añadir
          cy.wait(tiempo)
          cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
          cy.Añadir_Inventariado_Pinpad(pos, store, company, serialNumber, manufacturer, model, updateDate)
          cy.Guardar_Confirmar_Empresa('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
        });
      })
    });*/

    // Modificar un [Elemento]
    /*
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.Busqueda('.gap-x-3 > .inline-flex','3',tiempo)
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.Editar_Empresas("1", "1 - SAN GREGORIO","1 - Empresa 1","00004229722","1","84","- -")
      cy.Guardar_Confirmar_Empresa('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
    }); */

     // Listar todos los elementos
    it('Debería listar todos los [elementos]', () => {
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
    it('Debería eliminar un [Elemento]', () => {
      cy.wait(tiempo)
      //Sin seleccionar esta desactivada
      cy.get('.p-element.ng-star-inserted > .p-ripple').should('not.be.enabled')
      //Hacer clic en el primer registro para eliminar
      cy.Elemento_visible('.p-datatable-tbody > :nth-child(2) > :nth-child(2)').click({force:true})
      cy.Elemento_visible('.p-dialog-content')
      cy.Elemento_visible('.p-dialog-header')
      cy.Elemento_visible('.p-dialog-header-icons > .p-ripple').click()
      // Seleccionar la papelera la eliminación
      cy.get('.p-element.ng-star-inserted > .p-ripple').should("be.visible").click(); 
      // Confirmar la eliminación
      cy.Elemento_visible('#confirmModal')
      cy.Elemento_visible('[icon="pi pi-arrow-left"] > .p-ripple').click()

      // Seleccionar la papelera la eliminación
      cy.Elemento_visible('.p-element.ng-star-inserted > .p-ripple').click({force:true});
      cy.Elemento_visible('[icon="pi pi-check"] > .p-ripple').click({force:true}).wait(tiempo)   
      cy.wait(tiempo)  
      // Validar mensaje de éxito
      cy.Elemento_visible('.bg-white > .flex-col')
        .then(($alert) => {
        // Verifica si el texto contiene la alerta esperada
        if ($alert.text().includes('¡El adquiriente se ha eliminado!')) {
          cy.log('¡El adquiriente se ha eliminado!'); // Log de éxito
        }
      })
    });
})
