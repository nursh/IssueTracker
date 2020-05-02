describe('Delete Project', () => {

  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });

  it('should delete an existing project created by a user', () => {
    cy.createProject().then(project => {
      cy.findByText(/view project/i).click();
      cy.url().should("eq", `${Cypress.config().baseUrl}/project/manage-issues`);

      cy.findByText(/delete project/i).click();
      cy.findByTestId(/delete-project/i).click();

      cy.url().should("eq", `${Cypress.config().baseUrl}/projects`);
      cy.findByText(project.title).should('not.exist');
    });

  })

  it('should display an error if a user tries to delete a project they did not create', () => {
    cy.joinProject();
    cy.findByText(/My Projects/i).click();
    cy.findByText(/view project/i).click();

    cy.findByText(/delete project/i).click();
    cy.findByTestId(/delete-project/i).click();

    cy.findByText(/error/i).should('exist');
  })
})