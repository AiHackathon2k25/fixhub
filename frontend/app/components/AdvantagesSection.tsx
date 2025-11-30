'use client';

export default function AdvantagesSection() {
  const advantages = [
    {
      title: 'AI-Powered Accuracy',
      description: 'Advanced machine learning algorithms provide 99% accuracy in damage assessment and cost estimation.',
    },
    {
      title: 'Instant Results',
      description: 'Get comprehensive damage analysis reports in under 5 minutes, not days or weeks.',
    },
    {
      title: 'Expert Support',
      description: 'Access to professional insurance advisors and damage assessment specialists when you need them.',
    },
    {
      title: 'Insurance Partners',
      description: 'Direct integration with major insurance providers for seamless claim processing.',
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Side - Text */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-slate-900 mb-6 md:mb-8">
              Why Choose FixHub?
            </h2>
            <div className="space-y-4 md:space-y-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-display font-semibold text-slate-800 mb-1 md:mb-2">{advantage.title}</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image Placeholder */}
          <div className="relative order-1 md:order-2">
            <div className="aspect-square bg-cream-50 rounded-2xl overflow-hidden shadow-soft-lg border border-slate-200 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-cream-100">
                <div className="text-center p-6 md:p-8">
                  <div className="text-6xl md:text-7xl lg:text-8xl mb-4">🛡️</div>
                  <p className="text-slate-500 text-sm md:text-base font-medium">Image Placeholder</p>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">Professional Damage Assessment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
