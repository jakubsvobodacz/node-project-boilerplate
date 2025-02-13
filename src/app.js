const express = require('express'); 
const {connectDb} = require('./db.js');
const dotenv = require('dotenv');
const { clerkMiddleware, requireAuth, getAuth } = require('@clerk/express');

dotenv.config();

const app = express();

const dbConnect = async () => {
    const {collection} = await connectDb(process.env.COLLECTION_NAME);
    return collection;
}
dbConnect().then((collection) => {
    console.log(collection.collectionName + " fetched..") ;
});

app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/sights', async (req, res) => {
    const data = await collection.find({}).toArray();
    res.json(data);
});

app.get('/protected', requireAuth(), async (req, res) => {
    
    const {userId} = getAuth(req);
    const user = await clerkClient.users.getUser(userId)

    return res.json({ user })
}); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});