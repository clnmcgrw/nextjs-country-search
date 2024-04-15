import { CountryBase, CountryType } from '@/types';

// Rest Countries API Client
const API_BASE_URL = 'https://restcountries.com/v3.1';

const LISTING_FIELDS = ['name', 'flags', 'population', 'region', 'capital'];
const DETAIL_FIELDS = [...LISTING_FIELDS, 'subregion', 'tld', 'currencies', 'languages', 'borders', 'cca2'];

const request = async (path: string) => {
  const response = await fetch(`${API_BASE_URL}/${path}`);
  const json = await response.json();
  return json;
};

export const getCountries = (): Promise<CountryType[]> => (
  request(`/all?fields=${LISTING_FIELDS.join(',')}`)
);

export const getCountry = (name: string) => (
  request(`/name/${name}?fullText=true&fields=${DETAIL_FIELDS.join(',')}`)
);

export const getBorderCountries = (borders: string[]): Promise<CountryBase[]> => (
  request(`/alpha/?codes=${borders.join(',')}&fields=name`)
);

// helper to get all available regions from 'all countries' response
export const getAllRegions = (countries: CountryType[]): string[] => {
  const regions = countries.map(country => country.region);
  return Array.from(new Set(regions));
};
