/// <reference types="Cypress" />

import { buildProject } from "../../../support/generate";

describe('Create Project', () => {

  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });

  it('should create a new project with a signed in user', () => {
    const project = buildProject();

    cy.createAndSigninUser()
    cy.findByTestId(/create-project/i).click();
    cy.findByLabelText(/title/i).type(project.title);
    cy.findAllByLabelText(/description/i).type(project.description);
    cy.findByTestId(/create-project-form/i).click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/projects`);
    cy.findByText(project.title);
  })
});