const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('URI:', uri ? uri.substring(0, 30) + '...' : 'NOT FOUND');

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    const db = client.db('tomashair');
    const collections = await db.listCollections().toArray();
    console.log('📊 Collections:', collections.length);
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\nPossible solutions:');
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('2. Verify the connection string is correct');
    console.log('3. Check your network/firewall settings');
    console.log('4. Try adding 0.0.0.0/0 to Network Access in MongoDB Atlas (for testing)');
  } finally {
    await client.close();
    process.exit(0);
  }
}

testConnection();
