describe('auction tests', () => {
  it('passes', () => {
    cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Bid', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('jo');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get(':nth-child(4) > .card_img > .img').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(2)').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .chakra-stack > .chakra-button').click();
    cy.wait(2000);
    cy.get('.home > .nav-icons').click();
    cy.wait(2000);
    cy.get(':nth-child(4) > .card_img > .img').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(1)').click();
    cy.get('.css-1xt0hpo').clear('0');
    cy.get('.css-1xt0hpo').type('0');
    cy.get('.css-f2hjvb').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(1)').click();
    cy.get('.css-1xt0hpo').clear('0');
    cy.get('.css-1xt0hpo').type('0');
    cy.get('.css-wubf5g').click();
    cy.get(':nth-child(4) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-1 > .css-njbp03 > #toast-1-title').click();
    cy.get(':nth-child(4) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-1 > .css-1pq15d > .chakra-icon').click();
    /* ==== End Cypress Studio ==== */
  });
});