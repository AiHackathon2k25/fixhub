export default function Testimonials() {
  const testimonials = [
    {
      name: "Insurance Company A",
      role: "Claims Director",
      image: "👔",
      content: "FixHub reduced our vendor interactions by 45% and cut processing costs by €80 per claim. The automated triage is a game-changer for high-volume claims.",
      rating: 5,
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      name: "Insurance Company B",
      role: "Fraud Prevention Manager",
      image: "🛡️",
      content: "We catch fraudulent claims before they cost us money. FixHub's image forensics and fraud detection have saved us thousands in prevented payouts.",
      rating: 5,
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      name: "Insurance Company C",
      role: "Operations Manager",
      image: "📊",
      content: "Cycle times dropped from days to minutes. Our adjusters can now focus on complex claims while FixHub handles the routine ones automatically.",
      rating: 5,
      bgColor: "from-teal-50 to-teal-100"
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">Trusted by leading insurance companies for automated claims triage</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6 text-sm md:text-base leading-relaxed italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm md:text-base">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

