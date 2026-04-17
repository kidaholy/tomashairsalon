import { GalleryItem } from '@/types/salon';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-5">
        <h2 className="section-title text-center">Our Gallery</h2>
        <p className="section-subtitle text-center">See our latest transformations</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="relative h-72 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
