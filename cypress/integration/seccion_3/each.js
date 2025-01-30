/// <reference types="Cypress" />

//https://github.com/4teamwork/cypress-drag-drop
import 'cypress-file-upload';
require('@4tw/cypress-drag-drop')

require('cypress-xpath')
require('cypress-plugin-tab')


describe("Bucles For y each", () =>{

   
    it("For uno", () =>{
       
        for(let i=1; i<=100; i=i+10){
            cy.log("Numero: " + i)
        }

    })


    it("For dos", () =>{
       
        for(let i=1; i<=10; i++){
            let t=5
            cy.log(t + " X " + i + "=" + t*i)
        }

    })

    

    it("Each uno", () =>{
        cy.visit("http://automationpractice.com/index.php") 
        cy.title().should('eq','My Store')
        cy.wait(1000)

        cy.get(".product-name").each(($el,index,$list)=>{
            

           // cy.log($el.text())
            let vestido=$el.text()
            cy.log(vestido)

        })

    })


    it("Each dos", () =>{
        cy.visit("http://automationpractice.com/index.php") 
        cy.title().should('eq','My Store')
        cy.wait(2000)

        cy.get(".product-name").each(($el,index,$list)=>{
            

           // cy.log($el.text())
            let vestido=$el.text()
            if(vestido.includes("Printed Summer Dress")){
                cy.wrap($el).click()
            }

        })

    })



    it.only("Each tres", () =>{
        cy.visit("http://automationpractice.com/index.php") 
        cy.title().should('eq','My Store')
        let t=200
        cy.wait(t)
        const datos=[];

        cy.get("#center_column .product-name").each(($el,index,$list)=>{
            datos[index]=$el.text()
        }).then(()=>{
            
            for(let x=0; x<=datos.length; x++){
                cy.get("#center_column .product-name").eq(x).click({force:true})
                cy.wait(t)
                cy.get("#quantity_wanted").should("be.visible").clear().type("4")
                cy.wait(t)
                cy.get("#group_1").select("M").should("have.value","2")
                cy.wait(t)
                cy.get(".exclusive > span").should("be.visible").click({force:true})
                cy.wait(t)
                cy.xpath("//span[contains(.,'Proceed to checkout')]").click({force:true})
                cy.wait(t)
                cy.get(".icon-home").should("be.visible").click({force:true})
            }

        })
       

    })


    


});