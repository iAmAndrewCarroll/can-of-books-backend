'use strict';

const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Book = require('./models/books');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DB_URL);

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/books', getBooks);

async function getBooks(req, res, next) {
  try {
    let results = await Book.find();
    res.status(200).send(results);
  } catch(err) {
    next(err)
  }
}

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));


