import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { CreateUpdateDeletePage } from '../pages/CreateUpdateDeletePage'


describe("Login and Logout Tests", () => {

  const loginPage = new LoginPage();
  const logoutPage = new LogoutPage();
  const createupdatedeletePage = new CreateUpdateDeletePage();

  let email: string;
  let password: string;
  let notes: string; 
  let updateText: string;

  before(() => {
    cy.visit('/');
    cy.fixture('loginData').then((logindata) => {
      email = logindata.email;
      password = logindata.password;
    });
    cy.fixture('notesData').then((notesdata) => {
      notes = notesdata.notes;
      updateText = notesdata.updateText;
    });
  })

  it("Login with Valid email and password", () => {
    loginPage.keyInEmail(email);
    loginPage.keyInPassword(password);
    loginPage.clickLogin();
    loginPage.verifyIfLoginSuccessful();
  });

  it("Nagative Test: Create a new note with out entering notes content", () => {
    createupdatedeletePage.verifyCreateButtonDisabledWithoutContent();
  });
  it("Create a new note and verify on home page", () => {
    createupdatedeletePage.createNewNote(notes);
  });

  it("Update a note and verify on home page", () => {
    createupdatedeletePage.updateNotes(notes, updateText);
  });


  it("Delete a note and verify on home page", () => {
    createupdatedeletePage.daleteNotes(updateText);
  });

  it("Negative Test: Delete a note thats not present", () => {
    createupdatedeletePage.daleteNotesThatsNotPresent(notes);
  });

  it('Logout', () => {
    logoutPage.logout();
  });

});
