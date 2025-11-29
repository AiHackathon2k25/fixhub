import { AnalysisResult } from './analysis';

export interface Ticket {
  id: string;
  userId: string;
  description: string;
  analysis: AnalysisResult;
  createdAt: Date;
}

