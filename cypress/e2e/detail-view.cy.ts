import { slugify } from '../../lib/utils';

describe('Country detail view', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const DETAIL_COUNTRIES = Cypress.env('detailCountries');

  DETAIL_COUNTRIES.forEach((name: string) => {
    it(`Should find the country (${name}) based on the page path/slug`, () => {
      cy.contains(name).click();
      cy.url().should('include', `/${slugify(name)}`);
      cy.get('[data-cy="not-found"]').should('not.exist');
      cy.get('[data-cy="error"]').should('not.exist');
    });
  });

  it('Should find border countries', () => {
    const SEARCH_TERM = Cypress.env('searchTerm');
    const BORDER_COUNTRIES_LENGTH = Cypress.env('borderCountryCount');

    cy.get('[data-cy="search-input"]').type(SEARCH_TERM);
    cy.contains(SEARCH_TERM).first().click();
    cy.get('[data-cy="border-countries"]').should('exist');
    cy.get('[data-cy="border-countries"] > li').should('have.length', BORDER_COUNTRIES_LENGTH);
  });
});
