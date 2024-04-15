import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCountry } from '@/lib/api-client';
import CountryDetailView from '@/components/detail/detail-view';
import { slugify, unslugify } from '@/lib/utils';
import { DetailPageProps, CountryDetailType } from '@/types';

const findCountryMatch = (countries: CountryDetailType[], slug: string) => {
  return countries.length === 1 ? countries[0] : (
    countries?.find(country => slug === slugify(country.name.common))
  );
};

const getCountryFromParam = async (param: string) => {
  let country = null;
  const countryParam = unslugify(param);
  const response = await getCountry(countryParam);
  if (response?.status !== 404) {
    country = findCountryMatch(response, countryParam);
  }
  return country;
};

const CountryDetailPage = async ({ params }: DetailPageProps) => {
  let country = null;
  // alternately, could do all data-fetching in parent layout and get all country fields
  // might be worth comparing performance of that approach
  try {
    country = await getCountryFromParam(params.country);
  // catch error to prevent error boundary when no country is found
  } catch (error: any) {
    return notFound();
  }

  return country ? (
    <CountryDetailView country={country} />
  ) : notFound();
};

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const country = await getCountryFromParam(params.country);
  return {
    title: !country ? 'Page Not Found' : `${country.name.official} - Country Information`,
    description: country && `View details about ${country.name.official} including captial city, population, currencies, and more`,
  };
}

export default CountryDetailPage;
