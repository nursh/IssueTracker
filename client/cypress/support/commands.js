import "@testing-library/cypress/add-commands";
import { buildUser, buildProject, buildIssue } from "./generate";


Cypress.Commands.add('signupUser', () => {
  const user = buildUser();
  cy.request({
    url: 'http://localhost:3000/auth/signup',
    method: 'POST',
    body: { ...user }
  }).then(() => user);
})

Cypress.Commands.add('signinUser', (user) => {
  cy.visit("/");
  cy.findByLabelText(/email/i).type(user.email.toLowerCase());
  cy.findByLabelText(/password/i).type(user.password);
  cy.findByTestId(/signin-button/i).click();
})

Cypress.Commands.add('createAndSigninUser', () => {
  cy.signupUser().then((user) => {
    cy.signinUser(user);
  });
})

Cypress.Commands.add('createProject', () => {
  const project = buildProject();
  
  cy.createAndSigninUser();
  cy.url().should("eq", `${Cypress.config().baseUrl}/projects`);
  

  cy.findByTestId(/create-project/i).click();
  cy.findByLabelText(/title/i).type(project.title);
  cy.findAllByLabelText(/description/i).type(project.description);
  cy.findByTestId(/create-project-form/i).click();

  return cy.wrap(project)
})

Cypress.Commands.add('joinProject', () => {
  cy.createProject().then(project => {
    const searchText = project.title.split(" ")[0];
    cy.findByText(/log out/i).click();
    cy.createAndSigninUser();
    cy.findByPlaceholderText(/Search for projects/i)
      .type(`${searchText}{enter}`);

    cy.findByText(/join project/i)
      .click();

    cy.findByText(/close/i)
      .click();
  })
})

Cypress.Commands.add('assertProjectsAndUser', (user) => {
  cy.url().should("eq", `${Cypress.config().baseUrl}/projects`);
  cy.findByText(user.name);
})

Cypress.Commands.add('createIssue', () => {
  const issue = buildIssue();
  cy.createProject();

  cy.findByText(/view project/i).click();
  cy.findByTestId(/create-issue/i).click();
  cy.addIssueToProject(issue);
})

Cypress.Commands.add('addIssueToProject', (issue, changePriority = false) => {
  cy.findByLabelText(/title/i).type(issue.title);
  cy.findByLabelText(/description/i).type(issue.description);
  if (changePriority) {
    cy.findByDisplayValue("Low").select("Medium");
  }
  cy.findByTestId(/submit-create-issue/i).click();
})