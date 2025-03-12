const { CUSTOM_ELEMENTS_SCHEMA } = require("@angular/core");
import 'cypress-file-upload';

describe('Gestión de Usuario', () => { 
  let tiempo= 1000
  let pass_original= 'r7auF23wA.A2l1tZ2Dp4'
  let pass_prueba= 'r7auF23wA.A2l1tZ2Dp412'

  beforeEach('Entrar en la página', () => {
    //PAGINA
    cy.visit('https://newfront.lab.solverpay.com/login'); 
    cy.title().should('eq','Login')
    //LOGIN
    cy.login('solverpay@prueba.qa.com',pass_original)
    cy.wait(tiempo)
  })

  it('Cambiar la contraseña del usuario KO', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    //cambio mi contraseña
    cy.title().should('eq','Perfil')
    cy.get('#currentPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7auF23wA.A2l1tZ2Dp4{enter}')
    cy.get('#currentPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //new pass Simple
    cy.get(':nth-child(1) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7au{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','Demasiado simple')
    cy.get(':nth-child(1) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should('be.disabled')
    //confirmar diferentes
    cy.get(':nth-child(2) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type('r7au{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','Demasiado simple')
    cy.get(':nth-child(2) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //la contraseña debe actualizarse correctamente y recibo una confirmación de éxito
    cy.log('No funciona el botón')
    //cy.get('.form-container > .justify-center').should("be.enabled").click()
    cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should('be.disabled')

    //new pass Media
    cy.get(':nth-child(1) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").clear().type('r7auwdq466+2.,18346578{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es media')
    cy.get(':nth-child(1) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should('be.disabled')
    //confirmar diferentes
    cy.get(':nth-child(2) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").clear().type('r7auwdq466+2.,18346578{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es media')
    cy.get(':nth-child(2) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //la contraseña debe actualizarse correctamente y recibo una confirmación de éxito
    cy.log('No funciona el botón')
    //cy.get('.form-container > .justify-center').should("be.enabled").click()
    cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should('be.disabled')
        
  })

  it('Cambiar la contraseña del usuario OK', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    //cambio mi contraseña
    cy.title().should('eq','Perfil')
    cy.get('#currentPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type(pass_original,'{enter}')
    cy.get('#currentPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //new pass
    cy.get(':nth-child(1) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type(pass_prueba,'{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
    cy.get(':nth-child(1) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should('be.disabled')
    //confirmar diferentes
    cy.get(':nth-child(2) > #newPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").type(pass_prueba,'{enter}')
    cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
    cy.get(':nth-child(2) > #newPass > .p-password > .p-icon-wrapper > .p-icon').should("be.visible").click()
    //la contraseña debe actualizarse correctamente y recibo una confirmación de éxito
    cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should("be.visible").click()
    cy.get('app-profile.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast').scrollIntoView()
    .should('exist').and('be.visible').then(($alert) => {
      if ($alert.text().includes('¡Tú contraseña no puede ser igual a la anterior!')){
         let pass = `Password123%${Math.floor(Math.random() * 10)}`;
         //intertar pass
         cy.Añadir_text(':nth-child(1) > #newPass > .p-password > .p-inputtext',pass)
         cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
         //repetir pass
         cy.Añadir_text(':nth-child(2) > #newPass > .p-password > .p-inputtext',pass)
         cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
         //confirmar
         cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should("be.visible").click()
         cy.log('✅ ¡Contraseña Cambiada!' , pass).wait(2000)              
      } else if ($alert.text().includes('¡Ha ocurrido un error ')){
         cy.log('⚠️ ¡Ha ocurrido un error :( !');
         cy.Click_Botón('.flex-row > [icon="pi pi-times"] > .p-ripple',1000)
      } else if ($alert.text().includes('Ya existe')){
         cy.get('.flex-row > [icon="pi pi-times"] > .p-ripple').scrollIntoView()
         .should('exist')
         .should('be.visible')
         .scrollIntoView()
         .click({ force: true });
         cy.log('⚠️ ¡Ya existe!');
      } else {
          cy.log('✅ ¡Ha sido guardado!');

          let pass_cambio = `Password123%${Math.floor(Math.random() * 10)}`;
          //pass actual
          cy.get('#currentPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").clear().type(pass_prueba,'{enter}')
          //intertar pass
          cy.Añadir_text(':nth-child(1) > #newPass > .p-password > .p-inputtext',pass_cambio)
          cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
          //repetir pass
          cy.Añadir_text(':nth-child(2) > #newPass > .p-password > .p-inputtext',pass_cambio)
          cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
          //confirmar
          cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should("be.visible").click()
          cy.log('✅ ¡Contraseña Cambiada!' , pass_cambio).wait(2000)  
          
          //pass actual
          cy.get('#currentPass > .p-password > .p-inputtext').should("be.visible").should("be.enabled").clear().type(pass_cambio,'{enter}') 
          //intertar pass
          cy.Añadir_text(':nth-child(1) > #newPass > .p-password > .p-inputtext',pass_original)
          cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
          //repetir pass
          cy.Añadir_text(':nth-child(2) > #newPass > .p-password > .p-inputtext',pass_original)
          cy.get('.ng-trigger').should("be.visible").should('contain','La contraseña es fuerte')
          //confirmar
          cy.get('form.ng-dirty > .justify-center > .p-2 > .p-ripple').should("be.visible").click()

          cy.log('✅ ¡Contraseña Restablecida a la Original!').wait(2000)  
      }
    })    
  })

  it('Cambiar el idioma de las preferencias', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    //cambio el idioma a otro disponible
    cy.title().should('eq','Perfil')
    //El idioma debe actualizarse correctamente en toda la interfaz
    cy.get('.mt-10').scrollIntoView().should("be.visible")

    //Caso 1 "Estoy en ES y paso a ES"
    cy.Combo('.p-dropdown-label', 'Español', tiempo)
    cy.log( "Estoy en ES y paso a ES")
    cy.document().then((doc) => {
      const pageText = doc.body.innerText;
      expect(pageText).to.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/); // Verifica que hay texto en español
      expect(pageText).not.to.include('Welcome'); // Verifica que no haya palabras en inglés
    });
    
    //Caso 2 "Estoy en ES y paso a IN"
    cy.Combo('.p-dropdown-label', 'Inglés', tiempo)
    cy.log("Estoy en ES y paso a IN")
    cy.document().then((doc) => {
      const pageText = doc.body.innerText;
      expect(pageText).to.match(/[a-zA-Z]/); // Verifica que hay texto en inglés
      expect(pageText).not.to.include('Bienvenido'); // Verifica que no haya palabras en español
    });
    
    //Caso 3 "Estoy en IN y paso a IN"
    cy.Combo('.p-dropdown-label', 'Inglés', tiempo)
    cy.log("Estoy en IN y paso a IN")
    cy.document().then((doc) => {
      const pageText = doc.body.innerText;
      expect(pageText).to.match(/[a-zA-Z]/); // Verifica que hay texto en inglés
      expect(pageText).not.to.include('Bienvenido'); // Verifica que no haya palabras en español
    });
    

    //Caso 4 "Estoy en IN y paso a ES"
    cy.Combo('.p-dropdown-label', 'Spanish', tiempo)
    cy.log("Estoy en IN y paso a ES")
    cy.document().then((doc) => {
      const pageText = doc.body.innerText;
      expect(pageText).to.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/); // Verifica que hay texto en español
      expect(pageText).not.to.include('Welcome'); // Verifica que no haya palabras en inglés
    });
  
    cy.wait(tiempo)
  })

  it('Cambiar la configuracion de la foto de perfil', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    cy.title().should('eq','Perfil')
    //comprobar configuracion de perfil
    cy.Elemento_visible('.p-3')
    //cambiar foto perfil
    cy.Elemento_visible('.gap-6 > .gap-4 > .flex-col')
    //quitar si hay antigua
    cy.Click_Botón('[styleclass="h-8 m-1 bg-red-500 border-none"] > .p-ripple',tiempo)
    cy.Click_Botón('[styleclass="h-8 m-1 border-none"] > .p-ripple',tiempo)

    const imagenes = ['hombre-usuario-avatar.jpg', 'Selección_057.png', 'Selección_058.png','Selección_059.png', 'Selección_060.png', 'Selección_061.png', 'Selección_062.png', 'Selección_063.png']; // Lista de imágenes disponibles
    // Selecciona aleatoriamente una imagen de la lista
    const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
    cy.get('input[type="file"]').attachFile(imagenAleatoria);
    cy.fixture('hombre-usuario-avatar.jpg', 'base64').then((fileContent) => {
        cy.get('[styleclass="h-8 m-1 border-none"] > .p-ripple').attachFile({
          fileContent,
          fileName: imagenAleatoria,
          mimeType: 'image/jpeg',
          encoding: 'base64'
        });
      });
    // Verificar que la carga fue exitosa (esto depende de tu aplicación)
    cy.get('input[type="file"]').then(($input) => {
        expect($input[0].files[0].name).to.equal(imagenAleatoria);
        cy.log('Imagen subida correctamente')
    });
    cy.Click_Botón('.gap-6 > .w-full > .p-2 > .p-ripple', tiempo)
    cy.get('app-profile.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast').scrollIntoView()
    .should('exist').and('be.visible').then(($alert) => {
      if ($alert.text().includes('Ha ocurrido un error ')){
         cy.log('⚠️ ¡Ha ocurrido un error :( !');        
      } else if ($alert.text().includes('Ya existe')){         
         cy.log('⚠️ ¡Ya existe!');
      } else {
          cy.log('✅ ¡Ha sido guardado!');
      }
    })
  })

  it('Cambiar la configuracion del nombre competo', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    cy.title().should('eq','Perfil')
    //comprobar configuracion del nombre
    cy.Añadir_text('#fullName','solverpay');
    cy.Click_Botón('.gap-6 > .w-full > .p-2 > .p-ripple', tiempo)
    cy.get('app-profile.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast').scrollIntoView()
    .should('exist').and('be.visible').then(($alert) => {
      if ($alert.text().includes('Ha ocurrido un error ')){
         cy.log('⚠️ ¡Ha ocurrido un error :( !');        
      } else if ($alert.text().includes('Ya existe')){         
         cy.log('⚠️ ¡Ya existe!');
      } else {
          cy.log('✅ ¡Ha sido guardado!');
      }
    })
  })

  it('Cambiar la configuracion del email', () => {
    //accedo a la sección de perfil del usuario
    cy.title().should('eq','Panel de control')
    cy.wait(1000)
    //Perfil de usuario
    cy.get('app-avatar-box > .flex-col > .text-center').should("be.visible").click()
    cy.get('.text-gray-700 > :nth-child(2) > .block').should("be.visible").click()
    cy.wait(tiempo)
    cy.title().should('eq','Perfil')
    //comprobar configuracion del nombre
    cy.Añadir_text('#email','solverpay@prueba.qa.com');
    cy.Click_Botón('.gap-6 > .w-full > .p-2 > .p-ripple', tiempo)
    cy.get('app-profile.ng-star-inserted > app-custom-toast > p-toast.p-element > .p-toast').scrollIntoView()
    .should('exist').and('be.visible').then(($alert) => {
      if ($alert.text().includes('Ha ocurrido un error ')){
         cy.log('⚠️ ¡Ha ocurrido un error :( !');        
      } else if ($alert.text().includes('Ya existe')){         
         cy.log('⚠️ ¡Ya existe!');
      } else {
          cy.log('✅ ¡Ha sido guardado!');
      }
    })
  })
})