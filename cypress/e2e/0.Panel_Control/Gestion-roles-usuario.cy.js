const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");

describe('Gestión de namees Usuario', () => { 
    let tiempo= 1000
    const namees = [
      {      
        user: "usuario210a", pass: "Ppassword123*", name: "OPERATOR BASIC", access: true, canEdit: true, canDelete: false 
      },
      {        
        user: "usuario220a", pass: "Cclave456*", name: "OPERATOR ADVANCE", access: true, canEdit: true, canDelete: false 
      },
      {
        user: "usuario230a", pass: "Ssecure789*", name: "OPERATOR", access: true, canEdit: false, canDelete: false 
      },
      {
        user: "usuario240a", pass: "Mypassword123*", name: "ADMIN",  access: true, canEdit: true, canDelete: true 
      },
      {
        user: "usuario250a", pass: "Ttestpass123*", name: "SUPER ADMIN", access: true, canEdit: true, canDelete: true 
      },
      { name: 'Invitado', user: null, pass: null, access: false }
    ];

    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')   
    })

    it('Crear un usuario con diferente namees', () => {
      //LOGIN
      cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
      cy.wait(tiempo)
      //accedo a la sección de perfil del usuario
      //Seleccionar Mantenimientos en el Menu
      cy.get('[data-target="submenu-maintenance"]')
      .should("be.visible").click()
      //Seleccionar en el Submenu
      cy.get('[data-target="submenu-general"]')
      .click();  // Luego realiza el clic 
      
      // Seleccionar la ,confuguracion central
      cy.get('#submenu-general > :nth-child(2)')
      .should('be.visible')  // Verifica que el elemento es visible
      .click();  // Luego realiza el clic  
      cy.fixture('ROL_Usuarios.json').then((Configuracion_Central) => {
        Configuracion_Central.forEach((config) => {
            let id = config.id;
            let usuario = config['Nombre de usuario'] ; 
            let pass = config['Contraseña'] 
            let repetir_pass = config["Repetir contraseña"]  
            let rol = config.Rol;
            let Idioma = config.Idioma;
            let Activo = config.Activo;

            //Boton añadir
            cy.wait(tiempo)
            cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
            cy.Añadir_User(id, usuario, pass, repetir_pass, rol,Idioma, Activo)
            cy.Guardar_Confirmar_Usuarios('[icon="pi pi-save"] > .p-ripple', 'app-add > app-custom-toast > p-toast.p-element > .p-toast', tiempo)
        });
      })        
    })
  
    namees.forEach((namee) => {
    it(`Verifica el acceso para ${namee.name}`, () => {
        if (namee.access) {
           //PAGINA
          cy.visit('https://newfront.lab.solverpay.com/login'); 
          cy.title().should('eq','Login')
          //LOGIN
          cy.login(namee.user, namee.pass)
          cy.wait(tiempo)
          cy.url().should('include', '/');
          cy.get('.gap-x-4 > .text-lg')
          .should('be.visible')
          .and('have.text', 'Panel de control');
        } else {
          //PAGINA
          cy.visit('https://newfront.lab.solverpay.com/login'); 
          cy.title().should('eq','Login')
          //LOGIN
          cy.login('invitado', 'wrongpass')
          cy.wait(tiempo)
          cy.get('.text-red-600').should('be.visible');
        }
      });
    });
  
    it('OPERATOR BASIC solo puede ver las opciones correctas', () => {
      //LOGIN
      cy.login('usuario210a', 'Ppassword123*');
      //PAGINAS ACCESIBLES
      cy.get('[data-target="submenu-transactions"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-transactions > .sidebar-submenu-item');
      cy.get('[data-target="submenu-maintenance"]').should('be.visible').click();
        cy.get('[data-target="submenu-bancaria"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-bancaria > .sidebar-submenu-item')
        cy.get('[data-target="submenu-base"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-base > .sidebar-submenu-item')
      cy.get('#dashboard').should('be.visible').click();
      cy.Elemento_visible('.sidebar-fav > .sidebar-title')
      cy.get('app-avatar-box > .flex-col > .text-center').should('be.visible').click();
        cy.Elemento_visible(':nth-child(1) > .block')
        cy.Elemento_visible('.text-gray-700 > :nth-child(2) > .block')
        cy.Elemento_visible('div.py-2 > .block')
        cy.get('#dropdownAvatar > .py-3').should('be.visible').should('contain', 'OP. BÁSICO');
      //PAGINAS INACCESIBLES
      cy.get('.main-item.ng-star-inserted').should('not.exist');
      cy.get('[data-target="submenu-management"]').should('not.exist');
      cy.get('[data-target="submenu-entity"]').should('not.exist');
      cy.get('[data-target="submenu-transactions"]').should('be.visible').click()
        cy.get('#submenu-transactions > :nth-child(2)').should('not.exist');
        cy.get('#submenu-transactions > :nth-child(4)').should('not.exist');
        cy.get('#submenu-transactions > :nth-child(5)').should('not.exist');
      cy.get('[data-target="submenu-maintenance"]').should('be.visible').click();
        cy.get('[data-target="submenu-bancaria"]').should('be.visible').click();
            cy.get('#submenu-bancaria > :nth-child(2)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(3)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(4)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(5)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(6)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(7)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(8)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(9)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(10)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(11)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(12)').should('not.exist');
          cy.get('[data-target="submenu-base"]').should('be.visible').click();
            cy.get('#submenu-base > :nth-child(2)').should('not.exist');
            cy.get('#submenu-base > :nth-child(3)').should('not.exist');
            cy.get('#submenu-base > :nth-child(4)').should('not.exist');
            cy.get('#submenu-base > :nth-child(5)').should('not.exist');
            cy.get('#submenu-base > :nth-child(6)').should('not.exist');
          cy.get('[data-target="submenu-cards"]').should('not.exist');
          cy.get('[data-target="submenu-general"]').should('not.exist');
          cy.get('[data-target="submenu-tracking"]').should('not.exist');
      
    });

    it('OPERATOR ADVANCE solo puede ver las opciones correctas', () => {
      //LOGIN
      cy.login('usuario220a', 'Cclave456*');
      //PAGINAS ACCESIBLES
      cy.get('[data-target="submenu-transactions"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-transactions > :nth-child(1)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(2)');
        cy.Elemento_visible('#submenu-transactions > div.sidebar-submenu-item');
        cy.Elemento_visible('#submenu-transactions > :nth-child(4)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(5)');
      cy.get('[data-target="submenu-maintenance"]').should('be.visible').click();
        cy.get('[data-target="submenu-bancaria"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-bancaria > .sidebar-submenu-item')
        cy.get('[data-target="submenu-base"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-base > .sidebar-submenu-item')
      cy.get('#dashboard').should('be.visible').click();
      cy.Elemento_visible('.sidebar-fav > .sidebar-title')
      cy.get('app-avatar-box > .flex-col > .text-center').should('be.visible').click();
        cy.Elemento_visible(':nth-child(1) > .block')
        cy.Elemento_visible('.text-gray-700 > :nth-child(2) > .block')
        cy.Elemento_visible('div.py-2 > .block')
        cy.Elemento_visible('#dropdownAvatar > .py-3').should('contain', 'OP. AVANZADO');
      //PAGINAS INACCESIBLES
      cy.get('.main-item.ng-star-inserted').should('not.exist');
      cy.get('[data-target="submenu-management"]').should('not.exist');
      cy.get('[data-target="submenu-entity"]').should('not.exist');
      cy.get('[data-target="submenu-maintenance"]').should('be.visible')
        cy.get('[data-target="submenu-bancaria"]').should('be.visible').click();
            cy.get('#submenu-bancaria > :nth-child(2)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(3)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(4)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(5)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(6)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(7)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(8)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(9)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(10)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(11)').should('not.exist');
            cy.get('#submenu-bancaria > :nth-child(12)').should('not.exist');
          cy.get('[data-target="submenu-base"]').should('be.visible').click();
            cy.get('#submenu-base > :nth-child(2)').should('not.exist');
            cy.get('#submenu-base > :nth-child(3)').should('not.exist');
            cy.get('#submenu-base > :nth-child(4)').should('not.exist');
            cy.get('#submenu-base > :nth-child(5)').should('not.exist');
            cy.get('#submenu-base > :nth-child(6)').should('not.exist');
          cy.get('[data-target="submenu-cards"]').should('not.exist');
          cy.get('[data-target="submenu-general"]').should('not.exist');
          cy.get('[data-target="submenu-tracking"]').should('not.exist');
    });

    it('OPERATOR solo puede ver las opciones correctas', () => {
      //LOGIN
      cy.login('usuario230a', 'Ssecure789*');
      //PAGINAS ACCESIBLES
      cy.get('.main-item.ng-star-inserted').should('be.visible');
      cy.get('[data-target="submenu-entity"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-entity > .sidebar-submenu-item')
      cy.get('[data-target="submenu-transactions"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-transactions > :nth-child(1)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(2)');
        cy.Elemento_visible('#submenu-transactions > div.sidebar-submenu-item');
        cy.Elemento_visible('#submenu-transactions > :nth-child(4)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(5)');
      cy.get('[data-target="submenu-maintenance"]').should('be.visible').click();
        cy.get('[data-target="submenu-bancaria"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-bancaria > :nth-child(1)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(2)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(3)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(4)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(5)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(6)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(7)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(8)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(9)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(10)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(11)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(12)')
        cy.get('[data-target="submenu-base"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-base > :nth-child(1)')
          cy.Elemento_visible('#submenu-base > :nth-child(2)')
          cy.Elemento_visible('#submenu-base > :nth-child(3)')
          cy.Elemento_visible('#submenu-base > :nth-child(4)')
          cy.Elemento_visible('#submenu-base > :nth-child(5)')
          cy.Elemento_visible('#submenu-base > :nth-child(6)')
        cy.get('[data-target="submenu-cards"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-cards > :nth-child(1)')
          cy.Elemento_visible('#submenu-cards > :nth-child(2)')
          cy.Elemento_visible('#submenu-cards > :nth-child(3)')
          cy.Elemento_visible('#submenu-cards > :nth-child(4)')
          cy.Elemento_visible('#submenu-cards > :nth-child(5)')
          cy.Elemento_visible('#submenu-cards > :nth-child(6)')
          cy.Elemento_visible('#submenu-cards > :nth-child(7)')
          cy.Elemento_visible('#submenu-cards > :nth-child(8)')
          cy.Elemento_visible('#submenu-cards > :nth-child(9)')
        cy.get('[data-target="submenu-general"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-general > :nth-child(1)')
          cy.Elemento_visible('#submenu-general > :nth-child(2)')
          cy.Elemento_visible('#submenu-general > :nth-child(3)')
      cy.get('#dashboard').scrollIntoView().should('be.visible').click();
      cy.Elemento_visible('.sidebar-fav > .sidebar-title')
      cy.get('app-avatar-box > .flex-col > .text-center').should('be.visible').click();
        cy.Elemento_visible(':nth-child(1) > .block')
        cy.Elemento_visible('.text-gray-700 > :nth-child(2) > .block')
        cy.Elemento_visible('div.py-2 > .block')
        cy.Elemento_visible('#dropdownAvatar > .py-3').should('contain', 'OPERADOR');
      //PAGINAS INACCESIBLES
      cy.get('[data-target="submenu-management"]').should('not.exist');
      cy.Elemento_visible('[data-target="submenu-entity"]').click();
        cy.get('#submenu-entity > :nth-child(2)').should('not.exist')
        cy.get('#submenu-entity > :nth-child(3)').should('not.exist')
      cy.Elemento_visible('[data-target="submenu-maintenance"]').click();
          cy.get('[data-target="submenu-tracking"]').should('not.exist');
    });
  
    it('ADMIN solo puede ver las opciones correctas', () => {
      //LOGIN
      cy.login('usuario240a', 'Mypassword123*');
      //PAGINAS ACCESIBLES
      cy.get('.main-item.ng-star-inserted').should('be.visible');
      cy.get('[data-target="submenu-entity"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-entity > :nth-child(1)')
        cy.Elemento_visible('#submenu-entity > :nth-child(2)')
        cy.Elemento_visible('#submenu-entity > :nth-child(3)')
      cy.get('[data-target="submenu-transactions"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-transactions > :nth-child(1)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(2)');
        cy.Elemento_visible('#submenu-transactions > div.sidebar-submenu-item');
        cy.Elemento_visible('#submenu-transactions > :nth-child(4)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(5)');
      cy.get('[data-target="submenu-maintenance"]').should('be.visible').click();
        cy.get('[data-target="submenu-bancaria"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-bancaria > :nth-child(1)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(2)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(3)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(4)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(5)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(6)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(7)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(8)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(9)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(10)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(11)')
          cy.Elemento_visible('#submenu-bancaria > :nth-child(12)')
        cy.get('[data-target="submenu-base"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-base > :nth-child(1)')
          cy.Elemento_visible('#submenu-base > :nth-child(2)')
          cy.Elemento_visible('#submenu-base > :nth-child(3)')
          cy.Elemento_visible('#submenu-base > :nth-child(4)')
          cy.Elemento_visible('#submenu-base > :nth-child(5)')
          cy.Elemento_visible('#submenu-base > :nth-child(6)')
        cy.get('[data-target="submenu-cards"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-cards > :nth-child(1)')
          cy.Elemento_visible('#submenu-cards > :nth-child(2)')
          cy.Elemento_visible('#submenu-cards > :nth-child(3)')
          cy.Elemento_visible('#submenu-cards > :nth-child(4)')
          cy.Elemento_visible('#submenu-cards > :nth-child(5)')
          cy.Elemento_visible('#submenu-cards > :nth-child(6)')
          cy.Elemento_visible('#submenu-cards > :nth-child(7)')
          cy.Elemento_visible('#submenu-cards > :nth-child(8)')
          cy.Elemento_visible('#submenu-cards > :nth-child(9)')
        cy.get('[data-target="submenu-general"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-general > :nth-child(1)')
          cy.Elemento_visible('#submenu-general > :nth-child(2)')
          cy.Elemento_visible('#submenu-general > :nth-child(3)')
        cy.get('[data-target="submenu-tracking"]').should('be.visible').click();
          cy.Elemento_visible('#submenu-tracking > :nth-child(1)')
          cy.Elemento_visible('#submenu-tracking > :nth-child(2)')
      cy.get('#dashboard').scrollIntoView().should('be.visible').click();
      cy.Elemento_visible('.sidebar-fav > .sidebar-title')
      cy.get('app-avatar-box > .flex-col > .text-center').should('be.visible').click();
        cy.Elemento_visible(':nth-child(1) > .block')
        cy.Elemento_visible('.text-gray-700 > :nth-child(2) > .block')
        cy.Elemento_visible('div.py-2 > .block')
        cy.Elemento_visible('#dropdownAvatar > .py-3').should('contain', 'ADMIN');
      //PAGINAS INACCESIBLES
      cy.get('[data-target="submenu-management"]').should('not.exist');
    });

    it('SUPER ADMIN puede ver todas las opciones', () => {
      //LOGIN
      cy.login('usuario250a', 'Ttestpass123*');
      //PAGINAS ACCESIBLES
      cy.get('.main-item.ng-star-inserted').should('be.visible');
      cy.get('[data-target="submenu-management"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-management > :nth-child(1)')
        cy.Elemento_visible('#submenu-management > :nth-child(2)')
        cy.Elemento_visible('#submenu-management > :nth-child(3)')
        cy.Elemento_visible('#submenu-management > :nth-child(4)')
      cy.get('[data-target="submenu-entity"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-entity > :nth-child(1)')
        cy.Elemento_visible('#submenu-entity > :nth-child(2)')
        cy.Elemento_visible('#submenu-entity > :nth-child(3)')
        cy.Elemento_visible('#submenu-entity > :nth-child(4)')
      cy.get('[data-target="submenu-transactions"]').should('be.visible').click();
        cy.Elemento_visible('#submenu-transactions > :nth-child(1)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(2)');
        cy.Elemento_visible('#submenu-transactions > div.sidebar-submenu-item');
        cy.Elemento_visible('#submenu-transactions > :nth-child(4)');
        cy.Elemento_visible('#submenu-transactions > :nth-child(5)');
      cy.get('[data-target="submenu-maintenance"]').should('be.visible').click();
        cy.get('[data-target="submenu-bancaria"]').should('be.visible').click();
            cy.Elemento_visible('#submenu-bancaria > :nth-child(1)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(2)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(3)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(4)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(5)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(6)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(7)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(8)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(9)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(10)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(11)')
            cy.Elemento_visible('#submenu-bancaria > :nth-child(12)')
          cy.get('[data-target="submenu-base"]').should('be.visible').click();
            cy.Elemento_visible('#submenu-base > :nth-child(1)')
            cy.Elemento_visible('#submenu-base > :nth-child(2)')
            cy.Elemento_visible('#submenu-base > :nth-child(3)')
            cy.Elemento_visible('#submenu-base > :nth-child(4)')
            cy.Elemento_visible('#submenu-base > :nth-child(5)')
            cy.Elemento_visible('#submenu-base > :nth-child(6)')
          cy.get('[data-target="submenu-cards"]').should('be.visible').click();
            cy.Elemento_visible('#submenu-cards > :nth-child(1)')
            cy.Elemento_visible('#submenu-cards > :nth-child(2)')
            cy.Elemento_visible('#submenu-cards > :nth-child(3)')
            cy.Elemento_visible('#submenu-cards > :nth-child(4)')
            cy.Elemento_visible('#submenu-cards > :nth-child(5)')
            cy.Elemento_visible('#submenu-cards > :nth-child(6)')
            cy.Elemento_visible('#submenu-cards > :nth-child(7)')
            cy.Elemento_visible('#submenu-cards > :nth-child(8)')
            cy.Elemento_visible('#submenu-cards > :nth-child(9)')
          cy.get('[data-target="submenu-general"]').should('be.visible').click();
            cy.Elemento_visible('#submenu-general > :nth-child(1)')
            cy.Elemento_visible('#submenu-general > :nth-child(2)')
            cy.Elemento_visible('#submenu-general > :nth-child(3)')
          cy.get('[data-target="submenu-tracking"]').should('be.visible').click();
            cy.Elemento_visible('#submenu-tracking > :nth-child(1)')
            cy.Elemento_visible('#submenu-tracking > :nth-child(2)')
      cy.get('#dashboard').scrollIntoView().should('be.visible').click();
      cy.Elemento_visible('.sidebar-fav > .sidebar-title')
      cy.get('app-avatar-box > .flex-col > .text-center').should('be.visible').click();
        cy.Elemento_visible(':nth-child(1) > .block')
        cy.Elemento_visible('.text-gray-700 > :nth-child(2) > .block')
        cy.Elemento_visible('div.py-2 > .block')
        cy.Elemento_visible('#dropdownAvatar > .py-3').should('contain', 'SUPER ADMIN');
    });  
  
})