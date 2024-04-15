
describe('Dark mode support', () => {
  Cypress.Cookies.debug(true);
  const COOKIE_KEY = Cypress.env('themeCookieKey');

  beforeEach(() => {
    cy.visit('/');
    cy.clearCookie(COOKIE_KEY);
    cy.wait(150);
  });

  it('Sets a "theme" cookie value', () => {
    cy.get('[data-cy="theme-toggle"]').click().click();
    cy.getCookie(COOKIE_KEY).should('have.property', 'value', 'dark');
  });

  it('Applies data attribute to document', () => {
    cy.get('[data-cy="theme-toggle"]').click().click();
    cy.get('html').invoke('attr', 'data-theme').should('eq', 'dark');
  });
});
