describe("Issue delete", () => {
    beforeEach(() => {
      cy.visit("/"); 
      cy.url()
        .should("eq", `${Cypress.env("baseUrl")}project/board`) 
        .then(() => {
          cy.contains("This is an issue of type: Task.").click(); 
        });
      cy.get('[data-testid="modal:issue-details"]').should("be.visible"); 
    });
  
    
    it("Should delete an issue and check if it was successful", () => {
      cy.get('[data-testid="icon:trash"]').click();
      cy.get('[data-testid="modal:confirm"]').should("be.visible"); 
      cy.contains("Delete issue").click(); 
      cy.get('[data-testid="modal:confirm"]').should("not.exist"); 
      cy.get('[data-testid="board-list:backlog"]').within(() => {
        cy.get('[data-testid="list-issue"]').should("not.contain", "This is an issue of type: Task."); 
      });
    });
  
   
    it("Should start deleting the issue and then cancel it successfully", () => {
      cy.get('[data-testid="icon:trash"]').click(); 
      cy.get('[data-testid="modal:confirm"]').should("be.visible"); 
      cy.contains("Cancel").click(); 
      cy.get('[data-testid="modal:confirm"]').should("not.exist"); 
      cy.get('[data-testid="modal:issue-details"]').should("be.visible"); 
      cy.get('[data-testid="board-list:backlog"]').within(() => {
        cy.get('[data-testid="list-issue"]').should("contain", "This is an issue of type: Task.");
      });
    });
  });
  