export class LoginPage {


  public keyInEmail(email: string) {
    cy.get(`input[type="email"]`).first().then(($emailTxtField) => {
        cy.wrap($emailTxtField).clear({ force: true }).type(email, {force: true,});
      });
  }

  public keyInPassword(password: string) {
    cy.get(`input[type="password"]`).first().then(($passwordTxtField) => {
        cy.wrap($passwordTxtField).clear({ force: true }).type(password, {force: true,});
      });
  }

  public clickLogin() {
    cy.get('button[type="submit"]').click({ force: true });
  }

  public verifyIfLoginSuccessful() {
    cy.contains("Your Notes");
    
  }

  public verifyErrorMsgCredsValid() {
    cy.on('window:alert',(txt)=>{
      expect(txt).to.equal('User does not exist.')
      });
  }

  public verifyIfLoginButtonDisabled() {
    cy.get('button[type="submit"]').should('be.disabled');
   }

}
