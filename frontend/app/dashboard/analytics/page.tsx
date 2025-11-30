'use client';

import ProtectedClient from '@/app/components/ProtectedClient';
import DashboardNav from '@/app/components/DashboardNav';

export default function AnalyticsPage() {
  const stats = [
    { label: 'Total Claims Processed', value: '1,247', change: '+12%', trend: 'up' },
    { label: 'Average Processing Time', value: '1.8 min', change: '-15%', trend: 'down' },
    { label: 'Cost Savings', value: '€89,450', change: '+8%', trend: 'up' },
    { label: 'Fraud Detected', value: '23', change: '+5%', trend: 'up' },
  ];

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-white">
        <DashboardNav />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Analytics</h1>
            <p className="text-base text-slate-600">Track your claims performance and insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-slate-100">
                <p className="text-sm text-slate-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-blue-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Performance Overview</h2>
            <p className="text-slate-600">Analytics dashboard coming soon...</p>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
