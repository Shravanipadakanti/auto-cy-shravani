export class CreateUpdateDeletePage {

  public createNewNote(notes: string) {

    cy.contains("Your Notes");
    cy.get('a[href="/notes/new"]').click({ force: true });
    cy.get(`textarea[id="content"]`).first().then(($notesTxtField) => {
        cy.wrap($notesTxtField).clear({ force: true }).type(notes, {force: true,});
      });
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains(notes);
  }

  public verifyCreateButtonDisabledWithoutContent() {

    cy.contains("Your Notes");
    cy.get('a[href="/notes/new"]').click({ force: true });
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains("Scratch").click({force:true});
    
  }

  public updateNotes(notes: string, updateText: string) {

    cy.contains("Your Notes");
    cy.contains(notes).click({ force: true });
    cy.get(`textarea[id="content"]`).first().then(($notesTxtField) => {
        cy.wrap($notesTxtField).clear({ force: true }).type(updateText, {force: true,});
      });
      cy.get('button[type="submit"]').click({ force: true });
      cy.contains(updateText);
    
  }

  public daleteNotes(notes: string) {

    cy.contains("Your Notes");
    cy.contains(notes).click({ force: true });
    cy.contains("Delete").click({ force: true });
    cy.on('window:confirm',(txt)=>{
        expect(txt).to.equal('Are you sure you want to delete this note?')
        });
    cy.contains(notes).should('not.exist');
  }

  public daleteNotesThatsNotPresent(notes: string) {

    cy.contains("Your Notes");
    cy.contains(notes).should('not.exist');
  }


}
