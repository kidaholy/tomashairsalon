import clientPromise from './mongodb';
import { SalonData, Service, TeamMember, Testimonial, GalleryItem } from '@/types/salon';

const DB_NAME = 'tomashair';
const COLLECTIONS = {
  salon: 'salon',
  services: 'services',
  team: 'team',
  testimonials: 'testimonials',
  gallery: 'gallery',
  contact: 'contact',
  about: 'about',
  hero: 'hero',
  navigation: 'navigation',
  footer: 'footer',
};

export async function getSalonData(): Promise<SalonData | null> {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const [salon, navigation, hero, about, services, team, testimonials, gallery, contact, footer] =
      await Promise.all([
        db.collection(COLLECTIONS.salon).findOne(),
        db.collection(COLLECTIONS.navigation).find({}).toArray(),
        db.collection(COLLECTIONS.hero).findOne(),
        db.collection(COLLECTIONS.about).findOne(),
        db.collection(COLLECTIONS.services).find({}).toArray(),
        db.collection(COLLECTIONS.team).find({}).toArray(),
        db.collection(COLLECTIONS.testimonials).find({}).toArray(),
        db.collection(COLLECTIONS.gallery).find({}).toArray(),
        db.collection(COLLECTIONS.contact).findOne(),
        db.collection(COLLECTIONS.footer).findOne(),
      ]);

    if (!salon) return null;

    return {
      salon: salon as unknown as SalonData['salon'],
      navigation: navigation as unknown as SalonData['navigation'],
      hero: hero as unknown as SalonData['hero'],
      about: about as unknown as SalonData['about'],
      services: services as unknown as Service[],
      team: team as unknown as TeamMember[],
      testimonials: testimonials as unknown as Testimonial[],
      gallery: gallery as unknown as GalleryItem[],
      contact: contact as unknown as SalonData['contact'],
      footer: footer as unknown as SalonData['footer'],
    };
  } catch (error) {
    console.error('Error fetching salon data from MongoDB:', error);
    return null;
  }
}

export async function initializeDatabase(data: SalonData): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Clear existing data
    await Promise.all([
      db.collection(COLLECTIONS.salon).deleteMany({}),
      db.collection(COLLECTIONS.navigation).deleteMany({}),
      db.collection(COLLECTIONS.hero).deleteMany({}),
      db.collection(COLLECTIONS.about).deleteMany({}),
      db.collection(COLLECTIONS.services).deleteMany({}),
      db.collection(COLLECTIONS.team).deleteMany({}),
      db.collection(COLLECTIONS.testimonials).deleteMany({}),
      db.collection(COLLECTIONS.gallery).deleteMany({}),
      db.collection(COLLECTIONS.contact).deleteMany({}),
      db.collection(COLLECTIONS.footer).deleteMany({}),
    ]);

    // Insert new data
    await Promise.all([
      db.collection(COLLECTIONS.salon).insertOne(data.salon as any),
      db.collection(COLLECTIONS.navigation).insertMany(data.navigation as any[]),
      db.collection(COLLECTIONS.hero).insertOne(data.hero as any),
      db.collection(COLLECTIONS.about).insertOne(data.about as any),
      db.collection(COLLECTIONS.services).insertMany(data.services as any[]),
      db.collection(COLLECTIONS.team).insertMany(data.team as any[]),
      db.collection(COLLECTIONS.testimonials).insertMany(data.testimonials as any[]),
      db.collection(COLLECTIONS.gallery).insertMany(data.gallery as any[]),
      db.collection(COLLECTIONS.contact).insertOne(data.contact as any),
      db.collection(COLLECTIONS.footer).insertOne(data.footer as any),
    ]);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Service CRUD operations
export async function getServices(): Promise<Service[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return (await db.collection(COLLECTIONS.services).find({}).toArray()) as unknown as Service[];
}

export async function getServiceById(id: string): Promise<Service | null> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTIONS.services).findOne({ id }) as Promise<Service | null>;
}

export async function createService(service: Service): Promise<void> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.services).insertOne(service as any);
}

export async function updateService(id: string, service: Partial<Service>): Promise<void> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.services).updateOne({ id }, { $set: service as any });
}

export async function deleteService(id: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection(COLLECTIONS.services).deleteOne({ id });
}

// Team CRUD operations
export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return (await db.collection(COLLECTIONS.team).find({}).toArray()) as unknown as TeamMember[];
}

// Testimonial CRUD operations
export async function getTestimonials(): Promise<Testimonial[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return (await db.collection(COLLECTIONS.testimonials).find({}).toArray()) as unknown as Testimonial[];
}

// Gallery CRUD operations
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return (await db.collection(COLLECTIONS.gallery).find({}).toArray()) as unknown as GalleryItem[];
}
