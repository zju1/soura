export interface SingleVeridionResult {
  veridion_id: string;
  company_name: string;
  company_commercial_names: string[];
  company_legal_names: string[];
  main_address: MainAddress;
  locations: MainAddress[];
  num_locations: number;
  company_type: string;
  year_founded: number;
  employee_count: EmployeeCount;
  revenue: EmployeeCount;
  main_business_category: string;
  main_industry: string;
  main_sector: string;
  naics_2022: Naics2022;
  nace_rev2: SicsIndustry[];
  ncci_codes_28_1: string[];
  sic: SicsIndustry[];
  isic_v4: SicsIndustry[];
  ibc_insurance: SicsIndustry[];
  sics_industry: SicsIndustry;
  sics_subsector: SicsIndustry;
  sics_sector: SicsIndustry;
  short_description: string;
  long_description_extracted: string;
  long_description_generated: string;
  business_tags_extracted: string[];
  business_tags_generated: string[];
  primary_phone: string;
  phone_numbers: string[];
  primary_email: string;
  emails: null;
  website_url: string;
  website_domain: string;
  website_tld: string;
  website_language_code: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  linkedin_url: string;
  ios_app_url: null;
  android_app_url: null;
  youtube_url: string;
  technologies: string[];
  created_at: Date;
  last_updated_at: Date;
}

export interface EmployeeCount {
  value: number;
  type: string;
}

export interface SicsIndustry {
  code: string;
  label: string;
}

export interface MainAddress {
  country_code: CountryCode;
  country: Country;
  region: string;
  city: string;
  postcode: string;
  street: string;
  street_number: string;
  latitude: number;
  longitude: number;
}

export enum Country {
  UnitedStates = "United States",
}

export enum CountryCode {
  Us = "US",
}

export interface Naics2022 {
  primary: SicsIndustry;
  secondary: null;
}
