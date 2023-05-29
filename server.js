'use strict';

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/books');

//require verify user to update tokens
const verifyUser = require('./auth')
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);
app.put('/books/:id', putBooks);

async function getBooks(req, res, next) {
  try {
    let results = await Book.find({});
    res.status(200).send(results);
  } catch(err) {
    next(err)
  }
}

async function postBooks(req, res, next) {
  try {
    let createdBook = await Book.create(req.body);

    res.status(200).send(createdBook);
  } catch(err) {
    next(err)
  }
}

async function deleteBooks(req, res, next) {
  try {
    let id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.status(200).send('Deleted Book');
  } catch(err) {
    next(err)
  }
}

async function putBooks(req, res, next) {
  try {
    let id = req.params.id;
    let bookFormReq = req.body;
    let options = {
      new: true,
      overwrite: true,

    }
    let updatedBook = await Book.findByIdAndPut(id, bookFormReq, options);
    res.status(200).send(updatedBook);
  } catch(err) {
    next(err)
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// app.get('/test', (request, response) => {
//   response.send('test request received')
// })

app.listen(PORT, () => console.log(`listening on ${PORT}`));
