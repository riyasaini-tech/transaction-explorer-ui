// ***********************************************
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('visitExplorer', (url) => {
  cy.visit(url);
  cy.log(`🌐 Visited ${url}`);
});

Cypress.Commands.add('verifyHeaderText', (expectedText) => {
  cy.contains('h3.font-h3', expectedText, { timeout: 10000 })
    .scrollIntoView()
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      const cleaned = text.trim();
      cy.log(`✅ Found header: ${cleaned}`);
      expect(cleaned).to.equal(expectedText);
    });
});

Cypress.Commands.add('logMatchingTransactions', () => {
  cy.get('.transaction-box')
    .should('have.length', 25)
    .each(($txn, index) => {
      cy.wrap($txn).within(() => {
        cy.get('.ins-and-outs')
          .find('div')
          .then(($entries) => {
            const inputCount = $entries.filter((i, el) => el.innerText.includes('Inputs')).length;
            const outputCount = $entries.filter((i, el) => el.innerText.includes('Outputs')).length;

            if (inputCount === 1 && outputCount === 2) {
              cy.get('.header')
                .invoke('text')
                .then((hash) => {
                  cy.task('logToTerminal', `💡 Txn ${index + 1}: ${hash.trim()} (1 input / 2 outputs)`);
                });
            }
          });
      });
    });
});