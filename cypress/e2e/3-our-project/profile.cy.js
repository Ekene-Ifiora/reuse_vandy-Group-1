describe('profile tests', () => {
  it('passes', () => {
    cy.visit('/')
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Access Profile', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.sb-avatar__image').click();
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
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.sb-avatar__image').click();
    cy.get('.css-7wjwuz').click();
    cy.get('[placeholder="John Travolta"]').clear();
    cy.get('[placeholder="John Travolta"]').type('John Travolta1');
    cy.get('[placeholder="JohnTravolta"]').clear();
    cy.get('[placeholder="JohnTravolta"]').type('JohnTravolta1');
    cy.get('[placeholder="I am an actor"]').clear();
    cy.get('[placeholder="I am an actor"]').type('I am an actor1');
    cy.get('.css-1bdxafm').click();
    cy.get('.css-7wjwuz').click();
    cy.get('[placeholder="John Travolta1"]').type('John Travolta');
    cy.get('[placeholder="JohnTravolta1"]').type('JohnTravolta');
    cy.get('[placeholder="I am an actor1"]').type('I am an actor');
    cy.get('.css-1bdxafm').click();
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
    cy.get('.sb-avatar__image').click();
    cy.get('.css-7wjwuz').click();
    cy.get('.css-1agxkw4').click();
    cy.get('.css-7wjwuz').click();
    cy.get('.css-1jif775 > .chakra-button').attachFile('profile.png');
    cy.get('.css-1bdxafm').click();
    /* ==== End Cypress Studio ==== */
  });

  it('Access other profile', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get(':nth-child(1) > .card_img > .img').click();
    cy.get('.css-u4p24i > :nth-child(1) > .chakra-avatar > .chakra-avatar__img').click();
    cy.wait(2000);
    cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
    /* ==== End Cypress Studio ==== */
  });
});