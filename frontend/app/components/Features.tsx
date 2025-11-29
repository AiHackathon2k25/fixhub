export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get damage assessments in under 5 minutes with our AI-powered system",
      image: "⚡",
      color: "from-yellow-100 to-yellow-200"
    },
    {
      icon: "🎯",
      title: "99% Accurate",
      description: "Industry-leading accuracy powered by advanced machine learning algorithms",
      image: "🎯",
      color: "from-blue-100 to-blue-200"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Bank-level encryption ensures your data is always protected",
      image: "🔒",
      color: "from-green-100 to-green-200"
    },
    {
      icon: "💰",
      title: "Cost Estimates",
      description: "Get precise repair cost estimates based on real market data",
      image: "💰",
      color: "from-purple-100 to-purple-200"
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Access FixHub from any device, anywhere, anytime",
      image: "📱",
      color: "from-pink-100 to-pink-200"
    },
    {
      icon: "🤝",
      title: "Expert Support",
      description: "Our team is here to help you every step of the way",
      image: "🤝",
      color: "from-indigo-100 to-indigo-200"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Why Choose FixHub?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need for seamless insurance claims</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className={`h-48 bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                <div className="text-9xl transform group-hover:scale-110 transition-transform duration-300">{feature.image}</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

