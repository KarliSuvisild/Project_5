import {
  issueCreatedConfirmation,
  issueDescription,
  issueTitle,
} from "../constants";
import {
  backLogList,
  inputFieldTime,
  timeTrackingModal,
  timeTrackingButton,
} from "../pages/selectors";

const TIME_VALUES = {
  initialEstimate: "10",
  updatedEstimate: "20",
  initialLoggedTime: "2",
  initialRemainingTime: "5",
  updatedLoggedTime: "3",
  updatedRemainingTime: "4",
};

const EXPECTED_TEXT = {
  estimated: "h estimated",
  logged: "h logged",
  remaining: "h remaining",
};

const VISIBILITY_FLAGS = {
  shouldShowNoTimeLogged: true,
  shouldNotShowEstimatedTime: false,
};

describe("Time-tracking functionality tests for the issue", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");

        // Create a new issue due to the Jira bug
        cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get('[data-testid="select:type"]').click();
          cy.get('[data-testid="select-option:Bug"]').click();
          cy.get(".ql-editor").type(issueDescription);
          cy.get('input[name="title"]').type(issueTitle);
          cy.get('[data-testid="select:userIds"]').click();
          cy.get('[data-testid="select-option:Lord Gaben"]').click();
          cy.get('button[type="submit"]').click();
        });

        cy.contains(issueCreatedConfirmation).should("be.visible");
        cy.get(backLogList).should("be.visible").contains(issueTitle).click();
      });
  });

  it("Should add, update and remove estimated time on the issue", () => {
    // Verify that "No Time Logged" is displayed initially
    validateNoTimeLogged(VISIBILITY_FLAGS.shouldShowNoTimeLogged);

    // Step 1: Add an initial estimated time
    setEstimatedTime(TIME_VALUES.initialEstimate);
    validateTime(TIME_VALUES.initialEstimate, EXPECTED_TEXT.estimated);

    // Step 2: Update the estimated time
    setEstimatedTime(TIME_VALUES.updatedEstimate);
    validateTime(TIME_VALUES.updatedEstimate, EXPECTED_TEXT.estimated);

    // Step 3: Remove the estimated time
    clearEstimatedTime();
    validateNoTimeLogged(VISIBILITY_FLAGS.shouldShowNoTimeLogged);
  });

  it("Should add and remove logged time values", () => {
    const shouldClearTime = true;

    // Step 1: Add an initial estimated time for reference
    setEstimatedTime(TIME_VALUES.initialEstimate);
    validateTime(TIME_VALUES.initialEstimate, EXPECTED_TEXT.estimated);

    // Step 2: Add logged time and remaining time
    openTimeTrackingAndSetLoggedTime(
      TIME_VALUES.initialLoggedTime,
      TIME_VALUES.initialRemainingTime
    );
    validateTime(TIME_VALUES.initialLoggedTime, EXPECTED_TEXT.logged);
    validateTime(TIME_VALUES.initialRemainingTime, EXPECTED_TEXT.remaining);
    validateTime(
      TIME_VALUES.initialEstimate,
      EXPECTED_TEXT.estimated,
      VISIBILITY_FLAGS.shouldNotShowEstimatedTime
    );
    validateNoTimeLogged();

    // Step 3: Update the logged and remaining time
    openTimeTrackingAndSetLoggedTime(
      TIME_VALUES.updatedLoggedTime,
      TIME_VALUES.updatedRemainingTime
    );
    validateTime(TIME_VALUES.updatedLoggedTime, EXPECTED_TEXT.logged);
    validateTime(TIME_VALUES.updatedRemainingTime, EXPECTED_TEXT.remaining);
    validateTime(
      TIME_VALUES.initialEstimate,
      EXPECTED_TEXT.estimated,
      VISIBILITY_FLAGS.shouldNotShowEstimatedTime
    );
    validateNoTimeLogged();

    // Step 4: Clear the logged time and remaining time
    openTimeTrackingAndSetLoggedTime(
      TIME_VALUES.initialLoggedTime,
      TIME_VALUES.initialRemainingTime,
      shouldClearTime
    );
    validateTime(
      TIME_VALUES.initialLoggedTime,
      EXPECTED_TEXT.logged,
      VISIBILITY_FLAGS.shouldNotShowEstimatedTime
    );
    validateTime(
      TIME_VALUES.initialRemainingTime,
      EXPECTED_TEXT.remaining,
      VISIBILITY_FLAGS.shouldNotShowEstimatedTime
    );
    validateTime(TIME_VALUES.initialEstimate, EXPECTED_TEXT.estimated);
    validateNoTimeLogged(VISIBILITY_FLAGS.shouldShowNoTimeLogged);
  });
});

function setEstimatedTime(time) {
  cy.get(inputFieldTime).clear().type(time);
  cy.get(inputFieldTime).should("have.value", time);
  cy.contains("button", "Done").click();
}

function clearEstimatedTime() {
  cy.get(inputFieldTime).clear();
  cy.contains("button", "Done").click();
}

function openTimeTrackingAndSetLoggedTime(
  loggedTime,
  remainingTime,
  shouldClearTime = false
) {
  cy.get(timeTrackingButton).click();
  cy.get(timeTrackingModal)
    .should("be.visible")
    .within(() => {
      if (shouldClearTime) {
        cy.get(inputFieldTime).eq(0).clear();
        cy.get(inputFieldTime).eq(1).clear();
      } else {
        cy.get(inputFieldTime).eq(0).type(loggedTime);
        cy.get(inputFieldTime).eq(1).type(remainingTime);
      }

      cy.contains("button", "Done").click();
    });

  cy.get(timeTrackingModal).should("not.exist");
}

function validateTime(
  timeValue,
  remainingPartOfString,
  shouldBeVisible = true
) {
  const timeText = `${timeValue}${remainingPartOfString}`;
  if (shouldBeVisible) {
    cy.contains(timeText).should("be.visible");
  } else {
    cy.contains(timeText).should("not.exist");
  }
}

function validateNoTimeLogged(shouldShowNoTimeLogged = false) {
  if (shouldShowNoTimeLogged) {
    cy.contains("No time logged").should("be.visible");
  } else {
    cy.contains("No time logged").should("not.exist");
  }
}

//Time Estimation Functionality:

//Cover time estimation functionality based on the provided test cases.

//You can combine several test cases into one automation test for a logical flow.

//Your test should include steps for:

//Adding estimation.

//Asserting that the estimation is added and visible.

//Editing the estimation.

//indicating that the updated value is visible.

//Removing the estimation.

//stating that the value is removed.

//Time Logging Functionality:

//Cover time-logging functionality based on the given test cases.

//You can combine test cases into one automation test as before.
