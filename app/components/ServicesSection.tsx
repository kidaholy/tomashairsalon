import { Service } from '@/types/salon';

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-5">
        <h2 className="section-title text-center">Our Services</h2>
        <p className="section-subtitle text-center">Premium hair care services tailored to your needs</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl border-2 border-transparent hover:border-primary"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="font-serif text-2xl font-bold text-secondary mb-3">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-sm text-gray-500 mb-4">Duration: {service.duration}</p>
              <span className="inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold">
                From ${service.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
