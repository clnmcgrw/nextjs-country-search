
type CountryName = {
  common: string
  official: string
  nativeName: Record<string, any>
}

type CountryFlag = {
  png: string
  svg: string
  alt: string
}

export interface CountryBase {
  name: CountryName
}

export interface CountryType {
  name: CountryName
  flags: CountryFlag
  population: number
  region: string
  capital: string[]
  [key?: string]: string | string[] // allows dynamic property access
}

type CurrencyType = {
  [key: string]: { name: string, symbol: string }
}

export interface CountryDetailType extends CountryType {
  tld: string[]
  subregion: string
  currencies: CurrencyType
  languages: Record<string, any>
  borders: string[]
  status?: number
  message?: string
}

export type ResultItemProps = {
  country: CountryType
  priority: boolean
}

export type DetailPageProps = {
  params: { country: string }
}

export type DetailViewProps = {
  country: CountryDetailType
}

export type AppProviderProps = {
  countries: CountryType[]
  children: React.ReactNode
}

export type AppProviderValues = {
  results: CountryType[]
  country: CountryDetailType | null
  regions: string[]
  searchTerm: string
  searchCountries: (event: React.ChangeEvent<HTMLInputElement>) => void
  regionFilter: string | null
  filterByRegion: (region: string) => void
  children: React.ReactNode
} | Record<string, any>

export interface ButtonSlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export interface ButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean
  size?: 'sm' | 'lg'
}

export type ThemeToggleModes = 'light' | 'dark'
