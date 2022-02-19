describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Verifica se a tela de Loading existe', () => {
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
  });

  it('can add new todo items', () => {
    const newItem = 'Feed the cat';
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);
    cy.get('.todo-list li')
      .last()
      .should('have.text', newItem);
  });
});
