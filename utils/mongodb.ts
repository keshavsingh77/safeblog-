import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.VITE_MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = process.env.VITE_DATABASE_NAME || 'safeblog';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DATABASE_NAME);
    
    cachedClient = client;
    cachedDb = db;
    
    console.log('✅ Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export async function saveToDatabase(collection: string, data: any) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection(collection).insertOne({
      ...data,
      createdAt: new Date(),
    });
    console.log(`✅ Saved to ${collection}:`, result.insertedId);
    return result;
  } catch (error) {
    console.error(`❌ Error saving to ${collection}:`, error);
    throw error;
  }
}

export async function findInDatabase(collection: string, query: any) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection(collection).findOne(query);
    console.log(`✅ Found in ${collection}:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Error finding in ${collection}:`, error);
    throw error;
  }
}