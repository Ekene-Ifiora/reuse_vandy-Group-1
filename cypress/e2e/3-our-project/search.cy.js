describe('search tests', () => {
  it('passes', () => {
    cy.visit('/')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Search Click and Out', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('.chakra-modal__close-btn').click();
    cy.get('.search-input').click();
    cy.get('.chakra-modal__content-container').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Search Item', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('#field-\\:r17\\:').clear('Headphones');
    cy.get('#field-\\:r17\\:').type('Headphones');
    cy.get('.css-117fnea').click();
    cy.get('.chakra-button').click();
    cy.get('.css-117fnea').click();
    cy.get(':nth-child(2) > .css-1k9efnl > .chakra-stack > button > .css-1668g05').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Failed Search', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('#field-\\:r17\\:').clear('h');
    cy.get('#field-\\:r17\\:').type('h');
    cy.get('.css-117fnea').click();
    cy.get('.chakra-button').click();
    cy.get('#toast-1-title').click();
    cy.get('.css-117fnea').click();
    cy.get('.css-1pq15d > .chakra-icon').click();
    cy.get('.css-117fnea').click();
    cy.get('.chakra-modal__close-btn').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Location Search', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('#field-\\:r17\\:').clear('m');
    cy.get('#field-\\:r17\\:').type('moore{enter}');
    cy.get('.chakra-button').click();
    cy.get('#toast-1-title').click();
    cy.get('#chakra-modal--body-\\:r7\\:').click();
    cy.get('#field-\\:r17\\:').clear();
    cy.get('#field-\\:r17\\:').type('warren{enter}');
    cy.get('.chakra-button').click();
    cy.get('#toast-2-description').click();
    cy.get('#chakra-modal--body-\\:r7\\:').click();
    cy.get('#field-\\:r17\\:').clear();
    cy.get('#field-\\:r17\\:').type('Warren{enter}');
    cy.get('.chakra-button').click();
    cy.get('.css-117fnea').click();
    cy.get('.css-1668g05').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Type Based Search', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.search-input').click();
    cy.get('#field-\\:r17\\:').clear('el');
    cy.get('#field-\\:r17\\:').type('elec{enter}');
    cy.get('.chakra-button').click();
    cy.get('#toast-1-title').click();
    cy.get('#chakra-modal--body-\\:r7\\:').click();
    cy.get('#field-\\:r17\\:').clear();
    cy.get('#field-\\:r17\\:').type('Electronics{enter}');
    cy.get('.chakra-button').click();
    cy.get('.css-117fnea').click();
    cy.get(':nth-child(2) > .css-1k9efnl > .chakra-stack > button > .css-1668g05').click();
    /* ==== End Cypress Studio ==== */
  });
})