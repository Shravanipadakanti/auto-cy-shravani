import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';


describe("Login and Logout Tests", () => {

  const loginPage = new LoginPage();
  const logoutPage = new LogoutPage();

  let email: string;
  let password: string;

  before(() => {
    cy.visit('/');
    cy.fixture('loginData').then((logindata) => {
      email = logindata.email;
      password = logindata.password;
    });
  })


  it("Login without email and password", () => {
    loginPage.verifyIfLoginButtonDisabled();

  });

  it("Login with invalid email and password", () => {
    loginPage.keyInEmail("invalid@gmail.com");
    loginPage.keyInPassword("invalidpwd");
    loginPage.clickLogin();
    loginPage.verifyErrorMsgCredsValid();

  });


  it("Login with Valid email and password", () => {
    loginPage.keyInEmail(email);
    loginPage.keyInPassword(password);
    loginPage.clickLogin();
    loginPage.verifyIfLoginSuccessful();
  });



  it('Logout', () => {
    logoutPage.logout();
  });

});
