'use client';

import Link from 'next/link';

export default function ServicesBlock() {
  const services = [
    {
      number: '01',
      title: 'Image Forensics',
      description: 'Verify authenticity with >90% accuracy. Detects tampering, reused photos, and metadata inconsistencies before processing claims.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Damage Assessment',
      description: 'AI-powered damage classification with 70-90% accuracy. Identifies object type, damage severity, and repairability automatically.',
      icon: '🛡️',
    },
    {
      number: '03',
      title: 'Automated Triage',
      description: 'Make instant decisions: approve, reject, or escalate. Reduces cycle times from days to minutes and cuts operational costs by 30-60%.',
      icon: '⚡',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #6366F1 1px, transparent 1px), linear-gradient(to bottom, #6366F1 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Icon Header - Full width top */}
              <div className="w-full h-32 md:h-40 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <div className="text-5xl md:text-6xl text-white">{service.icon}</div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Read More Link */}
                <Link
                  href="/#features"
                  className="inline-block text-primary-500 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
