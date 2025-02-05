const { random } = require("lodash");
describe('Test_Adquirientes', () => {
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


    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      const nuevoElemento = {
        campo1: 'valor1',
        campo2: 'valor2',
        campo3: 'valor3',
      };
      cy.request('POST', '/api/[endpoint]', nuevoElemento)
        .then((response) => {
          expect(response.status).to.eq(201);
          itemId = response.body.id;
          expect(response.body.campo1).to.eq(nuevoElemento.campo1);
          expect(response.body.campo2).to.eq(nuevoElemento.campo2);
          expect(response.body.campo3).to.eq(nuevoElemento.campo3);
        });
    });

    // Modificar un [Elemento]
    it('Debería modificar un [Elemento]', () => {
      
    });

     // Listar todos los elementos
     it('Debería listar todos los [elementos]', () => {
     
    });
    
    // Buscar un [Elemento] por ID
    it('Debería buscar un [Elemento] por ID', () => {
      
    });

    // Eliminar un [Elemento]
    it('Debería eliminar un [Elemento]', () => {
  
})
