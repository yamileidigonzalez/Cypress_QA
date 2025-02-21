describe('Descargas', () => {
    const tiempo = 1000;
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
    }) 

    //Comprobar la exportación a Excel
    function DescargarExcel_validar() {
        cy.intercept('GET', '**/download').as('descargaExcel');
    
        // Verificar si el botón existe antes de hacer clic
        cy.get('body').then(($body) => {
            if ($body.find('[severity="info"] > .p-ripple').length > 0) {
                cy.Click_force('[severity="info"] > .p-ripple');
                cy.wait(tiempo); // Pequeña espera para asegurar la carga
                // Esperar a que el botón de descarga esté activo antes de hacer clic
                cy.get('[severity="info"]').then(($btn) => {
                    if ($btn.is(':visible') && !$btn.hasClass('p-button-loading') && !$btn.is(':disabled')) {
                        cy.wrap($btn).click();
            
                        // Esperar a que la solicitud de descarga se complete y verificar el estado
                        cy.wait('@descargaExcel').then((interception) => {
                            if (interception.response.statusCode === 200) {
                                cy.log('✅ La descarga del archivo Excel fue exitosa.');
                            } else {
                                cy.log(`❌ Falló la descarga. Código de respuesta: ${interception.response.statusCode}`);
                            }
                        });
                    } else {
                        cy.log('❌ El botón de descarga no está disponible o está deshabilitado.');
                    }
                });
            } else {
                cy.log('❌ El botón de descarga no está disponible, pasando al siguiente.');
                return;
            }
        });
    
    }    
    
    // LISTA DE MENÚS Y SUBMENÚS
    const menuItems = [
        {
            menu: '[data-target="submenu-maintenance"]',
            submenus: [
                { selector: '[data-target="submenu-bancaria"]',  
                    items: [                 
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
                ]  },
                { selector: '[data-target="submenu-base"]', items: [                
                    //Seleccionar la pagina
                    '#submenu-base > :nth-child(1)', 
                    '#submenu-base > :nth-child(2)',
                    '#submenu-base > :nth-child(3)',
                    '#submenu-base > :nth-child(4)',
                    '#submenu-base > :nth-child(5)',
                    '#submenu-base > :nth-child(6)'       
                ]  },
                { selector: '[data-target="submenu-cards"]', items: [   
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
                ]  },
                { selector: '[data-target="submenu-general"]', items: [  
                    //Seleccionar la pagina
                    '#submenu-general > :nth-child(1)', 
                    '#submenu-general > :nth-child(2)',
                    '#submenu-general > :nth-child(3)',
                    '#submenu-general > :nth-child(4)'   
                ]  },
                { selector: '[data-target="submenu-tracking"]', items: [    
                    //Seleccionar la pagina
                    '#submenu-tracking > :nth-child(1)', 
                    '#submenu-tracking > :nth-child(2)' 
                ]  },
            ]
        },
        {
            menu: '[data-target="submenu-transactions"]',
            submenus: [{ selector: '#submenu-transactions', items: [
                //Seleccionar la pagina
                '#submenu-transactions > :nth-child(1)', 
                '#submenu-transactions > :nth-child(2)',
                '#submenu-transactions > :nth-child(3)',
                '#submenu-transactions > :nth-child(4)',
                '#submenu-transactions > :nth-child(5)'      
            ]  }]
        },
        {
            menu: '[data-target="submenu-entity"]',
            submenus: [{ selector: '#submenu-entity', items: [ 
                //Seleccionar la pagina
                '#submenu-entity > :nth-child(1)', 
                '#submenu-entity > :nth-child(2)',
                '#submenu-entity > :nth-child(3)',
                '#submenu-entity > :nth-child(4)'      
            ]  }]
        },
        {
            menu: '[data-target="submenu-management"]',
            submenus: [{ selector: '#submenu-management', items: [
                //Seleccionar la pagina
                '#submenu-management > :nth-child(1)', 
                '#submenu-management > :nth-child(2)',
                '#submenu-management > :nth-child(3)',
                '#submenu-management > :nth-child(4)'      
            ]  }]
        }
    ];
    
    it.only('Comprobar la exportación a Excel', () => {
        menuItems.forEach(({ menu, submenus }) => {
            cy.Click_force(menu).scrollIntoView();
    
            submenus.forEach(({ selector, items }) => {
                cy.Click_force(selector).scrollIntoView();
    
                items.forEach((subItemSelector) => {
                    cy.Click_force(subItemSelector).scrollIntoView().wait(tiempo);
                    DescargarExcel_validar();
                });
    
                cy.get(selector).invoke('text').then((text) => {
                    cy.log(`Archivos encontrados en ${text}`);
                });
            });
        });
    });   
      
});


