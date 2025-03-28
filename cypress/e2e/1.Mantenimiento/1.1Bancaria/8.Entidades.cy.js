const { random, intersection } = require("lodash");
describe('Entidades', () => {
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
      cy.get('#submenu-bancaria > :nth-child(8)').scrollIntoView().should("be.visible").click()  
    })

    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      //Conextar con archivo Json
      let cont= 0;
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
          cont = cont + 1;
          cy.Añadir_Entidad(id, nombre ,eodRequerido, puntoServicio ,infoSeguridad ,identificacionAdquirente, permitirOffline ,host1 , puerto1, host2 , puerto2 , host3 ,puerto3 ,redEntidad, cont)
          cy.Guardar_Confirmar_Entidad('[icon="pi pi-save"] > .p-ripple','.bg-white > .flex-col', tiempo)
        });
      })   
    });

    // Modificar un [Elemento]
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.wait(3000)
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      cy.Editar_Entidad('1', "F1-Bank Ciers 44", "Si", "Activado manualmente", "90 - 21", "4", "1 - Redsys", "3", "30", "30", "30", "30", "30", "192.168.0.157", "9101", "192.168.0.157", "9101", "192.168.0.157", "9101", "136544000000000100", "138000", "136544", "2", "2", " ", " ","1" ,"1", "510101514041","1000031002", "1100000000", "1000010100", "9102250001000000",  "2","0", "0", "0", "Desactivado", "1", "0", "0", "0")
      cy.Guardar_Confirmar_Entidad('[icon="pi pi-save"] > .p-ripple', '.bg-white > .flex-col', tiempo)
      
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
