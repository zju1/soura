export type SingleMarySearchStatus = "active" | "completed" | "done";

export interface SingleMarySearch {
  searchId: string;
  title: string;
  createdDate: string;
  region: string;
  targetIndustry: string;
  material: string;
  certRequirements: string[];
  leadTimeTarget: string; // > 15 days, < 12 days etc.
  owner: string;
  status: SingleMarySearchStatus;
  materials: string[];
  json: string;
}

export interface SingleCompany {
  company_name: string;
  company_type: string;
  year_founded: number;
  employee_count: {
    value: number;
    type: string;
  };
  revenue: {
    value: number;
    type: string;
  };
  main_industry: string;
  main_sector: string;
  short_description: string;
  business_tags_extracted: string[];
  primary_phone: string;
  phone_numbers: string[];
  linkedin_url: string;
  website_domain: string;
}

export interface CompanySearchResult {
  result: SingleCompany[];
  count: number;
}
