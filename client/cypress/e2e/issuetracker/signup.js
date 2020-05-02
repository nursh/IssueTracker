import { buildUser } from '../../support/generate';

describe("Sign up", () => {

  after(() => {
    cy.request('http://localhost:8080/api/cleardb');
  })

  it("should signup a new user with complete details", () => {
    const user = buildUser();

    cy.visit("/index/signup");
    cy.findByLabelText(/name/i).type(user.name);
    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByTestId(/signup-button/i).click(); 
    cy.assertProjectsAndUser(user);
  });

  it("should display error message if name, email or password is not provided", () => {
    const user = buildUser();

    cy.visit("/index/signup");
    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/password/i).type(user.password);
    cy.findByTestId(/signup-button/i).click();
    
    cy.findByText(/is required/i)
      .should('exist');
  })
});
