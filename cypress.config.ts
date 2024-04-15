import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      searchTerm: 'United States',
      regionFilter: 'Asia',
      borderCountryCount: 2,
      detailCountries: ['Guinea-Bissau', 'Cocos (Keeling) Islands', 'United States'],
      themeCookieKey: 'theme',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
