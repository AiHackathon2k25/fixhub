export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jensen",
      role: "Homeowner",
      image: "👩‍💼",
      content: "FixHub made filing my dishwasher claim so easy! Got an assessment in 3 minutes and approval the same day. Absolutely incredible service.",
      rating: 5,
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      name: "Michael Hansen",
      role: "Small Business Owner",
      image: "👨‍💼",
      content: "As a business owner, time is money. FixHub saved me hours of paperwork and phone calls. The AI analysis was spot-on!",
      rating: 5,
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      name: "Emma Nielsen",
      role: "Renter",
      image: "👩",
      content: "I was worried about filing my first insurance claim, but FixHub guided me through everything. Simple, fast, and professional.",
      rating: 5,
      bgColor: "from-teal-50 to-teal-100"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join thousands of satisfied customers</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`bg-gradient-to-br ${testimonial.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100`}>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-800 mb-8 text-lg leading-relaxed italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-md">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

