const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '9ms9vr',
  env: {
  url: "https://rahulshettyacademy.com"
  },
// set how much failed tests should rerun
  retries: {
    runMode: 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/examples/*.js'
  },
});
