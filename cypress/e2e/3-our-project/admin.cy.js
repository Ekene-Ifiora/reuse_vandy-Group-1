describe('admin tests', () => {
  it('passes', () => {
    cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Access Admin', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('jo');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.users > .nav-icons').click();
    cy.wait(2000);
    cy.get(':nth-child(2) > .css-hipoo1').click();
    /* ==== End Cypress Studio ==== */
  });
});