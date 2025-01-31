/// <reference types="cypress" />

//https://github.com/4teamwork/cypress-drag-drop

import 'cypress-file-upload';
require('@4tw/cypress-drag-drop')

require('cypress-xpath')
require('cypress-plugin-tab')


describe("Elementos de una tabla", () =>{

    it("CHILDREN", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        cy.get(".btn-group").children(".btn-success")
        cy.wait(tiempo)

        cy.get(".btn-group").children(".btn-success").should("contain","Green").click({force:true})
        cy.wait(tiempo)

        cy.get(".btn-group").children(".btn-danger").should("contain","Red").click({force:true})

    
    })


    it("Seleccionar por medio de EQ", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        cy.get("[type='button']").eq(2).should("contain","Orange").click({force:true})
        cy.wait(tiempo)
        cy.get("[type='button']").eq(4).should("contain","All").click({force:true})
    
    })


    it("Seleccionar por medio de Filter", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        cy.get("[type='button']").filter('.btn-warning')

        cy.get("[type='button']").filter('.btn-success')
        cy.wait(tiempo)
        cy.get("[type='button']").filter('.btn-success').click()
        cy.wait(tiempo)
        cy.get("[type='button']").filter('.btn-warning').should("contain","Orange").click()
    
    })


    it("Seleccionar por medio de Find", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        cy.get(".btn-group").find(".btn-danger").should("contain","Red").click()
        cy.wait(tiempo)
        cy.get("[type='button']").contains("Orange").click()
    
    })


    it("Seleccionar por medio de First", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        cy.get(".btn-group").find("button").first().click()
        cy.wait(tiempo)
        //función last para el ultimo
        cy.get(".btn-group").find("button").last().click()
    })


    it("Seleccionar los elementos Siguiente NextAll", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

       cy.get("[type='button']").should("contain","Green")
       cy.wait(tiempo)
       cy.get("[type='button']").should("contain","Green").nextAll().should("have.length", 4)

    })

    it("Seleccionar al elemento padre", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        cy.get("[type='button']").parent().should("have.class", "btn-group")

    })

    it("Reto de las tablas", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        cy.get("[type='button']").eq(1).should("contain","Green").click({force:true})
        cy.wait(tiempo)
        cy.get("[type='checkbox']").check({force:true})

        cy.get("[type='button']").eq(4).should("contain","All").click({force:true})
        cy.wait(tiempo)

        cy.get("[type='checkbox']").check({force:true})
        

    })


    it("Reto de las tablas con for", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        for(let x=1;x<=4;x++){
            cy.get("[type='button']").eq(x).click({force:true})
            cy.wait(tiempo)
            cy.get("[type='checkbox']").check({force:true})
            cy.wait(tiempo)
        }


    })



    it("Reto de las tablas con for y Asserts", ()=>{
        let tiempo =1500
        cy.visit('https://www.seleniumeasy.com/test/table-records-filter-demo.html')       
        cy.title().should('eq','Selenium Easy - Table Data Filter Demo')
        cy.wait(tiempo)

        for(let x=1;x<=4;x++){
            let nombreBoton=""

            if(x==1){
                nombreBoton="Green"
            }
            else if(x==2){
                nombreBoton="Orange"
            }
            else if(x==3){
                nombreBoton="Red"
            }
            else if(x==4){
                nombreBoton="All"
            }

            cy.get("[type='button']").eq(x).should("contain",nombreBoton).click({force:true})
            cy.wait(tiempo)
            cy.get("[type='checkbox']").check({force:true})
            cy.wait(tiempo)
        }


    })


    it("Mostrando los campos", ()=>{
        cy.visit("https://www.seleniumeasy.com/test/table-sort-search-demo.html") 
        cy.title().should('eq','Selenium Easy - Tabel Sort and Search Demo')

        const datos=[]
        
        cy.get(".odd td").each(($el,index,$list)=>{
            datos[index]=$el.text()
        }).then(()=>{
            for(let i=0; i<=datos.length; i++){
                cy.log(datos[i])
            }
        })

    })


    it("Sumando los valores de los campos con la clase .odd", ()=>{
        cy.visit("https://www.seleniumeasy.com/test/table-sort-search-demo.html") 
        cy.title().should('eq','Selenium Easy - Tabel Sort and Search Demo')

        const datos=[]
        let cantidadOdd=0

        
        cy.get("[role='row']  td").each(($el,index,$list)=>{
            datos[index]=$el.text()
        }).then(()=>{
            for(let i=0; i<=datos.length; i++){
                cy.log(datos[i])
                if(Number(datos[i])){
                    cantidadOdd+=Number(datos[i])
                }
            }
            cy.log("La cantidad total es: " + cantidadOdd)
            expect(cantidadOdd).to.eq(394)
        })

    })


    it("Valor de un campo en especifico", ()=>{
        cy.visit("https://www.seleniumeasy.com/test/table-sort-search-demo.html") 
        cy.title().should('eq','Selenium Easy - Tabel Sort and Search Demo')

        const campo=cy.get("tbody > :nth-child(7) > :nth-child(2)")
        //cy.log(campo)
        campo.each(($el,index,$list)=>{
            const dato=$el.text()
            cy.log(dato)

            if(dato.includes("Javascript Developer")){
                campo.eq(index).next().next().then((age)=>{
                    const Edad=age.text()
                    cy.log(Edad)
                    cy.log("La edad de Javascript Developer es: " + Edad)
                    expect(Edad).to.equal('39')
                })
            }

        })
       
    })


    it("Seleccionar multiples checkbox en diferentes páginas.", ()=>{
        cy.visit("https://datatables.net/extensions/select/examples/initialisation/checkbox.html") 
        cy.title().should('eq','DataTables example - Checkbox selection')
        let tiempo=100
        cy.wait(tiempo)

        for(let x=1; x<=6; x++){
            cy.xpath("//a[contains(@data-dt-idx,"+x+")]").should("be.visible").click({force:true})
            cy.wait(tiempo)

            cy.get(".select-checkbox").should("be.visible").click({multiple:true},{force:true})
            cy.wait(tiempo)
        }


    })


   




    


    


    

    
   


});