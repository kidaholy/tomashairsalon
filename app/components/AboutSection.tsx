import { About } from '@/types/salon';

interface AboutSectionProps {
  about: About;
}

export default function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="w-full h-[500px] bg-gradient-to-br from-primary to-accent rounded-2xl shadow-2xl"></div>
          </div>

          {/* Content */}
          <div>
            <h2 className="section-title">{about.title}</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">{about.description1}</p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">{about.description2}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {about.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-serif text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
