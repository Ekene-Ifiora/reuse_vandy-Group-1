describe('log out tests', () => {
  it('passes', () => {
    cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Logout works', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('m');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.search-input').click();
    cy.get('.chakra-icon').click();
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('s');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('s');
    cy.get('.sc-dmyCSP > .sc-hLQSwg').click();
    /* ==== End Cypress Studio ==== */
  });
});