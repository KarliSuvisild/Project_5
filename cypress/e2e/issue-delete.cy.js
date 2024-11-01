describe('Issue deletion', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });



    
    it('Deleting the issue successfully', () => {
        
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:trash"]').click;
        cy.get('[data-testid="modal:confirm"]').should('exist').and('be.visible');
        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.contains('Are you sure you want to delete this issue?').should('be.visible');
            cy.contains("Once you delete, it's gone for good").should("be.visible");
            cy.contains("Delete issue").click();
          });
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        
    });



    it('Initiating issue deletion process and then cancelling it', () => {
        
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:trash"]').click;
        cy.get('[data-testid="modal:confirm"]').should('exist').and('be.visible');
        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.contains('Are you sure you want to delete this issue?').should('be.visible');
            cy.contains("Once you delete, it's gone for good").should("be.visible");
            cy.contains("Cancel").click();
          });
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
        cy.get('[data-testid="icon:close"]').click();
        cy.get('[data-testid="modal:issue-details"]').should('not.exist');
           
    });


    });
