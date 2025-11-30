'use client';

import ProtectedClient from '@/app/components/ProtectedClient';
import DashboardNav from '@/app/components/DashboardNav';

export default function DocumentsPage() {
  return (
    <ProtectedClient>
      <div className="min-h-screen bg-white">
        <DashboardNav />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Documents</h1>
            <p className="text-base text-slate-600">Access and manage your claim documents</p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
            <p className="text-slate-600">Document management coming soon...</p>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
