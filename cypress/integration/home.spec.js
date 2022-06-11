describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Verifica se a tela de Loading existe', () => {
    cy.contains('Carregando...');
  });
  it('Verifica se a tela principal está com os elementos corretos', () => {
    const THREE_SECONDS = 3000;
    cy.wait(THREE_SECONDS);
    cy.contains('Agende seus Horários');
    cy.get('.logo').should(
      'have.attr', 'src', '/static/media/logo.b1ed3d9a.svg',
    );
    cy.get('.MuiAvatar-img').should('exist');
    cy.get('.login-logout').should('be.visible');
    cy.get('.textarea-container').should('exist');
    cy.get('.color-picker-button').should('exist');
    cy.get('.add-event-button').should('exist');
  });
});
