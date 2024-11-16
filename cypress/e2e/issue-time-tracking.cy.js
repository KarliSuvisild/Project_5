describe("Time Estimation and Logging Combined Functionality", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");

        // Create a new issue
        cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get(".ql-editor").type(description);
          cy.get('[data-testid="select:type"]').click();
          cy.get('[data-testid="select-option:Bug"]').click();
          cy.get('input[name="title"]').type(title);
          cy.get('[data-testid="select:userIds"]').click();
          cy.get('[data-testid="select-option:Lord Gaben"]').click();
          cy.get('button[type="submit"]').click();
        });

        cy.contains(issueCreationConfirmation).should("be.visible");
        cy.wait(2000);
        cy.get(backlogList).should("be.visible").contains(title).click();
      });
  });

  it("Should add, update, and remove both time estimation and logged time", () => {
    checkNoTimeLoggedVisible();

    // **Step 1: Add Time Estimation**
    cy.get(inputFieldTime).type(estimatedTime);
    assertEstimationVisibility(estimatedTime, true);

    // **Step 2: Log Time**
    clickTimeTrackingButton();
    fillTimeTrackingModal(loggedTime, remainingTime);
    assertTimeTrackingModalNotVisible();
    assertLoggedAndRemainingVisible(loggedTime, remainingTime);

    // **Step 3: Update Time Estimation**
    cy.get(inputFieldTime).clear().type(estimatedTimeUpdated);
    assertEstimationVisibility(estimatedTimeUpdated, true);

    // **Step 4: Update Logged Time**
    clickTimeTrackingButton();
    fillTimeTrackingModal(loggedTimeUpdated, remainingTimeUpdated);
    assertTimeTrackingModalNotVisible();
    assertLoggedAndRemainingVisible(loggedTimeUpdated, remainingTimeUpdated);

    // **Step 5: Clear Time Logging**
    clickTimeTrackingButton();
    fillTimeTrackingModal("", "");
    checkNoTimeLoggedVisible();

    // **Step 6: Clear Time Estimation**
    cy.get(inputFieldTime).clear();
    assertEstimationVisibility(estimatedTimeUpdated, false);
    assertEstimationVisibility(estimatedTime, false);
    checkNoTimeLoggedVisible();
  });
});
