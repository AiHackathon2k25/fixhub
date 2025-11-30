'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  const [activeTab, setActiveTab] = useState<'create' | 'history' | 'activities'>('create');

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
      <div className="min-h-screen bg-white">
        <DashboardNav />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Welcome Banner */}
          <div className="mb-6 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-white/80">Welcome to Your Dashboard</h1>
                <p className="text-white/90 text-sm md:text-base">Upload photos to get instant AI-powered damage assessment, cost estimation, and automated triage decisions</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/30">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold">5</div>
                    <div className="text-xs md:text-sm text-white/90 mt-2 font-medium">Active Claims</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Menu */}
          <div className="mb-8 bg-slate-50 border border-slate-200 rounded-lg p-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                  activeTab === 'create'
                    ? 'text-primary-600 bg-white shadow-sm border border-primary-200'
                    : 'text-slate-700 hover:text-primary-600 hover:bg-white'
                }`}
              >
                Create Claim
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                  activeTab === 'history'
                    ? 'text-primary-600 bg-white shadow-sm border border-primary-200'
                    : 'text-slate-700 hover:text-primary-600 hover:bg-white'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                  activeTab === 'activities'
                    ? 'text-primary-600 bg-white shadow-sm border border-primary-200'
                    : 'text-slate-700 hover:text-primary-600 hover:bg-white'
                }`}
              >
                Activities
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'create' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <UploadForm onAnalyze={handleAnalyze} isLoading={isLoading} />

                {error && (
                  <div className="bg-rose-50 border-l-4 border-rose-500 text-rose-800 px-6 py-4 rounded-2xl mb-6 shadow-soft animate-fade-in">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">❌</span>
                      <div>
                        <p className="font-bold text-lg">Error</p>
                        <p className="font-serif">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 px-6 py-4 rounded-2xl shadow-soft animate-fade-in">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">✅</span>
                      <div>
                        <p className="font-bold text-lg">Success!</p>
                        <p className="font-serif">{successMessage}</p>
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

              {/* Right Column - Stats */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-white rounded-lg p-6 shadow-md border border-slate-100">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-5">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Completed</div>
                          <div className="text-2xl font-bold text-slate-900">12</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">⏳</span>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Pending</div>
                          <div className="text-2xl font-bold text-slate-900">5</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">📊</span>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Total Claims</div>
                          <div className="text-2xl font-bold text-slate-900">17</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Help & Support */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg shadow-md p-6 border border-primary-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-slate-600 mb-4">Our support team is here 24/7</p>
                  <Link href="/help" className="block w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <AnalysisHistory onRefresh={historyRefresh} />
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Claim Approved</p>
                    <p className="text-xs text-slate-500">Dishwasher repair - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Under Review</p>
                    <p className="text-xs text-slate-500">Phone screen - 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Claim Submitted</p>
                    <p className="text-xs text-slate-500">Water leak - 2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
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

