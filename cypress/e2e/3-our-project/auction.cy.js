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
    cy.get(':nth-child(1) > .card_img > .img').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(2)').click();
    cy.get('#chakra-modal-\\:r1h\\: > .chakra-modal__close-btn > .chakra-icon').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(1)').click();
    cy.get('.css-f2hjvb').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(1)').click();
    cy.get('#field-\\:r21\\:').clear('0');
    cy.get('#field-\\:r21\\:').type('0');
    cy.get('.css-wubf5g').click();
    cy.get(':nth-child(4) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-1 > .css-njbp03').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(1)').click();
    cy.get('#field-\\:r2f\\:').clear('0');
    cy.get('#field-\\:r2f\\:').type('0');
    cy.get('.css-wubf5g').click();
    cy.get('.css-ldoqu4 > .chakra-stack > :nth-child(2)').click();
    cy.get('#chakra-modal--body-\\:r1h\\: > .css-o51fhk > :nth-child(3) > .chakra-stack > .chakra-button').click();
    /* ==== End Cypress Studio ==== */
  });
});