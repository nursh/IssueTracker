/// <reference types="Cypress" />

describe("Search for a project", () => {

  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });

  it("should let a user successfully search for a project that exists", () => {
    cy.createProject().then((project) => {
      const searchText = project.title.split(' ')[0];
      cy.findByText(/log out/i).click();
      cy.createAndSigninUser();
      cy.findByPlaceholderText(
        /Search for projects/i
      ).type(`${searchText}{enter}`);

      cy.findByText(project.title)
        .should('exist');
    });
  });

  it("should return a message when a user searches for a project that doesn't exist", () => {
    const fakeProjectTitle = 'dkfhaslkdjfjak';

    cy.createProject().then((project) => {
      cy.findByText(/log out/i).click();
      cy.createAndSigninUser();
      cy.findByPlaceholderText(
        /Search for projects/i
      ).type(`${fakeProjectTitle}{enter}`);

      cy.findByText(fakeProjectTitle).should("not.exist");
      cy.findByText(/No projects were found/i).should('exist');
    });
  });
});
