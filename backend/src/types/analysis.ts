export type Severity = 'minor' | 'moderate' | 'severe';
export type Category = 'appliance' | 'vvs' | 'electronics';

export interface AnalysisResult {
  category: Category;
  subCategory: string;
  severity: Severity;
  estimatedCost: string;
  repairOrReplace: 'repair' | 'replace';
  insuranceSummary: string;
}

