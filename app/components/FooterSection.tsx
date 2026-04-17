import { Footer } from '@/types/salon';

interface FooterProps {
  footer: Footer;
  salonName: string;
}

export default function FooterSection({ footer, salonName }: FooterProps) {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-3xl font-bold text-primary mb-4">{salonName}</h3>
            <p className="text-gray-400 mb-4">{footer.description}</p>
            <div className="flex space-x-4">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 hover:text-primary transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {['Haircuts', 'Coloring', 'Treatments', 'Bridal'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-gray-400 hover:text-primary transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {salonName} Hair Salon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
