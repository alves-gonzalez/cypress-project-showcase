describe('Forms test', () => {
  beforeEach(() => {
    cy.visit('/forms')
  });
  it.only('Test subscribe form', () => {
    cy.contains('Testing Forms').should('be.visible');
    cy.getDataTest('subscribe-form').find('input').as('subsribe-input')
    cy.get('@subsribe-input').type('r4epd@tiffincrane.com')
    cy.contains('Successfully subbed: r4epd@tiffincrane.com').should('not.exist');
    cy.getDataTest('subscribe-button').click()
    cy.contains('Successfully subbed: r4epd@tiffincrane.com').should('exist');
    cy.wait(3000);
    cy.contains('Successfully subbed: r4epd@tiffincrane.com').should('not.exist');

    cy.get('@subsribe-input').type('r4epd@tiffincrane');
    cy.contains('Invalid email: r4epd@tiffincrane!').should('not.exist');
    cy.getDataTest('subscribe-button').click();
    cy.contains('Invalid email: r4epd@tiffincrane!').should('exist');
    cy.wait(3000);
    cy.contains('Invalid email: r4epd@tiffincrane!').should('not.exist');

     cy.contains('fail!').should('not.exist');
    cy.getDataTest('subscribe-button').click();
    cy.contains('fail!').should('exist');
  });

});