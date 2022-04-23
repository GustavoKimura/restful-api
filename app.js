require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const personRoutes = require('./routes/personRoutes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/person', personRoutes);

const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

mongoose.connect(`mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@apicluster.k1nrn.mongodb.net/restfulapi?retryWrites=true&w=majority`).then(() => {
    console.log('Conectado ao MongoDB.');

    app.listen(3000);
}).catch((error) => {
    console.log(error);
});