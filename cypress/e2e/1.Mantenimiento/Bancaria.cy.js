const { random } = require("lodash");
describe('Mantenimiento', () => {
  const t = 1000;
  beforeEach('BANCARIA', () => {
    //PAGINA
    cy.visit('https://51.178.137.167/login'); //cy.title().should('eq','Inicio de sesión')
   
    //LOGIN
    cy.get(':nth-child(1) > .form-control').should("be.visible").should("be.enabled").type('solverpay')
    cy.get('.d-flex > .form-control').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}') //cy.get('.btn').click()

  })
  //Canal Entidad
  it.only('Anadir - Canal Entidad', () => {
      //Canal entidad
      cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click();
      cy.get('ul.dropdown-menu.show').should('be.visible'); 
      cy.get('ul#banking-submenu').invoke('show').contains('Canales de entidad').click()

      //boton anadir P1 i=1(guardar)
      cy.Añadir('#add_data','#submit-button','#modal_add_ok > .modal-dialog > .modal-content > .modal-footer > .btn','#modal_add_ok > .modal-dialog > .modal-content > .modal-header > .btn-close','.mt-3 > :nth-child(2) > .btn','#entity_channel_entityId', '#entity_channel_channelId','#entity_channel_transactionNumber','#entity_channel_timeDisconnect','#entity_channel_host1','#entity_channel_host2','#entity_channel_host3','#entity_channel_port1','#entity_channel_port2','#entity_channel_port3','121212','121212','121212','121212','Blablabla1','Blablabla2','Blablabla3','121212','12121','1212', 1, t)
      
      cy.Añadir('#add_data','#submit-button','#modal_add_ok > .modal-dialog > .modal-content > .modal-footer > .btn','#modal_add_ok > .modal-dialog > .modal-content > .modal-header > .btn-close','.mt-3 > :nth-child(2) > .btn','#entity_channel_entityId', '#entity_channel_channelId','#entity_channel_transactionNumber','#entity_channel_timeDisconnect','#entity_channel_host1','#entity_channel_host2','#entity_channel_host3','#entity_channel_port1','#entity_channel_port2','#entity_channel_port3','121212','121212','121212','121212','Blablabla1','Blablabla2','Blablabla3','121212','12121','1212', 4, t)
      cy.Validar_campo('.invalid-feedback', "Ya existe un Canal definido para esta entidad", 'Entidad', '.mt-3 > :nth-child(2) > .btn',t)
  
      //boton anadir P2 i=2(no guardar)
      cy.Añadir('#add_data','#submit-button','#modal_add_ok > .modal-dialog > .modal-content > .modal-footer > .btn','#modal_add_ok > .modal-dialog > .modal-content > .modal-header > .btn-close','.mt-3 > :nth-child(2) > .btn','#entity_channel_entityId', '#entity_channel_channelId','#entity_channel_transactionNumber','#entity_channel_timeDisconnect','#entity_channel_host1','#entity_channel_host2','#entity_channel_host3','#entity_channel_port1','#entity_channel_port2','#entity_channel_port3','232323','232323','232323','232323','Blebleble','Blebleble','Blebleble','232323','23232','2323',2, t)   

      //boton anadir P3 i=0(cancelar)
      cy.Añadir('#add_data','#submit-button','#modal_add_ok > .modal-dialog > .modal-content > .modal-footer > .btn','#modal_add_ok > .modal-dialog > .modal-content > .modal-header > .btn-close','.mt-3 > :nth-child(2) > .btn','#entity_channel_entityId', '#entity_channel_channelId','#entity_channel_transactionNumber','#entity_channel_timeDisconnect','#entity_channel_host1','#entity_channel_host2','#entity_channel_host3','#entity_channel_port1','#entity_channel_port2','#entity_channel_port3','343434','343434','343434','343434','Bliblibli','Bliblibli','Bliblibli','343434','34343','3434',0, t)
     

  })

  it('Busqueda- Canal Entidad', () => {
    //Canal entidad
    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Canales de entidad').click();
    cy.wait(t)
    //busqueda numeros y signos
    cy.Busqueda('label> input','44',1000)
    cy.Busqueda('label> input','F1-',1000)
    cy.Busqueda('label> input','1212',1000)
    cy.Busqueda('label> input','2323',1000)
    
    //busqueda letras y espacios
    cy.Busqueda('label> input','unicaja',1000)
    cy.Busqueda('label> input','bank',1000)
    cy.Busqueda('label> input','Bank ',1000)
    cy.Busqueda('label> input','Cier',1000)
    cy.Busqueda('label> input','blabla',1000)
   
  })

  it('Ordenar - Canal Entidad', () => {
    //Canal entidad
    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible');
    cy.get('ul#banking-submenu').invoke('show').contains('Canales de entidad').click();
    cy.wait(t)
    //ascendentes y desdendentes
    //Entidad
    cy.get('[style="width: 108.567px;"]').should("be.visible").click().wait(t)
    cy.get('.sorting_desc').click().wait(t)
    cy.get('#table-header > .sorting_asc').click().wait(t)
    cy.get('[style="width: 108.567px;"]').should("be.visible").click().wait(t)
    //Canal
    cy.get('[style="width: 36.2333px;"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').click().wait(t)
    cy.get('.sorting_desc').click().wait(t)
    cy.get('[style="width: 36.2333px;"]').should("be.visible").click().wait(t)
    //Tiempo Desconexion
    cy.get('[style="width: 133.633px;"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').click().wait(t)
    cy.get('.sorting_desc').click().wait(t)
    cy.get('[style="width: 133.633px;"]').should("be.visible").click().wait(t)
    //No.transaciones simult
    cy.get('[style="width: 190.433px;"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').click().wait(t)
    cy.get('.sorting_desc').click().wait(t)
    cy.get('[style="width: 190.433px;"]').should("be.visible").click().wait(t)
    //Host
    //1
    cy.get('#table-header > [aria-label="Host 1: activar para ordenar la columna ascendente"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').should("be.visible").click().wait(t)
    cy.get('.sorting_desc').should("be.visible").click().wait(t)
    //2
    cy.get('#table-header > [aria-label="Host 2: activar para ordenar la columna ascendente"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').should("be.visible").click().wait(t)
    cy.get('.sorting_desc').should("be.visible").click().wait(t)
    //3
    cy.get('#table-header > [aria-label="Host 3: activar para ordenar la columna ascendente"]').click().wait(t)
    cy.get('#table-header > .sorting_asc').click().wait(t)
    cy.get('.sorting_desc').click().wait(t)
    //Puertos
    //1
    cy.get('#table-header > [aria-label="Puerto 1: activar para ordenar la columna ascendente"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').should("be.visible").click().wait(t)
    cy.get('.sorting_desc').should("be.visible").click().wait(t)
    //2 
    cy.get('#table-header > [aria-label="Puerto 2: activar para ordenar la columna ascendente"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').should("be.visible").click().wait(t)
    cy.get('.sorting_desc').should("be.visible").click().wait(t)
    //3
    cy.get('#table-header > [aria-label="Puerto 3: activar para ordenar la columna ascendente"]').should("be.visible").click().wait(t)
    cy.get('#table-header > .sorting_asc').should("be.visible").click().wait(t)
    cy.get('.sorting_desc').should("be.visible").click().wait(t)
  })

  it('Modificar- Canal Entidad', () => {
    //Canal entidad
    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Canales de entidad').click();
    
    //Modificar P1 
    cy.get(':nth-child(4) > .sorting_1').should("be.visible").click()
    cy.get('#edit_data').should("be.visible").click()
    //cambiar limpiar cambios
    cy.get('#entity_channel_channelId').should("be.visible").type('1212}')
    cy.get('#entity_channel_transactionNumber').should("be.visible").clear().type('4545')
    cy.get('#entity_channel_channelId').should("be.visible").clear().type('4545')
    cy.get('#entity_channel_timeDisconnect').should("be.visible").clear().type('4545')
    cy.get('#entity_channel_host1').should("be.visible").clear().type('blublu')
    cy.get('#entity_channel_port1').should("be.visible").clear().type('4545')
    cy.wait(t)
    //confirmar cambios
    cy.get('#submit-button').should("be.visible").click()
    cy.wait(t)

    //Modificar P2
    cy.get(':nth-child(5) > .sorting_1').should("be.visible").click()
    cy.get('#edit_data').should("be.visible").click()
    //cambiar agregar cambios
    cy.get('#entity_channel_channelId').should("be.visible").type('2323}')
    cy.get('#entity_channel_transactionNumber').should("be.visible").clear().type('5656')
    cy.get('#entity_channel_channelId').should("be.visible").clear().type('5656')
    cy.get('#entity_channel_timeDisconnect').should("be.visible").clear().type('5656')
    cy.get('#entity_channel_host1').should("be.visible").clear().type('bloblo')
    cy.get('#entity_channel_port1').should("be.visible").clear().type('5656')
    cy.get('#entity_channel_host2').should("be.visible").clear().type('blbolo')
    cy.get('#entity_channel_port2').should("be.visible").click({force: true}).clear().type('6767')
    cy.get('#entity_channel_host3').should("be.visible").clear().type('blbloo')
    cy.get('#entity_channel_port3').should("be.visible").click({force: true}).clear().type('7878')
    cy.wait(t)
    //confirmar
    cy.get('#submit-button').should("be.visible").click()
    cy.wait(t)

    //Modificar P3
    cy.get(':nth-child(5) > .sorting_1').should("be.visible").click()
    cy.get('#edit_data').should("be.visible").click()
    //cambiar agregar cambios
    cy.get('#entity_channel_channelId').should("be.visible").type('2323}')
    cy.get('#entity_channel_transactionNumber').should("be.visible").clear().type('8989')
    cy.get('#entity_channel_channelId').should("be.visible").clear().type('8989')
    cy.get('#entity_channel_timeDisconnect').should("be.visible").clear().type('8989')
    cy.get('#entity_channel_host1').should("be.visible").clear().type('bliblibli')
    cy.get('#entity_channel_port1').should("be.visible").clear().type('8989')
    /* OJO Falla mucho
    cy.get('#entity_channel_port3').should("be.visible").clear()
    cy.get('#entity_channel_host3').should("be.visible").clear()
    cy.get('#entity_channel_port2').should("be.visible").clear()
    cy.get('#entity_channel_host2').should("be.visible").clear()*/
    cy.wait(t)
    //confirmar
    cy.get('#submit-button').should("be.visible").click()
    cy.wait(t)

  })

  it('Borrar- Canal Entidad', ()=>{
      //Canal entidad
      cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
      cy.get('ul.dropdown-menu.show').should('be.visible'); 
      cy.get('ul#banking-submenu').invoke('show').contains('Canales de entidad').click();
           
      //eliminar P1
      cy.get(':nth-child(4) > .sorting_1').should("be.visible").click()
      cy.get('#delete_data').should("be.visible").click()
      //conservar
      cy.get('#modal_delete_sure > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').should("be.visible").click().wait(t)
  
      //eliminar P2
      cy.get(':nth-child(4) > .sorting_1').should("be.visible").click()
      cy.get(':nth-child(5) > .sorting_1').should("be.visible").click()
      cy.get('#delete_data').should("be.visible").click()
      //conservar
      cy.get('#modal_delete_sure > .modal-dialog > .modal-content > .modal-header > .btn-close').should("be.visible").click().wait(t)
      
      //eliminar P3
      cy.get(':nth-child(4) > .sorting_1').should("be.visible").click()
      //cy.get(':nth-child(5) > .sorting_1').should("be.visible").click()
      cy.get('#delete_data').should("be.visible").click().wait(t)
      //cancelar
      cy.get('#modal_delete_sure > .modal-dialog > .modal-content > .modal-header > .btn-close').click().wait(t)
  
      //eliminar P4
      //cy.get(':nth-child(4) > .sorting_1').should("be.visible").click()
      //cy.get(':nth-child(5) > .sorting_1').should("be.visible").click()
      cy.get('#delete_data').should("be.visible").click().wait(t)
      //confirmar
      cy.get('#delete-confirm-button > .btn').should("be.visible").click().wait(t)


  })
  //Comisiones
  it('Comisiones', () => {
    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Comisiones').click();
           
  })
  //Acuerdos de comisiones
  it('Acuerdo de comisiones', () => {
    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Acuerdos de comisiones').click();
           
  })
  //Cuentas
  it('Cuentas', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Cuentas').click();
              
  })
  //Test de cuentas
  it('Test de cuentas', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Test cuentas').click();
              
  })
  //Enrrutamientos de PIN online
  it('Enrrutamiento de PIN online', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Enrutamiento de PIN online').click();
              
  })
  //Enrrutamientos
  it('Enrrutamientos', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Enrutamientos').click();
              
  })
  //Entidades
  it('Entidades', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Entidades').click();
              
  })
  //Protocolos
  it('Protocolos', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Protocolos').click();
              
  })
  //Redes de entidades
  it('Redes de entidades', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Redes de entidad').click();
              
  })
  //Respaldo de enrrutamientos
  it('Respaldo de enrrutamientos', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Respaldo de enrutamientos').click();
              
  })
  //Entidades emisoras
  it('Entidades emisoras', () => {

    cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click(); 
    cy.get('ul.dropdown-menu.show').should('be.visible'); 
    cy.get('ul#banking-submenu').invoke('show').contains('Entidades emisoras').click();
    
    //tablas

    

  })

})