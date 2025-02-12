import express from 'express';
import {connectDb} from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const {collection} = await connectDb(process.env.COLLECTION_NAME);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/sights', async (req, res) => {
    const data = await collection.find({}).toArray();
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});