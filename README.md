# Country Search w/ NextJS

A simple application that pulls information from the [REST Countries API](https://restcountries.com/#api-endpoints-v3) and allows users to search for countries, filter by region, and view a country detail page.

#### Local Dev

Run the project locally with:

```
npm run dev
```


#### Tests

There is a small suite of Cypress e2e tests for some of the core functionality. To open Cypress locally, run:

```
npm run cypress:open

```

#### Todos (nice-to-have / enhancements)

- better loading state for detail page, or prevent need for supsense all-together
- prevent flash of unfiltered results when search params are present
- sticky search bar
- enable nicer postcss features (custom-media, nesting, etc)
- re-usable dropdown (take generic props instead of using context)
- full metadata including open-graph, schema, etc.
- custom search input 'X' control
- i18n support (or at least centralize UI text)
- host on Vercel 🤷‍♂️

