describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });
            

            it('Should add, edit, and delete a comment successfully', () => {
                const comment = "This is my first comment";
                const editedComment = "This is my edited comment";

                const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
            
                // Add a comment
                getIssueDetailsModal().within(() => {
                    cy.contains('Add a comment...').click();
                    cy.get('[placeholder="Add a comment..."]').type(comment);
                    cy.contains('Save').click().should('not.exist');
                    cy.contains('Add a comment...').should('exist');
                    //Assert added comment exists
                    cy.get('[data-testid=issue-comment]').should('contain', comment);
                });
            
                // Edit the added comment
                getIssueDetailsModal().within(() => {
                 cy.get('[data-testid=issue-comment]').first().contains('Edit').click().should('not.exist');
                  cy.get('[placeholder="Add a comment..."]').should('contain', comment).clear().type(editedComment);
                  cy.contains('Save').click().should('not.exist');
                  //assert edited comment exists
                   cy.get('[data-testid=issue-comment]').should('contain', 'Edit').and('contain', editedComment);
                });
            
                // Remove the comment
               getIssueDetailsModal()
               .find('[data-testid="issue-comment"]').contains('Delete').click();
               cy.wait(2000);
               cy.get('[data-testid="modal:confirm"]').should("be.visible").within (() => {
               cy.contains("button","Delete comment").click().should("not.exist");
               cy.wait(2000);
// assert that editedComment does not exist
                getIssueDetailsModal()
                .find('[data-testid="issue-comment"]')
                .should('not.exist')
            }); 
        });
    })    