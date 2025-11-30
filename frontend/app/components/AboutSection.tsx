'use client';

import Link from 'next/link';

export default function AboutSection() {
  const stats = [
    {
      number: '2 Min',
      label: 'Average claim processing time',
      icon: '⚡',
    },
    {
      number: '90%+',
      label: 'Image forensics accuracy',
      icon: '🎯',
    },
    {
      number: '30-60%',
      label: 'Reduction in vendor interactions',
      icon: '📉',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Card Container */}
          <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-xl border border-primary-100 p-8 md:p-12 lg:p-16">
            {/* Content Section */}
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
                About FixHub
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Transforming Insurance Claims Processing with AI
              </h2>
              <div className="mb-8">
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  FixHub is the first end-to-end, pre-vendor AI triage engine that processes property claims in under two minutes, cutting operational costs by 30-60% and preventing fraud before it costs money.
                </p>
              </div>
            </div>

            {/* Statistics Section - Above Button */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-primary-100 hover:shadow-lg transition-all text-center">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-xs md:text-sm lg:text-base text-slate-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="text-center">
              <Link
                href="/#services"
                className="inline-block px-8 py-3 bg-primary-500 text-white hover:bg-primary-600 rounded-lg transition-colors font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
