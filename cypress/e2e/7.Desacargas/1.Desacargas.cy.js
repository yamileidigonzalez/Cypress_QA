describe('Descargas', () => {
    const tiempo = 1000;
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('.ph-bell').should("be.visible").click()
        cy.wait(tiempo)
    }) 

    //Comprobar la exportación a Excel
    it.only('Comprobar la exportación a Excel', () => {

        let Mantenimientos= '[data-target="submenu-maintenance"]';

        let Bancaria= '[data-target="submenu-bancaria"]';
        let Base ='[data-target="submenu-base"]';
        let Tarjetas='[data-target="submenu-cards"]';
        let General ='[data-target="submenu-general"]'; 
        let Monitorizacion='[data-target="submenu-tracking"]';

        const Selectores_Navegacion_Mantenimiento_Bancaria = [                 
            //Seleccionar la pagina
            '#submenu-bancaria > :nth-child(1)', 
            '#submenu-bancaria > :nth-child(2)',
            '#submenu-bancaria > :nth-child(3)',
            '#submenu-bancaria > :nth-child(4)',
            '#submenu-bancaria > :nth-child(5)',
            '#submenu-bancaria > :nth-child(6)',
            '#submenu-bancaria > :nth-child(7)',
            '#submenu-bancaria > :nth-child(8)',
            '#submenu-bancaria > :nth-child(9)',
            '#submenu-bancaria > :nth-child(10)',
            '#submenu-bancaria > :nth-child(11)',
            '#submenu-bancaria > :nth-child(12)'        
        ]  

        const Selectores_Navegacion_Mantenimiento_Base = [                
            //Seleccionar la pagina
            '#submenu-base > :nth-child(1)', 
            '#submenu-base > :nth-child(2)',
            '#submenu-base > :nth-child(3)',
            '#submenu-base > :nth-child(4)',
            '#submenu-base > :nth-child(5)',
            '#submenu-base > :nth-child(6)'       
        ] 

        const Selectores_Navegacion_Mantenimiento_Tarjetas = [   
            //Seleccionar la pagina
            '#submenu-cards > :nth-child(1)', 
            '#submenu-cards > :nth-child(2)',
            '#submenu-cards > :nth-child(3)',
            '#submenu-cards > :nth-child(4)',
            '#submenu-cards > :nth-child(5)',
            '#submenu-cards > :nth-child(6)',
            '#submenu-cards > :nth-child(7)',
            '#submenu-cards > :nth-child(8)',
            '#submenu-cards > :nth-child(9)'      
        ] 

        const Selectores_Navegacion_Mantenimiento_General = [  
            //Seleccionar la pagina
            '#submenu-general > :nth-child(1)', 
            '#submenu-general > :nth-child(2)',
            '#submenu-general > :nth-child(3)',
            '#submenu-general > :nth-child(4)'   
        ] 
       
        const Selectores_Navegacion_Mantenimiento_Monitorizacion = [    
            //Seleccionar la pagina
            '#submenu-tracking > :nth-child(1)', 
            '#submenu-tracking > :nth-child(2)' 
        ] 

        let Transacciones = '[data-target="submenu-transactions"]';  

        const Selectores_Navegacion_Transacciones = [
            //Seleccionar la pagina
            '#submenu-transactions > :nth-child(1)', 
            '#submenu-transactions > :nth-child(2)',
            '#submenu-transactions > :nth-child(3)',
            '#submenu-transactions > :nth-child(4)',
            '#submenu-transactions > :nth-child(5)'      
        ] 

        let Entidades ='[data-target="submenu-entity"]'; 

        const Selectores_Navegacion_Entidades = [ 
            //Seleccionar la pagina
            '#submenu-entity > :nth-child(1)', 
            '#submenu-entity > :nth-child(2)',
            '#submenu-entity > :nth-child(3)',
            '#submenu-entity > :nth-child(4)'      
        ] 

        let Herramientas = '[data-target="submenu-management"]',  

        const Selectores_Navegacion_Herramientas = [
            //Seleccionar la pagina
            '#submenu-management > :nth-child(1)', 
            '#submenu-management > :nth-child(2)',
            '#submenu-management > :nth-child(3)',
            '#submenu-management > :nth-child(4)'      
        ] 

        const Selectores_Navegacion_Gestion = [
            //Seleccionar Gestion en el Menu
            '.sidebar-menu > .main-item.ng-star-inserted'     
        ] 

        Selectores_Navegacion_Mantenimiento_Bancaria.forEach((selector) => {
            //Seleccionar Mantenimientos en el Menu
            cy.Click_force(Mantenimientos)
            //Seleccionar Bancaria en el Submenu
            cy.Click_force(Bancaria)            
            // Seleccionar la entidad
            cy.Click_force(selector) 

            cy.Click_force('.gap-x-4 > .ph-heart')

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
        cy.get('#id_boton_exportar').click();
        cy.wait(5000);
            
        // Verificación de la descarga (requiere configuración adicional en Cypress para acceder a archivos)
        const downloadFolder = 'cypress/downloads';
        cy.task('readDirectory', downloadFolder).then((files) => {
            expect(files.some(file => file.includes('reporte'))).to.be.true;
        });
    });
    
});


