const express = require('express');
const {connectDb} = require('./db');

const app = express();
const {collection} = await connectDb('sample');

app.get('/', async (req, res) => {
    const data = await collection.find({}).toArray();
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});