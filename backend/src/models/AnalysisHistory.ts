import { Document } from '../mockDB';
import { AnalysisResult } from '../types/analysis';

export interface AnalysisHistoryDocument extends Document {
  _id: string;
  userId: string;
  description: string;
  fileNames: string[];
  imageUrls: string[]; // Cloudinary URLs
  result: AnalysisResult;
  ticketId?: string; // Link to ticket if created
  providerId?: string; // Assigned service provider
  providerName?: string; // Provider name
  providerEmail?: string; // Provider email
  providerCompany?: string; // Provider company name
  providerCategory?: string; // Provider category (plumbing, electronics, etc.)
  createdAt: string;
}

