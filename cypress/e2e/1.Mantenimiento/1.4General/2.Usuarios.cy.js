describe('Usuarios', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login()
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-maintenance"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('[data-target="submenu-general"]')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
        
        // Seleccionar la ,confuguracion central
        cy.get('#submenu-general > :nth-child(2)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic   
    })

    // Añadir un nuevo [Elemento]
    it('Debería añadir un nuevo [Elemento]', () => {
      cy.fixture('2_Usuarios.json').then((Configuracion_Central) => {
        Configuracion_Central.forEach((config) => {
            let id = config.id;
            let usuario = config["Nombre de usuario"] ; 
            let Email = config.Email;
            let Nombre_completo = config["Nombre completo"] ;
            let pass = config["Contraseña"] 
            let repetir_pass = config["Repetir contraseña"]  
            let rol = config.Rol;
            let Idioma = config.Idioma;
            let Activo = config.Activo;

            //Boton añadir
            cy.wait(tiempo)
            cy.get('[severity="primary"] > .p-ripple').should("be.visible").click()
            cy.Añadir_User(id, usuario, Email, Nombre_completo, pass, repetir_pass, rol,Idioma, Activo)
            cy.Guardar_Confirmar_Usuarios('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
        });
      })
      
    });   

    // Modificar un [Elemento]    
    it('Debería modificar un [Elemento]', () => {
      // Simular el proceso de actualización de un registro
      cy.Buscar('.gap-x-3 > .inline-flex','usuarioQA',tiempo)
      //Prueba 1: no permite
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.Editar_User("011","usuarioQA",'usuarioQA','usuarioQA', "password123","password123","admin","es", "No")
      cy.Guardar_Confirmar_Usuarios('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
      //Prueba 2: permite
      cy.Click_force('.p-datatable-tbody > :nth-child(1) > :nth-child(2)')
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.get('.justify-between > .gap-x-4 > [severity="secondary"] > .p-ripple').should("be.visible").click()
      // Hacer clic en el primer registro para editar y Modificar el canal
      cy.Editar_User("00111","usuarioQA",'usuarioQA','usuarioqa@prueba.qa.it', "password1234*","password1234*","admin","es", "Si")
      cy.Guardar_Confirmar_Usuarios('[icon="pi pi-save"] > .p-ripple', '.p-toast', tiempo)
    }); 

     // Listar todos los elementos
    it('Debería listar todos los [elementos]', () => {
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
      cy.Busqueda('.gap-x-3 > .inline-flex','pay',tiempo)
    });

    // Eliminar un [Elemento]
    it('Debería eliminar un [Elemento]', () => {
      cy.wait(tiempo)
      cy.Buscar('.gap-x-3 > .inline-flex','usuario21a',tiempo)
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
