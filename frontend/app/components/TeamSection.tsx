'use client';

export default function TeamSection() {
  const teamMembers = [
    {
      name: 'Hajar El Mhassani',
      role: 'Founder and Developer',
      image: '👩‍💼',
    },
    {
      name: 'Estefanía',
      role: 'Founder and Developer',
      image: '👨‍💻',
    },
    {
      name: 'Fouziya',
      role: 'Founder and Developer',
      image: '👩‍💼',
    },
  ];

  return (
    <section id="team" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Meet Our Consultants
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Our expert team is dedicated to providing you with the best service
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-100"
            >
              {/* Image Placeholder - Full width top */}
              <div className="w-full h-48 md:h-56 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden rounded-t-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl sm:text-7xl md:text-8xl">{member.image}</div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-slate-600">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
