import { initializeDatabase } from '../lib/database';
import { getSalonDataFromJSON } from '../lib/data';

async function seedDatabase() {
  try {
    console.log('Reading data from JSON file...');
    const data = getSalonDataFromJSON();

    console.log('Connecting to MongoDB and initializing database...');
    await initializeDatabase(data);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
