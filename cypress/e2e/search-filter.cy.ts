
describe('Search & filter functionality', () => {
  const SEARCH_TERM = Cypress.env('searchTerm');
  const REGION = Cypress.env('regionFilter');
  let initialTotal = 0;

  function assertFilterResults() {
    cy.get('[data-cy="result-item"]').should('have.length.lessThan', initialTotal);
    cy.get('[data-cy="result-name"]').should('contain.text', SEARCH_TERM);
  }

  it('Filters results when search input value changes', () => {
    cy.visit('/');
    cy.get('[data-cy="result-item"]').then($els => {
      initialTotal = $els.length;
      cy.get('[data-cy="search-input"]').type(SEARCH_TERM);
      assertFilterResults();
    });
  });

  it('Deep-links to results when params are present', () => {
    cy.visit(`/?q=${encodeURI(SEARCH_TERM)}`);
    assertFilterResults();
  });

  it('Shows message when no results are found', () => {
    cy.visit(`/?q=${encodeURI(SEARCH_TERM)}&region=${REGION}`);
    cy.get('[data-cy="no-results"]').should('exist');
  });

  it('Toggles the filters dropdown correctly', () => {
    cy.visit('/');
    cy.get('[data-cy="dropdown-trigger"]').click();
    cy.get('[data-cy="dropdown-list"]').should('be.visible');
    cy.get('[data-cy="dropdown-trigger"]').click();
    cy.get('[data-cy="dropdown-list"]').should('not.be.visible');
  });
});
