describe('Login flow', () => {
  // use these credentials to login
  const email = 'ruben26rcz@gmail.com';
  const password = '1234';

  it('Can login', () => {
    cy.visit('/');
    cy.get('header a[href*="login"]').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[type="submit"]').click();
  });
});
