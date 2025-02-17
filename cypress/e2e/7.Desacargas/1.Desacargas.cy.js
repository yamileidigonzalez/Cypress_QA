describe('Descargas', () => {
    beforeEach(() => {
        cy.visit('URL_DEL_SISTEMA');
    });

    //Comprobar la exportación a Excel
    it('Comprobar la exportación a Excel', () => {
        cy.get('#id_boton_exportar').click();
        cy.wait(5000);
            
        // Verificación de la descarga (requiere configuración adicional en Cypress para acceder a archivos)
        const downloadFolder = 'cypress/downloads';
        cy.task('readDirectory', downloadFolder).then((files) => {
            expect(files.some(file => file.includes('reporte'))).to.be.true;
        });
    });
    
});


