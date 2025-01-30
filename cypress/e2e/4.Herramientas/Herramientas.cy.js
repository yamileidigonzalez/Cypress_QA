describe('MANTENIMIENTO', () => {
  const t= 1000;
  beforeEach('Mantenimiento', () => {
    //PAGINA
    cy.visit('https://51.178.137.167/login'); //cy.title().should('eq','Inicio de sesión')
   
    //LOGIN
    cy.get(':nth-child(1) > .form-control').should("be.visible").should("be.enabled").type('solverpay')
    cy.get('.d-flex > .form-control').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}') //cy.get('.btn').click()
     
    //MENU HERAMIENTAS
    cy.get(':nth-child(4) > #navbarDropdown').click({force:true}).wait(t)
  
  })

  //Mantenimiento
  it('mantenimiento de procesos', () => { 
      cy.get('.navbar-nav > :nth-child(4) > .dropdown-menu > :nth-child(1) > .dropdown-item').should('be.visible').click().wait(t)
      
      //Relanzar procesos
      cy.get('.btn.btn-outline-dark.aaa.me-4').should('be.visible').click()
      //cancelar
      cy.get('#modal_reload_processes_sure > .modal-dialog > .modal-content > .modal-footer > #close_btn').should('be.visible').click().wait(t)
      cy.get('.btn.btn-outline-dark.aaa.me-4').should('be.visible').click()
      //cerrar
      cy.get('#modal_reload_processes_sure > .modal-dialog > .modal-content > .modal-header > .btn-close').should('be.visible').click().wait(t)
      cy.get('.btn.btn-outline-dark.aaa.me-4').should('be.visible').click()
      //confirmar
      cy.get('#reloadProcess > .btn').should('be.visible').click().wait(t)

      //Estado
      cy.get('#statusProcess').should('be.visible').click().wait(t)
  })

  //Infromacion
  it('informacion del sistema', () => {
      cy.get('.navbar-nav > :nth-child(4) > .dropdown-menu > :nth-child(2) > .dropdown-item').should('be.visible').click().wait(t)

  })

  //Auditoria
  it.only('auditoria', () => {
    cy.get('.navbar-nav > :nth-child(4) > .dropdown-menu > :nth-child(3) > .dropdown-item').should('be.visible').click().wait(t)
    let cant=0
    const datos=[]
    cy.get(".odd td").each(($el,index,$list)=> {
      datos[index]=$el.text()
    }).then(()=> {
      for(let i=0;i<=datos.length;i++){
        cy.log(datos[i])
        cy.log(cant=cant + i)
      }

    })
      
  })
})