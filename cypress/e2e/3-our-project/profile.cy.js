describe('profile tests', () => {
  it('passes', () => {
    cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Access Profile', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.profile-container > .nav-icons').click();
    cy.wait(2000);
    cy.get('.chakra-stack').click();
    cy.get('.css-mpjpv5 > .css-bk9fzy > svg').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Edit Profile Text', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.profile-container > .nav-icons').click();
    cy.get('.chakra-button').click();
    cy.get('[placeholder="Full Name"]').type('1');
    cy.get('[placeholder="Username"]').type('1');
    cy.get('[placeholder="Bio"]').type('1');
    cy.get('.css-1bdxafm').click();
    cy.get('.css-1wbg2w3').click();
    cy.get('[placeholder="Full Name"]').type('{backspace}');
    cy.get('[placeholder="Username"]').type('{backspace}');
    cy.get('[placeholder="Bio"]').type('{backspace}');
    cy.get('.css-1bdxafm').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Edit Profile Picture', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.profile-container > .nav-icons').click();
    cy.get('.chakra-button').click();
    cy.get('.css-1agxkw4').click();
    cy.get('.chakra-button').click();
    cy.get('.css-1jif775 > .chakra-button').attachFile('profile.png');
    cy.get('.css-1bdxafm').click();
    /* ==== End Cypress Studio ==== */
  });
});