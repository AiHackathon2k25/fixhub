'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About FixHub</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Revolutionizing insurance claims with AI-powered damage assessment and seamless processing
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three passionate developers and co-founders committed to revolutionizing insurance claims
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Hajar */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-5xl font-bold">
                H
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Hajar</h3>
              <p className="text-teal-600 font-semibold mb-3">Co-Founder & Developer</p>
              <p className="text-gray-600">
                Full-stack developer specializing in AI integration and user experience design.
              </p>
            </div>

            {/* Estefania */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-5xl font-bold">
                E
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Estefania</h3>
              <p className="text-purple-600 font-semibold mb-3">Co-Founder & Developer</p>
              <p className="text-gray-600">
                Backend architect focused on scalable systems and API development.
              </p>
            </div>

            {/* Faouzia */}
            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-5xl font-bold">
                F
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Fouziya</h3>
              <p className="text-pink-600 font-semibold mb-3">Co-Founder & Developer</p>
              <p className="text-gray-600">
                Frontend specialist passionate about creating intuitive and beautiful interfaces.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At FixHub, we believe insurance claims should be simple, fast, and transparent. Our mission is to empower individuals and businesses with cutting-edge AI technology that makes damage assessment instant and accurate.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We're building a future where filing an insurance claim takes minutes, not weeks—where you can snap a photo, get an instant assessment, and move forward with confidence.
              </p>
              <p className="text-lg text-gray-600">
                Founded in 2024, FixHub is at the forefront of insurtech innovation, combining artificial intelligence, machine learning, and user-centric design to transform the claims experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-lg p-3 text-2xl">🎯</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Speed</h3>
                    <p className="text-gray-600">Get damage assessments in under 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-lg p-3 text-2xl">🤖</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">AI-Powered</h3>
                    <p className="text-gray-600">Advanced algorithms ensure 99% accuracy</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-lg p-3 text-2xl">🔒</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Secure</h3>
                    <p className="text-gray-600">Your data is encrypted and protected</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-lg p-3 text-2xl">💼</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">Professional</h3>
                    <p className="text-gray-600">Trusted by insurance companies worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">FixHub by the Numbers</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100 text-lg">Claims Processed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-blue-100 text-lg">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100 text-lg">User Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-lg">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">We constantly push boundaries with cutting-edge AI technology to deliver the best experience.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Trust</h3>
              <p className="text-gray-600">Transparency and reliability are at the core of everything we do for our users.</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-8">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Simplicity</h3>
              <p className="text-gray-600">Complex technology, simple experience—we make insurance claims effortless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Experience FixHub?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of satisfied users today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-50 text-slate-800 font-semibold py-4 px-8 rounded-lg border-2 border-slate-300 hover:border-slate-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

