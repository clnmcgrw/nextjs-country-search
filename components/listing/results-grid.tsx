'use client';
import Image from 'next/image';
import Link from 'next/link';
import { capitalize, slugify } from '@/lib/utils';
import { useAppContext } from '@/lib/hooks';
import { ResultItemProps, CountryType } from '@/types';
import style from '@/styles/results-grid.module.css';

const itemInfoKeys = [
  'population',
  'region',
  'capital'
];

const ResultsItem = ({ country, priority }: ResultItemProps) => (
  <li className={style.item} data-cy="result-item">
    <Link href={slugify(country.name.common)}>
      <figure className={style.flag}>
        {/* using fill w/ padding-bottom hack, because height/width differ between countries,
        but would want designer/ux'r input about this vs 'contain' vs other options */}
        <Image
          src={country.flags.svg}
          alt={country.flags.alt}
          fill={true}
          priority={priority}
        />
      </figure>
      <div className={style.itemInfo}>
        <h4 data-cy="result-name">{country.name.common}</h4>
        {itemInfoKeys.map((key, i) => {
          const value = country[key];
          return (
            <p key={`detail-${i}`}>
              <strong>{capitalize(key)}: </strong>
              <span>{value.toLocaleString()}</span>
            </p>
          );
        })}
      </div>
    </Link>
  </li>
);

const ResultsGrid = () => {
  const { results, searchTerm, regionFilter } = useAppContext();

  return (
    <section className={style.section}>
      <div className="ws-inner">
        {Boolean(results.length) ? (
          <ul className={style.grid} id="ws-results">
          {results.map((country: CountryType, index: number) => (
            <ResultsItem 
              key={index}
              country={country}
              priority={index <= 6}
            />
          ))}
          </ul>
        ) : (
          <div className={style.noResults} data-cy="no-results">
            <p>No results found for &quot;{searchTerm}&quot; {regionFilter ? ` in ${regionFilter}` : ''}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsGrid;
