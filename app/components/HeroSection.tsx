import { Hero } from '@/types/salon';

interface HeroSectionProps {
  hero: Hero;
}

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-5 max-w-4xl mx-auto">
        <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {hero.title}
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-delay">
          {hero.subtitle}
        </p>
        <div className="flex justify-center animate-fade-in-delay-2">
          <a href={hero.primaryButton.href} className="btn-primary">
            {hero.primaryButton.text}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full mt-2" style={{ animation: 'scroll 2s infinite' }}></div>
        </div>
      </div>
    </section>
  );
}
