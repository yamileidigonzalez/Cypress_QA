describe('Descargas', () => {
    const tiempo = 10000;
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')

        
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

        let Herramientas = '[data-target="submenu-management"]'; 

        const Selectores_Navegacion_Herramientas = [
            //Seleccionar la pagina
            '#submenu-management > :nth-child(1)', 
            '#submenu-management > :nth-child(2)',
            '#submenu-management > :nth-child(3)',
            '#submenu-management > :nth-child(4)'      
        ]     

        let Gestion = '.sidebar-menu > .main-item.ng-star-inserted';

        
        //Seleccionar el Menu
        cy.Click_force(Mantenimientos).scrollIntoView()
       
        // Verificación de la descarga (requiere configuración adicional en Cypress para acceder a archivos)
        const downloadFolder = Cypress.config('downloadsFolder');

        Cypress.env('TOKEN', 'tu_token_valido_aqui');

        // Función reutilizable para aplicar filtro y verificar los resultados
        function DescargarExcel_validar() {
            cy.Click_force('[severity="info"] > .p-ripple')
            cy.wait(tiempo);
            //esperar
            cy.get('button.p-button-icon-only')
            .should('not.have.class', 'p-button-loading') // Espera que termine de cargar
            .should('not.be.disabled') // Espera que esté habilitado
            .click();
            //error
            cy.request({
                method: 'GET',
                url: 'https://api.newfront.lab.solverpay.com/api/entity-channel/download',
                headers: {
                    Authorization: `Bearer ${Cypress.env('TOKEN')}`, // Asegúrate de definir el token en Cypress.env
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            });            
    
            cy.task('readDirectory', downloadFolder).then((files) => {
                cy.log('Archivos encontrados:', files);
                expect(files.some(file => file.includes('reporte'))).to.be.true;
            })    
        }

        //Seleccionar Bancaria en el Submenu
        cy.Click_force(Bancaria).scrollIntoView()   
        Selectores_Navegacion_Mantenimiento_Bancaria.forEach((selector) => {                     
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo);

            //Pulsar el botón descarga
            DescargarExcel_validar();           
        })
        cy.log('Archivos encontrados en Mantenimiento_Bancaria');

        //Seleccionar el Submenu
        cy.Click_force(Base) 
        Selectores_Navegacion_Mantenimiento_Base.forEach((selector) => {                        
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
           //Pulsar el botón descarga
           DescargarExcel_validar();
        })
        cy.log('Archivos encontrados en Mantenimiento_Base');

        //Seleccionar el Submenu
        cy.Click_force(Tarjetas).scrollIntoView()
        Selectores_Navegacion_Mantenimiento_Tarjetas.forEach((selector) => {            
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Pulsar el botón descarga
            DescargarExcel_validar();
        })
        cy.log('Archivos encontrados en Mantenimiento_Tarjetas');

        //Seleccionar el Submenu
        cy.Click_force(General).scrollIntoView()
        Selectores_Navegacion_Mantenimiento_General.forEach((selector) => {            
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Pulsar el botón descarga
            DescargarExcel_validar();
        })
        cy.log('Archivos encontrados en Mantenimiento_General');

        //Seleccionar el Submenu
        cy.Click_force(Monitorizacion).scrollIntoView()
        Selectores_Navegacion_Mantenimiento_Monitorizacion.forEach((selector) => {           
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Pulsar el botón descarga
            DescargarExcel_validar();;
        })
        cy.log('Archivos encontrados en Mantenimiento_Monitorizacion');
        
        //Seleccionar el Menu
        cy.Click_force(Transacciones).scrollIntoView() 
        Selectores_Navegacion_Transacciones.forEach((selector) => {
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo);  
            //Pulsar el botón descarga
            DescargarExcel_validar();
        })
        cy.log('Archivos encontrados en Transacciones');

        //Seleccionar el Menu
        cy.Click_force(Entidades).scrollIntoView()
        Selectores_Navegacion_Entidades.forEach((selector) => {           
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Pulsar el botón descarga
            DescargarExcel_validar();
        })
        cy.log('Archivos encontrados en Entidades');

        //Seleccionar el Menu
        cy.Click_force(Herramientas).scrollIntoView()
        Selectores_Navegacion_Herramientas.forEach((selector) => {          
            // Seleccionar pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo);  
            //Pulsar el botón descarga
            DescargarExcel_validar();
        })
        cy.log('Archivos encontrados en Herramientas');
        
        //Seleccionar el Menu
        cy.Click_force(Herramientas).scrollIntoView()          
        // Seleccionar pagina
        cy.Click_force(Gestion).scrollIntoView().wait(tiempo);  
        //Pulsar el botón descarga
        DescargarExcel_validar();
        })
        cy.log('Archivos encontrados en Gestion');
    
});


