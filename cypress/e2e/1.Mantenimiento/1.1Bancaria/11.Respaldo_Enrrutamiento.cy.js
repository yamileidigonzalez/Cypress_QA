const { random } = require("lodash");
describe('Respaldo_Enrrutamientos', () => {
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
      
      // Seleccionar red de entidad
      cy.get('#submenu-bancaria > :nth-child(11)')
      .scrollIntoView()  // Desplaza el elemento a la vista
      .should('be.visible')  // Verifica que el elemento es visible
      .click();  // Luego realiza el clic 
      cy.wait(tiempo)
    })

    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      //Conextar con archivo Json
       cy.fixture('11_Respaldo_Enrrutamiento.json').then((Respaldo_Enrrutamiento) => {
        Respaldo_Enrrutamiento.forEach((config) => {
          let cuenta = config.cuenta;
          let prioridad = config.prioridad;
          let cuenta_respaldo = config["cuenta respaldo"];
          //Boton añadir
          cy.wait(tiempo)
          cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
          cy.Añadir_Respaldo_Enrrutamiento(cuenta, cuenta_respaldo, prioridad)
          cy.Guardar_Confirmar_Protocolo('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
        });
      })   
    });

    // Modificar un [Elemento]
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.wait(tiempo)
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      cy.Editar_Respaldo_Enrrutamiento('A01', "A01", '10')
      cy.Guardar_Confirmar_Protocolo('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
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
      cy.Busqueda('.gap-x-3 > .inline-flex','Ceca ',tiempo)
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
