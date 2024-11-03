describe('Issue deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });

const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
const getConfirmModal = () => cy.get('[data-testid="modal:confirm"]');   

it('Test Case 1: Issue Deletion', () => {
    getIssueDetailsModal().should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    getConfirmModal().should("be.visible");
    getConfirmModal().within(() => {
      cy.contains("Are you sure you want to delete this issue?").should("be.visible");
      cy.contains("Delete issue").click();
      });
    getIssueDetailsModal().should('not.exist');
    cy.reload();
    cy.contains('Issue has been successfully deleted.').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').contains('This is an issue of type: Task.').should('not.exist')
    }); 

it('Test Case 2: Issue Deletion Cancellation', () => {
    getIssueDetailsModal().should("be.visible");
    cy.get('[data-testid="icon:trash"]').click();
    getConfirmModal().should("be.visible");
    getConfirmModal().within(() => {
      cy.contains("Are you sure you want to delete this issue?").should("be.visible");
      cy.contains("Cancel").click();
      });
    getConfirmModal().should('not.exist');
    cy.get('[data-testid="icon:close"]').first().click();
    getIssueDetailsModal().should("not.exist");
    cy.reload();
    cy.get('[data-testid="board-list:backlog"]').contains('This is an issue of type: Task.').should('be.visible')
    }); 
});