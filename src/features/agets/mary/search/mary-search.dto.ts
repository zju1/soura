export type SingleMarySearchStatus = "active" | "completed" | "done";

export interface SingleMarySearch {
  searchId: string;
  title: string;
  createdDate: string;
  region: string;
  targetIndustry: string;
  material: string;
  certRequirements: string[];
  moqRange: number[]; // 3K - 10K, 1K - 5K etc.
  leadTimeTarget: string; // > 15 days, < 12 days etc.
  owner: string;
  status: SingleMarySearchStatus;
}
