const { random } = require("lodash");
describe('Enrrutamientos', () => {
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
      cy.get('#submenu-bancaria > :nth-child(7)').should("be.visible").click()  
    })


    // Añadir un nuevo [Elemento]
    it.only('Debería añadir un nuevo [Elemento]', () => {
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
      const elementoModificado = {
        campo1: 'nuevoValor1',
        campo2: 'nuevoValor2',
        campo3: 'nuevoValor3',
      };
      cy.request('PUT', `/api/[endpoint]/${itemId}`, elementoModificado)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.campo1).to.eq(elementoModificado.campo1);
          expect(response.body.campo2).to.eq(elementoModificado.campo2);
          expect(response.body.campo3).to.eq(elementoModificado.campo3);
        });
    });

     // Listar todos los elementos
     it('Debería listar todos los [elementos]', () => {
      cy.request('GET', '/api/[endpoint]')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
        });
    });
    
    // Buscar un [Elemento] por ID
    it('Debería buscar un [Elemento] por ID', () => {
      cy.request('GET', `/api/[endpoint]/${itemId}`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.id).to.eq(itemId);
        });
    });

    // Eliminar un [Elemento]
    it('Debería eliminar un [Elemento]', () => {
      cy.request('DELETE', `/api/[endpoint]/${itemId}`)
        .then((response) => {
          expect(response.status).to.eq(200);
        });
      cy.request({ method: 'GET', url: `/api/[endpoint]/${itemId}`, failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.eq(404);
        });
    });
})
