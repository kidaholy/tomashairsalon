const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

const client = new MongoClient(uri);

async function seedDatabase() {
  try {
    console.log('📖 Reading data from JSON file...');
    const dataFilePath = path.join(__dirname, '..', 'data', 'salon-data.json');
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);

    console.log('🔌 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('tomashair');

    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      db.collection('salon').deleteMany({}),
      db.collection('navigation').deleteMany({}),
      db.collection('hero').deleteMany({}),
      db.collection('about').deleteMany({}),
      db.collection('services').deleteMany({}),
      db.collection('team').deleteMany({}),
      db.collection('testimonials').deleteMany({}),
      db.collection('gallery').deleteMany({}),
      db.collection('contact').deleteMany({}),
      db.collection('footer').deleteMany({}),
    ]);

    console.log('📝 Inserting data into collections...');
    await Promise.all([
      db.collection('salon').insertOne(data.salon),
      db.collection('navigation').insertMany(data.navigation),
      db.collection('hero').insertOne(data.hero),
      db.collection('about').insertOne(data.about),
      db.collection('services').insertMany(data.services),
      db.collection('team').insertMany(data.team),
      db.collection('testimonials').insertMany(data.testimonials),
      db.collection('gallery').insertMany(data.gallery),
      db.collection('contact').insertOne(data.contact),
      db.collection('footer').insertOne(data.footer),
    ]);

    console.log('\n✅ Database seeded successfully!');
    console.log('📊 Collections created:');
    const collections = await db.listCollections().toArray();
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

seedDatabase();
