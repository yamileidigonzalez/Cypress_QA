describe('Pruebas de Ordenamiento en Tablas', () => {
    const tiempo = 100;
    let correctos = 0;
    let incorrectos = 0;
    let fallosPorTabla = [];

    beforeEach('Entrar en la página', () => {
        // Iniciar sesión y esperar a la carga de la página
        cy.visit('https://newfront.lab.solverpay.com/login');
        cy.title().should('eq', 'Login');
        cy.login('solverpay@prueba.qa.com', 'r7auF23wA.A2l1tZ2Dp4');
        cy.wait(tiempo);
    });

    // Lista de menús y submenús
    const menuItems = [
        {
            menu: '[data-target="submenu-maintenance"]',
            submenus: [
                { selector: '[data-target="submenu-bancaria"]', items: ['#submenu-bancaria > :nth-child(1)', '#submenu-bancaria > :nth-child(3)', '#submenu-bancaria > :nth-child(4)', '#submenu-bancaria > :nth-child(5)', '#submenu-bancaria > :nth-child(6)', '#submenu-bancaria > :nth-child(7)', '#submenu-bancaria > :nth-child(8)', '#submenu-bancaria > :nth-child(9)', '#submenu-bancaria > :nth-child(10)', '#submenu-bancaria > :nth-child(11)', '#submenu-bancaria > :nth-child(12)'] },
                { selector: '[data-target="submenu-base"]', items: ['#submenu-base > :nth-child(1)', '#submenu-base > :nth-child(2)', '#submenu-base > :nth-child(3)', '#submenu-base > :nth-child(4)', '#submenu-base > :nth-child(5)', '#submenu-base > :nth-child(6)'] },
                { selector: '[data-target="submenu-cards"]', items: ['#submenu-cards > :nth-child(1)', '#submenu-cards > :nth-child(2)', '#submenu-cards > :nth-child(3)', '#submenu-cards > :nth-child(4)', '#submenu-cards > :nth-child(5)', '#submenu-cards > :nth-child(6)', '#submenu-cards > :nth-child(7)', '#submenu-cards > :nth-child(8)', '#submenu-cards > :nth-child(9)'] },
                { selector: '[data-target="submenu-general"]', items: ['#submenu-general > :nth-child(1)', '#submenu-general > :nth-child(2)', '#submenu-general > :nth-child(3)', '#submenu-general > :nth-child(4)'] },
                { selector: '[data-target="submenu-tracking"]', items: ['#submenu-tracking > :nth-child(1)', '#submenu-tracking > :nth-child(2)'] }
            ]
        },
        {
            menu: '[data-target="submenu-transactions"]',
            submenus: [{ selector: '#submenu-transactions', items: ['#submenu-transactions > :nth-child(1)', '#submenu-transactions > :nth-child(2)', '#submenu-transactions > :nth-child(3)', '#submenu-transactions > :nth-child(4)', '#submenu-transactions > :nth-child(5)'] }]
        },
        {
            menu: '[data-target="submenu-entity"]',
            submenus: [{ selector: '#submenu-entity', items: ['#submenu-entity > :nth-child(1)'] }]
        },
        {
            menu: '[data-target="submenu-management"]',
            submenus: [{ selector: '#submenu-management', items: [ '#submenu-management > :nth-child(4)'] }]
        }
    ];

    // Función optimizada para ordenar las tablas y verificar el resultado
    function verificarOrden(tablaSelector, columnaIndex, headerText) {
        // Verificar si hay un mensaje de "No hay datos disponibles en la tabla"
        cy.get('.p-scroller').then(($message) => {
            if ($message.text().includes("No hay datos disponibles en la tabla")) {
                cy.log('❌ No hay datos disponibles en la tabla, saltando...');
                return;  // Salir de la función si no hay datos
            }
            cy.wait(tiempo)    
            // Si hay datos en la tabla, proceder con la verificación del orden
            cy.get(`${tablaSelector} tbody tr`).should('have.length.greaterThan', 0).then(() => {
                cy.get(`${tablaSelector} tbody tr td:nth-child(${columnaIndex + 1})`).should('exist').then(($cells) => {
                    if ($cells.length === 0) {
                        cy.log(`❌ No se encontraron celdas en la columna ${columnaIndex + 1}, saltando...`);
                        return;  // Salir si no hay celdas
                    }
    
                    const valoresAntes = [...$cells].map(cell => cell.innerText);
    
                    // Orden ascendente
                    cy.get(`${tablaSelector} thead th:nth-child(${columnaIndex + 1})`).click();
                    cy.log(`🔄 Ordenando por ${headerText} en orden ascendente.`);
                    cy.wait(tiempo);
                    cy.get(`${tablaSelector} tbody tr td:nth-child(${columnaIndex + 1})`).then(($cellsAsc) => {
                        const valoresDespuesAsc = [...$cellsAsc].map(cell => cell.innerText);
                        const ordenCorrectoAsc = valoresAntes.slice().sort((a, b) => a.localeCompare(b));
    
                        if (JSON.stringify(valoresDespuesAsc) === JSON.stringify(ordenCorrectoAsc)) {
                            correctos++;
                        } else {
                            incorrectos++;
                            fallosPorTabla.push({ tabla: tablaSelector, fila: columnaIndex + 1, columna: headerText, tipo: 'ascendente' });
                        }
    
                        // Orden descendente
                        cy.get(`${tablaSelector} thead th:nth-child(${columnaIndex + 1})`).click();
                        cy.log(`🔄 Ordenando por ${headerText} en orden descendente.`);
                        cy.wait(tiempo);
                        cy.get(`${tablaSelector} tbody tr td:nth-child(${columnaIndex + 1})`).then(($cellsDesc) => {
                            const valoresDespuesDesc = [...$cellsDesc].map(cell => cell.innerText);
                            const ordenCorrectoDesc = valoresAntes.slice().sort((a, b) => b.localeCompare(a));
    
                            if (JSON.stringify(valoresDespuesDesc) === JSON.stringify(ordenCorrectoDesc)) {
                                correctos++;
                            } else {
                                incorrectos++;
                                fallosPorTabla.push({ tabla: tablaSelector, fila: columnaIndex + 1, columna: headerText, tipo: 'descendente' });
                            }
                        });
                    });
                });
            });
        });
    }
    
    it('Ordenar cada elemento de la tabla', () => {
        menuItems.forEach(({ menu, submenus }) => {
            cy.Click_force(menu).scrollIntoView();

            submenus.forEach(({ selector, items }) => {
                cy.Click_force(selector).scrollIntoView();

                items.forEach((subItemSelector) => {
                    cy.Click_force(subItemSelector).scrollIntoView().wait(tiempo);
                    // Verificar y ordenar las tablas
                    cy.get('table').each(($table, index) => {
                        const tablaSelector = `table:eq(${index})`;  // Definir el selector para cada tabla

                        cy.get(tablaSelector).find('thead th').each(($header, colIndex) => {
                            verificarOrden(tablaSelector, colIndex, $header.text());
                        });
                    });
                });

                cy.get(selector).invoke('text').then((text) => {
                    cy.log(`Archivos encontrados en ${text}`);
                });
            });
        });

        // Mostrar los resultados al final
        cy.then(() => {
            cy.log(`✅ Total de ordenados correctamente: ${correctos}`);
            cy.log(`❌ Total de fallos en ordenamiento: ${incorrectos}`);
            fallosPorTabla.forEach(fallo => {
                cy.log(`🔴 Falla en la tabla: ${fallo.tabla}, fila: ${fallo.fila}, columna: ${fallo.columna}, tipo de ordenamiento: ${fallo.tipo}`);
            });
        });
    });
});


