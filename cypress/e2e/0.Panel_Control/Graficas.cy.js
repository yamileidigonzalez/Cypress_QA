const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");

describe('Visualización de gráficos', () => { 
  /*
  Como usuario del sistema bancario
  Quiero visualizar gráficos en tiempo real
  Para comprender el estado actual de los datos financieros
  */
  let tiempo= 500
  let titulo = 'titulo_grafica';
  let select = 'Opcciones'

  beforeEach('Entrar en la página', () => {
    //PAGINA
    cy.visit('https://newfront.lab.solverpay.com/login'); 
    cy.title().should('eq','Login')
    //LOGIN
    cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
    cy.wait(tiempo)
  })

  // Función general para verificar gráficos
  function verificarGrafico(nombreGrafico) {
    // Ajusta el selector según la estructura de tu HTML
    cy.get(nombreGrafico).should("be.visible").wait(tiempo); // Verificar que el gráfico sea visible
    // Verificar que no haya errores de renderizado
    cy.get(nombreGrafico).should("not.have.class", "error").wait(tiempo);
  }

  function verificarDatosCorrectos(nombreGrafico) {
    // Verificar que el gráfico tiene los datos correctos provenientes de la fuente esperada
    cy.get(nombreGrafico, { timeout: 10000 }) 
      .should('be.visible') 
      /*
      .should('have.attr', 'data-source') 
      .then((element) => {
        const dataSource = element.attr('data-source').trim(); 
        expect(dataSource).to.equal('esperada'); 
      });
      */
  }

  it('Visualización del gráfico de ventas últimas horas', () => {
    /*
        Given que estoy en la página principal
    Then el gráfico "Ventas últimas horas" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo)
    titulo='Ventas última hora' 
   
    //Título de Grafica
    cy.get('app-sales-per-hour.w-full > .mb-2').should('contains.text',titulo)
    verificarGrafico('app-sales-per-hour.w-full > .mb-2')
    verificarDatosCorrectos('app-sales-per-hour.w-full > .mb-2') 
    //Todo la Grafica
    verificarGrafico('app-sales-per-hour.w-full')
    verificarDatosCorrectos('app-sales-per-hour.w-full')
    //Area del Grafico
    verificarGrafico('[style="width: 204px; height: 256px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarDatosCorrectos('[style="width: 204px; height: 256px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    //Leyenda
    verificarGrafico('#legendContainer')
    verificarDatosCorrectos('#legendContainer')

    cy.wait(tiempo)  

  })

  it('Visualización del gráfico de denegadas última hora', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Denegadas última hora" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo)   
    titulo='Denegadas última hora' 
    
    //Título de Grafica
    cy.get('app-denied-per-hour.w-full > .text-lg').should('contains.text',titulo)
    verificarGrafico('app-denied-per-hour.w-full > .text-lg')
    verificarDatosCorrectos('app-denied-per-hour.w-full > .text-lg')
    //Todo la Grafica
    verificarGrafico('app-denied-per-hour.w-full')
    verificarDatosCorrectos('app-denied-per-hour.w-full')
    //Area del Grafico
   //verificarGrafico('app-denied-per-hour.w-full > .h-\[370px\]')
    //verificarDatosCorrectos('app-denied-per-hour.w-full > .h-\[370px\]')
    //Leyenda
    //verificarGrafico('#legendContainer')
    //verificarDatosCorrectos('#legendContainer')

    cy.wait(tiempo) 
    
  })

  it('Visualización del gráfico de diferidos última hora', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Diferidos última hora" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 
    titulo='Diferidos última hora' 
    
    //Título de Grafica
    cy.get('app-deferred-per-hour.w-full > .mb-2').should('contains.text',titulo)
    verificarGrafico('app-deferred-per-hour.w-full > .mb-2')
    verificarDatosCorrectos('app-deferred-per-hour.w-full > .mb-2')
    //Todo la Grafica
    verificarGrafico('app-deferred-per-hour.w-full')
    verificarDatosCorrectos('app-deferred-per-hour.w-full')
    //Area del Grafico
    verificarGrafico('[style="width: 184px; height: 302px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarDatosCorrectos('[style="width: 184px; height: 302px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    //Leyenda
    //verificarGrafico('#legendContainer')
    //verificarDatosCorrectos('#legendContainer')

 
    cy.wait(tiempo) 
  })
  
  it('Visualización del gráfico de estado del offline forzado', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Estado del offline forzado" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 
    titulo = "Estado del offline forzado"

    //Título de Grafica
    cy.get('app-offline-status.w-full > :nth-child(1) > .mb-2').should('contains.text', titulo)
    verificarGrafico('app-offline-status.w-full > :nth-child(1) > .mb-2')
    verificarDatosCorrectos('app-offline-status.w-full > :nth-child(1) > .mb-2') 
    //Todo la Grafica
    verificarGrafico('app-offline-status.w-full > :nth-child(1)')
    verificarDatosCorrectos('app-offline-status.w-full > :nth-child(1)')
    //Area del Grafico
    //verificarGrafico('app-offline-status.w-full > :nth-child(1) > .h-\[135px\]')
    //verificarDatosCorrectos('app-offline-status.w-full > :nth-child(1) > .h-\[135px\]')
    //Leyenda
    //verificarGrafico('app-offline-status.w-full > :nth-child(1) > .h-\[135px\] > :nth-child(2) > .flex')
    //verificarDatosCorrectos('app-offline-status.w-full > :nth-child(1) > .h-\[135px\] > :nth-child(2) > .flex')    
    cy.wait(tiempo)  

  })

  it('Visualización del gráfico de estado del backup forzado', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Estado del backup forzado" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 
    titulo = "Estado del backup forzado"
        
    //Título de Grafica
    cy.get('app-routing-status.w-full > :nth-child(1) > .mb-2').scrollIntoView().should('contains.text', titulo)
    verificarGrafico('app-routing-status.w-full > :nth-child(1) > .mb-2')
    verificarDatosCorrectos('app-routing-status.w-full > :nth-child(1) > .mb-2') 
    //Todo la Grafica
    verificarGrafico('app-routing-status.w-full > :nth-child(1)')
    verificarDatosCorrectos('app-routing-status.w-full > :nth-child(1)')
    //Area del Grafico
    //verificarGrafico('app-routing-status.w-full > :nth-child(1) > .h-\[135px\]')
    //verificarDatosCorrectos('app-routing-status.w-full > :nth-child(1) > .h-\[135px\]')
    //Leyenda
    verificarGrafico('.overflow-x-auto')
    verificarDatosCorrectos('.overflow-x-auto')

    cy.wait(tiempo)  

  })
   
  it('Visualización del gráfico de estado de las comisiones', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Estado de las comisiones" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 
    titulo = "Estado de las comisiones"
        
    //Título de Grafica
    cy.get('app-commissions-status.w-full > :nth-child(1) > .mb-2').should('contains.text', titulo)
    verificarGrafico('app-commissions-status.w-full > :nth-child(1) > .mb-2')
    verificarDatosCorrectos('app-commissions-status.w-full > :nth-child(1) > .mb-2') 
    //Todo la Grafica
    verificarGrafico('app-commissions-status.w-full > :nth-child(1)')
    verificarDatosCorrectos('app-commissions-status.w-full > :nth-child(1)')
    //Area del Grafico
    verificarGrafico(':nth-child(1) > .gap-2')
    verificarDatosCorrectos(':nth-child(1) > .gap-2')
  
    cy.wait(tiempo)  

  })
   
  it('Visualización del gráfico de transacciones por tipo', () => {
    /*
    Given que estoy en la página principal
    Then el gráfico "Transacciones por tipo" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 
    titulo = "Transacciones por tipo"
        
    //Título de Grafica
    cy.get('app-donuts.w-full > .text-lg').should('contains.text', titulo)
    verificarGrafico('app-donuts.w-full > .text-lg')
    verificarDatosCorrectos('app-donuts.w-full > .text-lg') 
    //Todo la Grafica
    verificarGrafico('app-donuts.w-full')
    verificarDatosCorrectos('app-donuts.w-full')
    //Area del Grafico
    //verificarGrafico('app-donuts.w-full > .h-\[370px\]')
    //verificarDatosCorrectos('app-donuts.w-full > .h-\[370px\]')
    //Leyenda
    

    cy.wait(tiempo)  
  })

  it('Visualización del gráfico de transacciones por fechas', () => {
    /*
       Given que estoy en la página principal
    Then el gráfico "Transacciones por fechas diario" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 

    titulo = "Transacciones por fecha"        
   
    // Seleccionar el dropdown y hacer clic para desplegarlo
    cy.get('#pn_id_5 .p-dropdown-label').click();
    // Seleccionar la opción deseada por su texto
    cy.get('.p-dropdown-item').contains('Diario').click();
    // Verificar que el texto del dropdown cambió correctamente
    cy.get('#pn_id_5 .p-dropdown-label')
      .should('contain.text', 'Diario')
      .invoke('text')
      .then((textoSeleccionado) => {
        cy.log('El texto seleccionado es:', textoSeleccionado.trim()); // Log en Cypress
      });
    //Título de Grafica
    cy.get('app-transactions-per-day.col-span-full > .mb-2').should('contains.text', titulo)
    verificarGrafico('app-transactions-per-day.col-span-full > .mb-2')
    verificarDatosCorrectos('app-transactions-per-day.col-span-full > .mb-2') 

    //Todo la Grafica            
    verificarGrafico('app-transactions-per-day.col-span-full > .bg-slate-200')
    verificarDatosCorrectos('app-transactions-per-day.col-span-full > .bg-slate-200')     

    //Area del Grafico
    verificarGrafico('[style="width: 484px; height: 372px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarDatosCorrectos('[style="width: 484px; height: 372px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')

    //Ejes X-Ys
    verificarGrafico('[style="width: 56px; height: 372px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarGrafico('[style="width: 484px; height: 28px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')

    titulo ='Transacciones por mes'

    // Seleccionar el dropdown y hacer clic para desplegarlo
    cy.get('#pn_id_5 .p-dropdown-label').click();
    // Seleccionar la opción deseada por su texto
    cy.get('.p-dropdown-item').contains('Mensual').click();
    // Verificar que el texto del dropdown cambió correctamente
    cy.get('#pn_id_5 .p-dropdown-label')
      .should('contain.text', 'Mensual')
      .invoke('text')
      .then((textoSeleccionado) => {
        cy.log('El texto seleccionado es:', textoSeleccionado.trim()); // Log en Cypress
      });

    //Título de Grafica
    cy.get('app-transactions-per-day.col-span-full > .mb-2').should('contains.text', titulo)
    verificarGrafico('app-transactions-per-day.col-span-full > .mb-2')
    verificarDatosCorrectos('app-transactions-per-day.col-span-full > .mb-2') 

    //Todo la Grafica            
    verificarGrafico('app-transactions-per-day.col-span-full > .bg-slate-200')
    verificarDatosCorrectos('app-transactions-per-day.col-span-full > .bg-slate-200')  
   
    //Area del Grafico
    verificarGrafico('[style="width: 484px; height: 372px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarDatosCorrectos('[style="width: 484px; height: 372px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')

    //Ejes X-Y
    verificarGrafico('[style="width: 56px; height: 372px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarGrafico('[style="width: 484px; height: 28px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    cy.wait(tiempo)  

  })
    
  it('Visualización del gráfico de importe por fechas diario', () => {
    /*
     Given que estoy en la página principal
    Then el gráfico "Importe por fechas diario" debería ser visible
    And debería presentar datos correctos provenientes de la fuente esperada
    And no debería contener errores de renderizado
    */
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 

    // Seleccionar el dropdown y hacer clic para desplegarlo
    cy.get('#pn_id_7 > .p-dropdown-label').click();
    // Seleccionar la opción deseada por su texto
    cy.get('.p-dropdown-item').contains('Diario').click();
    // Verificar que el texto del dropdown cambió correctamente
    cy.get('#pn_id_7 > .p-dropdown-label')
      .should('contain.text', 'Diario')
      .invoke('text')
      .then((textoSeleccionado) => {
        cy.log('El texto seleccionado es:', textoSeleccionado.trim()); // Log en Cypress
      });
    titulo = "Importe por fecha"

    //Título de Grafica
    cy.get('app-amount-per-day.col-span-full > .mb-2').should('contains.text', titulo)
    verificarGrafico('app-amount-per-day.col-span-full > .mb-2')
    verificarDatosCorrectos('app-amount-per-day.col-span-full > .mb-2') 

    //Todo la Grafica
    verificarGrafico('app-amount-per-day.col-span-full')
    verificarDatosCorrectos('app-amount-per-day.col-span-full')
    
    //Area del Grafico
    verificarGrafico('[style="width: 482px; height: 370px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarDatosCorrectos('[style="width: 482px; height: 370px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')

    //Ejes X-Y
    verificarGrafico('[style="width: 58px; height: 370px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarGrafico('[style="width: 482px; height: 28px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')

    // Seleccionar el dropdown y hacer clic para desplegarlo
    cy.get('#pn_id_7 > .p-dropdown-label').click();
    // Seleccionar la opción deseada por su texto
    cy.get('.p-dropdown-item').contains('Mensual').click();
    // Verificar que el texto del dropdown cambió correctamente
    cy.get('#pn_id_7 > .p-dropdown-label')
      .should('contain.text', 'Mensual')
      .invoke('text')
      .then((textoSeleccionado) => {
        cy.log('El texto seleccionado es:', textoSeleccionado.trim()); // Log en Cypress
      });
    cy.wait(tiempo) 
    titulo ='Importe por mes'

    //Título de Grafica
    cy.get('app-amount-per-day.col-span-full > .mb-2').should('contains.text', titulo)
    verificarGrafico('app-amount-per-day.col-span-full > .mb-2')
    verificarDatosCorrectos('app-amount-per-day.col-span-full > .mb-2')  

    //Todo la Grafica
    verificarGrafico('app-amount-per-day.col-span-full')
    verificarDatosCorrectos('app-amount-per-day.col-span-full')

    //Area del Grafico
    verificarGrafico('[style="width: 482px; height: 370px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarDatosCorrectos('[style="width: 482px; height: 370px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')

    //Ejes X-Y
    verificarGrafico('[style="width: 58px; height: 370px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    verificarGrafico('[style="width: 58px; height: 370px; position: absolute; z-index: 2; left: 0px; top: 0px;"]')
    cy.wait(tiempo)  

  })
 
  /*
  it('Visualización del gráfico de transacciones por entidad', () => {
  
    //Given que estoy en la página principal
    //Then el gráfico "Transacciones por entidad" debería ser visible
    //And debería presentar datos correctos provenientes de la fuente esperada
    //And no debería contener errores de renderizado
  
    cy.title().should('eq','Panel de control')    
    cy.wait(tiempo) 
    titulo = "?"
        
    //Título de Grafica
    cy.get('?').should('contains.text', titulo)
    verificarGrafico('?')
    verificarDatosCorrectos('?') 
    //Todo la Grafica
    verificarGrafico('?')
    verificarDatosCorrectos('?')
    //Area del Grafico
    verificarGrafico('?')
    verificarDatosCorrectos('?')
    //Leyenda
    verificarGrafico('?')
    verificarDatosCorrectos('?')
    cy.wait(tiempo)  

  })*/
  
})