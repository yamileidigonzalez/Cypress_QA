describe('Gestion de Secciones', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-entity"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-entity > :nth-child(3)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })

    it('Debe mostrar el listado de sesiones abiertas con su estado correcto', () => {
        // Navegar hasta la sección de sesiones abiertas si es necesario
        cy.contains('h1', 'Sesiones Abiertas').should('be.visible'); // Ajusta el selector si es necesario

        // Verificar que la lista de sesiones se carga y tiene elementos
        cy.get('.lista-sesiones') // Ajusta el selector de la tabla o lista de sesiones
          .should('be.visible')
          .find('.sesion-item')
          .should('have.length.greaterThan', 0);

        // Verificar que cada sesión tiene un estado visible y correcto
        cy.get('.sesion-item').each(($el) => {
            cy.wrap($el).find('.estado-sesion')
                .should('be.visible')
                .invoke('text')
                .should('match', /(Activa|Inactiva|Expirada)/); // Ajusta según los estados posibles
        });
    });

    it('Debe realizar una petición de totales y completarse correctamente', () => {
        // Hacer clic en el botón para solicitar los totales
        cy.contains('button', 'Petición de totales').should('be.visible').click();

        // Interceptar la petición a la API si aplica
        cy.intercept('GET', '/api/totales').as('getTotales'); // Ajusta la URL de la API
        cy.wait('@getTotales').its('response.statusCode').should('eq', 200);

        // Verificar que los totales se han cargado correctamente en la UI
        cy.get('.total-resultados').should('be.visible').and('not.have.text', '0');

        // Verificar mensaje de éxito si es aplicable
        cy.contains('Totales calculados correctamente').should('be.visible');
    });
    

    /*
    //Comprobar los filtros
    it.only('Comprobar los filtros', () => {
        
        cy.Click_force('app-filter > .z-20 > .inline-flex')

        //hoy
        cy.Elemento_visible('.flex-wrap > :nth-child(1)')
        //ultima semana
        cy.Elemento_visible('.flex-wrap > :nth-child(2)')
        //ultimo mes
        cy.Elemento_visible('.flex-wrap > :nth-child(3)')

        //Fecha inicio
        cy.Elemento_visible(':nth-child(1) > .p-inputwrapper > .w-full > .text-sm')
        //Fecha fin
        cy.Elemento_visible(':nth-child(2) > .p-inputwrapper > .w-full > .text-sm')

        //Número de sesión
        cy.Elemento_visible('.p-inputnumber > .p-inputtext')
        //Adquiriente
        cy.Elemento_visible('#acquirerId > .p-dropdown-label')
        //Estado sesión
        cy.Elemento_visible('#eodStatus > .p-dropdown-label')
        //Cuadre
        cy.Elemento_visible('#eod > .p-dropdown-label')
        .scrollIntoView()

        //boton anular
        cy.Click_force('[icon="pi pi-times"] > .p-ripple').wait(tiempo)

    });

    //Recorrer todas las opciones
    it('Recorrer todas las opciones', () => {
        //Limpiamos Datos
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
        // Realizamos busqueda
        cy.Click_force('app-filter > .z-20 > .inline-flex').wait(tiempo)
        cy.Añadir_text('.p-inputnumber > .p-inputtext','5') 
        cy.wait(tiempo);
        //bolon aplicar
        cy.contains('button', 'Aplicar').should('be.visible').click()
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 3);
        cy.get('.p-scroller').should('have.length.greaterThan', 0);

        const opcionesFiltro_Combo = [
            '#eodStatus > .p-dropdown-label',
            '#acquirerId > .p-dropdown-label',
            '#eod > .p-dropdown-label'
        ];

        // Cargar la fecha (suponiendo que el calendario tiene un formato estándar)
        const fecha = '17';
        const mes = 'Feb'; // O '02' si se usa un formato numérico
        const año = '2025';      
            
        //Limpiamos Datos
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
        // Realizamos busqueda
        cy.Click_force('app-filter > .z-20 > .inline-flex').wait(tiempo).scrollIntoView()
        // Abre el calendario
        cy.Añadir_Fecha(':nth-child(1) > .p-inputwrapper > .w-full > .text-sm', mes, año, fecha, '#pn_id_13_panel')           
        // Hacer clic en el botón aplicar
        cy.contains('button', 'Aplicar').should('be.visible').click();    
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 2);            
        // Verificar que hay elementos en el scroller
        cy.get('.p-scroller').should('have.length.greaterThan', 0);

        //Limpiamos Datos
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
        // Realizamos busqueda
        cy.Click_force('app-filter > .z-20 > .inline-flex').wait(tiempo).scrollIntoView()
        // Interactuamos con el selector de fecha
        // Abre el calendario
        cy.Añadir_Fecha(':nth-child(2) > .p-inputwrapper > .w-full > .text-sm', mes, año, fecha, '#pn_id_14_panel') 
        // Hacer clic en el botón aplicar
        cy.contains('button', 'Aplicar').should('be.visible').click();            
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 2);            
        // Verificar que hay elementos en el scroller
        cy.get('.p-scroller').should('have.length.greaterThan', 0);
            
        opcionesFiltro_Combo.forEach((selectorc) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('app-filter > .z-20 > .inline-flex').wait(tiempo).scrollIntoView()
            cy.Añadir_Combo(selectorc, '5')
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 3);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        })       
    });  
    
    //Comprobar la visualización de detalle de operaciones
    it('Comprobar la visualización de detalle de operaciones', () => {
        //Limpiamos Datos
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
        cy.get('.p-scroller')
        .find('.p-datatable-tbody > tr')  // Suponiendo que cada fila es un elemento <tr>
        .each(($el, index) => {
            // Hacer clic en la fila actual (asegúrate de que el selector es correcto)
            cy.log('El elemento que se muestra es:', index)            
            cy.wrap($el).click({ force: true });
            cy.wait(tiempo);  
            // Verificar que el elemento es visible después de hacer clic
            cy.wrap($el).should('be.visible').scrollIntoView() 
            // Cerrar el popup, si tiene un botón de cerrar 
            cy.get('.ng-trigger').should('be.visible').find('.p-dialog-header-icons > .p-ripple') 
            .click().wait(tiempo);         
        });
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
    })
    */
    
})