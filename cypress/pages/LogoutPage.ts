

export class LogoutPage{

    public logout():any{
    cy.contains("Your Notes");
    cy.contains('Logout').click({ force: true });
    cy.contains('Signup');
    }
}