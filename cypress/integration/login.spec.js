describe('Blog app', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.get('input:first').type('test1');
      cy.get('input:last').type('test1password');
      cy.contains('log in').click();
      expect(cy.get('#resDiv').contains(''));
    })
  })