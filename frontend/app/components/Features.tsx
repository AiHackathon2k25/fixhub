export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get damage assessments in under 5 minutes with our AI-powered system"
    },
    {
      icon: "🎯",
      title: "99% Accurate",
      description: "Industry-leading accuracy powered by advanced machine learning algorithms"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Bank-level encryption ensures your data is always protected"
    },
    {
      icon: "💰",
      title: "Cost Estimates",
      description: "Get precise repair cost estimates based on real market data"
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Access FixHub from any device, anywhere, anytime"
    },
    {
      icon: "🤝",
      title: "Expert Support",
      description: "Our team is here to help you every step of the way"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose FixHub?</h2>
          <p className="text-xl text-gray-600">Everything you need for seamless insurance claims</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

