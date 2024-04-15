//'use client';
import Image from 'next/image';
import BackButton from '@/components/detail/back-button';
import BorderCountries from '@/components/detail/border-countries';
import { DetailViewProps } from '@/types';
import style from '@/styles/detail-view.module.css';

const CountryDetailView = ({ country }: DetailViewProps) => {
  const languageKeys = Object.keys(country.languages);
  const nativeNameKey = languageKeys[languageKeys.length - 1];

  const currencyKeys = Object.keys(country.currencies);
  const currencies = currencyKeys.map(key => country.currencies[key].name).filter(c => c);

  const details = [
    { label: 'Native Name', value: country.name.nativeName?.[nativeNameKey]?.official },
    { label: 'Top Level Domain', value: country.tld.join(', ') },
    { label: 'Population', value: country.population.toLocaleString() },
    { label: 'Currencies', value: currencies.join(', ') },
    { label: 'Region', value: country.region },
    { label: 'Languages', value: Object.values(country.languages).join(', ') },
    { label: 'Sub Region', value: country.subregion },
    { label: 'Capital', value: country.capital.join(', ') },
  ];

  return (
    <>
      <nav className={style.back}>
        <div className="ws-inner">
          <BackButton className={style.backButton} />
        </div>
      </nav>

      <section className={style.section}>
        <div className={style.content}>
          <div className={`ws-inner ${style.inner}`}>

            <div className={style.column}>
              <figure className={style.image}>
                <Image
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  fill={true}
                  priority={true}
                />
              </figure>
            </div>

            <div className={style.column}>
              <h1 className={style.title}>{country.name.common}</h1>
              <ul className={style.detailList}>
                {details.map((item, index) => Boolean(item.value) && (
                  <li key={index}>
                    <strong>{`${item.label}: `}</strong>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
              {country.borders.length > 0 && (
                <BorderCountries borders={country.borders as string[]} />
              )}
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default CountryDetailView;
