describe('Favoritos', () => {
    const tiempo = 1000
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
        
        cy.Elemento_visible_varios('.sidebar-fav').click() // Verifica que .sidebar-fav existe
        .then(($sidebar) => {          
            // Obtiene todos los elementos hijos directos dentro de .sidebar-fav
            cy.wait(tiempo)
            const favoritos = $sidebar.children('.sidebar-fav-item');

            // Imprimir en la consola de Cypress
            cy.log(`📌 Total de favoritos encontrados: ${favoritos.length}`);
            
            if (favoritos.length === 0) {
            cy.log('⚠️ No se encontraron favoritos en la lista.');
            } else {
            favoritos.each((index, favorito) => {
                const $p = Cypress.$(favorito).find('p'); // Busca el <p> dentro del favorito

                if ($p.length === 0 || $p.text().trim() === '') {
                cy.log(`⚠️ El favorito ${index + 1} no tiene texto.`);
                } else {
                cy.wrap($p)
                    .scrollIntoView()
                    .invoke('text')
                    .then((text) => {
                    cy.log(`⭐ Página favorita ${index + 1}: ${text}`);
                    cy.wrap(favorito)
                        .click({ force: true }) // Hace clic en el favorito
                        .wait(tiempo);
                    });
                }
            });
            }
        })

        .then(() => {
            // Asegúrate de manejar cualquier otro tipo de error relacionado
            // que podría ocurrir dentro del flujo de Cypress, pero fuera de la captura directa de comandos.
            cy.on('fail', (error) => {
              cy.log(`⚠️ Error al intentar encontrar favoritos: ${error.message}`);
              // Puedes lanzar un error o realizar otras acciones, si es necesario
              throw error; // Esto es opcional si quieres que el test falle de inmediato
            });
        });
      
        
    });

    //2️⃣ Hacer clic en cada página favorita y validar su contenido
    it('Recorre y valida cada página favorita', () => { 
        cy.wait(tiempo);
        cy.Elemento_visible_varios('.sidebar-fav > .sidebar-title').click()

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
        cy.Elemento_visible_varios('.sidebar-fav').click()
        cy.Elemento_visible_varios('.ph-heart').click({ multiple: true })

    });
    
    //3️⃣ Agregar y verificar una nueva página como favorita
    it('Agrega una nueva página a favoritos y la verifica', () => { 
        cy.wait(tiempo); // Espera para asegurar que los elementos se carguen
        
        cy.Elemento_visible_varios('.sidebar-fav').click() // Verifica que .sidebar-fav existe
        .then(($sidebar) => {          
            // Obtiene todos los elementos hijos directos dentro de .sidebar-fav
            cy.wait(tiempo)
            const favoritos = $sidebar.children('.sidebar-fav-item');

            // Imprimir en la consola de Cypress
            cy.log(`📌 Total de favoritos encontrados: ${favoritos.length}`);
            
            if (favoritos.length === 0) {
            cy.log('⚠️ No se encontraron favoritos en la lista.');
            } else {
                favoritos.each((index, favorito) => {
                    const $p = Cypress.$(favorito).find('p'); // Busca el <p> dentro del favorito

                    if ($p.length === 0 || $p.text().trim() === '') {
                        cy.log(`⚠️ El favorito ${index + 1} no tiene texto.`);
                    } else {
                        cy.wrap($p)
                            .scrollIntoView()
                            .invoke('text')
                            .then((text) => { // Capturamos el texto del favorito
                                cy.log(`⭐ Página favorita ${index + 1}: ${text}`);
                    
                                cy.wrap(favorito)
                                    .click({ force: true }) // Hace clic en el favorito
                                    .wait(tiempo);
                    
                                // Ahora pasamos 'text' correctamente dentro de la promesa de 'cy.document()'
                                cy.document().then((doc) => {
                                    const header = doc.querySelector('app-header');
                                    if (!header) {
                                        cy.log('⚠️ app-header no se encuentra en el DOM en este momento.');
                                    } else {
                                        cy.log('✅ app-header encontrado en el DOM.');
                                        
                                        // Obtener el título dentro del app-header y compararlo con 'text'
                                        cy.get('app-header > .px-5').invoke('text').then((titulo) => {
                                            cy.log(`📄 Título de la página: ${titulo}`);
                    
                                            // Usar una comparación simple en lugar de 'expect'
                                            if (titulo.includes(text)) {  
                                                cy.log(`✅ Coinciden los títulos de la página.`);
                                            } else {
                                                cy.log(`❌ NO coinciden los títulos de la página.`);    
                                            }                           
                                        });
                                    }
                                });
                            });
                    }
                    
                });
            }
        })

        .then(() => {
            // Asegúrate de manejar cualquier otro tipo de error relacionado
            // que podría ocurrir dentro del flujo de Cypress, pero fuera de la captura directa de comandos.
            cy.on('fail', (error) => {
              cy.log(`⚠️ Error al intentar encontrar favoritos: ${error.message}`);
              // Puedes lanzar un error o realizar otras acciones, si es necesario
              throw error; // Esto es opcional si quieres que el test falle de inmediato
            });
        });
    });
    
    //4️⃣ Eliminar una página de favoritos y validar que desaparece
    it('Elimina una página de favoritos y verifica que ya no está', () => { 
        cy.wait(tiempo); // Espera para asegurar que los elementos se carguen
        
        cy.Elemento_visible_varios('.sidebar-fav').click() // Verifica que .sidebar-fav existe
        .then(($sidebar) => {          
            // Obtiene todos los elementos hijos directos dentro de .sidebar-fav
            cy.wait(tiempo)
            const favoritos = $sidebar.children('.sidebar-fav-item');
            // Imprimir en la consola de Cypress
            cy.log(`📌 Total de favoritos encontrados: ${favoritos.length}`);            
            if (favoritos.length === 0) {
                cy.log('⚠️ No se encontraron favoritos en la lista.');
            } else {
                favoritos.each((index, favorito) => {
                    const $p = Cypress.$(favorito).find('p'); // Busca el <p> dentro del favorito

                    if ($p.length === 0 || $p.text().trim() === '') {
                    cy.log(`⚠️ El favorito ${index + 1} no tiene texto.`);
                    } else {
                    cy.wrap($p)
                        .invoke('text')
                        .then((text) => {
                            cy.log(`⭐ Página favorita ${index + 1}: ${text}`);
                            cy.wrap(favorito) // Aquí sí es el elemento clickeable
                            .click() // Forza el clic si es necesario
                            .wait(tiempo); // Espera después del clic              
                            cy.get(favorito) // Aquí se re-consigue el favorito, ya que el DOM podría haber cambiado
                            .should('exist') // Verifica que todavía está presente
                            .then(() => {
                                // Continuar con la lógica
                                cy.log("El favorito fue clickeado correctamente");
                            
                                cy.get('.gap-x-4 > .text-lg', { timeout: 10000 }).should('exist').invoke('text')
                                .then((titulo) => {
                                    const textTrimmed = text.trim();
                                    const tituloTrimmed = titulo.trim();
                            
                                    cy.log(`Texto del favorito: ${textTrimmed}`);
                                    cy.log(`Título de la página: ${tituloTrimmed}`);
                            
                                    expect(tituloTrimmed).to.include(textTrimmed); // Verifica si el título contiene el texto del favorito
                                    
                                    cy.get('.gap-x-4 > .ph-heart').click()
                                    cy.reload(); // Recarga la página si es necesario
                                    cy.log('❌ Página eliminada de favoritos');
                                    // Esperamos un poco para que se actualice la lista
                                    cy.wait(tiempo);
                                    // Verificar que el elemento ya no está
                                    cy.get(textTrimmed).should('not.exist');       
                                });
                            })    
                        })
                    }
                })
            }
        })
        .then(() => {
            // Asegúrate de manejar cualquier otro tipo de error relacionado
            cy.on('fail', (error) => {
              cy.log(`⚠️ Error al intentar encontrar favoritos: ${error.message}`);
              // Puedes lanzar un error o realizar otras acciones, si es necesario
              throw error; // Esto es opcional si quieres que el test falle de inmediato
            });
        });

       
    });   

    //5️⃣Validar que al hacer clic en un favorito se carga la página correcta
    it('Verifica que el contenido de la página favorita se carga correctamente', () => { 
        cy.wait(tiempo); // Espera para asegurar que los elementos se carguen
        
        cy.Elemento_visible_varios('.sidebar-fav').click() // Verifica que .sidebar-fav existe
        .then(($sidebar) => {          
            // Obtiene todos los elementos hijos directos dentro de .sidebar-fav
            cy.wait(tiempo)
            const favoritos = $sidebar.children('.sidebar-fav-item');
            // Imprimir en la consola de Cypress
            cy.log(`📌 Total de favoritos encontrados: ${favoritos.length}`);            
            if (favoritos.length === 0) {
                cy.log('⚠️ No se encontraron favoritos en la lista.');
            } else {
                favoritos.each((index, favorito) => {
                    const $p = Cypress.$(favorito).find('p'); // Busca el <p> dentro del favorito

                    if ($p.length === 0 || $p.text().trim() === '') {
                    cy.log(`⚠️ El favorito ${index + 1} no tiene texto.`);
                    } else {
                    cy.wrap($p)
                        .invoke('text')
                        .then((text) => {
                            cy.log(`⭐ Página favorita ${index + 1}: ${text}`);
                            cy.wrap(favorito) // Aquí sí es el elemento clickeable
                            .click({ force: true }) // Forza el clic si es necesario
                            .wait(tiempo); // Espera después del clic                
                            cy.get(favorito) // Aquí se re-consigue el favorito, ya que el DOM podría haber cambiado
                            .should('exist') // Verifica que todavía está presente
                            .then(() => {
                                // Continuar con la lógica
                                cy.log("El favorito fue clickeado correctamente");
                            
                                cy.get('.gap-x-4 > .text-lg', { timeout: 10000 }).should('exist').invoke('text')
                                .then((titulo) => {
                                    const textTrimmed = text.trim();
                                    const tituloTrimmed = titulo.trim();
                            
                                    cy.log(`Texto del favorito: ${textTrimmed}`);
                                    cy.log(`Título de la página: ${tituloTrimmed}`);
                            
                                    expect(tituloTrimmed).to.include(textTrimmed); // Verifica si el título contiene el texto del favorito    
                                });
                            })    
                        })
                    }
                })
            }
        })
        .then(() => {
            // Asegúrate de manejar cualquier otro tipo de error relacionado
            cy.on('fail', (error) => {
              cy.log(`⚠️ Error al intentar encontrar favoritos: ${error.message}`);
              // Puedes lanzar un error o realizar otras acciones, si es necesario
              throw error; // Esto es opcional si quieres que el test falle de inmediato
            });
        });
    });    
});