'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import AboutSection from './components/AboutSection';
import ServicesBlock from './components/ServicesBlock';
import ExcellenceSection from './components/ExcellenceSection';
import TeamSection from './components/TeamSection';
import FeatureCards from './components/FeatureCards';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

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
      <HeroBanner />
      
      {/* About Section */}
      <AboutSection />

      {/* Services Block Section */}
      <ServicesBlock />

      {/* Excellence Section */}
      <ExcellenceSection />

      {/* Team Section */}
      <TeamSection />

      {/* Feature Cards Section */}
      <FeatureCards />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">The Missing Layer in Your Insurance Stack</h2>
          <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Scalepoint handles vendor orchestration. Guidewire manages core systems. FRISS provides structured-data fraud analytics. FixHub is the pre-vendor, image-based triage and fraud filtering layer that operates before all of them.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-primary-500 text-white hover:bg-primary-600 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base md:text-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

