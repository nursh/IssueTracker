/// <reference types="Cypress" />


describe('Delete Issue', () => {

  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });


  it('should delete an existing issue', () => {
    cy.createIssue();
    cy.findByTestId(/delete-issue/i).click();

    cy.findByTestId(/delete-modal/i).click();

    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/project/manage-issues`
    );

    cy.findByText(/There are currently no issues.../i).should("exist");
  })
})