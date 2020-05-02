/// <reference types="Cypress" />

import { buildIssue } from '../../../support/generate';


describe('Filter Issue', () => {
  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });

  it('should return an issue given valid filter parameters', () => {
    const issueTwo = buildIssue();
    const issueThree = buildIssue();

    cy.createIssue();

    cy.findByText(/create issue/i).click();
    cy.addIssueToProject(issueTwo, true);
    cy.findByText(/create issue/i).click();
    cy.addIssueToProject(issueThree);

    cy.findByTestId("priority-filter").select("Medium");
    cy.findByText(/Apply filter/i).click();

    cy.findAllByText(/MEDIUM/).should('have.length', 1);
  })

  it('should show message if no issues match any filter parameters', () => {

    cy.createIssue();

    cy.findByTestId("status-filter").select("Closed");
    cy.findByText(/Apply filter/i).click();

    cy.findByText(/No issues match/i).should('exist');
  })
})