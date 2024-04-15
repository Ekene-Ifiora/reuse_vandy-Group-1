describe('post tests', () => {
    it('passes', () => {
      cy.visit('/')
    });

    /* ==== Generated with Cypress Studio ==== */
    it('failed', () => {
        cy.visit('/');
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
        cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
        cy.wait(2000);
        cy.get('.css-fxrfob > .nav-icons').click();
        cy.get('[placeholder="Item Name"]').clear('ch');
        cy.get('[placeholder="Item Name"]').type('ch');
        cy.get('[placeholder="Description"]').clear('h');
        cy.get('[placeholder="Description"]').type('h');
        cy.get(':nth-child(3) > .chakra-select').select('Furniture');
        cy.get(':nth-child(4) > .chakra-select').select('Rothschild');
        cy.get('.css-mjjomy').clear('9');
        cy.get('.css-mjjomy').type('9');
        cy.get('.css-jsc9zn').click();
        cy.get('.chakra-button').click();
        cy.get('#toast-1-title').click();
        cy.get('.css-1pq15d > .chakra-icon > path').click({multiple: true});
        cy.get('.css-jsc9zn').click();
        cy.get('.css-7ks4pj').click();
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Generated with Cypress Studio ==== */
    it('upload and eliminate', () => {
        cy.visit('/');
        cy.get('.css-fxrfob > .nav-icons').click();
        cy.get('[placeholder="Item Name"]').clear('ch');
        cy.get('[placeholder="Item Name"]').type('ch');
        cy.get('[placeholder="Description"]').clear('h');
        cy.get('[placeholder="Description"]').type('h');
        cy.get(':nth-child(3) > .chakra-select').select('Furniture');
        cy.get(':nth-child(4) > .chakra-select').select('Rothschild');
        cy.get('.css-mjjomy').clear('9');
        cy.get('.css-mjjomy').type('9');
        cy.get('.css-1cjy4zv').attachFile('profile.png');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.css-1oqedzn > .chakra-icon > path').click();
        /* ==== End Cypress Studio ==== */
    });

    /* ==== Generated with Cypress Studio ==== */
    it('pass', () => {
        cy.visit('/');
        cy.get('.logout > .nav-icons').click();
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').clear('j');
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="email"]').type('johntravolta@gmail.com');
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').clear();
        cy.get('.sc-dmyCSP > .sc-hLQSwg > [type="password"]').type('Password{enter}');
        cy.get('.sc-dmyCSP > .sc-hLQSwg > .sc-gLLuof').click({multiple: true});
        cy.wait(2000);
        cy.get('.css-fxrfob > .nav-icons').click();
        cy.get('[placeholder="Item Name"]').clear('ch');
        cy.get('[placeholder="Item Name"]').type('ch');
        cy.get('[placeholder="Description"]').clear('h');
        cy.get('[placeholder="Description"]').type('h');
        cy.get(':nth-child(3) > .chakra-select').select('Furniture');
        cy.get(':nth-child(4) > .chakra-select').select('Rothschild');
        cy.get('.css-mjjomy').clear('9');
        cy.get('.css-mjjomy').type('9');
        cy.get('.css-1cjy4zv').attachFile('profile.png');
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.wait(1000);
        cy.get('.chakra-button').click();
        cy.get('#toast-1-description').click();
        cy.get('.css-1pq15d > .chakra-icon').click();
        cy.get('.sb-avatar__image').click();
        cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
        cy.get('.chakra-icon > path').click();
        cy.get(':nth-child(1) > .css-1rmkh0t > .css-1cp8gch').click();
        cy.get('[d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"]').click();
        cy.wait(2000);
        /* ==== End Cypress Studio ==== */
    });
});