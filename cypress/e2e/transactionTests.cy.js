/// <reference types="cypress" />

import testData from '../fixtures/testData.json';

describe('Transaction Explorer Tests', () => {
  const { url, expectedText } = testData;

  beforeEach(() => {
    cy.visitExplorer(url);
  });

  it('verifies transaction header count', () => {
    cy.verifyHeaderText(expectedText);
  });

  it('logs hashes with 1 input and 2 outputs', () => {
    cy.logMatchingTransactions();
  });
});