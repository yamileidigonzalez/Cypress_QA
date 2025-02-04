const { random } = require("lodash");
describe('Entidades', () => {
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
      cy.get('#submenu-bancaria > :nth-child(8)').should("be.visible").click()  
    })


    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      //Conextar con archivo Json
      cy.fixture('8_Entidades.json').then((entidades) => {
        entidades.forEach((config) => {
          let id = config.ID;
          let nombre = config.nombre;
          let eodRequerido = config["eod requerido"];
          let puntoServicio = config["punto servicio"];
          let infoSeguridad = config["informacion seguridad y control"];
          let identificacionAdquirente = config["indentificacion adquirente"];
          let permitirOffline = config["permitir offline"];
          let host1 = config["host 1"];
          let puerto1 = config["puerto 1"];
          let host2 = config["host 2"];
          let puerto2 = config["puerto 2"];
          let host3 = config["host 3"];
          let puerto3 = config["puerto 3"];
          let redEntidad = config["red entidad"];
          //Boton añadir
          cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
          cy.Añadir_Entidad(id, nombre ,eodRequerido, puntoServicio ,infoSeguridad ,identificacionAdquirente, permitirOffline ,host1 , puerto1, host2 , puerto2 , host3 ,puerto3 ,redEntidad)
          cy.Guardar_Confirmar_Entidad('[icon="pi pi-save"] > .p-ripple','.bg-white > .flex-col', tiempo)
        });
      })   
    });

    // Modificar un [Elemento]
    it.only('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      cy.Editar_Entidad('1', "F1-Bank Ciers 44", "Si", "Activado manualmente", " ", " ", "1 - Redsys", "3", "30", "30", "30", "30", "30", "192.168.0.157", "9101", " ", " ", " ", " ", "136544000000000100", "138000", "136569", "2", " ", " ", "1", "No", "510101514041","1000031002", "1100000000", "1000010100", "9102250001000000",  "2","0", "0", "0", "1", "1", "0", "0", "0")
      cy.Guardar_Confirmar_Entidad('[icon="pi pi-save"] > .p-ripple', '.ng-tns-c3576075022-11 > .bg-white > .flex-col', tiempo)
      
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
