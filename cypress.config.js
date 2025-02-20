const { defineConfig } = require("cypress");
const fs = require('fs'); // Importa el módulo fs de Node.js

module.exports = defineConfig({
  projectId: "v6qofi",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        readDirectory(folderPath) {
          return new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
              if (err) {
                return reject(err);
              }
              resolve(files);
            });
          });
        }
      });
    },
    downloadsFolder: 'cypress/downloads' // Define la carpeta de descargas
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
