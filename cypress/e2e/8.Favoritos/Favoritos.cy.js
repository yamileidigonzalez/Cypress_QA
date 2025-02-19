describe('Favoritos', () => {
    const tiempo = 500;
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
    }) 

    //1️⃣ Validar que existen páginas favoritas
    it('Verifica que hay páginas favoritas en la lista', () => { 
        cy.wait(tiempo); // Espera para asegurar que los elementos se carguen
        cy.get('.sidebar-fav > .sidebar-title').should('exist').then($favoritos => {
            if ($favoritos.length > 0) {                
                cy.get('.sidebar-fav', { timeout: 10000 }).scrollIntoView()  // Espera hasta 10s a que aparezca
                .should('exist') // Verifica que el contenedor de favoritos existe
                .within(() => {
                    cy.get('p') // Busca los elementos <p> dentro de .sidebar-fav
                    .should('have.length.at.least', 1) // Asegura que haya al menos un favorito
                    .each(($favorito, index) => {
                        cy.wrap($favorito)
                        .scrollIntoView()
                        .invoke('text')
                        .then((text) => {
                            cy.log(`⭐ Página favorita ${index + 1}: ${text}`);

                            cy.wrap($favorito)
                            .closest('a, div, li') // Ajusta según la estructura real del DOM
                            .click({ force: true }).wait(tiempo)
                        });
                    });
                });              

            } else {
                cy.log('⚠️ No hay páginas favoritas disponibles');
            }
        });
    });

    //2️⃣ Hacer clic en cada página favorita y validar su contenido
    it('Recorre y valida cada página favorita', () => { 
        cy.wait(tiempo);
        cy.Elemento_visible('.sidebar-fav > .sidebar-title').click()

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

        //Seleccionar Bancaria en el Submenu
        cy.Click_force(Bancaria).scrollIntoView()   
        Selectores_Navegacion_Mantenimiento_Bancaria.forEach((selector) => {                     
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo);
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
            cy.wait(tiempo);
        })
        //Seleccionar el Submenu
        cy.Click_force(Base) 
        Selectores_Navegacion_Mantenimiento_Base.forEach((selector) => {                        
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
        })
        //Seleccionar el Submenu
        cy.Click_force(Tarjetas).scrollIntoView()
        Selectores_Navegacion_Mantenimiento_Tarjetas.forEach((selector) => {            
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
        })
        //Seleccionar el Submenu
        cy.Click_force(General).scrollIntoView()
        Selectores_Navegacion_Mantenimiento_General.forEach((selector) => {            
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
        })
        //Seleccionar el Submenu
        cy.Click_force(Monitorizacion).scrollIntoView()
        Selectores_Navegacion_Mantenimiento_Monitorizacion.forEach((selector) => {           
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
        })
        
        //Seleccionar el Menu
        cy.Click_force(Transacciones).scrollIntoView() 
        Selectores_Navegacion_Transacciones.forEach((selector) => {
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo);  
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
        })

        //Seleccionar el Menu
        cy.Click_force(Entidades).scrollIntoView()
        Selectores_Navegacion_Entidades.forEach((selector) => {           
            // Seleccionar la pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo); 
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
        })

        //Seleccionar el Menu
        cy.Click_force(Herramientas).scrollIntoView()
        Selectores_Navegacion_Herramientas.forEach((selector) => {          
            // Seleccionar pagina
            cy.Click_force(selector).scrollIntoView().wait(tiempo);  
            //Marcar como favoritos
            cy.Click_force('.gap-x-4 > .ph-heart')
        })
        
        //Seleccionar el Menu
        cy.Click_force(Herramientas).scrollIntoView()          
        // Seleccionar pagina
        cy.Click_force(Gestion).scrollIntoView().wait(tiempo);  
        //Marcar como favoritos
        cy.Click_force('.gap-x-4 > .ph-heart')


        //Recorrer la lista de favoritos
        cy.Elemento_visible('.sidebar-fav').click()
        cy.Elemento_visible('.ph-heart').click({ multiple: true })

    });
    
    //3️⃣ Agregar y verificar una nueva página como favorita
    it('Agrega una nueva página a favoritos y la verifica', () => { 
        cy.wait(tiempo);

        cy.get('.sidebar-fav', { timeout: 10000 }).scrollIntoView()  // Espera hasta 10s a que aparezca
        .should('exist') // Verifica que el contenedor de favoritos existe
        .within(() => {
            cy.get('p') // Busca los elementos <p> dentro de .sidebar-fav
            .should('have.length.at.least', 1) // Asegura que haya al menos un favorito
            .each(($favorito, index) => {
                cy.wrap($favorito)
                .scrollIntoView()
                .invoke('text')
                .then((text) => {
                    cy.log(`⭐ Página favorita ${index + 1}: ${text}`);
                    /*
                    cy.document().then((doc) => {
                        const header = doc.querySelector('app-header');
                        if (!header) {
                            cy.log('⚠️ app-header no se encuentra en el DOM en este momento.');
                        } else {
                            cy.log('✅ app-header encontrado en el DOM.');
                            cy.get('app-header > .px-5').invoke('text')
                            .then((titulo) => {
                                cy.log(`📄 Título de la página: ${titulo}`);
                                if (expect(titulo).to.include(text)) {  // Verifica que el texto coincide)
                                    cy.log(`Coinciden los Título de la página`);
                                } else {
                                    cy.log(`NO coinciden los Título de la página`);

                                }                           
                            })
                        }
                    });*/
                })
            });
        });

    });
    
    //4️⃣ Eliminar una página de favoritos y validar que desaparece
    it.only('Elimina una página de favoritos y verifica que ya no está', () => { 
        cy.wait(tiempo);

        // Suponiendo que hay un botón de eliminar dentro de cada favorito
        cy.get('.sidebar-fav', { timeout: 10000 }).scrollIntoView()  // Espera hasta 10s a que aparezca
        .should('exist') // Verifica que el contenedor de favoritos existe
        .within(() => {
            cy.get('p') // Busca los elementos <p> dentro de .sidebar-fav
            .should('have.length.at.least', 1) // Asegura que haya al menos un favorito
            .first(($favorito, index) => {
                cy.wrap($favorito).scrollIntoView()
                .click()            
            });
        });

        cy.get('.gap-x-4 > .text-lg').scrollIntoView()
        cy.get('.gap-x-4 > .ph-heart')
        .click()
        cy.log('❌ Página eliminada de favoritos');

        // Esperamos un poco para que se actualice la lista
        cy.wait(tiempo);

        // Verificar que el elemento ya no está
        cy.get('.p-3.favorito').should('not.exist');
    });


    it.only('Elimina una página de favoritos y verifica que ya no está', () => { 
        // Espera hasta 10 segundos a que aparezca la lista de favoritos
        cy.get('.sidebar-fav', { timeout: 10000 })
            .should('exist')
            .scrollIntoView();
    
        // Verifica que haya al menos un favorito y elimina el primero
        cy.get('.sidebar-fav p')
            .should('have.length.at.least', 1)
            .first()
            .click();
    
        // Hace clic en el corazón para eliminar de favoritos
        cy.get('.gap-x-4 > .ph-heart')
            .should('be.visible')
            .click();
    
        cy.log('❌ Página eliminada de favoritos');
    
        // Verifica que el elemento ya no esté en la lista
        cy.get('.p-3.favorito', { timeout: 5000 }).should('not.exist');
    });
    

    //5️⃣ Validar que al hacer clic en un favorito se carga la página correcta
    it('Verifica que el contenido de la página favorita se carga correctamente', () => { 
        cy.wait(tiempo).click().should('have.class', 'ph-fill')//comprobar el corazon

        cy.get('.p-3.favorito').first().invoke('text').then((favoritoTexto) => {
            cy.wrap(favoritoTexto).as('nombreFavorito'); // Guardamos el nombre

            cy.get('.p-3.favorito').first().click();
            cy.log(`⭐ Abriendo página favorita: ${favoritoTexto}`);

            // Verificar que el título de la nueva página coincide con el favorito
            cy.get('.titulo-pagina').should('contain.text', favoritoTexto);
        });
    });    
});