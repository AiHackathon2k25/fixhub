'use client';

import Link from 'next/link';

export default function FeatureCards() {
  const features = [
    {
      title: 'Cost Estimation',
      description: 'Predict repair vs replace economics with validated cost estimation models proven in auto insurance globally.',
      icon: '💰',
    },
    {
      title: 'Fraud Detection',
      description: 'Catch fraudulent or exaggerated claims before vendors are engaged, preventing costly payouts.',
      icon: '🛡️',
    },
    {
      title: 'Pre-Vendor Triage',
      description: 'The missing layer in your insurance stack. Operates before Scalepoint, before vendors, and before adjusters.',
      icon: '🚪',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Why FixHub Works
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Every component is proven in other verticals. FixHub packages these capabilities into one unified engine tailored for property claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Icon Header - Full width top */}
              <div className="w-full h-28 md:h-32 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <div className="text-4xl md:text-5xl text-white">{feature.icon}</div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
