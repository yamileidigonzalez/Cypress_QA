describe('Transacciones Off Denegadas', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-transactions"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-transactions > :nth-child(4)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })
    
    //Comprobar los filtros
    it('Comprobar los filtros', () => {
        
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
        cy.Elemento_visible(':nth-child(1) > .p-inputwrapper > .w-full > .text-sm')
        //Hora inicio
        cy.Elemento_visible('#timeMin')
        //Hora fin
        cy.Elemento_visible('#timeMax')


        //id_transaccion
        cy.Elemento_visible(':nth-child(1) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        //tipo transaccion
        cy.Elemento_visible('#transactionType > .p-dropdown-label')
        //importe min
        cy.Elemento_visible(':nth-child(5) > :nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        //importe max
        cy.Elemento_visible(':nth-child(4) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        //datos tienda
        cy.Elemento_visible('#storeId > .p-dropdown-label')
        //caja
        cy.Elemento_visible(':nth-child(2) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        //numero ticket
        cy.Elemento_visible(':nth-child(6) > :nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext')
        .scrollIntoView()

        //boton anular
        cy.Click_force('[icon="pi pi-times"] > .p-ripple').wait(tiempo)

    });

    //Recorrer todas las opciones
    it('Recorrer todas las opciones', () => {
        const opcionesFiltro_Texto = [
            ':nth-child(1) > .p-inputwrapper > .p-inputnumber > .p-inputtext',
            ':nth-child(5) > :nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext',
            ':nth-child(4) > .p-inputwrapper > .p-inputnumber > .p-inputtext',
            ':nth-child(2) > .p-inputwrapper > .p-inputnumber > .p-inputtext',
            ':nth-child(6) > :nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext'          
        ];
        const opcionesFiltro_Combo = [
            '#transactionType > .p-dropdown-label',
            '#storeId > .p-dropdown-label'
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
        cy.Añadir_Fecha(':nth-child(1) > .p-inputwrapper > .w-full > .text-sm', mes, año, fecha, '#pn_id_11_panel')           
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
        cy.Añadir_Fecha(':nth-child(2) > .p-inputwrapper > .w-full > .text-sm', mes, año, fecha, '#pn_id_12_panel') 
        // Hacer clic en el botón aplicar
        cy.contains('button', 'Aplicar').should('be.visible').click();            
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 2);            
        // Verificar que hay elementos en el scroller
        cy.get('.p-scroller').should('have.length.greaterThan', 0);
 
        opcionesFiltro_Texto.forEach((selector) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('app-filter > .z-20 > .inline-flex').wait(tiempo)
            cy.Añadir_text(selector,'5') 
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 3);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        });
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
    
    it('Debe volver a procesar las operaciones correctamente', () => {
        // Hacer clic en el botón para volver a procesar las operaciones
        cy.Elemento_visible('.p-element.ng-star-inserted > .p-ripple').click();
        cy.wait(tiempo)
        // Confirmar si hay un modal de confirmación o alerta
        cy.Elemento_visible('app-offline-transactions-denied.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast')

        // Verificar que las operaciones fueron procesadas
        cy.contains('¡No se han podido reprocesar las transacciones!').should('be.visible');
        cy.log('¡No se han podido reprocesar las transacciones!')

        // O verificar cambios en la lista/tablas
        cy.get('.p-scroller').should('have.length.greaterThan', 0);
    });  
})
