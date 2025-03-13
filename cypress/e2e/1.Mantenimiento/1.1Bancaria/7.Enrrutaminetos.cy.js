const { random } = require("lodash");
describe('Enrrutamientos', () => {
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
      
      // Seleccionar la entidad
      cy.get('#submenu-bancaria > :nth-child(7)').scrollIntoView().should("be.visible").click()  
    })

    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      //Conextar con archivo Json
      cy.fixture('7_Enrrutamientos.json').then((enrrutamientos) => {
        enrrutamientos.forEach((enrrutamientos) => {
          let tarjeta=enrrutamientos.tarjeta
          let Empresa= enrrutamientos.empresa
          let centro = enrrutamientos.centro
          let caja=enrrutamientos.caja
          let cuenta= enrrutamientos.cuenta
          //Boton añadir
          cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
          cy.Añadir_Enrrutaminetos(tarjeta,Empresa,centro,caja,cuenta)
          cy.Guardar_Confirmar('[icon="pi pi-save"] > .p-ripple', '.ng-tns-c3576075022-11 > .bg-white > .flex-col', tiempo)
        });
      })   

    });

    // Modificar un [Elemento]
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.get('.p-datatable-tbody > .p-element > :nth-child(2)').should("be.visible").wait(tiempo)
      cy.Click_force('.p-datatable-tbody > .p-element > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
      cy.Añadir_Enrrutaminetos("19 - BBVA","1 - Empresa 1", "0 - DEFAULT",'0',"A19 - BBVA")
      cy.Guardar_Confirmar('[icon="pi pi-save"] > .p-ripple', '.ng-tns-c3576075022-11 > .bg-white > .flex-col', tiempo)
      
    });

    // Listar todos los elementos
    it('Debería listar todos los [elementos]', () => {
      cy.get('.p-scroller').should("be.visible").wait(tiempo); // Verificar que el listado de registros se muestra
      cy.get('.p-scroller').should("have.length.greaterThan", 0).wait(tiempo); // Validar que hay al menos un registro
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
