/// <reference types="cypress" />

describe('a bunch of tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('clicking button reverses text', () => {
        cy.get('button').click();
        cy.get('input').should('have.value', 'lkjihgfedcba');
    });

});

