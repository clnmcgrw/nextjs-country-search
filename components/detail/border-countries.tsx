import Link from 'next/link';
import { getBorderCountries } from '@/lib/api-client';
import Button from '@/components/shared/button';
import { slugify } from '@/lib/utils';
import { CountryBase } from '@/types';
import style from '@/styles/border-countries.module.css';

const BorderCountries = async ({ borders }: { borders: string[] }) => {
  const countries = await getBorderCountries(borders);

  return (
    <div className={style.container}>
      <h4 className={style.title}>Border Countries:</h4>
      <ul className={style.list} data-cy="border-countries">
      {countries.map((country: CountryBase, index: number) => (
        <li key={index}>
          <Button asChild size="sm">
            <Link href={`/${slugify(country.name.common)}`}>
              {country.name.common}
            </Link>
          </Button>
        </li>
      ))}
      </ul>
    </div>
  )
};

export default BorderCountries;
