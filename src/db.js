const {MongoClient, ServerApiVersion} = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
    }
});

const connectDb = async (collectionName) => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        return {collection};
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        throw error;
    }
};

module.exports = {connectDb};

