'use client';

export default function CategoryIcons() {
  const categories = [
    { name: 'Appliances', icon: '🔧', color: 'from-amber-500 to-orange-600' },
    { name: 'Electronics', icon: '💻', color: 'from-gray-700 to-gray-900' },
    { name: 'AI Analysis', icon: '🤖', color: 'from-blue-500 to-blue-700' },
    { name: 'Plumbing', icon: '💧', color: 'from-cyan-500 to-blue-600' },
    { name: 'Insurance', icon: '📋', color: 'from-green-500 to-emerald-600' },
    { name: 'Design', icon: '📐', color: 'from-purple-500 to-indigo-600' },
    { name: 'Documentation', icon: '📷', color: 'from-pink-500 to-rose-600' },
    { name: 'Dashboard', icon: '🖥️', color: 'from-blue-400 to-cyan-500' },
    { name: 'Reports', icon: '📊', color: 'from-teal-500 to-green-600' },
  ];

  return (
    <section className="py-12 md:py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl bg-white flex items-center justify-center text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 transform group-hover:scale-105 transition-transform duration-300 shadow-soft border border-slate-100">
                <span>{category.icon}</span>
              </div>
              <span className="text-xs md:text-sm font-medium text-slate-600 text-center group-hover:text-primary-600 transition-colors">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
