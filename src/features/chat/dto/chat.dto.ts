interface ImportExportStats {
  gk: string; // Statistical Interval
  weight_sum: number; // Kilogram Weight
  quantity_sum: number; // Quantity
  sumOfMoney_sum: number; // Total Value in USD
  qtyUnitPrice_avg: number; // Quantity USD Average Price
  weightUnitPrice_avg: number; // Weight USD Average Price
  trades_sum: number; // Trade Transactions
  percent: number; // Percentage
}

export interface Business {
  name: string; // Full legal name of the company
  website?: string; // Mock website URL
  taxNo?: string; // Tax Number
  industry?: string; // Industry
  desc?: string; // Description
  createdDate: string; // Creation Time
  country: string; // Country
  logistic: boolean; // Logistics Trademark Recognition

  tels: string[]; // Mock tel numbers
  mails: string[]; // Mock mail address
  faxs: string[]; // Mock fax
  facebooks: string[]; // Mock facebook urls
  linkedins: string[]; // Mock linkedin urls
  twitters: string[]; // Mock twitter urls
  instagrams: string[]; // Mock instagram urls
  youtubes: string[]; // Mock youtube urls

  address: string[];
  nationalIds: string[];

  importStats: ImportExportStats; // Import Statistics Data
  exportStats: ImportExportStats; // Export Statistics Data
}

export interface IMessage {
  chatId: string;
  sender: "user" | "assistant" | "tool" | "system";
  content: string;
  data: Business[];
  createdAt: string;
  _id: string;
}
