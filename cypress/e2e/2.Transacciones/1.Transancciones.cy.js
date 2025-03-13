describe('Transacciones', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login()
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-transactions"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-transactions > :nth-child(1)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })
    
    //Comprobar los filtros
    it('Comprobar los filtros', () => {
        
        cy.Click_force('.z-20 > .bg-slate-200')
        //fecha y hora
        cy.Elemento_visible('.p-3 > .active')
        //datos transaccion
        cy.Elemento_visible('.p-3 > :nth-child(2)')
        //datos tienda
        cy.Elemento_visible('.p-3 > :nth-child(3)')
        //datos tarjeta
        cy.Elemento_visible('.p-3 > :nth-child(4)')
        //boton anular
        cy.Click_force('[outlined="true"] > .p-ripple').wait(tiempo)

    });

    it('Recorrer todas las opciones del filtro', () => {
        const opcionesFiltro = [
            '.p-3 > .active',
            '.p-3 > :nth-child(2)',
            '.p-3 > :nth-child(3)',
            '.p-3 > :nth-child(4)'
        ];
        
        opcionesFiltro.forEach((selector) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
             // Realizamos busqueda
            cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
            cy.get(selector).click();
            cy.wait(tiempo);
            cy.get(selector).should('have.class', 'active');
             //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        });
    });

    it('Recorrer todas las opciones de Fecha y Hora', () => {
        const opcionesFiltro_Mostrar_transaccion = [
            '.flex-col.gap-2 > .flex > :nth-child(1)',
            '.flex-col.gap-2 > .flex > :nth-child(2)',
            '.flex-col.gap-2 > .flex > :nth-child(3)'
        ];
        
        opcionesFiltro_Mostrar_transaccion.forEach((selector) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
            cy.Click_force('.p-3 > :nth-child(1)')
            cy.get(selector).click();
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        });
    });

    it('Recorrer todas las opciones de Datos del transaccion', () => {
        const opcionesFiltro_Datos_transaccion_Combo = [
            '#opType > .p-dropdown-label',
            '#acquirer > .p-dropdown-label'
        ];
        const opcionesFiltro_Datos_transaccion_Texto = [
            ':nth-child(3) > .p-inputwrapper > .p-inputnumber > .p-inputtext',
            ':nth-child(4) > .p-inputwrapper > .p-inputnumber > .p-inputtext',
            '#ticket > .p-inputnumber > .p-inputtext'
        ];

        opcionesFiltro_Datos_transaccion_Combo.forEach((selectorc) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
            cy.Click_force('.p-3 > :nth-child(2)')
            cy.Añadir_Combo(selectorc, 'Ven')
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        })        
        
        opcionesFiltro_Datos_transaccion_Texto.forEach((selectort) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
            cy.Click_force('.p-3 > :nth-child(2)')
            cy.Añadir_text(selectort, '5')
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        });

        //Limpiamos Datos
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
        // Realizamos busqueda
        cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
        cy.Click_force('.p-3 > :nth-child(2)')
        cy.Añadir_Combo_Buscar('#responseCode > .p-dropdown-label', '.p-dropdown-filter', '600')
        cy.wait(tiempo);
        //bolon aplicar
        cy.contains('button', 'Aplicar').should('be.visible').click()
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
        cy.get('.p-scroller').should('have.length.greaterThan', 0);

        //Limpiamos Datos
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
        // Realizamos busqueda
        cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
        cy.Click_force('.p-3 > :nth-child(2)')
        cy.Check('.p-checkbox-box', "Si")
        cy.wait(tiempo);
        //bolon aplicar
        cy.contains('button', 'Aplicar').should('be.visible').click()
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
        cy.get('.p-scroller').should('have.length.greaterThan', 0);
        
    });

    it('Recorrer todas las opciones de Datos de Tienda', () => {
        const opcionesFiltro_Datos_transaccion_Texto = [
            '#pos > .p-inputnumber > .p-inputtext',
            '#store > .p-inputnumber > .p-inputtext',
            '#fuc'
        ];     
        
        opcionesFiltro_Datos_transaccion_Texto.forEach((selectort) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
            cy.Click_force('.p-3 > :nth-child(3)')
            cy.Añadir_text(selectort, '5')
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        });
        
    });

    it('Recorrer todas las opciones de Datos de Tarjeta', () => {
        const opcionesFiltro_Datos_transaccion_Combo = [
            '#creditDebit > .p-dropdown-label',
            '#contactless > .p-dropdown-label',
            '#captureMethod > .p-dropdown-label'

        ];
        const opcionesFiltro_Datos_transaccion_Texto = [
            '#card',
            '#bin'
        ];

        opcionesFiltro_Datos_transaccion_Combo.forEach((selectorc) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
            cy.Click_force('.p-3 > :nth-child(4)')
            cy.Añadir_Combo(selectorc, 'Ven')
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        })        
        
        opcionesFiltro_Datos_transaccion_Texto.forEach((selectort) => {
            //Limpiamos Datos
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
            // Realizamos busqueda
            cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
            cy.Click_force('.p-3 > :nth-child(4)')
            cy.Añadir_text(selectort, '5')
            cy.wait(tiempo);
            //bolon aplicar
            cy.contains('button', 'Aplicar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        });

        //Limpiamos Datos
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple').wait(tiempo)
        // Realizamos busqueda
        cy.Click_force('.z-20 > .bg-slate-200').wait(tiempo)
        cy.Click_force('.p-3 > :nth-child(4)')
        cy.Añadir_Combo_Buscar('#issuer > .p-dropdown-label', '.p-dropdown-filter', '600')
        cy.wait(tiempo);
        //bolon aplicar
        cy.contains('button', 'Aplicar').should('be.visible').click()
        // Verificar que hay un máximo de 15 elementos
        cy.get('.gap-2 app-filter-badge').should('have.length.lte', 15);
        cy.get('.p-scroller').should('have.length.greaterThan', 0);
        
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
})
