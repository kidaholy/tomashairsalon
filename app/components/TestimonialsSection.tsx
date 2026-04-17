import { Testimonial } from '@/types/salon';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container mx-auto px-5">
        <h2 className="section-title text-center text-white">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
            >
              <div className="text-2xl mb-4">{'⭐'.repeat(testimonial.rating)}</div>
              <p className="text-white text-lg mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="text-white font-bold">- {testimonial.name}</p>
                <p className="text-white/70 text-sm">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
