'use client';

export default function ExcellenceSection() {
  const cards = [
    {
      title: 'The Problem We Solve',
      content: 'Insurers lose time and money on high-volume, low-severity property claims. These claims are too small for adjusters, yet too many to process manually. Fraud often slips through because detection happens only after vendors are engaged.',
    },
    {
      title: 'Our Solution',
      content: 'FixHub is the first unified pre-vendor triage engine. We integrate image forensics, damage assessment, cost estimation, and fraud detection into one automated workflow that processes claims in under two minutes.',
    },
    {
      title: 'Business Value',
      content: 'FixHub cuts 30-60% of unnecessary vendor interactions and €50-€150 per claim in operational costs. It reduces cycle times from days to minutes and catches fraud before it costs money.',
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
            The FixHub Advantage
          </h2>
          <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            FixHub is not another claims platform. It is the gatekeeper that decides what deserves a payout, what needs escalation, and what should never reach a vendor.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                {card.title}
              </h3>

              {/* Content */}
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
