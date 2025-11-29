/**
 * Mock database for analysis history using localStorage
 */

import { AnalysisResult } from './types';

export interface AnalysisHistoryItem {
  id: string;
  description: string;
  fileNames: string[];
  result: AnalysisResult;
  timestamp: string;
  userId: string;
}

const HISTORY_KEY = 'fixhub_analysis_history';

export function saveAnalysisToHistory(
  description: string,
  fileNames: string[],
  result: AnalysisResult,
  userId: string
): void {
  if (typeof window === 'undefined') return;

  const historyItem: AnalysisHistoryItem = {
    id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    description,
    fileNames,
    result,
    timestamp: new Date().toISOString(),
    userId,
  };

  const history = getAnalysisHistory(userId);
  history.unshift(historyItem); // Add to beginning

  // Keep only last 50 items
  const limitedHistory = history.slice(0, 50);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
}

export function getAnalysisHistory(userId: string): AnalysisHistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];

    const allHistory: AnalysisHistoryItem[] = JSON.parse(stored);
    
    // Filter by userId (in real app, this would be server-side)
    return allHistory.filter(item => item.userId === userId);
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

export function clearAnalysisHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

export function deleteHistoryItem(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return;

    const history: AnalysisHistoryItem[] = JSON.parse(stored);
    const filtered = history.filter(item => item.id !== id);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting history item:', error);
  }
}

