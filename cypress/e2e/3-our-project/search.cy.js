describe('search tests', () => {
  it('passes', () => {
    cy.visit('/')
  })
  
  it('search good', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('m');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear('P');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.get('.search-input').click();
    cy.get('.css-1cjy4zv').clear('H');
    cy.get('.css-1cjy4zv').type('Headphones');
    cy.get('.css-117fnea').click();
    cy.get('.chakra-button').click();
    cy.get(':nth-child(2) > .css-1k9efnl > :nth-child(1) > .chakra-avatar > .chakra-avatar__img').click();
    /* ==== End Cypress Studio ==== */
  });

  it('search bad', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('.css-1cjy4zv').clear('h');
    cy.get('.css-1cjy4zv').type('h');
    cy.get('.css-117fnea').click();
    cy.get('.chakra-button').click();
    cy.get('#toast-1-description').click();
    cy.get('.css-1pq15d > .chakra-icon').click();
    /* ==== End Cypress Studio ==== */
  });

  it('search location', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('.css-1cjy4zv').clear('w');
    cy.get('.css-1cjy4zv').type('Warren{enter}');
    cy.get('.chakra-button').click();
    cy.get('.chakra-stack').click();
    // cy.get('.chakra-avatar__img').click();
    /* ==== End Cypress Studio ==== */
  });

  it('search category', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('.css-1cjy4zv').clear('E');
    cy.get('.css-1cjy4zv').type('Electronics{enter}');
    cy.get('.chakra-button').click();
    // cy.get(':nth-child(2) > .css-1k9efnl > :nth-child(1) > .chakra-avatar > .chakra-avatar__img').click();
    /* ==== End Cypress Studio ==== */
  });

  it('search category not case sensitive', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('.css-1cjy4zv').clear('e');
    cy.get('.css-1cjy4zv').type('electronics{enter}');
    cy.get('.chakra-button').click();
    // cy.get(':nth-child(2) > .css-1k9efnl > :nth-child(1) > .chakra-avatar > .chakra-avatar__img').click();
    /* ==== End Cypress Studio ==== */
  });
});