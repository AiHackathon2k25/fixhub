import { Document } from '../mockDB';
import { AnalysisResult } from '../types/analysis';

export interface TicketDocument extends Document {
  _id: string;
  userId: string;
  description: string;
  analysis: AnalysisResult;
  analysisHistoryId?: string; // Link back to analysis
  providerId?: string; // Assigned service provider
  providerName?: string; // Provider name for quick access
  providerEmail?: string; // Provider email
  providerCompany?: string; // Provider company name
  providerCategory?: string; // Provider category
  status: 'pending' | 'assigned' | 'in-progress' | 'completed';
  createdAt: string;
}

