/// <reference types="Cypress" />

import { buildIssue } from "../../../support/generate";

describe('Create Issue', () => {
  
  after(() => {
    cy.request('http://localhost:8080/api/cleardb');
  });

  it('should create a new issue', () => {
    const issue = buildIssue();
    cy.createProject();

    cy.findByText(/view project/i).click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/project/manage-issues`);

    cy.findByTestId(/create-issue/i).click();
    cy.findByLabelText(/title/i)
      .type(issue.title);

    cy.findByLabelText(/description/i)
      .type(issue.description);

    cy.findByDisplayValue('Low').select('Medium');

    cy.findByTestId(/submit-create-issue/i).click();
    cy.url().should("eq",`${Cypress.config().baseUrl}/project/manage-issues`);

    cy.findByText(issue.title).should('exist');
  });

  it('should not create an issue with missing title', () => {
    const issue = buildIssue();
    cy.createProject();

    cy.findByText(/view project/i).click();
    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/project/manage-issues`
    );

    cy.findByTestId(/create-issue/i).click();

    cy.findByLabelText(/description/i).type(issue.description);

    cy.findByDisplayValue("Low").select("Medium");

    cy.findByTestId(/submit-create-issue/i).click();

    cy.findByText(/title is required/i).should('exist');
  })

})