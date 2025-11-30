'use client';

import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-50 via-purple-50 to-pink-100 min-h-[400px] md:min-h-[500px] w-full flex items-center">
      {/* Animated gradient overlay with multiple colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 via-purple-200/30 to-pink-200/20 animate-gradient-slow"></div>
      
      {/* Secondary animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/20 via-blue-100/30 to-violet-100/20 animate-gradient-slow" style={{ animationDelay: '1s' }}></div>
      
      {/* Abstract pattern overlay with animation */}
      <div className="absolute inset-0 opacity-10 animate-pulse-slow">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating shapes animation - more shapes with light colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-float-slow-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200/25 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-pink-200/25 rounded-full blur-2xl animate-float-slow-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-cyan-200/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-20 h-20 bg-blue-300/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-20 w-16 h-16 bg-purple-300/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 md:mb-6 leading-tight animate-fade-in-up drop-shadow-lg">
          The AI Front Door for <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-text">Property Claims</span>
        </h1>
        <p className="text-sm md:text-base text-slate-700 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in-up-delayed drop-shadow-sm">
          FixHub is the first end-to-end, pre-vendor AI triage engine that verifies authenticity, assesses damage, estimates costs, and makes automated decisions in under two minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delayed-2">
          <Link
            href="/auth/signup"
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white hover:from-primary-800 hover:to-primary-900 rounded-lg transition-all font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="/#about"
            className="inline-block px-6 py-3 border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white rounded-lg transition-all font-semibold text-sm md:text-base hover:scale-105 backdrop-blur-sm bg-white/50"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
