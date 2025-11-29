import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Insurance Claims Made <span className="text-blue-200">Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Get instant damage assessments, accurate cost estimates, and seamless claim processing in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/auth/signup"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Free
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
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

          {/* Right content - Visual */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Mockup/Illustration placeholder */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center text-2xl">
                      ✓
                    </div>
                    <div>
                      <div className="h-3 bg-white/60 rounded w-32 mb-2"></div>
                      <div className="h-2 bg-white/40 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center text-2xl">
                      📸
                    </div>
                    <div>
                      <div className="h-3 bg-white/60 rounded w-36 mb-2"></div>
                      <div className="h-2 bg-white/40 rounded w-28"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center text-2xl">
                      🎫
                    </div>
                    <div>
                      <div className="h-3 bg-white/60 rounded w-40 mb-2"></div>
                      <div className="h-2 bg-white/40 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce">
                ⚡
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center text-3xl shadow-xl">
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

