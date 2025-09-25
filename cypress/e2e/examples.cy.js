describe('Various examples', () => {
  beforeEach(() => {
    cy.visit('/examples');
  });
  it('multi-page testing', () => {
    cy.contains('a', 'Why Cypress').click();
    cy.location("pathname").should("equal", "/"); 

    cy.contains('a', 'Overview').click();
    cy.location("pathname").should("equal", "/overview"); 

    cy.contains('a', 'Fundamentals').click();
    cy.location("pathname").should("equal", "/fundamentals"); 
    
    cy.contains('a', 'Forms').click();
    cy.contains('Testing Forms').should('be.visible');

    cy.contains('a', 'Examples').click();
    cy.contains('Examples').should('be.visible');
  });
  it('intercepts', () => {
    cy.intercept('POST', 'http://localhost:3000/examples', {
      body: {
        message: 'Successfully intercepted request'
      }
    });
    cy.getDataTest('post-button').click();
    
  });

   it('intercepts', () => {
    cy.intercept('POST', 'http://localhost:3000/examples', {
    fixture: 'example.json'
    });
    cy.getDataTest('post-button').click();
    
  });

  it.only('Grudges', () => {
    cy.contains('Add Some Grudges')

    cy.getDataTest('my-grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });

    cy.getDataTest('clear-button').should('not.exist');

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('some grudge');
    });

    cy.getDataTest('add-grudge-button').click();

    cy.getDataTest('my-grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('This one is number 2');
    });

    cy.getDataTest('add-grudge-button').click();

     cy.getDataTest('my-grudge-list').within(() => {
      cy.get('li').should('have.length', 2);
      cy.get('li').its(0).should('contains.text', 'some grudge');
    });

    cy.getDataTest('my-grudge-list').within(() => {
      cy.get('li').its(0).within(() => {
        cy.get('button').click();
      });
      
    });

    cy.getDataTest('my-grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    cy.getDataTest('clear-button').click();
    cy.getDataTest('my-grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });


  });
});