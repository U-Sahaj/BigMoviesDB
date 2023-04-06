import { MongoClient } from 'mongodb';

const uri = 'mongodb://test-mongo:27017';
const client = new MongoClient(uri);

async function testConnection() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Log a message to indicate that we successfully connected to the MongoDB cluster
    console.log('Connected to MongoDB');

    // Disconnect from the MongoDB cluster
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

testConnection();
