describe('create post', () => {
  it('passes', () => {
    cy.visit('/')
  });


  /* ==== Test Created with Cypress Studio ==== */
  it('No Picture', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.get('.css-fxrfob > .nav-icons').click();
    cy.get('[placeholder="Item Name"]').click();
    cy.get(':nth-child(3) > .chakra-select').select('Furniture');
    cy.get(':nth-child(4) > .chakra-select').select('Kissam College');
    cy.get('.css-mjjomy').clear('3');
    cy.get('.css-mjjomy').type('3');
    cy.get('#chakra-modal--body-\\:rf\\:').click();
    cy.get('.chakra-button').click();
    cy.get('#toast-1-description').click();
    cy.get('.css-1pq15d').click();
    cy.get('#chakra-modal--body-\\:rf\\:').click();
    cy.get('.chakra-button').click();
    cy.get('.css-1pq15d > .chakra-icon > path').click();
    cy.get('.chakra-modal__footer').click();
    cy.get('.css-mjjomy').click();
    cy.get('.chakra-modal__footer').click();
    cy.get('.chakra-button').click();
    cy.get('#toast-3-description').click();
    cy.get('.css-1pq15d > .chakra-icon > path').click();
    cy.get('#chakra-modal--body-\\:rf\\:').click();
    /* ==== End Cypress Studio ==== */
  });
});