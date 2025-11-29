'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Testimonials from './components/Testimonials';

export default function Home() {
  const router = useRouter();
  const loggedIn = typeof window !== 'undefined' && isLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      router.push('/dashboard');
    }
  }, [loggedIn, router]);

  if (loggedIn) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Header Overlay */}
      <div className="relative">
        <Header />
        <HeroSection />
      </div>

      {/* How It Works Section - Tractable Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">AI-powered damage assessment in minutes, not days</p>
          </div>
          
          {/* Step 1 - Image Left, Text Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">📸</div>
                    <p className="text-gray-600 font-medium">Upload Damage Photos</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                1
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Upload & Describe</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Simply take photos of the damaged item from multiple angles and provide a brief description. Our system accepts images of appliances, electronics, plumbing issues, and more.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Multiple image uploads supported</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Works with any device camera</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Automatic image optimization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 2 - Text Left, Image Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="md:order-2">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">🤖</div>
                      <p className="text-gray-600 font-medium">AI Processing</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  2
                </div>
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our advanced AI analyzes your images using computer vision and machine learning to identify damage, assess severity, and calculate accurate repair costs in seconds.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">99% accuracy rate</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Real-time cost estimation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Detailed damage categorization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3 - Image Left, Text Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">📊</div>
                    <p className="text-gray-600 font-medium">Get Detailed Report</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                3
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Receive Assessment</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Get a comprehensive damage assessment report with severity classification, repair vs. replace recommendations, and accurate cost estimates in DKK.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Insurance-ready documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Professional summary report</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Cost breakdown by category</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 4 - Text Left, Image Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">🎫</div>
                      <p className="text-gray-600 font-medium">Submit Claim</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  4
                </div>
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Submit to Insurance</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Create and submit your insurance claim with one click. Your ticket is automatically routed to the appropriate service provider for fast processing.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">One-click claim submission</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Automatic provider routing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-700">Track claim status in real-time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Services Section - Tractable Style */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive damage assessment for all your insurance needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100">
              <div className="h-64 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center relative overflow-hidden">
                <div className="text-9xl transform group-hover:scale-125 transition-transform duration-500">🔧</div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Appliance Damage</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Expert analysis for dishwashers, ovens, refrigerators, washing machines, and all household appliances.</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100">
              <div className="h-64 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center relative overflow-hidden">
                <div className="text-9xl transform group-hover:scale-125 transition-transform duration-500">📱</div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Electronics</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Smartphone, tablet, laptop, and electronic device damage assessment with accurate repair estimates.</p>
                <div className="flex items-center text-purple-600 font-medium">
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-100">
              <div className="h-64 bg-gradient-to-br from-cyan-100 via-cyan-200 to-cyan-300 flex items-center justify-center relative overflow-hidden">
                <div className="text-9xl transform group-hover:scale-125 transition-transform duration-500">💧</div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">VVS/Plumbing</h3>
                <p className="text-gray-600 leading-relaxed mb-4">Water damage, pipe leaks, and plumbing issue evaluation with detailed cost breakdowns.</p>
                <div className="flex items-center text-cyan-600 font-medium">
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-10 text-slate-200">Join thousands of users who trust FixHub for their insurance claims</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 font-semibold py-5 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-teal-500/50 transform hover:-translate-y-1 text-lg"
            >
              Create Your Account
            </Link>
            <Link
              href="/auth/login"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-slate-800 font-semibold py-5 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

