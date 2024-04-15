'use client';
import { createContext, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAllRegions } from '@/lib/api-client';
import { AppProviderProps, AppProviderValues, CountryType } from '@/types';

export const AppContext = createContext<AppProviderValues>({});

const getSearchResults = async (term: string, region: string | null, countries: CountryType[]) => {
  const FuseJS = (await import('fuse.js')).default;
  const fuse = new FuseJS(countries, {
    keys: [
      { name: 'term', getFn: country => country.name.common },
      { name: 'region', getFn: country => country.region },
    ],
    threshold: 0.25,
  });

  const searchConfig = {};
  if (term.length) {
    Object.assign(searchConfig, { term });
  }
  if (region) {
    Object.assign(searchConfig, { region });
  }

  let searchResults = countries;
  if (Object.keys(searchConfig).length) {
    const fuseResults = fuse.search(searchConfig);
    searchResults = fuseResults.map(({ item }) => item);
  }
  return searchResults;
};

const AppProvider = ({ countries, children }: AppProviderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(Array.from(searchParams.entries()));

  const [results, setResults] = useState(countries);
  const [searchTerm, setSearchTerm] = useState(params.get('q') ?? '');
  const [regionFilter, setRegionFilter] = useState<string | null>(params.get('region') ?? null);
  const regions = getAllRegions(countries);

  const setSearchParams = (key: string, value: string | null) => {
    if (!Boolean(value)) {
      params.delete(key);
    } else {
      params.set(key, value as string);
    }
    const query = params.toString();
    router.replace(`?${query}`, { scroll: false });
  };

  // Search input handler
  const searchCountries = async (term: string) => {
    setSearchTerm(term);
    const inputValue = term.trim();
    const searchResults = await getSearchResults(inputValue, regionFilter, countries);
    setResults(searchResults);
    setSearchParams('q', inputValue);
  };

  // Region filter handler
  const filterByRegion = async (region: string | null) => {
    setRegionFilter(region);
    const searchResults = await getSearchResults(searchTerm, region, countries);
    setResults(searchResults);
    setSearchParams('region', region);
  };

  // handle search params on page load (enables deep-linking to results)
  useEffect(() => {
    (async () => {
      const searchQuery = params.get('q');
      const regionQuery = params.get('region');
      if (searchQuery || regionQuery) {
        const searchResults = await getSearchResults(searchQuery ?? '', regionQuery ?? null, countries);
        setResults(searchResults);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const providerValue: AppProviderValues = {
    results,
    regions,
    searchTerm,
    searchCountries,
    regionFilter,
    filterByRegion,
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;
