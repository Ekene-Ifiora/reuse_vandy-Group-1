describe('product tests', () => {
  it('passes', () => {
    cy.visit('/');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Access Product', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('m');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('marcus.p.kamen@vanderbilt.edu');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get(':nth-child(2) > .card_img > img').click();
    cy.get(':nth-child(3) > .chakra-stack > .chakra-button').click();
    cy.get('#chakra-modal--body-\\:r13\\: > :nth-child(2) > .chakra-button').click();
    cy.get('.css-o51fhk > .chakra-stack > .chakra-button').click();
    cy.get('.chakra-icon > path').click();
    /* ==== End Cypress Studio ==== */
  });
});