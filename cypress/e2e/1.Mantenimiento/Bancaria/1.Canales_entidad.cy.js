const { random } = require("lodash");
describe('Mantenimiento', () => {
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
      
      // Seleccionar la entidad
      cy.get('#submenu-bancaria > :nth-child(1)').should("be.visible").click()  
    })

    // Scenario Outline: Probar CRUD para <entidad>  
  
    it("debería poder crear un nuevo registro correctamente", () => {
      // Simular el proceso de creación de un nuevo registro
      cy.get('[severity="primary"] > .p-ripple').click(); // Hacer clic en el botón para crear un nuevo registro
      // Ingresar un nombre para el nuevo registro
      cy.Añadir_Canales_entidad("44 - Ciers 44", '1','999', '200', "127.0.0.1", '60003',"127.0.0.1", '60003', "127.0.0.1",'60003');
      cy.wait(tiempo)
      //Guardar
      cy.Guardar_Confirmar('[icon="pi pi-save"] > .p-ripple', tiempo) 
    });
  
    it("debería poder visualizar los registros existentes", () => {
    // Verificar que se visualizan los registros existentes
    cy.get('.p-scroller-viewport').should("be.visible"); // Verificar que el listado de registros se muestra
    cy.get('.p-scroller-viewport').should("have.length.greaterThan", 0); // Validar que hay al menos un registro
    });
  
    it("debería poder actualizar un registro correctamente", () => {
    // Simular el proceso de actualización de un registro
    cy.get('.p-datatable-tbody > .p-element > :nth-child(1)').should("be.visible").click()
    // Hacer clic en el primer registro para editar y Modificar el canal
    cy.Editar_Canales_entidad("44 - Ciers 44", '2','999', '200', "127.0.0.1", '60003',"127.0.0.1", '60003', "127.0.0.1",'60003'); 
    //Guardar
    cy.Guardar_Confirmar('[icon="pi pi-save"] > .p-ripple', tiempo) 
    });
  
    it("debería poder eliminar un registro correctamente", () => {
      cy.Eliminar_Anular('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple', '[icon="pi pi-arrow-left"] > .p-ripple', '.p-datatable-tbody > .p-element > :nth-child(1)')
      cy.wait(tiempo)
      //Hacer clic en el primer registro para eliminar
      cy.Eliminar_Confirmar('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple', '.p-datatable-tbody > .p-element > :nth-child(1)')
      cy.wait(tiempo)
    });
    it("debería poder buscar un registro correctamente", () => {
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
      cy.Busqueda('.gap-x-3 > .inline-flex','blabla',tiempo)

    });

})
  