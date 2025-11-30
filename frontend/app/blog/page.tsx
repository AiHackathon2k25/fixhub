'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Blog</h1>
          <p className="text-base md:text-lg text-slate-600">Insights and updates about AI-powered claims processing</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-slate-100 p-6">
          <p className="text-slate-600">Blog posts coming soon...</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
