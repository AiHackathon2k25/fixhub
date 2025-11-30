'use client';

import ProtectedClient from '@/app/components/ProtectedClient';
import DashboardNav from '@/app/components/DashboardNav';
import AnalysisHistory from '@/app/components/AnalysisHistory';

export default function ClaimsPage() {
  return (
    <ProtectedClient>
      <div className="min-h-screen bg-white">
        <DashboardNav />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Claims</h1>
            <p className="text-base text-slate-600">View and manage all your insurance claims</p>
          </div>

          <AnalysisHistory onRefresh={0} />
        </div>
      </div>
    </ProtectedClient>
  );
}
