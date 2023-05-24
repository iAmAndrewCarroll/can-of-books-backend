'use strict';

/*
  each book in our database should look something like this:

  let abook = {
    name: 'Mr. Mistoffelees',
    color: 'black and white',
    spayNeuter: true,
    lobookion: 'London'
  }
*/

// bring in mongoose here (as well as the server.js)
const mongoose = require('mongoose');

// extract the schema
const { Schema } = mongoose;

// create a book schema, define how our object should be structured
const bookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: Boolean, required: true},
});

// create a Model and tell the model about the rules (AKA the schema)
// we pass mongoose.model a string name for the collection and an instance of schema
const bookModel = mongoose.model('Book', bookSchema);


module.exports = bookModel;


