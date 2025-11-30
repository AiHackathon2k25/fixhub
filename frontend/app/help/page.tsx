'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FAQ from '@/app/components/FAQ';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Help Center</h1>
          <p className="text-base md:text-lg text-slate-600">Find answers to common questions and get support</p>
        </div>

        <FAQ />
      </div>

      <Footer />
    </div>
  );
}
