'use client';

import ProtectedClient from '@/app/components/ProtectedClient';
import DashboardNav from '@/app/components/DashboardNav';

export default function SettingsPage() {
  return (
    <ProtectedClient>
      <div className="min-h-screen bg-white">
        <DashboardNav />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Settings</h1>
            <p className="text-base text-slate-600">Configure your account settings and preferences</p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary-500 rounded" defaultChecked />
                    <span className="text-sm text-slate-700">Email notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 text-primary-500 rounded" defaultChecked />
                    <span className="text-sm text-slate-700">Claim status updates</span>
                  </label>
                </div>
              </div>
              <button className="px-6 py-2 bg-primary-500 text-white hover:bg-primary-600 rounded-lg transition-colors font-semibold">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
