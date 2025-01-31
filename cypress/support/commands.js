// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("Texto_visible", (selector,texto,t) => { 
    let tiempo=t
    cy.get(selector).should('be.visible').type(texto)
    cy.wait(tiempo)
 })

 Cypress.Commands.add("Click", (selector,t) => { 
    let tiempo=t
    cy.get(selector).should('be.visible').click()
    cy.wait(tiempo)
 })

 Cypress.Commands.add("Click_force", (selector,t) => { 
    let tiempo=t
    cy.get(selector).should('be.visible').click({force:true})
    cy.wait(tiempo)
 })

 Cypress.Commands.add("Validar_campo", (selector,men,nombre_campo,t) => { 
   cy.xpath(selector).should("be.visible").then((val)=>{
      let dato=val.text()
      cy.log("el valor del log es: " + dato)
      let mensaje=men
      cy.log(dato)
      expect(dato).to.equal(mensaje)
      if(dato==mensaje){
        cy.log("########################")
        cy.log("El "+ nombre_campo  +" no es valido")
        cy.log("########################")

      }
    })
})

Cypress.Commands.add("Validar_campo2", (selector,men,nombre_campo,t) => { 
   cy.xpath(selector).should("be.visible").should("contain",men).then((val)=>{           
   cy.log("########################")
   cy.log("El "+ nombre_campo  +" no es valido")
   cy.log("########################")      
    })
})

Cypress.Commands.add("Añadir_Canales_entidad", (selector,entidad,canal,t_desconexion_,n_transacciones_simu, host_1,puerto_1, host_2,puerto_2,host_3,puerto_3) => { 
   cy.get(selector).should("be.visible").should("contain",men).then((val)=>{           
   cy.log("########################")
   cy.log("El "+ nombre_campo  +" no es valido")
   cy.log("########################")      
    })
})
