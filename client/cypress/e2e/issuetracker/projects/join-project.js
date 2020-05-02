/// <reference types="Cypress" />

describe('Join a project', () => {

  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });

  it('should let a user successfully join a project that exists', () => {
    cy.createProject().then(project => {
    const searchText = project.title.split(" ")[0];
      cy.findByText(/log out/i).click();
      cy.createAndSigninUser();
      cy.findByPlaceholderText(/Search for projects/i)
        .type(`${searchText}{enter}`);

      cy.findByText(/join project/i)
        .click();

      cy.findByText(`You've been successfully added to the project`)
        .should('exist');


      cy.findByText(/close/i)
        .click();
    });
  })
})