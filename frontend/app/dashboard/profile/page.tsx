'use client';

import ProtectedClient from '@/app/components/ProtectedClient';
import DashboardNav from '@/app/components/DashboardNav';

export default function ProfilePage() {
  return (
    <ProtectedClient>
      <div className="min-h-screen bg-white">
        <DashboardNav />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Profile</h1>
            <p className="text-base text-slate-600">Manage your account information and preferences</p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg" defaultValue="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg" placeholder="+45 12 34 56 78" />
              </div>
              <button className="px-6 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-lg transition-colors font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
