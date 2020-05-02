describe('Signin', () => {

  after(() => {
    cy.request("http://localhost:8080/api/cleardb");
  });

  it('should signin user with existing details', () => {
    cy.signupUser().then(user => {
      cy.visit("/");
      cy.findByLabelText(/email/i).type(user.email.toLowerCase());
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByTestId(/signin-button/i).click();
      cy.assertProjectsAndUser(user);
    });
  })

  it('should display error message if email or password is not provided', () => {
    cy.visit("/");
    cy.findByLabelText(/password/i).type('Some Password001');
    cy.findByTestId(/signin-button/i).click();
    
    cy.findByText(/is required/i)
      .should('exist');
  });

  it('should display error message if a user does not exist', () => {
    cy.visit("/");
    cy.findByLabelText(/email/i).type('random_user@email.com');
    cy.findByLabelText(/password/i).type('Random Passwod01');
    cy.findByTestId(/signin-button/i).click();
    
    cy.findByText(/error/i)
      .should('exist');
  })

  it("should display error message when an existing user uses wrong signin details", () => {
    cy.signupUser().then((user) => {
      cy.visit("/");
      cy.findByLabelText(/email/i).type(user.email.toLowerCase());
      cy.findByLabelText(/password/i).type('Some password01');
      cy.findByTestId(/signin-button/i).click();
      cy.findByText(/error/i).should("exist");
    });
  });

})