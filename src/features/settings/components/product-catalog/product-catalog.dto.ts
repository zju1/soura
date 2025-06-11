// Product catalog TypeScript interfaces for Mongoose schema

export interface TechSpec {
  name: string;
  value: string;
}

export interface ProductCatalog {
  _id: string;
  product_id: string;
  product_name: string;
  description: string;
  product_type: string;
  material: string;
  certifications: string[];
  moq: number;
  lead_time_days: number;
  unit_price_usd: number;
  annual_capacity: number;
  factory_location: string;
  tech_specs: TechSpec[];
  createdAt?: string;
  updatedAt?: string;
}
