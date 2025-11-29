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
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, fast, and effective—claims made easy in 4 steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-800 text-xl mb-3">Create Account</h3>
              <p className="text-gray-600">Sign up with your details in under 2 minutes and get started instantly</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-800 text-xl mb-3">Upload Photo</h3>
              <p className="text-gray-600">Take a clear picture of the damaged item and describe the issue</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-800 text-xl mb-3">AI Analysis</h3>
              <p className="text-gray-600">Get instant AI-powered damage assessment with accurate cost estimates</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-3xl mx-auto mb-4 shadow-lg">
                4
              </div>
              <h3 className="font-semibold text-gray-800 text-xl mb-3">Submit Claim</h3>
              <p className="text-gray-600">Send your claim directly to the insurance company with one click</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive damage assessment for all your insurance needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">🔧</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Appliance Damage</h3>
              <p className="text-gray-600">Expert analysis for dishwashers, ovens, refrigerators, washing machines, and all household appliances.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Electronics</h3>
              <p className="text-gray-600">Smartphone, tablet, laptop, and electronic device damage assessment with accurate repair estimates.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">💧</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">VVS/Plumbing</h3>
              <p className="text-gray-600">Water damage, pipe leaks, and plumbing issue evaluation with detailed cost breakdowns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">Join thousands of users who trust FixHub for their insurance claims</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Your Account
            </Link>
            <Link
              href="/auth/login"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
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

