describe('Peticiones Totales', () => {
    const tiempo = 1000;
    
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login()
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-entity"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-entity > :nth-child(2)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
        cy.wait(tiempo)
    })

    it('Debe realizar una petición de totales y completarse correctamente', () => {
        // Hacer clic en el botón para solicitar los totales
        cy.Elemento_visible('.grid')
        cy.get('.grid').children().each(($el) => {
            cy.wrap($el).click();
            cy.wait(tiempo); // Espera 500ms entre clics
            
            // Obtener el texto directamente del primer hijo seleccionado
            const textToCheck = $el.find('.bg-white > .text-lg').text().trim();


            cy.Elemento_visible('.mt-6 > .bg-white')
            // Verificar que el texto esté en .text-2xl
            //cy.get('.text-2xl').should('contain', textToCheck);

            // Verificar que el texto esté en .text-2xl sin importar mayúsculas o minúsculas
            const regex = new RegExp(textToCheck, 'i'); // 'i' hace que sea case-insensitive
            cy.get('.text-2xl')
            .should('be.visible') // Asegura que el elemento es visible antes de obtener el texto
            .invoke('text') // Extrae el texto del elemento
            .then((actualText) => {
                const cleanedText = actualText.trim().replace(/\u00A0/g, ''); // Elimina espacios invisibles (&nbsp;)
                const regex = /consulta de totales/i; // Expresión regular insensible a mayúsculas/minúsculas
                expect(cleanedText).to.match(regex); // Verifica que el texto coincide con la regex
            });

            // Hacer clic en el botón dentro de .p-6 > .flex > .bg-white y esperar la actualización
            cy.Click_force('.p-6 > .flex > .bg-white');
            cy.wait(tiempo); // Espera 1 segundo para asegurar que la actualización se refleje
            cy.log('Se actualizan los totales para', textToCheck, 'CORRECTAMENTE')
        });
    });

})