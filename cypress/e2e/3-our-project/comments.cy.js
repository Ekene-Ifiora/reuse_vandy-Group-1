describe('comments tests', () => {
  it('passes', () => {
    cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Comment', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravo');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('johntravol');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.sb-avatar__image').click();
    cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
    cy.get('.chakra-input').clear('he');
    cy.get('.chakra-input').type('here');
    cy.get('.chakra-input').click();
    cy.get('.chakra-input__right-element > .chakra-button').click();
    cy.get('.chakra-icon > path').click();
    /* ==== End Cypress Studio ==== */
  });
});