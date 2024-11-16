describe('Issue Time Tracking: Estimation Functionality', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    })
    it('Add estimation 10',() => {
    const timeEstimate1 ='10';
    cy.get('[placeholder="Number"]').clear().type(timeEstimate1);
    cy.get('[data-testid="icon:close"]').first().click()
    cy.contains('This is an issue of type: Task.').click();
    cy.get('[placeholder="Number"]').should("be.visible").should("have.value", timeEstimate1);
})//bug -> should have value 10 but the value was 8

    it('Update estimation to 20',() => {
    const timeEstimate2 ='20';
    cy.get('[placeholder="Number"]').clear().type(timeEstimate2);
    cy.get('[data-testid="icon:close"]').first().click()
    cy.contains('This is an issue of type: Task.').click();
    cy.get('[placeholder="Number"]').should("be.visible").should("have.value", timeEstimate2);
})

    it('Delete estimation',() => {
    const timeEstimate3 ='';
    cy.get('[placeholder="Number"]').clear().type(timeEstimate3);
    cy.get('[data-testid="icon:close"]').first().click()
    cy.contains('This is an issue of type: Task.').click();
    cy.get('[placeholder="Number"]').should("be.visible").should("have.value", timeEstimate3);
})


    it('Log time', () => {
        const timeSpent ='2';
        const timeRemaining ='5';
        cy.get('[data-testid="icon:stopwatch"]').click();
        //cy.get('[data-testid="icon:stopwatch"]').should('be.visible')
        cy.get('[data-testid="modal:tracking"]').within (()=>{
        cy.get('[placeholder="Number"]').first().should("be.visible").should("have.value", "4") .click()
            .clear().type(timeSpent)
        cy.get('[placeholder="Number"]').last().should("be.visible").should("have.value", "") .click()
        .type(timeRemaining )
            cy.contains('button', 'Done').click();
            cy.get('[data-testid="modal:tracking"]').should("exist")
            cy.get('[placeholder="Number"]').first().should("be.visible").should("have.value", timeSpent)
            cy.get('[placeholder="Number"]').last().should("be.visible").should("have.value", timeRemaining)
    });
})
})
    it.only('Remove logged time', () => {
        cy.get('[data-testid="icon:stopwatch"]').click()
        //cy.get('[data-testid="icon:stopwatch"]').should('be.visible')
        cy.get('[data-testid="modal:tracking"]').within (()=>{
        cy.get('[placeholder="Number"]').first().should("be.visible").should("have.value", timeSpent) .click()
            .clear()
        cy.get('[placeholder="Number"]').last().should("be.visible").should("have.value", timeRemaining) .click()
        .clear()
            cy.contains('button', 'Done').click();
            cy.get('[data-testid="modal:tracking"]').should("exist")
            cy.get('[placeholder="Number"]').first().should("be.visible").should("not.have.value")
            cy.get('[placeholder="Number"]').last().should("be.visible").should("not.have.value")
        })
    });

