import { mockDB } from '../mockDB';
import { AnalysisHistoryDocument } from '../models/AnalysisHistory';
import { AnalysisResult } from '../types/analysis';

const historyCollection = mockDB.collection<AnalysisHistoryDocument>('analysisHistory');

export function saveAnalysis(
  userId: string,
  description: string,
  fileNames: string[],
  imageUrls: string[],
  result: AnalysisResult
): AnalysisHistoryDocument {
  const doc = historyCollection.insertOne({
    userId,
    description,
    fileNames,
    imageUrls,
    result,
    createdAt: new Date().toISOString(),
  });
  
  console.log(`📦 [MockDB] Analysis saved for user: ${userId} with ${imageUrls.length} images`);
  return doc;
}

export function getUserHistory(userId: string, limit: number = 50): AnalysisHistoryDocument[] {
  const all = historyCollection.find({ userId });
  
  // Sort by createdAt descending (newest first)
  all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  // Limit results
  return all.slice(0, limit);
}

export function deleteAnalysis(userId: string, analysisId: string): boolean {
  // Ensure user can only delete their own analyses
  const doc = historyCollection.findById(analysisId);
  if (!doc || doc.userId !== userId) {
    return false;
  }
  
  return historyCollection.deleteOne({ _id: analysisId });
}

export function getAnalysisById(analysisId: string): AnalysisHistoryDocument | null {
  return historyCollection.findById(analysisId);
}

export function clearUserHistory(userId: string): number {
  return historyCollection.deleteMany({ userId });
}

export function getTotalAnalysisCount(): number {
  return historyCollection.countDocuments();
}

