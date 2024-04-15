describe('cart tests', () => {
  it('passes', () => {
    cy.visit('/');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Access Cart', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.cart > .nav-icons').click();
    /* ==== End Cypress Studio ==== */
  });


  /* ==== Test Created with Cypress Studio ==== */
  it('Add and Remove', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get(':nth-child(1) > .card_header > .btn').click();
    cy.get(':nth-child(4) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-1 > .css-njbp03 > #toast-1-title').click();
    cy.get('.chakra-modal__close-btn > .chakra-icon > path').click();
    cy.get('.cart > .nav-icons').click();
    cy.wait(2000);
    cy.get(':nth-child(3) > .css-1eaoaix').click();
    cy.get(':nth-child(4) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-2 > .css-njbp03 > #toast-2-title').click();
    cy.get(':nth-child(4) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-2 > .css-1pq15d > .chakra-icon > path').click();
    cy.get(':nth-child(2) > .css-hipoo1').click();
    /* ==== End Cypress Studio ==== */
  });
});