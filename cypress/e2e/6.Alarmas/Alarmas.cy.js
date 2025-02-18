describe('Alarmas', () => {
    const tiempo = 3000; // Ajusta según sea necesario
  
    it('Se muestran las alarmas configuradas y activas', () => {      
  
      cy.get('#btnVerAlarmas').click(); // Botón para ver las alarmas
  
      cy.wait(tiempo);
  
      cy.get('.tablaAlarmas').should('be.visible'); // Verifica que la tabla de alarmas es visible
      cy.get('.tablaAlarmas tr').should('have.length.greaterThan', 1); // Asegura que hay alarmas configuradas y activas
      cy.get('.tablaAlarmas').should('contain', 'Alarma activa'); // Valida que hay alarmas activas
    });
  
    it('Se muestran las alarmas configuradas y activas en estado de alarma con color rojo', () => {
  
      cy.get('#btnVerAlarmas').click(); // Botón para ver las alarmas
  
      cy.wait(tiempo);
  
      cy.get('.tablaAlarmas').should('be.visible');
      cy.get('.tablaAlarmas tr.estadoAlarma').should('contain', 'En estado de alarma'); // Valida que hay alarmas en estado de alarma
      cy.get('.tablaAlarmas tr.estadoAlarma').should('have.css', 'color', 'rgb(255, 0, 0)'); // Verifica que el texto es rojo
    });
  });
  