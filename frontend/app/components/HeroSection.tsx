import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left content */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Insurance Claims Made <span className="text-teal-300">Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 leading-relaxed">
              Get instant damage assessments, accurate cost estimates, and seamless claim processing in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Free
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-white">99%</div>
                <div className="text-sm text-blue-200">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">&lt;5min</div>
                <div className="text-sm text-blue-200">Processing Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-blue-200">Available</div>
              </div>
            </div>
          </div>

          {/* Right content - Visual Dashboard Preview */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Main Dashboard Preview Card - Tractable Style */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
                    <div className="h-6 bg-white/60 rounded-lg w-32"></div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                    </div>
                  </div>

                  {/* Step 1: Upload */}
                  <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-5 border border-white/20 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      📸
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/80 rounded-lg w-44 mb-2"></div>
                      <div className="h-3 bg-white/50 rounded-lg w-36"></div>
                    </div>
                    <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  </div>
                  
                  {/* Step 2: AI Analysis */}
                  <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-5 border border-white/20 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      🤖
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/80 rounded-lg w-48 mb-2"></div>
                      <div className="h-3 bg-white/50 rounded-lg w-40"></div>
                    </div>
                    <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  </div>
                  
                  {/* Step 3: Ticket Created */}
                  <div className="flex items-center gap-4 bg-white/10 rounded-2xl p-5 border border-white/20 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      🎫
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/80 rounded-lg w-52 mb-2"></div>
                      <div className="h-3 bg-white/50 rounded-lg w-44"></div>
                    </div>
                    <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full w-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-3xl flex items-center justify-center text-6xl shadow-2xl animate-bounce opacity-70 rotate-12">
                ⚡
              </div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-3xl flex items-center justify-center text-5xl shadow-2xl opacity-70 -rotate-12">
                🛡️
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

