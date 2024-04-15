import AppProvider from '@/components/provider';
import SearchBar from '@/components/listing/search-bar';
import ResultsGrid from '@/components/listing/results-grid';
import { getCountries } from '@/lib/api-client';

const Homepage = async () => {
  const countries = await getCountries();
  // could also have a default sorting option
  countries.sort((a, b) => b.population - a.population);

  return (
    <AppProvider countries={countries}>
      <SearchBar />
      <ResultsGrid />
    </AppProvider>
  );
};

export default Homepage;
