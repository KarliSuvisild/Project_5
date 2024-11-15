describe("Issue comments creating, editing, and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const getIssueComments = () => cy.get('[data-testid="issue-comment"]');

  it("Should add, edit, and delete a comment successfully", () => {
    const initialComment = "TEST_COMMENT_KS";
    const updatedComment = "TEST_COMMENT_EDITED_KS";

    // Step 1: Add a comment
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(initialComment);
      cy.contains("button", "Save").click().should("not.exist");
    });

    // Assert that the comment has been added
    getIssueComments().should("contain", initialComment);

    // Step 2: Edit the comment
    getIssueComments().contains("Edit").click();
    cy.get('textarea[placeholder="Add a comment..."]')
      .clear()
      .type(updatedComment);
    cy.contains("button", "Save").click().should("not.exist");

    // Assert that the updated comment is visible
    getIssueComments().should("contain", updatedComment);

    // Step 3: Delete the comment
    getIssueComments().contains("Delete").click();
    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    // Assert that the comment is removed
    getIssueDetailsModal().find(updatedComment).should("not.exist");
  });
});
