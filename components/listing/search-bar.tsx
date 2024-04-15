'use client';
import { Search } from 'lucide-react';
import DropdownFilters from '@/components/listing/dropdown';
import { useAppContext } from '@/lib/hooks';
import style from '@/styles/search-bar.module.css';

const SearchBar = () => {
  const { searchTerm, searchCountries } = useAppContext();

  // prevent page-reloads
  const submitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchCountries(event.target.value);
  };

  return (
    <div className={style.searchBar}>
      <div className={`ws-inner ${style.inner}`}>

        <form onSubmit={submitHandler} className={style.form} role="search">
          <label htmlFor="search-countries" className="sr-only">Search for a country</label>
          <input
            type="search"
            id="search-countries"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={searchHandler}
            className={style.input}
            aria-controls="ws-results"
            data-cy="search-input"
          />
          <Search size={20} aria-hidden={true} />
        </form>

        <DropdownFilters />

      </div>
    </div>
  );
};

export default SearchBar;
