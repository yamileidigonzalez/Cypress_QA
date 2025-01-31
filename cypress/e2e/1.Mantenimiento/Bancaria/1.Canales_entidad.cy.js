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
  
    it.only("debería poder crear un nuevo registro correctamente", () => {
      // Simular el proceso de creación de un nuevo registro
      cy.get('[severity="primary"] > .p-ripple').click(); // Hacer clic en el botón para crear un nuevo registro
      cy.get("input#campo-nombre").type("Nuevo Registro"); // Ingresar un nombre para el nuevo registro
      cy.get("button#btn-guardar").click(); // Guardar el nuevo registro
      cy.get("#mensaje-exito").should("contain", "Registro creado exitosamente"); // Validar mensaje de éxito
    });
  
    it("debería poder visualizar los registros existentes", () => {
    // Verificar que se visualizan los registros existentes
    //cy.get("#listado-registros").should("be.visible"); // Verificar que el listado de registros se muestra
    //cy.get("#listado-registros tr").should("have.length.greaterThan", 0); // Validar que hay al menos un registro
    });
  
    it("debería poder actualizar un registro correctamente", () => {
    // Simular el proceso de actualización de un registro
    cy.get("button#btn-editar-registro").first().click(); // Hacer clic en el primer registro para editar
    cy.get("input#campo-nombre").clear().type("Registro Actualizado"); // Modificar el nombre
    cy.get("button#btn-guardar").click(); // Guardar los cambios
    cy.get("#mensaje-exito").should("contain", "Registro actualizado exitosamente"); // Validar mensaje de éxito
    });
  
    it("debería poder eliminar un registro correctamente", () => {
    // Simular el proceso de eliminación de un registro
    cy.get("button#btn-eliminar-registro").first().click(); // Hacer clic en el primer registro para eliminar
    cy.get("button#btn-confirmar-eliminar").click(); // Confirmar la eliminación
    cy.get("#mensaje-exito").should("contain", "Registro eliminado exitosamente"); // Validar mensaje de éxito
    });

})
  