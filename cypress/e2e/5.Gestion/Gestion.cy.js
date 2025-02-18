
describe('GESTION', () => {
    
    const tiempo = 1000;
    beforeEach('Entrar en la página', () => {
        //PAGINA
        cy.visit('https://newfront.lab.solverpay.com/login'); 
        cy.title().should('eq','Login')
        //LOGIN
        cy.login('solverpay', 'r7auF23wA.A2l1tZ2Dp4')
        cy.wait(tiempo)
        
        //Seleccionar Mantenimientos en el Menu
        cy.get('[data-target="submenu-management"]').should("be.visible").click()
        //Seleccionar en el Submenu
        cy.get('#submenu-management > :nth-child(4)')
        .scrollIntoView()  // Desplaza el elemento a la vista
        .should('be.visible')  // Verifica que el elemento es visible
        .click();  // Luego realiza el clic 
    }) 
    //Operativa-offline
    it('Activar Bin', () => { 
        //Añadir BIN
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').type('2222222222222').clear()
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').type('3')
        //boton Activar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Activar Ciers', () => {       
        //Añadir Ciers 1
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').clear()
        cy.get('#offline_backup_force_config_offlineCiers').should('be.visible').select('1').should('have.value','1')
        cy.get('#offline_backup_force_config_offlineCiers').should('be.visible').select('12 - Unicaja').should('have.value','12')
        //boton Activar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir Ciers 2
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').clear()
        cy.get('#offline_backup_force_config_offlineCiers').should('be.visible').select('1').should('have.value','1')
        cy.get('#offline_backup_force_config_offlineCiers').should('be.visible').select('44 - Ciers 44').should('have.value','44')
        //boton Activar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Activar Adquiriente', () => {
        //Añadir adquiriente
        cy.get('#offline_backup_force_config_offlineAcquirer').should('be.visible').select('A01').should('have.value','A01')
        cy.get('#offline_backup_force_config_offlineAcquirer').should('be.visible').select('A77').should('have.value','A77')
        cy.get('#offline_backup_force_config_offlineAcquirer').should('be.visible').select('S09').should('have.value','S09')
        //boton activar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Activar Emisor', () => {
        //Añadir Emisor
        //cy.get('#offline_backup_force_config_offlineIssuer-ts-control').should('be.visible').select('0007').should('have.value','0007')
        //cy.get('.ts-control').should('be.visible').select('0010').should('have.value','0010')
        //cy.get('.ts-control').should('be.visible').select('0090').should('have.value','0090')

    })

    it('Activar Token Movil', () => { 
        //Añadir Token movil P1
        cy.get('#offline_backup_force_config_tokenCard').should('be.visible').select('1').should('have.value','1')
        //boton activar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir Token movil P2
        cy.get('#offline_backup_force_config_tokenCard').should('be.visible').select('2').should('have.value','2')
        //boton activar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir Token movil P3
        cy.get('#offline_backup_force_config_tokenCard').should('be.visible').select('3').should('have.value','3')
        //boton activar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Desctivar Bin', () => {
        //Añadir BIN
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').type('222').clear()
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').type('3')
        //boton desactivar
        //cy.get('#offline-controls > .card-body').click(30,30)
        //cy.get('#offlineDeactivate').should('be.visible').click().wait(3000)
        //cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Desctivar Ciers', () => {
        
        //Añadir Ciers 1
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').clear()
        cy.get('#offline_backup_force_config_offlineCiers').should('be.visible').select('44 - Ciers 44').should('have.value','44')
        //boton desactivar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        
        //Añadir Ciers 2
        cy.get('#offline_backup_force_config_offlineBin').should('be.visible').clear()
        cy.get('#offline_backup_force_config_offlineCiers').should('be.visible').select('12 - Unicaja').should('have.value','12')
        //boton desactivar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Desctivar Adquiriente', () => {
        
        //Añadir adquiriente
        cy.get('#offline_backup_force_config_offlineAcquirer').should('be.visible').select('A01').should('have.value','A01')
        cy.get('#offline_backup_force_config_offlineAcquirer').should('be.visible').select('A77').should('have.value','A77')
        cy.get('#offline_backup_force_config_offlineAcquirer').should('be.visible').select('S09').should('have.value','S09')
        //boton desactivar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineDeactivate').should('be.visible').click().wait(2000)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Desctivar Emisor', () => {
        
        //Añadir Emisor
        //cy.get('#offline_backup_force_config_offlineIssuer-ts-control').should('be.visible').select('0007').should('have.value','0007')
        //cy.get('.ts-control').should('be.visible').select('0010').should('have.value','0010')
        //cy.get('.ts-control').should('be.visible').select('0090').should('have.value','0090')
    })

    it('Desctivar Token movil', () => {       
        //Añadir Token movil P1
        cy.get('#offline_backup_force_config_tokenCard').should('be.visible').select('1').should('have.value','1')
        //boton desactivar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir Token movil P2
        cy.get('#offline_backup_force_config_tokenCard').should('be.visible').select('2').should('have.value','2')
        //boton desactivar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir Token movil P3
        cy.get('#offline_backup_force_config_tokenCard').should('be.visible').select('3').should('have.value','3')
        //boton desactivar
        cy.get('#offline-controls > .card-body').click(30,30)
        cy.get('#offlineDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
   
    })

    //Operativa-backup
    it('Activar adquirinete', () => {
        //Añadir adquiriente P1
        cy.get('#offline_backup_force_config_backupAcquirer').should('be.visible').select('A77').should('have.value','A77')
        //boton activar
        cy.get('#backup-controls > .card-body').click(30,30)
        cy.get('#backupActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir adquiriente P2
        cy.get('#offline_backup_force_config_backupAcquirer').should('be.visible').select('A01').should('have.value','A01')
        //boton activar
        cy.get('#backup-controls > .card-body').click(30,30)
        cy.get('#backupActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir adquiriente P3
        cy.get('#offline_backup_force_config_backupAcquirer').should('be.visible').select('S09').should('have.value','S09')
        //boton activar
        cy.get('#backup-controls > .card-body').click(30,30)
        cy.get('#backupActivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
    })

    it('Desactivar adquirinete', () => {
        //Añadir adquiriente P4
        cy.get('#offline_backup_force_config_backupAcquirer').should('be.visible').select('A77').should('have.value','A77')
        //boton desactivar
        cy.get('#backup-controls > .card-body').click(30,30)
        cy.get('#backupDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir adquiriente P5
        cy.get('#offline_backup_force_config_backupAcquirer').should('be.visible').select('S09').should('have.value','S09')
        //boton desactivar
        cy.get('#backup-controls > .card-body').click(30,30)
        cy.get('#backupDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
        //Añadir adquiriente P6
        cy.get('#offline_backup_force_config_backupAcquirer').should('be.visible').select('A01').should('have.value','A01')
        //boton desactivar
        cy.get('#backup-controls > .card-body').click(30,30)
        cy.get('#backupDeactivate').should('be.visible').click().wait(tiempo)
        cy.get('#off-backup-modal > .modal-dialog > .modal-content > .modal-footer > .btn').click()
               
    })

    it('ver-estado-offline', () => {
        //ver estado offline
        cy.get('#offlineReload').should("be.visible").click().wait(tiempo)
           
    })
    
    it('ver-estado-backup', () => {
        //ver estado backup
        cy.get('#backupReload').should('be.visible').click().wait(tiempo)
               
    })

    it('Activar offline - Se activa y muestra correctamente', () => {
        cy.visit('/ruta-del-sistema'); // Cambia esto con la URL correcta
    
        cy.get('#btnActivarOffline').click(); // Botón para activar offline
    
        cy.wait(tiempoEspera);
    
        cy.get('.mensajeExito').should('be.visible'); // Verifica mensaje de éxito
        cy.get('.mensajeExito').should('contain', 'Modo offline activado'); // Valida mensaje
        cy.get('.estadoOffline').should('contain', 'Activo'); // Verifica que el estado cambió
    });
    
    it('Desactivar offline - Se desactiva y muestra correctamente', () => {
        cy.visit('/ruta-del-sistema');
    
        cy.get('#btnDesactivarOffline').click(); // Botón para desactivar offline
    
        cy.wait(tiempoEspera);
    
        cy.get('.mensajeExito').should('be.visible');
        cy.get('.mensajeExito').should('contain', 'Modo offline desactivado');
        cy.get('.estadoOffline').should('contain', 'Inactivo');
    });
    
    it('Activar backup - Se activa y muestra correctamente', () => {
        cy.visit('/ruta-del-sistema');
    
        cy.get('#btnActivarBackup').click(); // Botón para activar backup
    
        cy.wait(tiempoEspera);
    
        cy.get('.mensajeExito').should('be.visible');
        cy.get('.mensajeExito').should('contain', 'Backup activado correctamente');
        cy.get('.estadoBackup').should('contain', 'Activo');
    });
    
    it('Desactivar backup - Se desactiva y muestra correctamente', () => {
        cy.visit('/ruta-del-sistema');
    
        cy.get('#btnDesactivarBackup').click(); // Botón para desactivar backup
    
        cy.wait(tiempoEspera);
    
        cy.get('.mensajeExito').should('be.visible');
        cy.get('.mensajeExito').should('contain', 'Backup desactivado correctamente');
        cy.get('.estadoBackup').should('contain', 'Inactivo');
    });

})