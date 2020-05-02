/// <reference types="Cypress" />

import { buildIssue } from "../../../support/generate";

describe("Edit Issue", () => {
  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });

  it("should edit an existing issue", () => {
    const editIssue = buildIssue({
      title: 'Edited Issue',
      description: 'Some issue description'
    })
    cy.createIssue();
    cy.findByTestId(/edit-issue/i).click();

    cy.findByLabelText(/title/i)
      .clear()
      .type(editIssue.title);

    cy.findByLabelText(/description/i)
      .clear()
      .type(editIssue.description);

    cy.findByDisplayValue('Open').select('Closed');

    cy.findByTestId('edit-modal').click();

    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/project/manage-issues`
    );

    cy.findByText(editIssue.title)
      .should('exist');

    cy.findByText('CLOSED')
      .should('exist');
  });
});
