describe('log in tests', () => {
  it('passes', () => {
    cy.visit('/')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Sign Up', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-csKJxZ > .sc-gLLuof').click();
    cy.get('[type="name"]').clear('m');
    cy.get('[type="name"]').type('m');
    cy.get('[type="username"]').clear();
    cy.get('[type="username"]').type('m');
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').clear();
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').type('marcus.p.kamen@vanderbilt.edu');
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="password"]').type('p');
    cy.get('.sc-guDLey > .sc-hLQSwg > .sc-gLLuof').click();
    cy.get('.sc-irLvIq > .sc-gLLuof').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Login', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/auth');
    cy.get('.sc-csKJxZ > .sc-gLLuof').click();
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-irLvIq > .sc-gLLuof').click();
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('m');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('m');
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear('f');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('f');
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('m@');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('m@gmail.com');
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password');
    cy.get('.loginSignupContainer').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.search-input').click();
    /* ==== End Cypress Studio ==== */
  });

  it('Not Email', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-csKJxZ > .sc-gLLuof').click();
    cy.get('[type="name"]').clear('a');
    cy.get('[type="name"]').type('a');
    cy.get('[type="username"]').clear('a');
    cy.get('[type="username"]').type('a');
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').clear('a');
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').type('a');
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="password"]').clear('a');
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="password"]').type('a');
    cy.get('.sc-guDLey > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="password"]').click();
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').clear('a@');
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').type('a@gmail.com');
    cy.get('.sc-guDLey > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('#toast-1-description').click();
    cy.get('.css-1pq15d > .chakra-icon').click();
    cy.get('.sc-guDLey > .sc-hLQSwg').click();
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').clear();
    cy.get('.sc-guDLey > .sc-hLQSwg > [type="email"]').type('marcus.p.kamen@vanderbilt.edu');
    cy.get('.sc-guDLey > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.sc-irLvIq > .sc-gLLuof').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('a');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('a');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear('a');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('a');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('a@');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('a@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('m');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
    cy.get('.search-input').click();
    /* ==== End Cypress Studio ==== */
  });
})