describe('chat tests', () => {
  it('passes', () => {
    cy.visit('/');
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Chat Access', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get(':nth-child(1) > .card_img > .img').click();
    cy.wait(500);
    cy.get('.css-15py4l6 > .css-jucvzs').click();
    /* ==== End Cypress Studio ==== */
  });

  it('chat button', () => {
    cy.visit('/');
    cy.get('.logout > .nav-icons').click();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('jo');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johndoe@gmail.com');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
    cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
    cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click();
    cy.wait(2000);
    cy.get('.chat > .nav-icons').click();
    cy.wait(2000);
    cy.get('p').click();
    cy.get('p').clear("f");
    cy.get('p').type("f");
    cy.get('.ql-bold > svg').click();
    cy.get('.ql-italic > svg').click();
    cy.get('.ql-underline > svg').click();
    cy.get('.ql-code > svg').click();
    cy.get('#ce-send-message-button > .anticon > svg').click();
    cy.get('#new-chat-plus-button').click();
    cy.get('#ce-new-chat-title-field').clear();
    cy.get('#ce-new-chat-title-field').type('a{enter}');
    cy.get(':nth-child(2) > [style="border-top: 1px solid rgb(240, 240, 240);"] > .ce-section-title-container > .anticon > svg').click();
    cy.get('.ce-photo-section > [style="border-top: 1px solid rgb(240, 240, 240);"] > .ce-section-title-container > .anticon > svg').click();
  });
});