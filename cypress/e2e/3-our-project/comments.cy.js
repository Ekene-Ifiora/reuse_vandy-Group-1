describe('comments tests', () => {
  it('passes', () => {
    cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Edit Buy Now', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('jo');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.profile-container > .nav-icons').click();
    cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
    cy.get('.css-6ev086 > .chakra-button').click();
    cy.get('.css-1agxkw4').click();
    cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
    cy.get('.css-6ev086 > .chakra-button').click();
    cy.get('#field-\\:r2t\\:').clear('4');
    cy.get('#field-\\:r2t\\:').type('40');
    cy.get('.css-1bdxafm').click();
    cy.get(':nth-child(8) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-1 > .css-njbp03 > #toast-1-description').click();
    cy.get(':nth-child(8) > #chakra-toast-manager-bottom > .chakra-toast > .chakra-toast__inner > #toast-1 > .css-1pq15d > .chakra-icon').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Edit Profile Picture', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.profile-container > .nav-icons').click();
    cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
    cy.get('.css-6ev086 > .chakra-button').click();
    cy.get('.css-1cjy4zv').attachFile('post.png');
    cy.get('.css-1jif775 > .chakra-button').click();
    cy.get('#field-\\:r3b\\:').clear('G');
    cy.get('#field-\\:r3b\\:').type('Good');
    cy.get('.css-1bdxafm').click();
    /* ==== End Cypress Studio ==== */
  });
});