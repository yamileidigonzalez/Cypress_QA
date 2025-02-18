describe('Auditoria', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-management"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-management > :nth-child(4)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    })  

    it('Mostrar el listado de registros - Se debe mostrar el listado completo', () => {  
        cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple')  
        cy.get('.p-scroller').should('have.length.greaterThan', 0);
        
    });
    
    it('Aplicar filtros - Obtener el listado esperado', () => { 
        const SelectoresFiltros = [
            '.p-5 > .flex-wrap > :nth-child(1)', //hoy
            '.p-5 > .flex-wrap > :nth-child(2)', //ultima semana
            '.flex-wrap > :nth-child(3)',        //ultimo mes
            ':nth-child(1) > .p-inputwrapper-filled > .w-full > .text-sm',  //fecha ini
            ':nth-child(2) > .p-inputwrapper-filled > .w-full > .text-sm',  //fecha fin
            '.p-inputwrapper.ng-tns-c4111573776-8 > .w-full > .p-element',  //hora ini
            '.p-inputwrapper.ng-tns-c4111573776-10 > .w-full > .p-element', //hora fin
            '#pn_id_16 > .p-dropdown-label',//tabla
            '#pn_id_20 > .p-dropdown-label',//origen
            '#pn_id_18 > .p-dropdown-label',//autor
            '#pn_id_22 > .p-dropdown-label' //accion
        ]  
        // Cargar la fecha (suponiendo que el calendario tiene un formato estándar)
        const fecha = '17';
        const mes = 'Feb'; // O '02' si se usa un formato numérico
        const año = '2025'; 

        SelectoresFiltros.forEach((selector) => {
            cy.Click_force('app-filter > .z-20 > .inline-flex')
            cy.Elemento_visible(selector)
            .scrollIntoView()
            //boton aplicar
            cy.contains('button', 'Cancelar').should('be.visible').click()
            // Verificar que hay un máximo de 15 elementos
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 2);
            cy.get('.p-scroller').should('have.length.greaterThan', 0);
        })  
        
        // Función reutilizable para aplicar filtro y verificar los resultados
        function aplicarFiltroYVerificar(selectorFiltro) {
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple')
            cy.Click_force('app-filter > .z-20 > .inline-flex');
            cy.Click_force(selectorFiltro);
            cy.contains('button', 'Aplicar').should('be.visible').click();
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 2); // Verificar máximo 15 elementos
            cy.get('.p-scroller').should('have.length.greaterThan', 0); // Verificar que hay elementos visibles
        }
        // Uso de la función para aplicar diferentes filtros
        aplicarFiltroYVerificar(SelectoresFiltros[0]); // Filtro "hoy"
        aplicarFiltroYVerificar(SelectoresFiltros[1]); // Filtro "última semana"
        aplicarFiltroYVerificar(SelectoresFiltros[2]); // Filtro "último mes"

        function aplicarFiltroYVerificar_Fecha(selectorFiltro, calendario) {
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple')
            cy.Click_force('app-filter > .z-20 > .inline-flex');
            cy.Añadir_Fecha(selectorFiltro, mes, año, fecha, calendario)
            cy.contains('button', 'Aplicar').should('be.visible').click( {force: true});
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 3); // Verificar máximo 15 elementos
            cy.get('.p-scroller').should('have.length.greaterThan', 0); // Verificar que hay elementos visibles
        }
        aplicarFiltroYVerificar_Fecha(SelectoresFiltros[3], '#pn_id_12_panel');
        aplicarFiltroYVerificar_Fecha(SelectoresFiltros[4], '#pn_id_14_panel');

        function aplicarFiltroYVerificar_Text(selectorFiltro) {
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple')
            cy.Click_force('app-filter > .z-20 > .inline-flex');
            cy.Añadir_text(selectorFiltro, '05:05').click()
            cy.contains('button', 'Aplicar').should('be.visible').click( {force: true});
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 4); // Verificar máximo 15 elementos
            cy.get('.p-scroller').should('have.length.greaterThan', 0); // Verificar que hay elementos visibles          
        }
        aplicarFiltroYVerificar_Text(SelectoresFiltros[5]);
        aplicarFiltroYVerificar_Text(SelectoresFiltros[6]);
        
        function aplicarFiltroYVerificar_Combo(selectorFiltro) {
            cy.Click_force('[icon="pi pi-filter-slash"] > .p-ripple')
            cy.Click_force('app-filter > .z-20 > .inline-flex');
            cy.Combo(selectorFiltro, 'Front',tiempo);
            cy.contains('button', 'Aplicar').should('be.visible').click( {force: true});
            cy.get('.gap-2 app-filter-badge').should('have.length.lte', 3); // Verificar máximo 15 elementos
            cy.get('.p-scroller').should('have.length.greaterThan', 0); // Verificar que hay elementos visibles
        }
        aplicarFiltroYVerificar_Combo(SelectoresFiltros[10]);
        aplicarFiltroYVerificar_Combo(SelectoresFiltros[7]);
        aplicarFiltroYVerificar_Combo(SelectoresFiltros[8]);
        aplicarFiltroYVerificar_Combo(SelectoresFiltros[9]);
    });   
    
});