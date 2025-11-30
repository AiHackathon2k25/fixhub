'use client';

import { useState } from 'react';
import ProtectedClient from '@/app/components/ProtectedClient';
import DashboardNav from '@/app/components/DashboardNav';
import UploadForm from '@/app/components/UploadForm';
import AnalysisResultCard from '@/app/components/AnalysisResultCard';
import AnalysisHistory from '@/app/components/AnalysisHistory';
import ClaimModal from '@/app/components/ClaimModal';
import { AnalysisResult } from '@/lib/types';
import { apiPost } from '@/lib/apiClient';

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [currentDescription, setCurrentDescription] = useState<string>('');
  const [currentFileNames, setCurrentFileNames] = useState<string[]>([]);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingTicket, setIsSendingTicket] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const handleAnalyze = async (description: string, files: File[]) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setCurrentDescription(description);
    setCurrentFileNames(files.map(f => f.name));

    try {
      // Create base64 previews for immediate display (even without Cloudinary)
      const imagePreviews: string[] = [];
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          imagePreviews.push(base64);
        }
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('description', description);
      
      // Add all files
      files.forEach(file => {
        formData.append('files', file);
      });

      // Upload to backend with files
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const token = localStorage.getItem('fixhub_token');
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        // Handle 401 errors - clear invalid token
        if (response.status === 401) {
          localStorage.removeItem('fixhub_token');
          window.location.href = '/auth/login';
          return;
        }
        
        const errorData = await response.json().catch(() => ({ error: 'Analysis failed' }));
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
      
      // If no Cloudinary URLs returned, use base64 previews temporarily
      // (Backend will save empty array, but we can show previews in frontend)
      
      // Trigger history refresh
      setHistoryRefresh(prev => prev + 1);
      
      setSuccessMessage('Analysis completed successfully!');
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
      
      // Immediately refresh history to show updated provider info
      // Small delay to ensure backend has finished updating the history
      setTimeout(() => {
        setHistoryRefresh(prev => prev + 1);
        console.log('🔄 [Dashboard] History refreshed after ticket creation');
      }, 500); // 500ms delay to ensure backend update completes
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send ticket');
      console.error('Ticket error:', err);
    } finally {
      setIsSendingTicket(false);
    }
  };

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-slate-50">
        <DashboardNav />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Banner */}
          <div className="mb-8 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-2xl p-8 shadow-xl border border-slate-600">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
                <p className="text-slate-300">File a new claim or manage your existing claims below</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-slate-700/50 backdrop-blur rounded-xl p-4 border border-slate-600">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-400">5</div>
                    <div className="text-xs text-slate-400 mt-1">Active Claims</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">

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
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg shadow-md animate-fade-in">
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
            </div>

            {/* Right Column - History & Stats */}
            <div className="space-y-6">
              {/* Analysis History */}
              <AnalysisHistory onRefresh={historyRefresh} />
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">✅</span>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Completed</div>
                        <div className="text-lg font-bold text-slate-800">12</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">⏳</span>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Pending</div>
                        <div className="text-lg font-bold text-slate-800">5</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600">Total Claims</div>
                        <div className="text-lg font-bold text-slate-800">17</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Claim Approved</p>
                      <p className="text-xs text-slate-500">Dishwasher repair - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Under Review</p>
                      <p className="text-xs text-slate-500">Phone screen - 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">Claim Submitted</p>
                      <p className="text-xs text-slate-500">Water leak - 2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Help & Support */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl shadow-md p-6 border border-teal-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Need Help?</h3>
                <p className="text-sm text-slate-600 mb-4">Our support team is here 24/7</p>
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <ClaimModal
          open={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          summary={analysisResult?.insuranceSummary || null}
        />
      </div>
    </ProtectedClient>
  );
}

