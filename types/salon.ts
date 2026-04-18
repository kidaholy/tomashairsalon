export interface Salon {
  name: string;
  tagline: string;
  description: string;
  established: number;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Button {
  text: string;
  href: string;
}

export interface Hero {
  title: string;
  subtitle: string;
  primaryButton: Button;
  secondaryButton: Button;
}

export interface Stat {
  number: string;
  label: string;
}

export interface About {
  title: string;
  description1: string;
  description2: string;
  stats: Stat[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  duration: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  service: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  location: {
    address: string;
    city: string;
  };
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

export interface Footer {
  description: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  quickLinks: {
    label: string;
    href: string;
  }[];
}

export interface SalonData {
  salon: Salon;
  navigation: NavigationItem[];
  hero: Hero;
  about: About;
  services: Service[];
  team: TeamMember[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  contact: Contact;
  footer: Footer;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  available: boolean;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'other';
  createdAt: string;
  cashierName?: string;
}

export interface ReceiptData {
  order: Order;
  salonName: string;
  salonAddress: string;
  salonPhone: string;
  receiptNumber: string;
}
