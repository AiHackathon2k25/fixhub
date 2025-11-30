export type Severity = 'minor' | 'moderate' | 'severe';
export type Category = 'appliance' | 'electronics' | 'plumbing' | 'furniture' | 'other';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Urgency = 'low' | 'normal' | 'high';

export interface AnalysisResult {
  // New enhanced fields
  issueSummary: string;
  recommendedFix: string;
  difficulty: Difficulty;
  urgency: Urgency;
  
  // Existing fields (kept for backward compatibility)
  category: Category;
  subCategory: string;
  severity: Severity;
  estimatedCost: string;
  repairOrReplace: 'repair' | 'replace';
  insuranceSummary: string;
}

