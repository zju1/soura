export type OrganizationType = "company" | "supplier";

export interface TotalOrganizationShipment {
  cost: number;
  count: number;
}

export interface OrganizationShipmentStat {
  sea: number;
  air: number;
  land: number;
  rail: number;
}

export interface OrganizationTEUStat {
  perShipment: number;
  perMonth: number;
}

export interface OrganizationProduct {
  name?: string;
  hsCode: string;
}

export interface OrganizationContact {
  phones: string[];
  websites: { title: string; url: string }[];
  socialMedias: { title: string; url: string }[];
}

export interface SingleOrganization {
  name: string;
  type: OrganizationType;
  isCompetitor: boolean;
  /* Locations */
  location: string;
  country: string;
  /* Contacts */
  contacts: OrganizationContact;
  /* Products */
  tags: string[];
  productDescription: string;
  products: OrganizationProduct[];
  /* Calculated from backend */
  /* Calculated from backend */
  /* Calculated from backend */
  _id?: string;
  aggregatedVolume?: number;
  topDestinationPorts?: string[];
  topDeparturePorts?: string[];
  totalShipments?: TotalOrganizationShipment;
  shipments?: OrganizationShipmentStat;
  averageTEU?: OrganizationTEUStat;
  totalTEU?: number;
  totalWeight?: number;
  topHSCodes?: string[];
  topSuppliers?: Omit<SingleOrganization, "topSuppliers" | "topCustomers">[];
  topCustomers?: Omit<SingleOrganization, "topCustomers" | "topSuppliers">[];
  createdAt?: string;
  updatedAt?: string;
}

export const initialOrganization: SingleOrganization = {
  name: "",
  country: "",
  type: "supplier",
  location: "",
  contacts: {
    phones: [""],
    socialMedias: [{ title: "", url: "" }],
    websites: [{ title: "", url: "" }],
  },
  isCompetitor: false,
  productDescription: "",
  products: [{ hsCode: "", name: "" }],
  tags: [],
};
