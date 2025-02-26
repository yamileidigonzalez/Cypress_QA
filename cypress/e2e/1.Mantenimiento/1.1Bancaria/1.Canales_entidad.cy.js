const { random } = require("lodash");
describe('Canales_Entidad', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
      //PAGINA
      cy.visit('https://newfront.lab.solverpay.com/login'); 
      cy.title().should('eq','Login')
      //LOGIN
      cy.login('solverpay','r7auF23wA.A2l1tZ2Dp4{enter}')
      cy.wait(tiempo)
      
      //Seleccionar Mantenimientos en el Menu
      cy.get('[data-target="submenu-maintenance"]').scrollIntoView().should("be.visible").click()
      //Seleccionar Bancaria en el Submenu
      cy.get('[data-target="submenu-bancaria"]').scrollIntoView().should("be.visible").click()        
      // Seleccionar la entidad
      cy.get('#submenu-bancaria > :nth-child(1)').scrollIntoView().should("be.visible").click()  
    })

    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
       //Conextar con archivo Json
       cy.fixture('1_Canales_Entidad.json').then((Canal_entidades) => {
        Canal_entidades.forEach((config) => {
          let entidad = config.entidad;
          let canal = config.canal;
          let tiempo_des = config["tiempo desconexion"];
          let n_transacciones_simultaneas = config.n_transacciones_simultaneas;
          let host1 = config["host_1"];
          let puerto1 = config["puerto_1"];
          let host2 = config["host_2"];
          let puerto2 = config["puerto_2"];
          let host3 = config["host_3"];
          let puerto3 = config["puerto_3"];
       
          //Boton añadir
          cy.get('[severity="primary"] > .p-ripple').click(); // Hacer clic en el botón para crear un nuevo registro
          cy.Añadir_Canales_entidad(entidad, canal , n_transacciones_simultaneas, tiempo_des,host1 , puerto1, host2 , puerto2 , host3 ,puerto3)
          cy.Guardar_Confirmar_canal_entidad('[icon="pi pi-save"] > .p-ripple', tiempo) 
        });
      })      
    });

    // Modificar un [Elemento]
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.Busqueda('.gap-x-3 > .inline-flex', '0', tiempo).wait(tiempo)
      cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').should("be.visible").click()
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.Editar_Canales_entidad("44 - Ciers 44", '2','999', '200', " ", " ", " ", " ", " ", " "); 
      //Guardar
      cy.Guardar_Confirmar_canal_entidad('[icon="pi pi-save"] > .p-ripple', tiempo) 
    });

    // Listar todos los elementos
    it('Debería listar todos los [elementos]', () => {
      // Verificar que se visualizan los registros existentes
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
      cy.Busqueda('.gap-x-3 > .inline-flex','blabla',tiempo)
    });

    // Eliminar un [Elemento]
    it('Debería eliminar un [Elemento]', () => {
      cy.wait(tiempo)
      cy.get('.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple').then(($el) => {
        if ($el.length) {
          cy.Eliminar_Anular(
            '.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple',
            '[icon="pi pi-arrow-left"] > .p-ripple',
            '.p-datatable-tbody > :nth-child(1) > :nth-child(2)'
          );
          cy.wait(tiempo);
          
          // Hacer clic en el primer registro para eliminar si existe
          cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').then(($row) => {
            if ($row.length) {
              cy.Eliminar(
                '.justify-between > .gap-x-4 > [severity="danger"] > .p-ripple',
                '.p-datatable-tbody > :nth-child(1) > :nth-child(2)'
              );
      
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
  