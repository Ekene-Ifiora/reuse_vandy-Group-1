describe('product tests', () => {
  it('passes', () => {
    cy.visit('/');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Access Product', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('m');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.wait(2000);
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .card_img > .img').click();
    cy.get('.css-1g05jab > .css-jucvzs').click();
    cy.get('.css-15py4l6 > .chakra-button').click();
    cy.wait(2000);
    cy.get('.home > .nav-icons').click();
    cy.wait(2000);
    cy.get(':nth-child(2) > .card_img > .img').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.chakra-icon').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Edit Post', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('jo');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.sb-avatar__image').click();
    cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
    cy.get('.css-6ev086 > svg').click();
    cy.get('.css-6ev086 > .chakra-button').click();
    cy.get('#field-\\:r29\\:').clear('4');
    cy.get('#field-\\:r29\\:').type('40');
    cy.get('.css-1bdxafm').click();
    cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
    cy.get('.css-6ev086 > .chakra-button').click();
    cy.get('.css-1jif775 > .chakra-button').click();
    cy.get('.css-1bdxafm').click();
    /* ==== End Cypress Studio ==== */
  });
});