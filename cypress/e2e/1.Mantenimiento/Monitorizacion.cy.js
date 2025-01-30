describe('Mantenimiento', () => {
    //const t = 2000;
    beforeEach('MONITORIZACION', () => {
        //PAGINA
        cy.visit('https://192.168.126.101/login'); //cy.title().should('eq','Inicio de sesión')
    
        //LOGIN
        cy.get(':nth-child(1) > .form-control').should("be.visible").should("be.enabled").type('solverpay')
        cy.get('.d-flex > .form-control').should("be.visible").should("be.enabled").type('password{enter}') 

    })
    //Acciones de alarmas
    it.only('Anadir - Acciones de alarmas', () => {

        cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click();
        cy.get(':nth-child(5) > [style="cursor:default"]').should('be.visible'); 
        cy.get('ul#general-submenu').invoke('show').contains('Acciones de alarmas').click()
        /*
        //boton anadir P1
        cy.get('#add_data').should("be.visible").click()
        cy.wait(2000)
        //datos principales
        cy.get('#alarm_action_idAlarm').should("be.visible").type('1212')
        cy.get('#alarm_action_action').should("be.visible").type('1212')        
        cy.get('#alarm_action_recipients').should("be.visible").type('1212}')
        //boton volver
        cy.get('.mt-3 > :nth-child(2) > .btn').should("be.visible").click()
        */
        
        //boton anadir P2
        cy.get('#add_data').should("be.visible").click()
        cy.wait(2000)
        //datos principales
        cy.get('#alarm_action_idAlarm').should("be.visible").type('2323')
        cy.get('#alarm_action_action').should("be.visible").type('2323')        
        cy.get('#alarm_action_recipients').should("be.visible").type('2323')
        //boton volver
        cy.get(':nth-child(1) > .btn').should("be.visible").click()
        cy.wait(2000)
        //boton no confirmar
        cy.get('[data-bs-dismiss="modal"]').should("be.visible").click()
        cy.wait(2000)
         
        /*
        //boton anadir P3
        cy.get('#add_data').should("be.visible").click()
        cy.wait(2000)
        //datos principales
        cy.get('#alarm_action_idAlarm').should("be.visible").type('3434')
        cy.get('#alarm_action_action').should("be.visible").type('3434')        
        cy.get('#alarm_action_recipients').should("be.visible").type('3434')
        //boton volver
        cy.get(':nth-child(1) > .btn').should("be.visible").click()
        //boton confirmar
        */
               

    })
    //Config. de alarmas
    it('Config. de alarmas', () => {
        
        cy.get('div[role="button"][id="navbarDropdown"]').contains('Mantenimientos').click();
        cy.get(':nth-child(5) > [style="cursor:default"]').should('be.visible'); 
        cy.get('ul#general-submenu').invoke('show').contains('Config. de alarmas').click()


    })
})