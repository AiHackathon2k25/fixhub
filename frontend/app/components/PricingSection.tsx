'use client';

import Link from 'next/link';

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for trying out our service',
      features: [
        '5 damage assessments per month',
        'Basic AI analysis',
        'Email support',
        'PDF report download',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For individuals and small businesses',
      features: [
        'Unlimited damage assessments',
        'Advanced AI analysis',
        'Priority support',
        'Detailed PDF reports',
        'Insurance claim assistance',
        'Service provider matching',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'Team collaboration tools',
        'Advanced analytics',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 ${
                plan.popular
                  ? 'border-primary-500 bg-primary-50 shadow-lg scale-105'
                  : 'border-slate-200 bg-white shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-black">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-slate-600 text-lg">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-slate-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm md:text-base text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === 'Enterprise' ? '/contact' : '/auth/signup'}
                className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-md'
                    : 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
