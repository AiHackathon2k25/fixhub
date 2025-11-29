'use client';

import { useState } from 'react';
import ProtectedClient from '@/app/components/ProtectedClient';
import Header from '@/app/components/Header';
import UploadForm from '@/app/components/UploadForm';
import AnalysisResultCard from '@/app/components/AnalysisResultCard';
import ClaimModal from '@/app/components/ClaimModal';
import Footer from '@/app/components/Footer';
import { AnalysisResult } from '@/lib/types';
import { apiPost } from '@/lib/apiClient';

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentDescription, setCurrentDescription] = useState<string>('');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingTicket, setIsSendingTicket] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAnalyze = async (description: string, file: File) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setCurrentDescription(description);

    try {
      const result = await apiPost<AnalysisResult>('/api/analyze', { description }, true);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTicket = async () => {
    if (!analysisResult) return;

    setIsSendingTicket(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await apiPost(
        '/api/tickets',
        {
          description: currentDescription,
          analysis: analysisResult,
        },
        true
      );

      setSuccessMessage(response.message || 'Ticket sent successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send ticket');
      console.error('Ticket error:', err);
    } finally {
      setIsSendingTicket(false);
    }
  };

  return (
    <ProtectedClient>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-2">Damage Analysis Dashboard</h1>
            <p className="text-blue-100">Upload an image and describe the damage to get instant AI-powered assessment</p>
          </div>

          <UploadForm onAnalyze={handleAnalyze} isLoading={isLoading} />

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 shadow-md animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg mb-6 shadow-md animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-bold">Success!</p>
                  <p>{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {analysisResult && (
            <AnalysisResultCard
              result={analysisResult}
              onOpenClaim={() => setIsClaimModalOpen(true)}
              onSendTicket={handleSendTicket}
              isSendingTicket={isSendingTicket}
            />
          )}

          <ClaimModal
            open={isClaimModalOpen}
            onClose={() => setIsClaimModalOpen(false)}
            summary={analysisResult?.insuranceSummary || null}
          />

          <Footer />
        </div>
      </div>
    </ProtectedClient>
  );
}

