'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
// connect Mongoose to our MongoDB on Atlas
mongoose.connect(process.env.DB_URL);

// need to bring in a scheme if we want to interact with that collection
const Book = require('./models/books');

// this only needs to run once.
// we don't need to continually add the same books to the database
async function seed() {
  // the structure of each book I add has to be the same as my book schema
  // title: {type: String, required: true},
  // author: {type: String, required: true},
  // description: {type: String, required: true},
  // status: {type: Boolean, required: true},
  await Book.create({
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A mythical adventure in a magical world.',
    status: true
  });
  console.log('Hobbit was added to the database');

  await Book.create({
    title: 'Two Towers',
    author: 'J.R.R. Tolkien',
    description: 'A mythical adventure in a magical world.',
    status: true
  });
  console.log('Towers was added to the database');

  await Book.create({
    title: 'Return of the King',
    author: 'J.R.R. Tolkien',
    description: 'A mythical adventure in a magical world.',
    status: true
  });
  await Book.create({
    title: 'The Something of the Ring',
    author: 'J.F.K. Tolkien',
    description: 'Wizard makes a team and goatee guy dies',
    status: true
  });
  console.log('ROTK was added to the database');
  mongoose.disconnect();
}

seed();

// to evoke this file run this in the terminal: (node and then he name of the file)
// ex.:
// node seed.js
