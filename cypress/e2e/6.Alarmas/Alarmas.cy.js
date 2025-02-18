describe('Alarmas', () => {
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
    it('Se muestran las alarmas configuradas', () => { 
        cy.wait(25000)
        cy.get('body > app-root > app-main-component > main > app-alarms > div > div').should('exist'); // Verifica que hay elementos en la lista
        cy.get('.flex-1').should('exist');
        
        cy.get('body > app-root > app-main-component > main > app-alarms > div > div') // Selecciona todos los elementos de la lista
            .then($list => {
              if ($list.length > 0) {
                  cy.log('✅ La lista tiene elementos');
                  
                  // Recorremos los elementos de la lista
                  cy.get(':nth-child(n) > .p-3').each(($element, index) => {
                      // Verificamos que el elemento sea visible
                      cy.wrap($element).should('be.visible');
                      
                      // Obtenemos y mostramos el texto del elemento
                      cy.wrap($element).invoke('text').then((text) => {
                          cy.log(`📄 Texto del elemento ${index + 1}: ${text}`);
      
                          // Aquí seleccionamos el texto del estado activo o inactivo
                          const estado = text.includes('Activo') ? 'activo' : 
                                         text.includes('Inactivo') ? 'inactivo' : null;
      
                          if (estado) {
                              // Logica para manejar activo o inactivo
                              cy.wrap($element).click();
                              cy.log(`${estado === 'activo' ? '🟢' : '🔴'} Elemento ${estado} ${index + 1} clickeado`);
                              cy.wrap($element).should('be.visible');
                              cy.wrap($element).invoke('text').then((text) => {
                                  cy.log(`📄 Texto del elemento ${estado} ${index + 1}: ${text}`);
                              });
                          }
                      });
      
                      // Aquí puedes agregar más verificaciones si es necesario
                      cy.log(`Total de Alarmas: ${index + 1}`);
                  });
              } else {
                  cy.log('⚠️ La lista está vacía');
              }
            });
   
    });

    it('Se muestran las alarmas configuradas: activas/inactivas', () => { 
      cy.wait(25000); // Esperamos para asegurar que los elementos estén disponibles
      cy.get('body > app-root > app-main-component > main > app-alarms > div > div').should('exist'); // Verifica que hay elementos en la lista
      cy.get('.flex-1').should('exist');
  
      cy.get('body > app-root > app-main-component > main > app-alarms > div > div') // Selecciona todos los elementos de la lista
        .then($list => {
          if ($list.length > 0) {
              cy.log('✅ La lista tiene elementos');
              
              // Esperamos que los elementos estén visibles y contengan la clase 'activo' o 'inactivo'
              cy.get(':nth-child(n) > .p-3').should('have.length.greaterThan', 0); // Espera a que haya elementos
  
              // Recorremos los elementos
              cy.get(':nth-child(n) > .p-3').each(($element, index) => {
                  // Verificamos que el elemento sea visible
                  cy.wrap($element).should('be.visible');
                  
                  // Obtenemos y mostramos el texto del elemento
                  cy.wrap($element).invoke('text').then((text) => {
                      cy.log(`📄 Texto del elemento ${index + 1}: ${text}`);
  
                      // Identificamos el estado del elemento (activo o inactivo)
                      const estado = text.includes('Activa') ? 'activo' : 
                                     text.includes('Inactiva') ? 'inactivo' : null;
  
                      if (estado) {
                          // Lógica para manejar activo o inactivo
                          cy.wrap($element).click();
                          cy.log(`${estado === 'activo' ? '🟢' : '🔴'} Elemento ${estado} ${index + 1} clickeado`);
                          cy.wrap($element).should('be.visible');
                          cy.wrap($element).invoke('text').then((text) => {
                              cy.log(`📄 Texto del elemento ${estado} ${index + 1}: ${text}`);
                          });
                      }
                  });
  
                  // Aquí puedes agregar más verificaciones si es necesario
                  cy.log(`Total de Alarmas: ${index + 1}`);
              });
          } else {
              cy.log('⚠️ La lista está vacía');
          }
        });
    });

});
  