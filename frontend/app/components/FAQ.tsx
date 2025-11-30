'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What types of claims does FixHub process?',
      answer: 'FixHub specializes in high-volume, low-severity property and contents claims such as phones, laptops, appliances, and furniture. These are claims that are too small for adjusters but too numerous to process manually.',
    },
    {
      question: 'How accurate is FixHub\'s damage assessment?',
      answer: 'FixHub achieves 70-90% accuracy in damage detection and >90% accuracy in image forensics. Our cost estimation models are validated in auto insurance globally and adapted for property claims.',
    },
    {
      question: 'How does FixHub integrate with existing insurance systems?',
      answer: 'FixHub operates as a pre-vendor triage layer that integrates before Scalepoint (vendor orchestration), Guidewire (core systems), and FRISS (fraud analytics). It\'s a plug-and-play module that processes claims before they reach vendors or adjusters.',
    },
    {
      question: 'What cost savings can we expect?',
      answer: 'FixHub typically reduces unnecessary vendor interactions by 30-60% and cuts operational costs by €50-€150 per claim. Cycle times drop from days to minutes, and fraud is caught before it costs money.',
    },
    {
      question: 'How does FixHub detect fraud?',
      answer: 'FixHub uses image forensics to detect tampering, reused photos, and metadata inconsistencies. Combined with damage assessment and cost estimation, it identifies fraudulent or exaggerated claims before vendors are engaged, preventing costly payouts.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            Everything you need to know about FixHub
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-100"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 md:px-6 py-3 md:py-4 lg:py-5 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm md:text-base lg:text-lg font-bold text-slate-900 pr-3 md:pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-slate-500 flex-shrink-0 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0">
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
